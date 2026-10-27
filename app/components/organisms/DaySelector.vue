<template>
  <div>
    <template v-if="dayToUse.length > 3">
      <UCarousel
        v-slot="{ item, index }"
        :items="dayToUse"
        ref="carousel"
        class="w-full h-full mx-auto mb-10 cursor-pointer"
        :ui="{ item: 'basis-1/3' }"
        @select="activeIndex = $event"
      >
        <!-- prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right" -->
        <UAlert
          v-if="!item.toAdd"
          @click="selectedIndex = index"
          :variant="index === selectedIndex ? 'solid' : 'subtle'"
          :color="index === selectedIndex ? 'primary' : 'neutral'"
          :title="'Giorno ' + (index + 1)"
          :description="item.subtitle"
          :close="index>0"
          @update:open="removeDay(index)"
          class="h-full"
        />
        <UAlert
          v-else
          @click="addDay"
          variant="soft"
          color="neutral"
          :title="'Giorno ' + (index + 1)"
          :description="item.subtitle"
          class="border-2 border-primary border-dashed h-full"
          close
          close-icon="i-gg:add"
        />
      </UCarousel>

      <div class="flex justify-center w-full">
        <div
          v-for="(day, dayIndex) in dayToUse"
          :key="'dots_' + dayIndex"
          @click="goTo(dayIndex)"
          class="flex h-4 w-4 m-4 rounded-full bg-neutral-300 cursor-pointer"
          :class="{ 'bg-primary': dayIndex == selectedIndex }"
        />
      </div>
    </template>

    <div v-else class="flex justify-center gap-4 w-full h-full mx-auto mb-10">
      <div
        v-for="(item, index) in dayToUse"
        :key="index"
        class="basis-1/3 cursor-pointer"
      >
        <UAlert
          v-if="!item.toAdd"
          @click="selectedIndex = index"
          :variant="index === selectedIndex ? 'solid' : 'subtle'"
          :color="index === selectedIndex ? 'primary' : 'neutral'"
          :title="'Giorno ' + (index + 1)"
          :description="item.subtitle"
          :close="index>0"
          @update:open="removeDay(index)"
          class="h-full"
        />
        <UAlert
          v-else
          @click="addDay"
          variant="soft"
          color="neutral"
          :title="'Giorno ' + (index + 1)"
          :description="item.subtitle"
          class="border-2 border-primary border-dashed h-full"
          close
          close-icon="i-gg:add"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    days: Partial<Day & { toAdd: boolean }>[];
    modelValue: number;
    withControls?: boolean;
  }>(),
  { withControls: false }
);

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);
const emit = defineEmits(["update:modelValue", "update-days"]);

const selectedIndex = computed({
  get() {
    return props.modelValue;
  },
  set(val: number) {
    emit("update:modelValue", val);
  },
});

const dayToUse = computed(() => {
  if (!props.withControls) return props.days;
  return [...props.days, { subtitle: "Add a Day", toAdd: true }];
});

const removeDay=(index:number)=>{
  let updatedDays=[...props.days];
  updatedDays.splice(index,1)
  emit("update-days", updatedDays);
  selectedIndex.value = 0
}
const addDay = () => {
  emit("update-days", [...props.days, { subtitle: `Day ${props.days.length + 1}` }]);
  selectedIndex.value = props.days.length;
};

const goTo = (index: number) => {
  activeIndex.value = index;
  selectedIndex.value = index;
  carousel.value?.emblaApi?.scrollTo(index);
};
</script>
