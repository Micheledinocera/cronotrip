<template>
    <div>
        <UIcon :name="iconName" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  eventType: string
}>();

const ICON_FROM_TYPE = {
    'trekking': 'i-iconoir:trekking',
    'food': 'i-fluent:food-20-filled',
    'museum': 'i-icon-park-solid:museum-one',
    'concert': 'i-streamline-ultimate:concert-dj-bold',
    'any': 'i-material-symbols:search-activity',
} as const;

type IconType = keyof typeof ICON_FROM_TYPE;

const iconName = computed(() => {
    return ICON_FROM_TYPE[props.eventType as IconType]??'i-material-symbols:search-activity';
})
</script>