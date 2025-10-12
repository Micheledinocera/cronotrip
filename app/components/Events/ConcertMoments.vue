<template>
  <div class="food-moments border-l-4 border-amber-500 pl-4 my-4">
    <h3 class="text-xl font-semibold mb-2">🍽️ Menu e Piatti Consigliati</h3>
    <div
      v-for="(moment, index) in props.eventData.moments"
      :key="index"
      class="mb-3 p-3 bg-amber-50 rounded-lg"
    >
      <div class="font-bold text-gray-800">{{ moment.name }} ({{ moment.price }}€)</div>
      <p class="text-sm italic text-gray-600">{{ moment.desc }}</p>
      
      <PhotosCarousel :photos="moment.photos || []"/>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  eventData: Activity;
}>();
</script>