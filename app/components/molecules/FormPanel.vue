<template>
  <section class="rounded-lg bg-default ring-1 ring-default" :class="{'ring-error': hasError && !open}">
    <div class="flex min-w-0 items-center gap-2 py-2 pr-2 pl-1">
      <slot name="handle" />
      <button
        type="button"
        class="flex min-w-0 flex-1 items-center gap-2 rounded-md py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :aria-expanded="open"
        @click="open = !open"
      >
        <slot name="summary" />
        <UIcon v-if="hasError && !open" name="i-lucide-circle-alert" class="size-4 shrink-0 text-error" />
      </button>
      <UButton
        :icon="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
        color="neutral"
        variant="ghost"
        square
        :aria-label="t(open ? 'form.collapse' : 'form.expand', {name: title})"
        @click="open = !open"
      />
      <UButton
        icon="i-lucide-trash-2"
        color="neutral"
        variant="ghost"
        square
        :aria-label="t('form.remove_named', {name: title})"
        @click="emit('remove')"
      />
    </div>
    <div v-if="open" class="grid grid-cols-[minmax(0,1fr)] gap-4 border-t border-default p-4" :class="bodyClass">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
// A collapsible section of the form (place, activity): closed, one summary line with the
// row actions; open, its fields (mounted only when open: maps need their size). It opens by
// itself when a field inside has an error.
const props = defineProps<{title: string; hasError?: boolean; defaultOpen?: boolean; bodyClass?: string}>();
const open = ref(props.defaultOpen);
const emit = defineEmits<{remove: []}>();
const {t} = useI18n();

watch(() => props.hasError, (error) => {
  if (error) open.value = true;
});
</script>
