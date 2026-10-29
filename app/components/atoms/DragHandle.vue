<template>
  <button
    type="button"
    class="grid size-7 shrink-0 cursor-grab place-items-center rounded-md text-dimmed hover:bg-elevated hover:text-toned focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:cursor-grabbing"
    :aria-label="t('form.drag')"
  >
    <UIcon name="i-lucide-grip-vertical" class="size-4" />
  </button>
</template>

<script setup lang="ts">
// The grip of a reorderable item; the handlers come from useReorder().handle(i).
const {t} = useI18n();
</script>
