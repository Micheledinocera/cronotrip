<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ t('itinerary.new_title') }}</h1>
    <ItineraryForm :initial="emptyItinerary" :submit-label="t('itinerary.create')" :save="create" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { saveItinerary } = await useItinerary();

const emptyItinerary: Itinerary = {
  name: '',
  short_desc: '',
  desc: '',
  status: DEFAULT_STATUS,
  days: [{ subtitle: t('itinerary.form.day_n', { n: 1 }), places: [] }],
};

const create = async (itinerary: Itinerary, parkedPhotos: Map<string, File>) => {
  const saved = await saveItinerary(itinerary, parkedPhotos);
  await navigateTo('/itinerario/' + saved.id, { replace: true });
};
</script>
