<template>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// Toasts: bottom right on desktop, top on mobile; they close after 5 seconds.
const isDesktop = useIsDesktop();
const toaster = computed(() => ({
  position: isDesktop.value ? ('bottom-right' as const) : ('top-center' as const),
  duration: 5000,
}));
</script>
