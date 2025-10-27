<template>
  <div class="fixed left-0 z-2">
    <USlideover title="Lista Places" side="left">
      <UButton
        icon="i-game-icons:path-distance"
        size="lg"
        color="primary"
        class="rounded-s-[0]"
      />
      <template #body="{ close }">
        <div class="aspect-video w-full">
          <NoControlMapDay
            :day="props.selectedDay"
            :active-place-index="activePlaceIndex"
            @clicked-place="
              (value:number) => {
                scrollToDayElement(`place_${value}`);
                close();
              }
            "
          />
        </div>
        <UStepper
          color="primary"
          :items="stepperItems"
          class="h-full mt-4"
          size="xl"
          orientation="vertical"
          v-model="placeIndex"
          :linear="false"
          @update:model-value="
            (value) => {
              scrollToDayElement(`place_${value}`);
              close();
            }
          "
        />
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const { scrollToDayElement } = useDayScroll();
import type { StepperItem } from "@nuxt/ui";

const props = defineProps({
  selectedDay: {
    type: Object as PropType<Day>,
    required: true,
  },
  activePlaceIndex: {
    type: Number,
    default: 0,
  },
});

const placeIndex = ref<number>(0);

watch(
  () => props.activePlaceIndex,
  (newIndex) => {
    if (placeIndex.value !== newIndex) placeIndex.value = newIndex;
  },
  { immediate: true }
);

const stepperItems = computed(() => {
  return props.selectedDay.places.map((place) => ({
    title: place.name,
    icon: "i-mdi:place-outline",
  })) as StepperItem[];
});
</script>
