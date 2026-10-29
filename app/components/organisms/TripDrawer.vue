<template>
  <UButton
    :label="t('view.trip_button', {n: currentDay + 1})"
    icon="i-lucide-map"
    color="neutral"
    variant="outline"
    size="lg"
    class="fixed right-4 bottom-6 z-30 rounded-full bg-default/90 shadow-md backdrop-blur-md sm:right-8"
    @click="open = true"
  />

  <component
    :is="isDesktop ? USlideover : UDrawer"
    v-model:open="open"
    :title="t('view.trip_title')"
    :description="summary"
    v-bind="isDesktop ? {side: 'right', ui: {content: 'max-w-[460px]'}} : {ui: {content: 'max-h-[88svh]'}}"
  >
    <template #body>
      <div class="grid gap-5">
        <div class="grid gap-1.5">
          <div class="relative h-[250px] overflow-hidden rounded-lg ring-1 ring-default">
            <TripMap
              :days="days"
              :highlight-day="highlightDay"
              :active="active"
              @select-place="go"
            />
          </div>
          <div class="flex min-h-8 items-center gap-2 px-1">
            <span class="typo-small text-muted">{{ mapLabel }}</span>
            <UButton
              v-if="highlightDay !== null"
              :label="t('view.whole_trip')"
              variant="link"
              size="sm"
              class="ml-auto"
              @click="highlightDay = null"
            />
          </div>
        </div>

        <nav :aria-label="t('view.days')" class="grid gap-2">
          <div
            v-for="(day, dayIndex) in days"
            :key="dayIndex"
            class="grid gap-0.5 transition-opacity"
            :class="{'opacity-60': highlightDay !== null && highlightDay !== dayIndex}"
          >
            <button
              type="button"
              class="flex items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              :class="{'bg-[color-mix(in_oklab,var(--ui-primary)_12%,var(--ui-bg))] hover:bg-[color-mix(in_oklab,var(--ui-primary)_12%,var(--ui-bg))]': highlightDay === dayIndex}"
              :aria-pressed="highlightDay === dayIndex"
              @click="highlightDay = highlightDay === dayIndex ? null : dayIndex"
            >
              <span class="typo-label shrink-0" :class="highlightDay === dayIndex ? 'text-primary' : 'text-highlighted'">
                {{ t('itinerary.form.day_n', {n: dayIndex + 1}) }}
              </span>
              <span class="typo-small truncate text-muted">{{ day.subtitle }}</span>
              <UIcon v-if="highlightDay === dayIndex" name="i-lucide-check" class="ml-auto size-4 shrink-0 text-primary" />
            </button>
            <button
              v-for="(place, placeIndex) in day.places"
              :key="placeIndex"
              type="button"
              class="flex items-center gap-2.5 rounded-md py-1.5 pr-2 pl-4 text-left hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              :aria-current="isActive(dayIndex, placeIndex) ? 'location' : undefined"
              @click="go(dayIndex, placeIndex)"
            >
              <span
                class="grid size-6 shrink-0 place-items-center rounded-full typo-caption"
                :class="isActive(dayIndex, placeIndex) ? 'bg-secondary text-on-secondary' : 'bg-elevated text-toned'"
              >{{ placeIndex + 1 }}</span>
              <span
                class="typo-small truncate"
                :class="isActive(dayIndex, placeIndex) ? 'text-secondary font-medium' : 'text-default'"
              >{{ place.name }}</span>
              <span class="typo-caption ml-auto shrink-0 text-dimmed">{{ t('view.activities', place.events.length) }}</span>
            </button>
          </div>
        </nav>
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import {UDrawer, USlideover} from '#components';

// One drawer for desktop (from the right) and mobile (from the bottom): the map of
// the whole trip and every day with its places. Tapping a day highlights its stretch
// on the map; tapping a place goes there.
const props = defineProps<{
  name: string;
  days: Day[];
  currentDay: number;
  active?: {dayIndex: number; placeIndex: number};
}>();
const emit = defineEmits<{go: [dayIndex: number, placeIndex: number]}>();
const {t} = useI18n();
const isDesktop = useIsDesktop();

const open = ref(false);
const highlightDay = ref<number | null>(null);
watch(open, (isOpen) => {
  if (isOpen) highlightDay.value = null;
});

const placeCount = computed(() => props.days.reduce((n, d) => n + d.places.length, 0));
const summary = computed(
  () => `${props.name} · ${t('common.days', props.days.length)} · ${t('view.places', placeCount.value)}`,
);
const mapLabel = computed(() =>
  highlightDay.value === null
    ? t('view.whole_trip_hint')
    : `${t('itinerary.form.day_n', {n: highlightDay.value + 1})} · ${props.days[highlightDay.value]?.subtitle ?? ''}`,
);

const isActive = (dayIndex: number, placeIndex: number) =>
  props.active?.dayIndex === dayIndex && props.active?.placeIndex === placeIndex;

const go = (dayIndex: number, placeIndex: number) => {
  open.value = false;
  emit('go', dayIndex, placeIndex);
};
</script>
