<template>
  <div role="tablist" :aria-label="t('view.days')" class="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
    <button
      v-for="(_, i) in days"
      :key="i"
      type="button"
      role="tab"
      :aria-selected="i === selected"
      class="typo-label shrink-0 rounded-full px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :class="i === selected
        ? 'bg-primary text-on-primary'
        : 'bg-default text-default ring-1 ring-inset ring-accented hover:bg-elevated'"
      @click="selected = i"
    >
      {{ t('itinerary.form.day_n', {n: i + 1}) }}
    </button>
  </div>
</template>

<script setup lang="ts">
// The day chips of the view: one day at a time, the selected one in the primary color.
defineProps<{days: Day[]}>();
const selected = defineModel<number>({required: true});
const {t} = useI18n();
</script>
