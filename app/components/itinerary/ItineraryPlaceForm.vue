<template>
  <div class="grid grid-cols-[minmax(0,1fr)] gap-6">
    <div class="grid grid-cols-[minmax(0,1fr)] items-start gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
      <div class="grid grid-cols-[minmax(0,1fr)] gap-4">
        <UFormField :name="`${path}.name`" :label="t('itinerary.fields.place_name')" required>
          <UInput v-model="place.name" :placeholder="t('itinerary.form.placeholders.place_name')" class="w-full" />
        </UFormField>
        <UFormField :name="`${path}.coordinates`" :label="t('itinerary.fields.position')" required>
          <LocationPicker v-model="place.coordinates" @picked="onPicked" />
        </UFormField>
      </div>
      <UFormField :name="`${path}.photos`" :label="t('itinerary.fields.header_photo')">
        <PhotoPicker v-model="headerPhoto" />
      </UFormField>
    </div>

    <div class="grid grid-cols-[minmax(0,1fr)] gap-3">
      <h4 class="typo-label text-highlighted">{{ t('itinerary.form.activities') }}</h4>
      <FormPanel
        v-for="(activity, activityIndex) in place.events"
        :key="keyOf(activity)"
        v-bind="reorder.item(activityIndex)"
        :title="activity.name || t('itinerary.form.new_activity')"
        :has-error="hasError(`${path}.events.${activityIndex}`)"
        :default-open="!activity.name"
        class="bg-muted/50"
        @remove="place.events.splice(activityIndex, 1)"
      >
        <template #handle>
          <DragHandle v-bind="reorder.handle(activityIndex)" />
        </template>
        <template #summary>
          <span class="grid size-7 shrink-0 place-items-center rounded-full bg-elevated text-toned">
            <CategoryIcon :category="activity.category" class="size-4" />
          </span>
          <span class="typo-label truncate" :class="activity.name ? 'text-highlighted' : 'text-muted'">
            {{ activity.name || t('itinerary.form.new_activity') }}
          </span>
          <span v-if="activity.category" class="typo-caption shrink-0 text-muted">{{ categoryLabel(activity.category) }}</span>
        </template>
        <ItineraryActivityForm
          v-model="place.events[activityIndex]!"
          :path="`${path}.events.${activityIndex}`"
          :default-position="place.coordinates"
        />
      </FormPanel>
      <UButton
        :label="t('itinerary.form.add_activity')"
        icon="i-lucide-plus"
        variant="soft"
        class="justify-self-start"
        @click="place.events.push(emptyActivity())"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{path: string}>();
const place = defineModel<Place>({required: true});

const {t, te} = useI18n();
const hasError = inject(FORM_ERRORS, () => false);
const reorder = useReorder(() => place.value.events);

const categoryLabel = (key: string) => (te(`categories.${key}`) ? t(`categories.${key}`) : key);

// The header of the place in its page is its first photo; the others stay as they are
const headerPhoto = computed({
  get: () => place.value.photos?.[0],
  set: (photo?: string) => {
    const others = place.value.photos?.slice(1) ?? [];
    place.value.photos = photo ? [photo, ...others] : others;
  },
});

// A place found by search names the place, unless it already has a name
const onPicked = (name: string) => {
  if (!place.value.name.trim()) place.value.name = name;
};
</script>
