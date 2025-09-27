<template>
  <button @click="emit('click')" class="px-4 py-2 rounded" :class="classList">
    <Icon :name="iconName" />
  </button>
</template>

<script setup>
defineProps({
  iconName: {
    type: String,
    required: true,
  },
  classList: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["click"]);
</script>
