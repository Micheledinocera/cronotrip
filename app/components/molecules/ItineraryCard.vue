<template>
  <NuxtLink
    :to="'/itinerario/' + itinerary.id"
    class="group grid gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    <div class="relative">
      <HeaderPhoto
        :src="cover"
        :alt="itinerary.name"
        zoom-on-hover
        class="aspect-4/3"
      >
        <template #fallback>
          <div
            class="absolute inset-0 grid place-items-center bg-[color-mix(in_oklab,var(--ui-primary)_9%,var(--ui-bg))] text-[color-mix(in_oklab,var(--ui-primary)_35%,var(--ui-bg))]"
          >
            <LogoMark :size="56" mono />
          </div>
        </template>
      </HeaderPhoto>
      <StatusBadge :status="itinerary.status" on-photo class="absolute top-3 left-3" />
    </div>
    <div class="grid gap-1 px-0.5">
      <p class="typo-title-3 text-highlighted">{{ itinerary.name }}</p>
      <p v-if="itinerary.short_desc" class="typo-small text-muted truncate">
        {{ itinerary.short_desc }}
      </p>
      <p class="typo-caption text-muted flex items-center gap-2 mt-1">
        <template v-if="itinerary.owner_name">
          <UAvatar :alt="itinerary.owner_name" size="3xs" />
          {{ itinerary.owner_name }}
          <span aria-hidden="true">·</span>
        </template>
        {{ t('common.days', itinerary.days?.length ?? 0) }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
// Dashboard card: the whole card links to the itinerary, no buttons inside.
const props = defineProps<{itinerary: Itinerary}>();
const {t} = useI18n();
const {getImageUrl} = useSupabaseImages();

const cover = computed(() =>
  props.itinerary.photos?.[0] ? getImageUrl(props.itinerary.photos[0]) : undefined,
);
</script>
