<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: string
}>()

const layoutClass = computed(() => {
  return cn('grid min-h-screen grid-cols-[280px_1fr] grid-rows-[64px_1fr]', props.class)
})
</script>

<template>
  <div :class="layoutClass">
    <!-- Header -->
    <header class="col-span-2 border-b bg-background px-6 py-3">
      <slot name="header" />
    </header>

    <!-- Sidebar -->
    <aside class="row-start-2 border-r bg-muted/40 p-6">
      <slot name="sidebar" />
    </aside>

    <!-- Main Content -->
    <main class="row-start-2 flex-1 overflow-auto p-6">
      <slot />
    </main>
  </div>
</template> 