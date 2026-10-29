<template>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// Toasts: bottom right on desktop, top on mobile; they close after 5 seconds.
const isDesktop = ref(true);
onMounted(() => {
  const query = window.matchMedia('(min-width: 640px)');
  isDesktop.value = query.matches;
  query.addEventListener('change', (e) => (isDesktop.value = e.matches));
});

const toaster = computed(() => ({
  position: isDesktop.value ? ('bottom-right' as const) : ('top-center' as const),
  duration: 5000,
}));
</script>
