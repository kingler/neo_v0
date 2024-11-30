<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: string
}>()

const layoutClass = computed(() => {
  return cn('grid min-h-screen grid-cols-[280px_1fr]', props.class)
})
</script>

<template>
  <div :class="layoutClass">
    <!-- Sidebar -->
    <aside class="border-r bg-muted/40 p-6">
      <slot name="sidebar" />
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template> 