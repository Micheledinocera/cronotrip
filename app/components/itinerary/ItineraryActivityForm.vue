<template>
  <div class="grid grid-cols-[minmax(0,1fr)] gap-4">
    <div class="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
      <UFormField :name="`${path}.name`" :label="t('itinerary.fields.activity_name')" required>
        <UInput v-model="activity.name" :placeholder="t('itinerary.form.placeholders.activity_name')" class="w-full" />
      </UFormField>
      <UFormField :name="`${path}.category`" :label="t('itinerary.fields.category')" required>
        <USelectMenu
          v-model="activity.category"
          :items="categoryItems"
          value-key="value"
          :icon="activity.category ? categoryIcon(activity.category) : undefined"
          :placeholder="t('itinerary.form.placeholders.category')"
          :search-input="false"
          class="w-full"
        />
      </UFormField>
    </div>
    <UFormField :name="`${path}.desc`" :label="t('itinerary.fields.desc')">
      <UTextarea v-model="activity.desc" autoresize :rows="2" class="w-full" />
    </UFormField>
    <div v-if="activity.link" class="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
      <UFormField :name="`${path}.link.label`" :label="t('itinerary.fields.link_label')">
        <UInput v-model="activity.link.label" :placeholder="t('itinerary.form.placeholders.link_label')" class="w-full" />
      </UFormField>
      <UFormField :name="`${path}.link.url`" :label="t('itinerary.fields.link_url')">
        <UInput
          v-model="activity.link.url"
          type="url"
          icon="i-lucide-link"
          :placeholder="t('itinerary.form.placeholders.link_url')"
          class="w-full"
        />
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
          class="p-0"
          @click="removePosition"
        />
      </template>
      <LocationPicker v-model="activity.coordinates" :start="defaultPosition" />
    </UFormField>
    <UButton
      v-else
      :label="t('itinerary.form.add_position')"
      icon="i-lucide-map-pin"
      variant="link"
      class="justify-self-start p-0"
      @click="addingPosition = true"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  path: string;
  // where the map starts when a position is added: the place's position
  defaultPosition?: Coordinates;
}>();
const activity = defineModel<Activity>({required: true});

const {t, te} = useI18n();
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
  return keys.map((key) => ({label: categoryLabel(key), value: key, icon: categoryIcon(key)}));
});
</script>
