<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: string
  cols?: '1' | '2' | '3' | '4' | '5' | '6'
  rows?: '1' | '2' | '3' | '4'
  gap?: '2' | '4' | '6' | '8'
}>()

const gridClass = computed(() => {
  const colsClass = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '5': 'grid-cols-5',
    '6': 'grid-cols-6'
  }[props.cols || '3']

  const rowsClass = props.rows ? `grid-rows-${props.rows}` : ''
  const gapClass = `gap-${props.gap || '4'}`

  return cn('grid', colsClass, rowsClass, gapClass, props.class)
})
</script>

<template>
  <div :class="gridClass">
    <slot />
  </div>
</template> 