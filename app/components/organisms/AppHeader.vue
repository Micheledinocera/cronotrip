<template>
  <header
    class="sticky top-0 z-40 h-(--ui-header-height) border-b border-default bg-default/92 backdrop-blur-md"
  >
    <div class="flex h-full items-center gap-3 px-4 lg:px-8">
      <AppLogo compact />
      <div class="flex-1" />
      <template v-if="user">
        <UButton
          to="/itinerario/new"
          :label="t('nav.new_itinerary')"
          icon="i-lucide-plus"
          size="lg"
          class="max-sm:hidden"
        />
        <UButton
          to="/itinerario/new"
          icon="i-lucide-plus"
          size="lg"
          square
          :aria-label="t('nav.new_itinerary')"
          class="sm:hidden"
        />
        <UserMenu />
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
// The top bar, always the same: logo, new itinerary, user menu. No back button.
const {t} = useI18n();
const user = useSupabaseUser();
</script>
