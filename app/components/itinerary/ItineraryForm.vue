<template>
  <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit" @error="onError">
    <div class="grid md:grid-cols-2 gap-4">
      <UFormField name="name" :label="t('itinerary.fields.name')" required>
        <UInput v-model="state.name" size="xl" variant="subtle" class="w-full" />
      </UFormField>
      <UFormField name="status" :label="t('itinerary.fields.status')" required>
        <USelect v-model="state.status" :items="statusItems" size="xl" variant="subtle" class="w-full" />
      </UFormField>
    </div>
    <UFormField
      name="short_desc"
      :label="t('itinerary.fields.short_desc')"
      :hint="`${state.short_desc.length}/${SHORT_DESC_MAX}`"
      required
    >
      <UInput v-model="state.short_desc" size="xl" variant="subtle" class="w-full" />
    </UFormField>
    <UFormField name="desc" :label="t('itinerary.fields.desc')" required>
      <UTextarea v-model="state.desc" size="xl" variant="subtle" autoresize class="w-full" />
    </UFormField>

    <UFormField name="days" :label="t('itinerary.form.days')" required>
      <DaySelector
        :days="state.days"
        v-model="selectedDayIndex"
        :with-controls="true"
        @update-days="state.days = $event"
      />
    </UFormField>

    <UCard v-if="state.days[selectedDayIndex]">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">
            {{ t('itinerary.form.day_n', { n: selectedDayIndex + 1 }) }}
          </h2>
          <ListItemControls
            :index="selectedDayIndex"
            :length="state.days.length"
            :removable="state.days.length > 1"
            horizontal
            @move="moveDay"
            @remove="removeDay"
          />
        </div>
      </template>
      <ItineraryDayForm
        :key="keyOf(state.days[selectedDayIndex]!)"
        v-model="state.days[selectedDayIndex]!"
        :path="`days.${selectedDayIndex}`"
      />
    </UCard>

    <div class="flex justify-end">
      <UButton type="submit" size="xl" :label="submitLabel" :loading="saving" />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from '@nuxt/ui';

// One form to create and to edit (docs/wiki/viaggi/flussi.md): creating is editing an empty itinerary
const props = defineProps<{
  initial: Itinerary;
  submitLabel: string;
  // saves (uploading the parked photos) and navigates away; leaving during a save does not ask
  // for confirmation
  save: (itinerary: Itinerary, parkedPhotos: Map<string, File>) => Promise<void>;
}>();

const { t } = useI18n();
const toast = useToast();
const globalStore = useGlobalStore();

const schema = buildItinerarySchema(t);
const state = ref<Itinerary>(toFormState(props.initial));
// what was last saved (or loaded), to tell unsaved changes
let savedSnapshot = JSON.stringify(state.value);
const selectedDayIndex = ref(0);
const parkedPhotos = createParkedPhotos();
provide(PARKED_PHOTOS, parkedPhotos);
const saving = ref(false);

const statusItems = computed(() =>
  globalStore.statuses.map((status) => ({ label: t(`statuses.${status.key}`), value: status.key }))
);

const moveDay = (delta: number) => {
  moveItem(state.value.days, selectedDayIndex.value, delta);
  selectedDayIndex.value += delta;
};

const removeDay = () => {
  state.value.days.splice(selectedDayIndex.value, 1);
  selectedDayIndex.value = Math.max(0, selectedDayIndex.value - 1);
};

// Only the selected day is on screen: show the first day with an error, then scroll to the
// first invalid field (fields of the itinerary come before those of the days)
const onError = async (event: FormErrorEvent) => {
  toast.add({ title: t('form.errors.check_fields'), color: 'error' });
  const onDays = event.errors.every((error) => error.name?.startsWith('days.'));
  const dayIndex = event.errors.map((error) => error.name?.match(/^days\.(\d+)\./)?.[1]).find(Boolean);
  if (onDays && dayIndex !== undefined) selectedDayIndex.value = Number(dayIndex);
  await nextTick();
  document.querySelector('[aria-invalid="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const onSubmit = async (event: FormSubmitEvent<Itinerary>) => {
  saving.value = true;
  try {
    await props.save(event.data, parkedPhotos.files);
    savedSnapshot = JSON.stringify(state.value);
  } catch (error) {
    console.error(error);
    toast.add({ title: t('form.errors.save_failed'), color: 'error' });
  } finally {
    saving.value = false;
  }
};

// Unsaved changes: ask before leaving the page or closing the tab
const isDirty = () => !saving.value && JSON.stringify(state.value) !== savedSnapshot;

onBeforeRouteLeave(() => {
  if (isDirty() && !window.confirm(t('form.unsaved_changes'))) return false;
});

const onBeforeUnload = (event: BeforeUnloadEvent) => {
  if (isDirty()) event.preventDefault();
};
onMounted(() => window.addEventListener('beforeunload', onBeforeUnload));
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', onBeforeUnload);
  parkedPhotos.release();
});
</script>
