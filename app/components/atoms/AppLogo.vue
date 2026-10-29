<template>
  <NuxtLink
    to="/dashboard"
    class="inline-flex items-center gap-2 font-display font-semibold tracking-[-0.01em] text-highlighted text-xl rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    aria-label="Cronotrip"
  >
    <LogoMark :size="28" />
    <span :class="{'max-sm:sr-only': compact}">cronotrip</span>
  </NuxtLink>
</template>

<script setup lang="ts">
// Mark + logotype, linked to the dashboard. `compact` keeps only the mark on mobile.
defineProps<{compact?: boolean}>();
</script>
