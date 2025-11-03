<template>
  <div
    class="overflow-y-auto h-full"
    :ref="(el) => {containerRef = el as HTMLElement | null}"
  >
    <div class="container mx-auto p-4">
      <div v-if="itinerary">
        <NuxtImg
          v-if="itinerary.photos"
          :src="itinerary.photos[0]"
          :alt="itinerary.name"
        />
        <h1 class="text-2xl mb-4">{{ itinerary.name }}</h1>
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
                :src="place.photos[0]"
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
      <div v-else>Caricamento...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false });

let selectedDayIndex = ref<number>(0);
let itinerary = ref<Itinerary | undefined>(undefined);
let route=useRoute();
const {getItineraryById}=await useItinerary();

itinerary.value = await getItineraryById(parseInt(route.params.id as string));

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
