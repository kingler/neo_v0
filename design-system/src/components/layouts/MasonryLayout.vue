<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: string
  columns?: '2' | '3' | '4' | '5'
  gap?: '2' | '4' | '6' | '8'
}>()

const masonryClass = computed(() => {
  const columnsClass = {
    '2': 'columns-2',
    '3': 'columns-3',
    '4': 'columns-4',
    '5': 'columns-5'
  }[props.columns || '3']

  const gapClass = `gap-${props.gap || '4'}`

  return cn('columns-1 sm:columns-2', columnsClass, gapClass, props.class)
})
</script>

<template>
  <div :class="masonryClass">
    <slot />
  </div>
</template> 