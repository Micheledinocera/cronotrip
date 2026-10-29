<template>
  <div class="space-y-4">
    <UFormField :name="`${path}.subtitle`" :label="t('itinerary.fields.subtitle')" required>
      <UInput v-model="day.subtitle" size="xl" variant="subtle" class="w-full" />
    </UFormField>

    <UCard v-for="(place, placeIndex) in day.places" :key="keyOf(place)" variant="subtle">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="font-semibold">
            {{ place.name || t('itinerary.form.place_n', { n: placeIndex + 1 }) }}
          </h3>
          <ListItemControls
            :index="placeIndex"
            :length="day.places.length"
            @move="moveItem(day.places, placeIndex, $event)"
            @remove="day.places.splice(placeIndex, 1)"
          />
        </div>
      </template>
      <ItineraryPlaceForm v-model="day.places[placeIndex]!" :path="`${path}.places.${placeIndex}`" />
    </UCard>

    <UButton :label="t('itinerary.form.add_place')" icon="i-lucide-plus" @click="addPlace" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ path: string }>();
const day = defineModel<Day>({ required: true });

const { t } = useI18n();

const addPlace = () => {
  day.value.places.push(emptyPlace());
};
</script>
