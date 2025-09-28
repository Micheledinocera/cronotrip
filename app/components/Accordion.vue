<template>
  <div
    class="my-2 bg-[--color-global-bg-elevated] bg-clip-border text-[--text-base] shadow-md rounded-md"
  >
    <div @click="toggleAccordion" class="cursor-pointer h-24 relative">
      <template v-if="$slots.header">
        <slot name="header"></slot>
      </template>
      <template v-else>
        <div
          class="flex justify-between items-center absolute z-1 bg-[var(--bg-color)] rounded-md m-4 p-4"
        >
          {{ title }}
          <Icon
            class="transition-[transform] delay-0 duration-500 text-2xl"
            :class="[{ 'rotate-180': isOpened }]"
            name="i-iconoir:nav-arrow-down"
          />
        </div>
      </template>
    </div>
    <div
      class="grid transition-[grid-template-rows] delay-0 duration-500"
      :class="[isOpened ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]']"
    >
      <div class="overflow-hidden cursor-auto">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  openedIds: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["toggle"]);
const visibleCover = ref < Boolean > true;

const toggleAccordion = () => {
  emit("toggle", !isOpened ? "" : props.itemId);
};

const isOpened = computed(() => {
  return props.openedIds.includes(props.itemId);
});
</script>
