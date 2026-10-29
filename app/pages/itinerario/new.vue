<template>
  <ItineraryForm
    :initial="emptyItinerary"
    :title="t('itinerary.new_title')"
    :submit-label="t('itinerary.create')"
    cancel-to="/dashboard"
    :save="create"
  />
</template>

<script setup lang="ts">
const {t} = useI18n();
const {saveItinerary} = await useItinerary();

const emptyItinerary: Itinerary = {
  name: '',
  short_desc: '',
  desc: '',
  status: DEFAULT_STATUS,
  days: [{subtitle: '', places: []}],
};

const create = async (itinerary: Itinerary, parkedPhotos: Map<string, File>) => {
  const saved = await saveItinerary(itinerary, parkedPhotos);
  await navigateTo('/itinerario/' + saved.id, {replace: true});
};
</script>
