<template>
  <div>
    <template v-if="days.length > 3">
      <UCarousel
        v-slot="{ item, index }"
        :items="days"
        ref="carousel"
        class="w-full h-full mx-auto mb-10 cursor-pointer"
        :ui="{ item: 'basis-1/3' }"
        @select="activeIndex = $event"
      >
        <!-- prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right" -->
        <UAlert
          @click="selectedIndex = index"
          :variant="index === selectedIndex ? 'solid' : 'subtle'"
          :color="index === selectedIndex ? 'primary' : 'neutral'"
          :title="'Giorno ' + (index + 1)"
          :description="item.subtitle"
          class="h-full"
        />
      </UCarousel>

      <div class="flex justify-center w-full">
        <div
            v-for="(day, dayIndex) in days"
            :key="'dots_' + dayIndex"
            @click="goTo(dayIndex)"
            class="flex h-4 w-4 m-4 rounded-full bg-neutral-300 cursor-pointer"
            :class="{ 'bg-primary': dayIndex == selectedIndex }"
        />
      </div>
    </template>

    <div v-else class="flex justify-center gap-4 w-full h-full mx-auto mb-10">
      <div v-for="(item, index) in days" :key="index" class="basis-1/3 cursor-pointer">
        <UAlert
          @click="selectedIndex = index"
          :variant="index === selectedIndex ? 'solid' : 'subtle'"
          :color="index === selectedIndex ? 'primary' : 'neutral'"
          :title="'Giorno ' + (index + 1)"
          :description="item.subtitle"
          class="h-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  days: Day[];
  modelValue: number;
}>();

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);
const emit = defineEmits(["update:modelValue"]);

const selectedIndex = computed({
  get() {
    return props.modelValue;
  },
  set(val: number) {
    emit("update:modelValue", val);
  },
});
const goTo = (index: number) => {
  activeIndex.value = index;
  selectedIndex.value = index;
  carousel.value?.emblaApi?.scrollTo(index);
};
</script>
