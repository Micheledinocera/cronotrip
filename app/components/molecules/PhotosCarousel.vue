<template>
  <ZoomableCarousel
    :photos="photos"
    :carousel-classes="carouselClasses"
    :image-classes="imageClasses"
    v-if="photos && photos.length > 3"
  />
  <div v-else-if="photos" class="flex">
    <ZoomableImage v-for="photo in photos" :image-classes="imageClasses" :photos="photos" :image-src="photo" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  carouselClasses: {
    type: String,
    default: "",
  },
  imageClasses: {
    type: String,
    default: "",
  },
  photos: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>
