<template>
  <UBadge
    :label="t(`statuses.${status}`)"
    :icon="look.icon"
    :color="look.color"
    :variant="look.variant"
    size="md"
    :class="{'bg-default ring-0': onPhoto && look.variant === 'outline'}"
  />
</template>

<script setup lang="ts">
// Itinerary status badge. `onPhoto`: on a cover the outline badge gets a solid background.
const props = defineProps<{status: string; onPhoto?: boolean}>();
const {t} = useI18n();

const look = computed(() => statusLook(props.status));
</script>
