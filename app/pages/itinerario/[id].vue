<template>
  <div class="container mx-auto p-4">
    <div v-if="itinerary">
      <img :src="itinerary.photo" :alt="itinerary.name" />
      <h1 class="text-2xl mb-4">{{ itinerary.name }}</h1>
      <div class="prose max-w-none">
        {{ itinerary.desc }}
      </div>
      <select
        @input="(event)=>{selectedDayIndex = (event.target as HTMLSelectElement).value as unknown as number}"
      >
        <option
          v-for="(day, dayIndex) in itinerary.days"
          :key="day.subtitle + ' - ' + dayIndex"
          :value="dayIndex"
        >
          {{ day.subtitle }}
        </option>
      </select>
      <div>
        <div> {{ selectedDay?.subtitle }}</div>
        <accordion
          v-for="(place, placeIndex) in selectedDay?.places"
          :key="place.name + ' - ' + placeIndex"
          :itemId="placeIndex+''"
          :title="place.name"
          :opened-ids="openedIds"
          @toggle="handleSelectedId"
        >
        {{ place.name }}
        </accordion>
      </div>
    </div>
    <div v-else>Caricamento...</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({auth:false})

let selectedDayIndex = ref<number>(0);
let itinerary = ref<Itinerary | undefined>(undefined);

const { data: fetchedItinerary } = await useItinerary();
itinerary = fetchedItinerary;

const selectedDay = computed(() => {
  return itinerary.value?.days?.[selectedDayIndex.value];
});

let openedIds = ref<string[] >(selectedDay.value?.places.map((place,placeIndex)=>placeIndex+"") || []);

const handleSelectedId=(itemId:string)=>{
  const id=openedIds.value.findIndex(oi=>oi==itemId)
  if(id==-1)
    openedIds.value.push(itemId)
  else
    openedIds.value.splice(id,1)
}
</script>
