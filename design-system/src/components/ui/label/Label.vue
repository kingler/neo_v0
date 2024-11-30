<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../../lib/utils'

const props = defineProps<{
  class?: string
  htmlFor?: string
}>()

const labelClass = computed(() => {
  return cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    props.class
  )
})
</script>

<template>
  <label
    :for="htmlFor"
    :class="labelClass"
  >
    <slot />
  </label>
</template>
