# vue-tinykeys

Vue composable and directive for keybindings.

## Install

```bash
npm install vue-tinykeys
```

## Usage

### Composable

The most basic usage is to assign a hotkey we want to listen to and a callback to get executed once the user hits that key:

```vue
<script setup lang="ts">
import { useTinykeys } from 'vue-tinykeys'
import { ref } from 'vue'

const count = ref(0)

useTinykeys('q', () => count.value++)
useTinykeys('w', () => count.value--)
</script>

<template>
  <span>The count is {{ count }}.</span>
</template>
```

We can also use an array as first argument to listen to multiple keystrokes and/or hotkeys and trigger the same callback:

```vue
<script setup lang="ts">
import { useTinykeys } from 'vue-tinykeys'
import { ref } from 'vue'

const count = ref(0)

useTinykeys(['ctrl+shift+a+c', 'c', 'shift+c'], () => count.value++)
</script>

<template>
  <span>Received the combination {{ count }} times.</span>
</template>
```

By default, hotkeys are attached globally. We can scope hotkeys by attaching the returned function of `useTinykeys` to any component that takes a ref:

```vue
<script setup lang="ts">
import { useTinykeys } from 'vue-tinykeys'
import { ref } from 'vue'

const count = ref(0)
const getRef = useTinykeys('shift+a', () => count.value++)
</script>

<template>
  <p>The count is {{ count }}. Click anywhere expect for the button to disable the hotkey.</p>
  <button :ref="getRef">
    Click me to enable the hotkey
  </button>
</template>
```

Tags like `<div>`, `<section>`, `<span>`, etc. cannot receive focus by default. To let them receive focus we have to use the `tabindex` attribute:

```vue
<script setup lang="ts">
import { useTinykeys } from 'vue-tinykeys'
import { ref } from 'vue'

const count = ref(0)
const getRef = useTinykeys('shift+a', () => count.value++)
</script>

<template>
  <div :ref="getRef" tabindex="-1" style="border: 2px solid #9e768f;">
    <p>The count is {{ count }}. Click inside this area to enable the hotkey.</p>
  </div>
</template>
```

### Directive

Basic:

```vue
<script setup lang="ts">
import { vTinykeys } from 'vue-tinykeys'
import { ref } from 'vue'

const count = ref(0)
const inc = () => count.value++
</script>

<template>
  <div v-tinykeys:[`shift+a`]="inc" tabindex="-1" style="border: 2px solid #9e768f;">
    <p>The count is {{ count }}. Click inside this area to enable the hotkey.</p>
  </div>
</template>
```

Multiple:

```vue
<script setup lang="ts">
import { vTinykeys } from 'vue-tinykeys'
import { ref } from 'vue'

const count = ref(0)

const keybindingMap = {
  q: () => count.value++,
  w: () => count.value++
}
</script>

<template>
  <div v-tinykeys="{ keybindingMap }" tabindex="-1" style="border: 2px solid #9e768f;">
    <p>The count is {{ count }}. Click inside this area to enable the hotkey.</p>
  </div>
</template>
```

## License

MIT
