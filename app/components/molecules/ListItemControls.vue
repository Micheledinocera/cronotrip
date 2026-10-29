<template>
  <div class="flex gap-1">
    <UButton
      :icon="horizontal ? 'i-lucide-arrow-left' : 'i-lucide-arrow-up'"
      color="neutral"
      variant="ghost"
      size="sm"
      :disabled="index === 0"
      :aria-label="t('form.move_before')"
      @click="emit('move', -1)"
    />
    <UButton
      :icon="horizontal ? 'i-lucide-arrow-right' : 'i-lucide-arrow-down'"
      color="neutral"
      variant="ghost"
      size="sm"
      :disabled="index === length - 1"
      :aria-label="t('form.move_after')"
      @click="emit('move', 1)"
    />
    <UButton
      v-if="removable"
      icon="i-lucide-trash-2"
      color="error"
      variant="ghost"
      size="sm"
      :aria-label="t('form.remove')"
      @click="emit('remove')"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    index: number;
    length: number;
    removable?: boolean;
    horizontal?: boolean;
  }>(),
  { removable: true, horizontal: false }
);

const emit = defineEmits<{
  move: [delta: number];
  remove: [];
}>();

const { t } = useI18n();
</script>
