<template>
  <UModal
    v-model:open="open"
    :title="title"
    :description="description"
    :ui="{content: 'max-w-[420px]', overlay: 'bg-inverted/45'}"
  >
    <template #content>
      <div class="flex gap-3 p-4 pb-0">
        <span
          class="grid place-items-center size-10 shrink-0 rounded-full"
          :class="tone === 'error'
            ? 'text-error bg-[color-mix(in_oklab,var(--ui-error)_14%,var(--ui-bg))]'
            : 'text-warning bg-[color-mix(in_oklab,var(--ui-warning)_16%,var(--ui-bg))]'"
        >
          <UIcon :name="tone === 'error' ? 'i-lucide-trash-2' : 'i-lucide-triangle-alert'" class="size-5" />
        </span>
        <div>
          <h2 class="typo-title-3 text-highlighted">{{ title }}</h2>
          <p class="typo-small text-muted mt-1">{{ description }}</p>
        </div>
      </div>
      <div class="flex justify-end gap-2 p-4">
        <UButton :label="cancelLabel" color="neutral" variant="outline" @click="open = false" />
        <UButton
          :label="confirmLabel"
          :color="tone === 'error' ? 'error' : 'neutral'"
          :loading="loading"
          @click="emit('confirm')"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
// Confirmation modal: a question as title, one sentence, Cancel and the action.
// `error` for deletions, `warning` for leaving with unsaved changes.
withDefaults(defineProps<{
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  tone?: 'error' | 'warning';
  loading?: boolean;
}>(), {tone: 'error', loading: false});

const open = defineModel<boolean>('open', {default: false});
const emit = defineEmits<{confirm: []}>();
</script>
