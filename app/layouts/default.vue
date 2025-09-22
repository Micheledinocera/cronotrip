<template>
  <div :class="{ dark: globalStore.isDark }" class="bg-[var(--bg-color)] h-full w-full">
    <Header />
    <div class="layout-content">
      <slot />
    </div>
  </div> 
</template>

<script setup>
const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
.layout-content{
  padding-top: var(--header-height);
  height: calc(100vh - var(--header-height));
}
</style>