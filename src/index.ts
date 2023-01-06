import type { ComponentPublicInstance, Directive, DirectiveBinding } from 'vue'
import tinykeys, { type KeyBindingMap, type KeyBindingOptions } from 'tinykeys'
import { getCurrentInstance, onMounted, onScopeDispose, ref } from 'vue'

declare global {
  interface HTMLElement {
    __unsubscribeBindings: () => void
  }
}

type DirectiveValue = {
  keyBindingMap: KeyBindingMap
  options?: KeyBindingOptions
} | ((event: KeyboardEvent) => void)

function bindEvent(el: HTMLElement, binding: DirectiveBinding<DirectiveValue>) {
  if (typeof binding.value === 'function') {
    el.__unsubscribeBindings = tinykeys(el, {
      [binding.arg!]: binding.value,
    }, {
      event: binding.modifiers.keyup ? 'keyup' : 'keydown',
    })
  }
  else {
    el.__unsubscribeBindings = tinykeys(el, binding.value.keyBindingMap, binding.value.options)
  }
}

function unbindEvent(el: HTMLElement) {
  el.__unsubscribeBindings()
}

export const vTinykeys: Directive<HTMLElement, any> = {
  mounted(el, binding) {
    bindEvent(el, binding)
  },
  updated(el, binding) {
    unbindEvent(el)
    bindEvent(el, binding)
  },
  unmounted(el) {
    unbindEvent(el)
  },
}

export function useTinykeys(
  keybinding: string | string[],
  cb: (event: KeyboardEvent) => void,
  options?: KeyBindingOptions,
) {
  let unsubscribe: () => void
  const elRef = ref<Window | HTMLElement | null>(null)

  function getElement(el: Element | ComponentPublicInstance | null) {
    elRef.value = el as HTMLElement
  }

  onMounted(() => {
    const keyBindingMap: Record<string, ((event: KeyboardEvent) => void)> = {}

    if (Array.isArray(keybinding)) {
      keybinding.forEach((key) => {
        keyBindingMap[key] = cb
      })
    }
    else {
      keyBindingMap[keybinding] = cb
    }

    unsubscribe = tinykeys(elRef.value || window, keyBindingMap, options)
  })

  if (getCurrentInstance()) {
    onScopeDispose(() => {
      unsubscribe()
    })
  }

  return getElement
}
