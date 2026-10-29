<template>
  <div class="space-y-4">
    <div class="grid md:grid-cols-2 gap-4">
      <UFormField :name="`${path}.name`" :label="t('itinerary.fields.activity_name')" required>
        <UInput v-model="activity.name" variant="subtle" class="w-full" />
      </UFormField>
      <UFormField :name="`${path}.category`" :label="t('itinerary.fields.category')" required>
        <USelect v-model="activity.category" :items="categoryItems" variant="subtle" class="w-full" />
      </UFormField>
    </div>
    <UFormField :name="`${path}.desc`" :label="t('itinerary.fields.desc')">
      <UTextarea v-model="activity.desc" variant="subtle" autoresize class="w-full" />
    </UFormField>
    <div v-if="activity.link" class="grid md:grid-cols-2 gap-4">
      <UFormField :name="`${path}.link.label`" :label="t('itinerary.fields.link_label')">
        <UInput v-model="activity.link.label" variant="subtle" class="w-full" />
      </UFormField>
      <UFormField :name="`${path}.link.url`" :label="t('itinerary.fields.link_url')">
        <UInput v-model="activity.link.url" type="url" placeholder="https://" variant="subtle" class="w-full" />
      </UFormField>
    </div>
    <UFormField
      v-if="activity.coordinates || addingPosition"
      :name="`${path}.coordinates`"
      :label="t('itinerary.fields.position')"
    >
      <template #hint>
        <UButton
          :label="t('itinerary.form.remove_position')"
          color="neutral"
          variant="link"
          size="xs"
          @click="removePosition"
        />
      </template>
      <LocationPicker v-model="activity.coordinates" :start="defaultPosition" />
    </UFormField>
    <UButton
      v-else
      :label="t('itinerary.form.add_position')"
      icon="i-lucide-map-pin"
      color="neutral"
      variant="outline"
      size="sm"
      @click="addingPosition = true"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
  // where the map starts when a position is added: the place's position
  defaultPosition?: Coordinates;
}>();
const activity = defineModel<Activity>({ required: true });

const { t, te } = useI18n();
const globalStore = useGlobalStore();

// The position of an activity is optional
const addingPosition = ref(false);
const removePosition = () => {
  activity.value.coordinates = undefined;
  addingPosition.value = false;
};

const categoryLabel = (key: string) => (te(`categories.${key}`) ? t(`categories.${key}`) : key);

// Older itineraries use categories that are not in the table: keep them selectable
const categoryItems = computed(() => {
  const keys = globalStore.categories.map((category) => category.key);
  if (activity.value.category && !keys.includes(activity.value.category)) keys.push(activity.value.category);
  return keys.map((key) => ({ label: categoryLabel(key), value: key }));
});
</script>
