<template>
  <UModal title="Foto" fullscreen description="Foto" @after:enter="selectIndex">
    <UCarousel
      v-slot="{ item,index }"
      loop
      :items="photos"
      class="w-full h-full mx-auto mb-10 cursor-pointer"
      :ui="{ item: 'basis-1/3' }"
    >
      <NuxtImg
        :src="item"
        :class="imageClasses"
        class="rounded-lg object-contain m-auto w-full"
        @click="activeIndex=index"
      />
    </UCarousel>
    <template #body>
      <UCarousel
        ref="zoomedCarousel"
        v-slot="{ item }"
        loop
        :items="photos"
        class="w-full h-full mx-auto -mt-5"
      >
        <NuxtImg :src="item" class="rounded-lg object-contain m-auto w-full h-[calc(100vh-190px)]" />
      </UCarousel>
    </template>
    <template #footer="{ close }">
      <UButton @click="close"> OK </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  photos: {
    type: Array as PropType<string[]>,
    required: true,
  },
  carouselClasses: {
    type: String,
    default: "",
  },
  imageClasses: {
    type: String,
    default: "",
  },
});

const zoomedCarousel = useTemplateRef('zoomedCarousel')
const activeIndex=ref<number>(0);

const selectIndex=()=>{
  zoomedCarousel.value?.emblaApi?.scrollTo(activeIndex.value)
}
</script>
