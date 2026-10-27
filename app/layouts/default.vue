<template>
  <div class="bg-[var(--ui-bg)] h-full w-full">
    <Header />
    <div class="layout-content absolute w-full overflow-auto">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-content {
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
}
</style>
