<template>
  <UModal fullscreen>
    <NuxtImg
      :src="imageSrc"
      class="rounded-lg object-contain m-auto cursor-pointer"
      :class="imageClasses"
    />
    <template #body>
      <NuxtImg
        :src="imageSrc"
        class="rounded-lg object-contain m-auto h-full w-full"
      />
    </template>
    <template #footer="{ close }">
      <UButton @click="close" > OK </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
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
