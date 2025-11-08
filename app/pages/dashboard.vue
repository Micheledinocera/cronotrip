<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6"></div>

    <!-- <NuxtLink
      to="/itinerario/new"
      class="bg-green-500 text-white px-4 py-2 rounded inline-block mb-4"
    >
      Nuovo Itinerario
    </NuxtLink> -->
    <button @click="saveItinerary"> SALVALO </button>

    <div v-if="itineraries?.length" class="grid grid-cols-1 gap-4">
      <div
        v-for="dbitinerary in itineraries"
        :key="'itinerary_' + dbitinerary.itinerary_json_id"
        class="border p-4 rounded"
      >
        <div class="text-xl">{{ dbitinerary.itinerary_document.name }}</div>
        <ZoomableImage v-if="dbitinerary.itinerary_document.photos" :image-src="dbitinerary.itinerary_document.photos[0] || ''"/>
        <div class="text-lg">{{ dbitinerary.itinerary_document.short_desc }}</div>
        <div class="mt-2">
          <NuxtLink :to="'/itinerario/' + dbitinerary.itinerary_json_id" class="text-blue-500"
            >Visualizza</NuxtLink
          >
          <!-- <NuxtLink :to="'/itinerario/modifica/' + itinerary.id" class="text-blue-500 ml-4">Modifica</NuxtLink> -->
        </div>
      </div>
    </div>
    <p v-else>Non hai ancora creato nessun itinerario</p>
  </div>
</template>

<script setup lang="ts">
let itineraries = ref<DBItinerary[] | undefined>([]);

const {getItineraries}=await useItinerary();
itineraries.value = await getItineraries();

const saveItinerary=async()=>{
  const dataToSave=await $fetch<Itinerary>('/umbria.json')
  const {saveItinerary}=await useItinerary();
  await saveItinerary(dataToSave!);
}
</script>
