<template>
  <ZoomableCarousel
    :photos="photos"
    :carousel-classes="carouselClasses"
    :image-classes="imageClasses"
    v-if="photos && photos.length > 1"
  />
  <ZoomableImage v-else-if="photos" :image-classes="imageClasses" :photos="photos" :image-src="photos[0] || ''" />
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
