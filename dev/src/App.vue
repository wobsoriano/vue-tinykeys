<script setup lang="ts">
import { useTinykeys, vTinykeys } from 'use-tinykeys'
import { ref } from 'vue'

const enabled = ref(true)

// const getElement = useTinykeys('Shift+D', () => {
//   alert('The \'Shift\' and \'d\' keys were pressed at the same time')
// })

function callMe() {
  console.log(1123)
}
</script>

<template>
  <div v-tinykeys:[`Shift+D`].keydown="callMe" tabindex="0">
    hello
  </div>
  <button @click="enabled = !enabled">
    Enable
  </button>
</template>
