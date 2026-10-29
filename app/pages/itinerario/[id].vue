<template>
  <div ref="containerRef" class="h-full overflow-y-auto">
    <main v-if="itinerary" class="mx-auto max-w-[1440px] pb-24 sm:px-8 sm:pt-6">
      <ItineraryCover :itinerary="itinerary">
        <template #actions>
          <div class="flex gap-2 max-sm:hidden">
            <UButton
              :label="t('itinerary.copy')"
              icon="i-lucide-copy"
              v-bind="FLOATING"
              :loading="copying"
              @click="copy"
            />
            <UButton
              v-if="isOwner"
              :to="'/itinerario/modifica/' + itinerary.id"
              :label="t('itinerary.edit')"
              icon="i-lucide-pencil"
              v-bind="FLOATING"
            />
            <UDropdownMenu v-if="isOwner" :items="[deleteItem]" :content="{align: 'end'}">
              <UButton icon="i-lucide-ellipsis-vertical" v-bind="FLOATING" :aria-label="t('itinerary.more_actions')" />
            </UDropdownMenu>
          </div>
          <UDropdownMenu :items="mobileItems" :content="{align: 'end'}" class="sm:hidden">
            <UButton icon="i-lucide-ellipsis-vertical" v-bind="FLOATING" :aria-label="t('itinerary.more_actions')" />
          </UDropdownMenu>
        </template>
      </ItineraryCover>

      <div class="mx-auto mt-6 grid max-w-[820px] grid-cols-[minmax(0,1fr)] gap-10 px-4 sm:mt-10 sm:gap-12 sm:px-0">
        <p v-if="itinerary.desc" class="typo-quote text-toned sm:text-xl sm:leading-[30px] max-w-[640px]">{{ itinerary.desc }}</p>

        <div v-if="itinerary.days?.length" class="grid gap-3 sm:gap-4">
          <DayChips v-model="selectedDayIndex" :days="itinerary.days" />
          <h2 v-if="selectedDay?.subtitle" class="typo-title-2 sm:text-[28px] sm:leading-[34px] text-highlighted">{{ selectedDay.subtitle }}</h2>
        </div>

        <PlaceSection
          v-for="(place, placeIndex) in selectedDay?.places"
          :key="`${selectedDayIndex}-${placeIndex}`"
          :ref="(c) => registerPlace(placeIndex, c)"
          :data-place-index="placeIndex"
          :place="place"
          :number="placeIndex + 1"
          @open-photo="openPhoto"
        />

        <UButton
          v-if="nextDay"
          :label="t('view.next_day', {n: selectedDayIndex + 2, subtitle: nextDay.subtitle ?? ''})"
          trailing-icon="i-lucide-chevron-right"
          variant="soft"
          size="xl"
          class="justify-self-start"
          @click="go(selectedDayIndex + 1, 0)"
        />
      </div>

      <TripDrawer
        v-if="itinerary.days?.length"
        :name="itinerary.name"
        :days="itinerary.days"
        :current-day="selectedDayIndex"
        :active="{dayIndex: selectedDayIndex, placeIndex: activePlaceIndex}"
        @go="go"
      />
      <PhotoGallery v-model:open="galleryOpen" v-model:index="galleryIndex" :photos="photos" />
      <ConfirmModal
        v-model:open="deleteOpen"
        :title="t('itinerary.delete_title')"
        :description="t('itinerary.delete_description', {name: itinerary.name})"
        :confirm-label="t('itinerary.delete')"
        :cancel-label="t('common.cancel')"
        :loading="deleting"
        @confirm="remove"
      />
    </main>
    <p v-else class="typo-body text-muted py-24 text-center">{{ t('view.not_found') }}</p>
  </div>
</template>

<script setup lang="ts">
import type {DropdownMenuItem} from '@nuxt/ui';

// The view of an itinerary: the "diary". One day at a time, places with their photo,
// activities with their moments closed; the drawer for the whole trip, the gallery for the photos.

// Floating buttons over the cover photo
const FLOATING = {
  color: 'neutral',
  variant: 'outline',
  size: 'lg',
  class: 'bg-default/90 ring-0 shadow-sm backdrop-blur-md hover:bg-default',
} as const;

const route = useRoute();
const {t} = useI18n();
const toast = useToast();
const user = useSupabaseUser();
const {getItineraryById, copyItinerary, deleteItinerary} = await useItinerary();

const itinerary = ref<Itinerary>();
try {
  itinerary.value = await getItineraryById(parseInt(route.params.id as string));
} catch (error) {
  console.error(error);
}

// Edit and delete only for the owner, copy for every signed-in user (docs/wiki/viaggi/flussi.md)
const isOwner = computed(() => !!user.value && itinerary.value?.owner_id === user.value.id);

const selectedDayIndex = ref(0);
const selectedDay = computed(() => itinerary.value?.days?.[selectedDayIndex.value]);
const nextDay = computed(() => itinerary.value?.days?.[selectedDayIndex.value + 1]);

// Actions
const copying = ref(false);
const copy = async () => {
  if (!itinerary.value) return;
  copying.value = true;
  try {
    const name = `${itinerary.value.name} ${t('itinerary.copy_suffix')}`;
    const copied = await copyItinerary(itinerary.value, name);
    toast.add({
      title: t('itinerary.copied'),
      description: t('itinerary.copy_description', {name}),
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    await navigateTo('/itinerario/' + copied.id);
  } catch (error) {
    console.error(error);
    toast.add({title: t('itinerary.copy_failed'), color: 'error', icon: 'i-lucide-circle-x', duration: 0});
  } finally {
    copying.value = false;
  }
};

const deleteOpen = ref(false);
const deleting = ref(false);
const remove = async () => {
  if (!itinerary.value?.id) return;
  deleting.value = true;
  try {
    await deleteItinerary(itinerary.value.id);
    deleteOpen.value = false;
    await navigateTo('/dashboard', {replace: true});
  } catch (error) {
    console.error(error);
    toast.add({title: t('itinerary.delete_failed'), color: 'error', icon: 'i-lucide-circle-x', duration: 0});
  } finally {
    deleting.value = false;
  }
};

const deleteItem = computed<DropdownMenuItem>(() => ({
  label: t('itinerary.delete'),
  icon: 'i-lucide-trash-2',
  color: 'error',
  onSelect: () => (deleteOpen.value = true),
}));
const mobileItems = computed<DropdownMenuItem[][]>(() => [
  [
    {label: t('itinerary.copy'), icon: 'i-lucide-copy', onSelect: copy},
    ...(isOwner.value
      ? [{label: t('itinerary.edit'), icon: 'i-lucide-pencil', to: '/itinerario/modifica/' + itinerary.value?.id}]
      : []),
  ],
  ...(isOwner.value ? [[deleteItem.value]] : []),
]);

// The place on screen, highlighted in the drawer
const containerRef = ref<HTMLElement | null>(null);
const placeEls = ref<HTMLElement[]>([]);
const activePlaceIndex = ref(0);
const registerPlace = (index: number, component: any) => {
  if (component?.$el) placeEls.value[index] = component.$el;
};

let observer: IntersectionObserver | undefined;
const observePlaces = () => {
  observer?.disconnect();
  if (!containerRef.value) return;
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activePlaceIndex.value = Number((visible.target as HTMLElement).dataset.placeIndex ?? 0);
    },
    {root: containerRef.value, rootMargin: '-30% 0px -50% 0px'},
  );
  placeEls.value.forEach((el) => el && observer!.observe(el));
};
onMounted(observePlaces);
onUnmounted(() => observer?.disconnect());

watch(selectedDayIndex, () => {
  placeEls.value = [];
  activePlaceIndex.value = 0;
  nextTick(observePlaces);
});

const go = async (dayIndex: number, placeIndex: number) => {
  selectedDayIndex.value = dayIndex;
  await nextTick();
  placeEls.value[placeIndex]?.scrollIntoView({behavior: 'smooth', block: 'start'});
};

// Gallery
const photos = computed(() => galleryPhotos(itinerary.value?.days));
const galleryOpen = ref(false);
const galleryIndex = ref(0);
const openPhoto = (src: string) => {
  const i = photos.value.findIndex((p) => p.src === src && p.dayIndex === selectedDayIndex.value);
  galleryIndex.value = Math.max(0, i);
  galleryOpen.value = true;
};
</script>
