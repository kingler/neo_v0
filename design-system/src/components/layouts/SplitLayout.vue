<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: string
  split?: '1/3' | '1/2' | '2/3'
  reverse?: boolean
}>()

const splitClass = computed(() => {
  const splitClasses = {
    '1/3': 'grid-cols-[1fr_2fr]',
    '1/2': 'grid-cols-2',
    '2/3': 'grid-cols-[2fr_1fr]'
  }[props.split || '1/2']

  return cn(
    'grid min-h-screen',
    splitClasses,
    props.reverse && 'direction-rtl',
    props.class
  )
})
</script>

<template>
  <div :class="splitClass">
    <!-- Left/First Section -->
    <div class="flex flex-col">
      <slot name="first" />
    </div>

    <!-- Right/Second Section -->
    <div class="flex flex-col">
      <slot name="second" />
    </div>
  </div>
</template> 