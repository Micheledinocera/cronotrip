<template>
  <div class="container mx-auto p-4">
    <div v-if="itinerary">
      <NuxtImg v-if="itinerary.photos" :src="itinerary.photos[0]" :alt="itinerary.name" />
      <h1 class="text-2xl mb-4">{{ itinerary.name }}</h1>
      <div class="prose max-w-none">
        {{ itinerary.desc }}
      </div>
      <USelect :items="daySelect" v-model="selectedDayIndex" value-key="id" />
      <div>
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
              class="w-full h-full object-cover rounded-md absolute"
            />
            <div class="flex justify-between items-center absolute z-1 w-full p-4 h-full">
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
            <div
              v-for="(event, eventIdx) in place.events"
              :key="`${event.name}_${eventIdx}`"
            >
              <div>
                {{ event.name }}
                <TypeIcon :event-type="event.category" />
              </div>
              <div>
                <PhotosCarousel
                  :photos="event.photos || []"
                  :image-classes="'h-[240px]'"
                />
              </div>
              <div v-if="event.moments && event.moments.length > 0">
                <div class="w-full aspect-video">
                  <NoControlMapTrip
                    :modal-title="event.name"
                    v-if="event.category == 'trekking'"
                    :places-coordinates="
                      event.moments.map(
                        (moment) => moment.coordinates ?? { lat: 0, lng: 0 }
                      ) || []
                    "
                  />
                </div>
                <component :is="getComponent(event.category)" :event-data="event" />
              </div>
            </div>
          </template>
        </accordion>
      </div>
    </div>
    <div v-else>Caricamento...</div>
  </div>
</template>

<script setup lang="ts">
import {
  FoodMoments,
  TrekkingMoments,
  MuseumMoments,
  ConcertMoments,
  AnyMoments,
} from "#components";

definePageMeta({ auth: false });

let selectedDayIndex = ref<number>(0);
let itinerary = ref<Itinerary | undefined>(undefined);

const { data: fetchedItinerary } = await useItinerary();
itinerary = fetchedItinerary;

const daySelect = computed(() =>
  itinerary.value?.days?.map((day, dayIndex) => ({
    label: day.subtitle || "",
    id: dayIndex,
  }))
);
const selectedDay = computed(() => {
  return itinerary.value?.days?.[selectedDayIndex.value];
});

let openedIds = ref<string[]>(
  selectedDay.value?.places.map((place, placeIndex) => placeIndex + "") || []
);

const handleSelectedId = (itemId: string) => {
  const id = openedIds.value.findIndex((oi) => oi == itemId);
  if (id == -1) openedIds.value.push(itemId);
  else openedIds.value.splice(id, 1);
};

const componentMap: Record<string, any> = {
  food: FoodMoments,
  trekking: TrekkingMoments,
  museum: MuseumMoments,
  concert: ConcertMoments,
  any: AnyMoments,
};

const getComponent = (
  category: string
):
  | typeof FoodMoments
  | typeof TrekkingMoments
  | typeof MuseumMoments
  | typeof ConcertMoments
  | typeof AnyMoments => {
  const componentType = componentMap[category.toLowerCase()] || AnyMoments;
  return componentType;
};
</script>
