<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../../lib/utils'

const props = defineProps<{
  class?: string
}>()

const titleClass = computed(() => {
  return cn('text-2xl font-semibold leading-none tracking-tight', props.class)
})
</script>

<template>
  <h3 :class="titleClass">
    <slot />
  </h3>
</template> 