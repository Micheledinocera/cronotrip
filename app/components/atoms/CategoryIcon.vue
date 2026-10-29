<template>
  <span
    v-if="chip"
    class="inline-grid place-items-center size-9 shrink-0 rounded-full bg-elevated text-toned"
  >
    <UIcon :name="categoryIcon(category)" class="size-5" />
  </span>
  <UIcon v-else :name="categoryIcon(category)" class="shrink-0" />
</template>

<script setup lang="ts">
// The icon of an activity category. `chip`: 20px in a 36px circle, as in the view.
defineProps<{category?: string; chip?: boolean}>();
</script>
