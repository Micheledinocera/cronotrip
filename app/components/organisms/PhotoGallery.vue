<template>
  <UModal
    v-model:open="open"
    fullscreen
    :title="t('gallery.title')"
    :description="current ? `${current.title} · ${subtitle}` : ''"
    :ui="{content: 'dark bg-default'}"
  >
    <template #content>
      <div
        v-if="current"
        class="grid h-full grid-rows-[auto_1fr_auto] text-default"
      >
        <div class="flex items-center gap-4 px-4 py-3 sm:px-6">
          <div class="grid min-w-0">
            <span class="typo-body-strong truncate text-highlighted">{{ current.title }}</span>
            <span class="typo-caption truncate text-muted">{{ subtitle }}</span>
          </div>
          <span class="typo-small ml-auto shrink-0 tabular-nums text-muted">
            {{ t('gallery.counter', {i: index + 1, n: photos.length}) }}
          </span>
          <UButton icon="i-lucide-x" color="neutral" variant="ghost" :aria-label="t('gallery.close')" @click="open = false" />
        </div>

        <div class="relative min-h-0">
          <img
            :key="current.src"
            :src="getImageUrl(current.src)"
            :alt="current.title"
            class="absolute inset-0 size-full object-contain px-4 sm:px-24"
          />
          <UButton
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="soft"
            size="lg"
            class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full sm:left-8"
            :disabled="index === 0"
            :aria-label="t('gallery.previous')"
            @click="step(-1)"
          />
          <UButton
            icon="i-lucide-arrow-right"
            color="neutral"
            variant="soft"
            size="lg"
            class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full sm:right-8"
            :disabled="index === photos.length - 1"
            :aria-label="t('gallery.next')"
            @click="step(1)"
          />
        </div>

        <div class="overflow-x-auto border-t border-default px-4 pt-3 pb-5 sm:px-6">
          <div class="flex items-end gap-7">
            <div v-for="day in groups" :key="day.dayIndex" class="grid shrink-0 gap-2">
              <span class="typo-overline text-toned">{{ t('itinerary.form.day_n', {n: day.dayIndex + 1}) }}</span>
              <div class="flex gap-5">
                <div v-for="place in day.places" :key="place.placeIndex" class="grid gap-1.5">
                  <span class="typo-caption max-w-40 truncate text-muted">{{ place.name }}</span>
                  <div class="flex gap-1.5">
                    <button
                      v-for="i in place.indexes"
                      :key="i"
                      :ref="(el) => { if (i === index) activeThumb = el as HTMLElement }"
                      type="button"
                      class="size-14 shrink-0 overflow-hidden rounded-md bg-accented transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      :class="i === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'"
                      :aria-label="t('gallery.photo_of', {name: photos[i]!.title})"
                      :aria-current="i === index ? 'true' : undefined"
                      @click="index = i"
                    >
                      <img :src="getImageUrl(photos[i]!.src)" alt="" loading="lazy" class="size-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
// The trip gallery: always dark, full screen; the big photo, "title · day · place",
// the counter and a strip of thumbnails grouped by day and place.
const props = defineProps<{photos: GalleryPhoto[]}>();
const open = defineModel<boolean>('open', {default: false});
const index = defineModel<number>('index', {default: 0});
const {t, te} = useI18n();
const {getImageUrl} = useSupabaseImages();

const current = computed(() => props.photos[index.value]);
const subtitle = computed(() => {
  const p = current.value;
  if (!p) return '';
  const parts = [t('itinerary.form.day_n', {n: p.dayIndex + 1}), p.placeName];
  if (p.category) parts.push(t(te(`categories.${p.category}`) ? `categories.${p.category}` : 'categories.any'));
  return parts.join(' · ');
});

const groups = computed(() => {
  const days: {dayIndex: number; places: {placeIndex: number; name: string; indexes: number[]}[]}[] = [];
  props.photos.forEach((p, i) => {
    let day = days.find((d) => d.dayIndex === p.dayIndex);
    if (!day) days.push((day = {dayIndex: p.dayIndex, places: []}));
    let place = day.places.find((pl) => pl.placeIndex === p.placeIndex);
    if (!place) day.places.push((place = {placeIndex: p.placeIndex, name: p.placeName, indexes: []}));
    place.indexes.push(i);
  });
  return days;
});

const step = (delta: number) => {
  index.value = Math.min(props.photos.length - 1, Math.max(0, index.value + delta));
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
};
watch(open, (isOpen) => {
  if (isOpen) window.addEventListener('keydown', onKey);
  else window.removeEventListener('keydown', onKey);
});
onUnmounted(() => window.removeEventListener('keydown', onKey));

const activeThumb = ref<HTMLElement | null>(null);
watch([index, open], () => nextTick(() => activeThumb.value?.scrollIntoView({block: 'nearest', inline: 'center'})));
</script>
