<template>
  <div class="space-y-4">
    <UFormField 
      :name="`day-${dayIndex}-subtitle`" 
      :label="`Sottotitolo Giorno ${dayIndex + 1}`" 
      required
    >
      <UInput
        size="xl"
        :placeholder="`Sottotitolo per il giorno ${dayIndex + 1}`"
        :model-value="day.subtitle"
        @update:model-value="updateSubtitle"
        variant="subtle"
        class="w-full"
      />
    </UFormField>
    
    <!-- <div v-for="(place, placeIndex) in day.places" :key="placeIndex">
      <ItineraryPlaceForm 
        :place="place" 
        :dayIndex="dayIndex"
        :placeIndex="placeIndex"
        @update:place="updatePlace($event, placeIndex)"
      />
    </div> -->
    
    <UButton @click="addPlace" icon="i-heroicons-plus">
      Aggiungi Luogo
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { ValidationError } from "app/types/validation";

const props = defineProps<{
  day: Day
  dayIndex: number
}>();

const emit = defineEmits<{
  'update:day': [day: Day]
}>();

const updateSubtitle = (newSubtitle: string) => {
  emit('update:day', { ...props.day, subtitle: newSubtitle });
};

const updatePlace = (place: Place, index: number) => {
  const newPlaces = [...props.day.places];
  newPlaces[index] = place;
  emit('update:day', { ...props.day, places: newPlaces });
};

const addPlace = () => {
  const newPlace: Place = {
    name: '',
    coordinates: { lat: 0, lng: 0 },
    events: []
  };
  emit('update:day', {
    ...props.day,
    places: [...props.day.places, newPlace]
  });
};

const validate = (): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!props.day.subtitle?.trim()) {
    errors.push({ 
      name: `day-${props.dayIndex}-subtitle`, 
      message: 'Required' 
    });
  }

  // Aggiungi qui la validazione dei Places quando li implementerai
  
  return errors;
};

defineExpose({ validate });
</script>
