<template>
  <USeparator color="primary" type="solid" :label="$t(`moments.${eventData.category}`)" class="mt-8 mb-4" />
  <div
    class="pt-4"
    v-for="(moment, index) in props.eventData.moments"
    :key="`moment_${indexes.placeIndex}_${indexes.eventIndex}_${index}`"
    :ref="(el) => registerDayElementRef(`moment_${indexes.placeIndex}_${indexes.eventIndex}_${index}`,el as HTMLElement | null)"
  >
    <UCard class="border-l-4 border-primary my-4">
      <div class="flex gap-4 flex-col sm:flex-row">
        <div class="w-1/2">
          <div class="font-bold">
            {{ moment.name }} <span v-if="moment.price"> - {{ moment.price }}€</span>
          </div>
          <div>{{ moment.desc }}</div>
        </div>
        <PhotosCarousel
          class="w-3/4 sm:w-1/2 aspect-video m-auto"
          :photos="moment.photos || []"
          :image-classes="'h-24 md:h-40'"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  eventData: {
    type: Object as PropType<Activity>,
    required: true,
  },
  indexes: {
    type: Object as PropType<{ eventIndex: number; placeIndex: number }>,
    required: true,
  },
});

const { registerDayElementRef } = useDayScroll();
</script>
