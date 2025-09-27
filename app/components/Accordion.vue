<template>
  <div
    class="p-4 my-2 bg-[--color-global-bg-elevated] bg-clip-border text-[--text-base] shadow-md cursor-pointer rounded-md"
    @click="toggleAccordion"
  >
    <div class="flex justify-between items-center">
      {{ title }}
      <Icon class="transition-[transform] delay-0 duration-500 text-2xl" :class="[{ 'rotate-180': isOpened }]" name="i-iconoir:nav-arrow-down" />
    </div>
    <div
      class="grid transition-[grid-template-rows] delay-0 duration-500"
      :class="[isOpened ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]']"
    >
      <div class="overflow-hidden cursor-auto">
        <slot />
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

const emit = defineEmits(['toggle']);

const toggleAccordion = () => {
  emit('toggle', !isOpened ? '' : props.itemId);
};

const isOpened=computed(()=>{
  return props.openedIds.includes(props.itemId)
})
</script>
