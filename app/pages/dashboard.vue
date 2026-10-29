<template>
  <main class="mx-auto grid max-w-[1440px] gap-8 px-4 pt-8 pb-16 lg:px-8 lg:pt-10">
    <div class="flex flex-wrap items-end gap-4">
      <h1 class="typo-title-1 lg:text-4xl lg:leading-[42px] text-highlighted mr-auto">{{ t('dashboard.title') }}</h1>
      <div class="flex flex-wrap items-center gap-3 max-sm:w-full">
        <UTabs
          v-model="owner"
          :items="ownerTabs"
          :content="false"
          :aria-label="t('dashboard.owner_filter')"
          class="max-sm:w-full"
        />
        <UInput
          v-model="search"
          icon="i-lucide-search"
          :placeholder="t('dashboard.search')"
          :aria-label="t('dashboard.search')"
          class="w-full sm:w-[300px]"
        />
      </div>
    </div>

    <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 wide:grid-cols-4">
      <ItineraryCardSkeleton v-for="n in 4" :key="n" />
    </div>

    <div
      v-else-if="shown.length"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 wide:grid-cols-4"
    >
      <ItineraryCard v-for="itinerary in shown" :key="itinerary.id" :itinerary="itinerary" />
    </div>

    <div v-else-if="query" class="grid justify-items-center gap-3 px-2 py-20 text-center">
      <span class="grid size-16 place-items-center rounded-full bg-elevated text-toned">
        <UIcon name="i-lucide-search" class="size-6" />
      </span>
      <h2 class="typo-heading text-highlighted">{{ t('dashboard.no_results_title', {q: query}) }}</h2>
      <p class="typo-body text-muted">{{ t('dashboard.no_results_description') }}</p>
      <UButton :label="t('dashboard.clear_search')" color="neutral" variant="outline" @click="search = ''" />
    </div>

    <div v-else-if="owner === 'mine'" class="grid justify-items-center gap-4 py-24 text-center">
      <span class="grid size-24 place-items-center rounded-full bg-[color-mix(in_oklab,var(--ui-primary)_9%,var(--ui-bg))]">
        <LogoMark :size="56" />
      </span>
      <h2 class="typo-title-2 text-highlighted">{{ t('dashboard.empty_title') }}</h2>
      <p class="typo-body text-muted max-w-[320px]">{{ t('dashboard.empty_description') }}</p>
      <UButton to="/itinerario/new" :label="t('dashboard.empty_action')" icon="i-lucide-plus" size="xl" />
    </div>

    <p v-else class="typo-body text-muted py-24 text-center">{{ t('dashboard.others_empty') }}</p>
  </main>
</template>

<script setup lang="ts">
// "I tuoi viaggi": mine or the others', searched by name and short description.
const {t} = useI18n();
const toast = useToast();
const user = useSupabaseUser();
const {getItineraries} = await useItinerary();

const {data: itineraries, status, error} = await useAsyncData('itineraries', getItineraries, {server: false});
// "idle" too: the prerendered page shows the skeletons, like the client while it loads
const loading = computed(() => status.value === 'idle' || status.value === 'pending');
watch(error, (e) => {
  if (e) toast.add({title: t('dashboard.load_failed'), color: 'error', icon: 'i-lucide-circle-x', duration: 0});
});

const owner = ref<'mine' | 'others'>('mine');
const ownerTabs = computed(() => [
  {label: t('dashboard.mine'), value: 'mine'},
  {label: t('dashboard.others'), value: 'others'},
]);

const search = ref('');
const query = computed(() => search.value.trim());

const shown = computed(() => {
  const q = query.value.toLowerCase();
  return (itineraries.value ?? [])
    .filter((i) => (i.owner_id === user.value?.id) === (owner.value === 'mine'))
    .filter((i) => !q || i.name.toLowerCase().includes(q) || i.short_desc?.toLowerCase().includes(q));
});
</script>
