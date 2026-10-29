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
// Itinerary status: color and icon, so it reads without color too.
// `onPhoto`: on a cover the outline badge gets a solid background.
const props = defineProps<{status: string; onPhoto?: boolean}>();
const {t} = useI18n();

const LOOKS = {
  planning: {icon: 'i-lucide-circle-dashed', color: 'neutral', variant: 'outline'},
  in_progress: {icon: 'i-lucide-route', color: 'secondary', variant: 'solid'},
  done: {icon: 'i-lucide-circle-check', color: 'primary', variant: 'soft'},
} as const;

const look = computed(() => LOOKS[props.status as keyof typeof LOOKS] ?? LOOKS.planning);
</script>
