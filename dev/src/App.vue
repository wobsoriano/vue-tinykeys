<script setup lang="ts">
import { useTinykeys } from 'vue-tinykeys'
import { ref } from 'vue'

const count = ref(0)

useTinykeys('$mod+Shift+X', () => count.value++)
</script>

<template>
  <span>Received the combination {{ count }} times.</span>
</template>
