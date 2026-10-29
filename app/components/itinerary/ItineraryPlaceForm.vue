<template>
  <div class="space-y-4">
    <UFormField :name="`${path}.name`" :label="t('itinerary.fields.place_name')" required>
      <UInput v-model="place.name" variant="subtle" class="w-full" />
    </UFormField>
    <UFormField :name="`${path}.photos`" :label="t('itinerary.fields.header_photo')">
      <PhotoPicker v-model="headerPhoto" />
    </UFormField>
    <UFormField :name="`${path}.coordinates`" :label="t('itinerary.fields.position')" required>
      <LocationPicker v-model="place.coordinates" @picked="onPicked" />
    </UFormField>

    <div class="space-y-3">
      <h4 class="font-semibold">{{ t('itinerary.form.activities') }}</h4>
      <div
        v-for="(activity, activityIndex) in place.events"
        :key="keyOf(activity)"
        class="border border-default rounded-md p-4 space-y-2"
      >
        <div class="flex justify-between items-center">
          <span class="text-sm text-muted">
            {{ t('itinerary.form.activity_n', { n: activityIndex + 1 }) }}
          </span>
          <ListItemControls
            :index="activityIndex"
            :length="place.events.length"
            @move="moveItem(place.events, activityIndex, $event)"
            @remove="place.events.splice(activityIndex, 1)"
          />
        </div>
        <ItineraryActivityForm
          v-model="place.events[activityIndex]!"
          :path="`${path}.events.${activityIndex}`"
          :default-position="place.coordinates"
        />
      </div>
      <UButton
        :label="t('itinerary.form.add_activity')"
        icon="i-lucide-plus"
        color="neutral"
        variant="outline"
        @click="addActivity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ path: string }>();
const place = defineModel<Place>({ required: true });

const { t } = useI18n();

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

const addActivity = () => {
  place.value.events.push(emptyActivity());
};
</script>
