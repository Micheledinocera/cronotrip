<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ t('itinerary.edit_title') }}</h1>
    <ItineraryForm v-if="isOwner" :initial="itinerary" :submit-label="t('itinerary.save')" :save="update" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const user = useSupabaseUser();
const { getItineraryById, saveItinerary } = await useItinerary();

const id = Number(route.params.id);
const itinerary = await getItineraryById(id);

// Only the owner edits (the database policies refuse the others anyway)
const isOwner = itinerary.owner_id === user.value?.id;
if (!isOwner) await navigateTo('/itinerario/' + id, { replace: true });

const update = async (data: Itinerary, parkedPhotos: Map<string, File>) => {
  await saveItinerary({ ...data, id }, parkedPhotos);
  await navigateTo('/itinerario/' + id, { replace: true });
};
</script>
