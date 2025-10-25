<template>
  <UCard variant="subtle" class="m-4">
    <div class="flex justify-between p-4">
      <div class="font-bold text-lg">{{ event.name }}</div>
      <div><TypeIcon :event-type="event.category" classes="size-8" /></div>
    </div>
    <div>
      <PhotosCarousel :photos="event.photos || []" :image-classes="'h-40'" />
    </div>
    <div class="flex gap-4 flex-col sm:flex-row" v-if="hasMoments || hasInfo">
      <div class="w-1/2" v-if="hasInfo">
        <div class="font-bold text-md">Info</div>
        <div v-if="event.desc">{{ event.desc }}</div>
        <ULink as="button" v-if="event.link" :to="event.link.url" target="_blank">
          {{ event.link.label }} <UIcon name="i-iconoir:open-new-window"
        /></ULink>
      </div>
      <div
        v-if="hasMoments && event.category == 'trekking'"
        class="w-3/4 sm:w-1/2 aspect-video m-auto"
      >
        <NoControlMapTrip
          :modal-title="event.name"
          :moments="event.moments!"
          :indexes="{ eventIndex: eventIndex, placeIndex: placeIndex }"
        />
      </div>
    </div>
    <div v-if="hasMoments">
      <component
        :is="getComponent(event.category)"
        :event-data="event"
        :indexes="{ eventIndex: eventIndex, placeIndex: placeIndex }"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import {
  FoodMoments,
  TrekkingMoments,
  MuseumMoments,
  ConcertMoments,
  AnyMoments,
} from "#components";

const props = defineProps<{
  event: Activity;
  eventIndex: number;
  placeIndex: number;
}>();

const componentMap: Record<string, any> = {
  food: FoodMoments,
  trekking: TrekkingMoments,
  museum: MuseumMoments,
  concert: ConcertMoments,
  any: AnyMoments,
};

const getComponent = (
  category: string
):
  | typeof FoodMoments
  | typeof TrekkingMoments
  | typeof MuseumMoments
  | typeof ConcertMoments
  | typeof AnyMoments => {
  const componentType = componentMap[category.toLowerCase()] || AnyMoments;
  return componentType;
};

const hasMoments = computed(() => props.event.moments && props.event.moments.length > 0);
const hasInfo = computed(() => props.event.desc || props.event.link);
</script>
