<template>
  <UModal fullscreen>
    <NuxtImg
      :src="getImageUrl(imageSrc)"
      class="rounded-lg object-contain m-auto cursor-pointer"
      :class="imageClasses"
    />
    <template #body>
      <NuxtImg
        :src="getImageUrl(imageSrc)"
        class="rounded-lg object-contain m-auto h-full w-full"
      />
    </template>
    <template #footer="{ close }">
      <UButton @click="close" > OK </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const {getImageUrl}=useSupabaseImages();

const props = defineProps({
  imageClasses: {
    type: String,
    default: "",
  },
  imageSrc: {
    type: String,
    required: true,
  },
});
</script>
