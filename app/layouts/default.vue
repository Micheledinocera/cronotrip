<template>
  <div :class="{ dark: global.isDark }" class="bg-[var(--bg-color)] h-full w-full">
    <Header />
    <slot />
  </div> 
</template>

<script setup>
const global = useGlobalStore()
</script>