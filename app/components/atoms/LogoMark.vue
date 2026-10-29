<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    aria-hidden="true"
    class="shrink-0"
  >
    <path
      d="M48.85 46.14A22 22 0 1 1 48.85 17.86"
      fill="none"
      stroke-width="7"
      stroke-linecap="round"
      :class="mono ? 'stroke-current' : 'stroke-primary'"
    />
    <circle cx="54" cy="32" r="5" :class="mono ? 'fill-current' : 'fill-secondary'" />
  </svg>
</template>

<script setup lang="ts">
// The mark: an open arc (primary) with the arrival dot (secondary).
// `mono` paints both in currentColor, e.g. on the missing-cover placeholder.
withDefaults(defineProps<{size?: number; mono?: boolean}>(), {size: 28, mono: false});
</script>
