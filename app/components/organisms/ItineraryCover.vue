<template>
  <header class="relative">
    <HeaderPhoto
      :src="cover"
      :alt="itinerary.name"
      eager
      class="h-[min(500px,60svh)] max-sm:rounded-none sm:h-[440px]"
      text-class="left-5 right-5 bottom-6 sm:left-10 sm:bottom-9 sm:right-[420px]"
    >
      <template #fallback>
        <div class="absolute inset-0 grid place-items-center bg-[color-mix(in_oklab,var(--ui-primary)_9%,var(--ui-bg))] text-[color-mix(in_oklab,var(--ui-primary)_35%,var(--ui-bg))]">
          <LogoMark :size="96" mono />
        </div>
      </template>
      <div class="grid justify-items-start gap-2 sm:gap-2.5">
        <StatusBadge :status="itinerary.status" on-photo />
        <h1 class="typo-title-1 sm:text-[52px] sm:leading-[56px] sm:tracking-[-0.01em]">{{ itinerary.name }}</h1>
        <p v-if="itinerary.short_desc" class="text-[15px] leading-[22px] sm:text-[17px] sm:leading-6 opacity-95">{{ itinerary.short_desc }}</p>
        <p class="typo-small flex items-center gap-2 opacity-90">
          <template v-if="itinerary.owner_name">
            <UAvatar :alt="itinerary.owner_name" size="2xs" :ui="{root: 'bg-white/90', fallback: 'text-neutral-950'}" />
            {{ itinerary.owner_name }}
            <span aria-hidden="true">·</span>
          </template>
          {{ t('common.days', itinerary.days?.length ?? 0) }}
        </p>
      </div>
    </HeaderPhoto>
    <div class="absolute top-3 right-3 sm:top-auto sm:right-8 sm:bottom-9">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
// The cover of the view: big, but never taller than 60% of a phone screen.
// Over it: status, name, short description, owner and days; the actions in the `actions` slot.
const props = defineProps<{itinerary: Itinerary}>();
const {t} = useI18n();
const {getImageUrl} = useSupabaseImages();

const cover = computed(() => (props.itinerary.photos?.[0] ? getImageUrl(props.itinerary.photos[0]) : undefined));
</script>
