<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6"></div>

    <NuxtLink
      to="/itinerario/new"
      class="bg-green-500 text-white px-4 py-2 rounded inline-block mb-4"
    >
      Nuovo Itinerario
    </NuxtLink>

    <div v-if="itineraries?.length" class="grid grid-cols-1 gap-4">
      <div
        v-for="itinerary in itineraries"
        :key="'itinerary_' + itinerary.id"
        class="border p-4 rounded"
      >
        <div class="text-xl">{{ itinerary.name }}</div>
        <img :src="itinerary.photo" :alt="itinerary.name" />
        <div class="text-lg">{{ itinerary.short_desc }}</div>
        <div class="mt-2">
          <NuxtLink :to="'/itinerario/' + itinerary.id" class="text-blue-500"
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
let itineraries = ref<Itinerary[] | undefined>([]);

const { data: fetchedItineraries } = await useItineraries();
itineraries = fetchedItineraries || [];
</script>
