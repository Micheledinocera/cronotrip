<template>
  <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" @error="onError">
    <div class="sticky top-0 z-20 border-b border-default bg-default/94 backdrop-blur-md">
      <div class="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 lg:px-8">
        <div class="grid min-w-0">
          <h1 class="truncate text-2xl leading-8 font-semibold text-highlighted">{{ title }}</h1>
          <span v-if="initial.name" class="typo-small truncate text-muted">{{ initial.name }}</span>
        </div>
        <div class="ml-auto flex gap-2 max-sm:hidden">
          <UButton :label="t('common.cancel')" color="neutral" variant="outline" size="lg" @click="cancel" />
          <UButton type="submit" :label="submitLabel" icon="i-lucide-check" size="lg" :loading="saving" />
        </div>
      </div>
    </div>

    <div class="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] items-start gap-6 px-4 pt-6 pb-28 sm:pb-24 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-8 lg:px-8 lg:pt-8">
      <div class="grid grid-cols-[minmax(0,1fr)] gap-6">
        <section class="rounded-lg bg-default ring-1 ring-default" aria-labelledby="form-general">
          <h2 id="form-general" class="typo-label px-4 py-3 text-highlighted">{{ t('itinerary.form.general') }}</h2>
          <div class="grid gap-4 border-t border-default p-4">
            <UFormField name="name" :label="t('itinerary.fields.name')" required>
              <UInput v-model="state.name" :placeholder="t('itinerary.form.placeholders.name')" class="w-full" />
            </UFormField>
            <UFormField name="status" :label="t('itinerary.fields.status')" required>
              <USelect
                v-model="state.status"
                :items="statusItems"
                :icon="statusLook(state.status).icon"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="short_desc"
              :label="t('itinerary.fields.short_desc')"
              :hint="`${state.short_desc.length}/${SHORT_DESC_MAX}`"
              :help="t('itinerary.form.short_desc_help')"
              :ui="{hint: 'tabular-nums'}"
              required
            >
              <UInput v-model="state.short_desc" :placeholder="t('itinerary.form.placeholders.short_desc')" class="w-full" />
            </UFormField>
            <UFormField name="desc" :label="t('itinerary.fields.desc')" required>
              <UTextarea v-model="state.desc" :placeholder="t('itinerary.form.placeholders.desc')" autoresize :rows="3" class="w-full" />
            </UFormField>
          </div>
        </section>

        <!-- Days: a reorderable list on desktop, chips on mobile -->
        <section class="rounded-lg bg-default ring-1 ring-default max-lg:hidden" aria-labelledby="form-days">
          <div class="flex items-center gap-2 px-4 py-3">
            <h2 id="form-days" class="typo-label text-highlighted">{{ t('itinerary.form.days') }}</h2>
            <span class="typo-caption ml-auto text-muted">{{ t('itinerary.form.reorder_hint') }}</span>
          </div>
          <div class="grid gap-1 border-t border-default p-2">
            <div
              v-for="(day, dayIndex) in state.days"
              :key="keyOf(day)"
              v-bind="days.item(dayIndex)"
              class="flex items-center gap-1 rounded-md pr-2"
              :class="dayIndex === selectedDayIndex ? 'bg-[color-mix(in_oklab,var(--ui-primary)_12%,var(--ui-bg))]' : 'hover:bg-elevated'"
            >
              <DragHandle v-bind="days.handle(dayIndex)" />
              <button
                type="button"
                class="grid min-w-0 flex-1 rounded-md py-1.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                :aria-current="dayIndex === selectedDayIndex ? 'true' : undefined"
                @click="selectedDayIndex = dayIndex"
              >
                <span class="typo-label" :class="dayIndex === selectedDayIndex ? 'text-primary' : 'text-highlighted'">
                  {{ t('itinerary.form.day_n', {n: dayIndex + 1}) }}
                </span>
                <span class="typo-small truncate text-muted">{{ day.subtitle || t('itinerary.form.no_subtitle') }}</span>
              </button>
              <UBadge
                v-if="dayErrors(dayIndex)"
                :label="String(dayErrors(dayIndex))"
                icon="i-lucide-circle-alert"
                color="error"
                variant="soft"
              />
            </div>
            <UButton
              :label="t('itinerary.form.add_day')"
              icon="i-lucide-plus"
              variant="soft"
              block
              class="mt-2"
              @click="addDay"
            />
          </div>
        </section>

        <div class="-mx-4 flex gap-2 overflow-x-auto px-4 lg:hidden" role="tablist" :aria-label="t('itinerary.form.days')">
          <button
            v-for="(day, dayIndex) in state.days"
            :key="keyOf(day)"
            type="button"
            role="tab"
            :aria-selected="dayIndex === selectedDayIndex"
            class="typo-label flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2"
            :class="dayIndex === selectedDayIndex
              ? 'bg-primary text-on-primary'
              : 'bg-default text-default ring-1 ring-inset ring-accented'"
            @click="selectedDayIndex = dayIndex"
          >
            {{ t('itinerary.form.day_n', {n: dayIndex + 1}) }}
            <UIcon v-if="dayErrors(dayIndex)" name="i-lucide-circle-alert" class="size-4" :class="{'text-error': dayIndex !== selectedDayIndex}" />
          </button>
          <UButton
            icon="i-lucide-plus"
            variant="soft"
            class="shrink-0 rounded-full"
            :aria-label="t('itinerary.form.add_day')"
            @click="addDay"
          />
        </div>
      </div>

      <ItineraryDayForm
        v-if="state.days[selectedDayIndex]"
        :key="keyOf(state.days[selectedDayIndex]!)"
        v-model="state.days[selectedDayIndex]!"
        :path="`days.${selectedDayIndex}`"
        :number="selectedDayIndex + 1"
        :removable="state.days.length > 1"
        @remove="removeDay"
      />
    </div>

    <div class="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-default bg-default/94 p-3 backdrop-blur-md sm:hidden">
      <UButton :label="t('common.cancel')" color="neutral" variant="outline" size="lg" class="flex-1 justify-center" @click="cancel" />
      <UButton type="submit" :label="submitLabel" icon="i-lucide-check" size="lg" class="flex-[2] justify-center" :loading="saving" />
    </div>
  </UForm>

  <ConfirmModal
    v-model:open="leaveOpen"
    tone="warning"
    :title="t('confirm.unsaved_title')"
    :description="t('confirm.unsaved_description')"
    :confirm-label="t('confirm.leave')"
    :cancel-label="t('confirm.stay')"
    @confirm="leave"
  />
</template>

<script setup lang="ts">
import type {FormErrorEvent, FormSubmitEvent} from '@nuxt/ui';

// One form to create and to edit (docs/wiki/viaggi/flussi.md): creating is editing an empty itinerary.
// The "control panel": general data and days on the left, the chosen day on the right.
const props = defineProps<{
  initial: Itinerary;
  title: string;
  submitLabel: string;
  // where "Annulla" goes
  cancelTo: string;
  // saves (uploading the parked photos) and navigates away; leaving during a save does not ask
  // for confirmation
  save: (itinerary: Itinerary, parkedPhotos: Map<string, File>) => Promise<void>;
}>();

const {t} = useI18n();
const toast = useToast();
const globalStore = useGlobalStore();
const form = useTemplateRef('form');

const schema = buildItinerarySchema(t);
const state = ref<Itinerary>(toFormState(props.initial));
// what was last saved (or loaded), to tell unsaved changes
let savedSnapshot = JSON.stringify(state.value);
const selectedDayIndex = ref(0);
const parkedPhotos = createParkedPhotos();
provide(PARKED_PHOTOS, parkedPhotos);
const saving = ref(false);

const statusItems = computed(() =>
  globalStore.statuses.map((status) => ({
    label: t(`statuses.${status.key}`),
    value: status.key,
    icon: statusLook(status.key).icon,
  })),
);

// Errors of the last validation, for the day list and the closed panels
const errors = computed(() => form.value?.getErrors() ?? []);
const hasError = (path: string) => errors.value.some((e) => e.name === path || e.name?.startsWith(`${path}.`));
provide(FORM_ERRORS, hasError);
const dayErrors = (dayIndex: number) => errors.value.filter((e) => e.name?.startsWith(`days.${dayIndex}.`)).length;

// Days
const days = useReorder(
  () => state.value.days,
  (from, to) => {
    const selected = selectedDayIndex.value;
    if (selected === from) selectedDayIndex.value = to;
    else if (from < selected && selected <= to) selectedDayIndex.value = selected - 1;
    else if (to <= selected && selected < from) selectedDayIndex.value = selected + 1;
  },
);

const addDay = () => {
  state.value.days.push({subtitle: '', places: []});
  selectedDayIndex.value = state.value.days.length - 1;
};

const removeDay = () => {
  state.value.days.splice(selectedDayIndex.value, 1);
  selectedDayIndex.value = Math.max(0, selectedDayIndex.value - 1);
};

// Only the selected day is on screen: show the first day with an error, then scroll to the
// first invalid field (fields of the itinerary come before those of the days)
const onError = async (event: FormErrorEvent) => {
  const onDays = event.errors.every((error) => error.name?.startsWith('days.'));
  const dayIndex = event.errors.map((error) => error.name?.match(/^days\.(\d+)\./)?.[1]).find(Boolean);
  if (onDays && dayIndex !== undefined) selectedDayIndex.value = Number(dayIndex);
  toast.add({
    title: t('form.errors.check_fields'),
    description: onDays && dayIndex !== undefined
      ? t('form.errors.check_day', {n: Number(dayIndex) + 1})
      : t('form.errors.check_general'),
    color: 'error',
    icon: 'i-lucide-circle-alert',
    duration: 0,
  });
  await nextTick();
  document.querySelector('[aria-invalid="true"]')?.scrollIntoView({behavior: 'smooth', block: 'center'});
};

const onSubmit = async (event: FormSubmitEvent<Itinerary>) => {
  saving.value = true;
  try {
    await props.save(event.data, parkedPhotos.files);
    savedSnapshot = JSON.stringify(state.value);
  } catch (error) {
    console.error(error);
    toast.add({title: t('form.errors.save_failed'), color: 'error', icon: 'i-lucide-circle-x', duration: 0});
  } finally {
    saving.value = false;
  }
};

// Unsaved changes: a modal before leaving the page, the browser's prompt before closing the tab
const isDirty = () => !saving.value && JSON.stringify(state.value) !== savedSnapshot;

const cancel = () => navigateTo(props.cancelTo);

const leaveOpen = ref(false);
let pendingRoute: string | undefined;
let leaving = false;

onBeforeRouteLeave((to) => {
  if (leaving || !isDirty()) return;
  pendingRoute = to.fullPath;
  leaveOpen.value = true;
  return false;
});

const leave = () => {
  leaving = true;
  leaveOpen.value = false;
  if (pendingRoute) navigateTo(pendingRoute);
};

const onBeforeUnload = (event: BeforeUnloadEvent) => {
  if (isDirty()) event.preventDefault();
};
onMounted(() => window.addEventListener('beforeunload', onBeforeUnload));
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', onBeforeUnload);
  parkedPhotos.release();
});
</script>
