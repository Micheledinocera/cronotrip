<template>
  <div :class="{ dark: globalStore.isDark }" class="bg-[var(--bg-color)] h-full w-full">
    <Header />
    <div class="layout-content absolute w-full overflow-auto">
      <slot />
    </div>
  </div>
</template>

<script setup>
const globalStore = useGlobalStore();
</script>

<style lang="scss" scoped>
.layout-content {
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
}
</style>
