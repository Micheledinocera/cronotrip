<template>
  <div class="fixed left-0">
    <USlideover title="Lista Places" side="left">
      <UButton icon="i-game-icons:path-distance" size="lg" color="primary" class="rounded-s-[0]" />
      <template #body="{ close }">
        <UStepper
          color="primary"
          :items="stepperItems"
          class="h-full"
          size="xl"
          orientation="vertical"
          v-model="placeIndex"
          :linear="false"
          @update:modelValue="
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
});
const placeIndex = ref<number>();

const stepperItems = computed(() => {
  return props.selectedDay.places.map((place) => ({
    title: place.name,
    icon: "i-mdi:place-outline",
  })) as StepperItem[];
});
</script>
