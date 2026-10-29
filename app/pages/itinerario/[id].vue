<template>
  <div
    class="overflow-y-auto h-full"
    :ref="(el) => {containerRef = el as HTMLElement | null}"
  >
    <div class="container mx-auto p-4">
      <div v-if="itinerary">
        <NuxtImg
          v-if="itinerary.photos"
          :src="getImageUrl(itinerary.photos[0])"
          :alt="itinerary.name"
        />
        <h1 class="text-2xl mb-2">{{ itinerary.name }}</h1>
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <UBadge :label="t(`statuses.${itinerary.status}`)" variant="subtle" />
          <div class="flex-1" />
          <UButton
            v-if="isOwner"
            :to="'/itinerario/modifica/' + itinerary.id"
            :label="t('itinerary.edit')"
            icon="i-lucide-pencil"
            variant="outline"
          />
          <UButton
            :label="t('itinerary.copy')"
            icon="i-lucide-copy"
            variant="outline"
            :loading="copying"
            @click="copy"
          />
          <UModal
            v-if="isOwner"
            v-model:open="deleteOpen"
            :title="t('itinerary.delete_title')"
            :description="t('itinerary.delete_description', { name: itinerary.name })"
          >
            <UButton :label="t('itinerary.delete')" icon="i-lucide-trash-2" color="error" variant="outline" />
            <template #footer>
              <div class="flex justify-end gap-2 w-full">
                <UButton :label="t('common.cancel')" color="neutral" variant="ghost" @click="deleteOpen = false" />
                <UButton :label="t('itinerary.delete')" color="error" :loading="deleting" @click="remove" />
              </div>
            </template>
          </UModal>
        </div>
        <div class="prose max-w-none">
          {{ itinerary.desc }}
        </div>
        <DaySelector :days="itinerary.days" v-model="selectedDayIndex" />
        <div :key="selectedDayIndex">
          <StepperWidget
            v-if="selectedDay && selectedDay.places?.length > 1"
            :selected-day="selectedDay"
            :active-place-index="activeRefIndex"
          />
          <div>{{ selectedDay?.subtitle }}</div>
          <accordion
            v-for="(place, placeIndex) in selectedDay?.places"
            :key="place.name + ' - ' + placeIndex"
            :itemId="placeIndex + ''"
            :title="place.name"
            :opened-ids="openedIds"
            @toggle="handleSelectedId"
          >
            <template #header>
              <NuxtImg
                v-if="place.photos"
                :src="getImageUrl(place.photos[0])"
                class="w-full h-full object-cover rounded-md absolute rounded-b-none"
              />
              <div
                :ref="(el) => placeRefReg(placeIndex,el as HTMLElement | null)"
                class="flex justify-between items-center absolute z-1 w-full p-4 h-full"
              >
                <div class="bg-[var(--ui-bg)] rounded-md p-4">
                  {{ place.name }}
                </div>
                <div class="h-full aspect-video" @click.stop="">
                  <NoControlMap
                    :place-coordinates="place.coordinates"
                    :modal-title="place.name"
                  />
                </div>
              </div>
            </template>
            <template #content>
              <Day
                v-for="(event, eventIndex) in place.events"
                :event="event"
                :event-index="eventIndex"
                :place-index="placeIndex"
                :key="`${event.name}_${eventIndex}`"
              />
            </template>
          </accordion>
        </div>
      </div>
      <div v-else>{{ t('common.loading') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
let selectedDayIndex = ref<number>(0);
let itinerary = ref<Itinerary | undefined>(undefined);
let route=useRoute();
const {getItineraryById, copyItinerary, deleteItinerary}=await useItinerary();
const {getImageUrl}=useSupabaseImages();
const { t } = useI18n();
const toast = useToast();
const user = useSupabaseUser();

itinerary.value = await getItineraryById(parseInt(route.params.id as string));

// Edit and delete only for the owner, copy for every signed-in user (docs/wiki/viaggi/flussi.md)
const isOwner = computed(() => !!user.value && itinerary.value?.owner_id === user.value.id);

const copying = ref(false);
const copy = async () => {
  if (!itinerary.value) return;
  copying.value = true;
  try {
    const copied = await copyItinerary(itinerary.value, `${itinerary.value.name} ${t('itinerary.copy_suffix')}`);
    toast.add({ title: t('itinerary.copied'), color: 'success' });
    await navigateTo('/itinerario/' + copied.id);
  } catch (error) {
    console.error(error);
    toast.add({ title: t('itinerary.copy_failed'), color: 'error' });
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
    await navigateTo('/dashboard', { replace: true });
  } catch (error) {
    console.error(error);
    toast.add({ title: t('itinerary.delete_failed'), color: 'error' });
  } finally {
    deleting.value = false;
  }
};

const { containerRef, registerDayElementRef, activeRef, placeRefs } = useDayScroll();

const selectedDay = computed(() => {
  return itinerary.value?.days?.[selectedDayIndex.value];
});

const activeRefIndex = computed(() => {
  if (!activeRef.value) return -1;
  return placeRefs.value.findIndex((placeRef) => placeRef === activeRef.value);
});

const placeRefReg = (index: number, el: HTMLElement | null) => {
  registerDayElementRef(`place_${index}`, el as HTMLElement | null);
};

let openedIds = ref<string[]>(
  selectedDay.value?.places?.map((place, placeIndex) => placeIndex + "") || []
);

watch(
  selectedDay,
  (newDay) => {
    openedIds.value = newDay?.places?.map((place, placeIndex) => placeIndex + "") || [];
  },
  { immediate: true }
);

const handleSelectedId = (itemId: string) => {
  const id = openedIds.value.findIndex((oi) => oi == itemId);
  if (id == -1) openedIds.value.push(itemId);
  else openedIds.value.splice(id, 1);
};

</script>
