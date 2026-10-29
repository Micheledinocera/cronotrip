<template>
  <div class="grid grid-cols-[minmax(0,1fr)] gap-2">
    <div class="flex gap-2">
      <UInput
        v-model="query"
        :placeholder="t('form.location.search_placeholder')"
        icon="i-lucide-search"
        class="flex-1"
        @keydown.enter.prevent="search"
      />
      <UButton
        :label="t('form.location.search')"
        :loading="searching"
        color="neutral"
        variant="outline"
        @click="search"
      />
    </div>
    <p v-if="searchMessage" class="typo-small text-muted">{{ searchMessage }}</p>
    <ul v-if="results.length" class="divide-y divide-default rounded-md ring-1 ring-default">
      <li v-for="result in results" :key="result.place_id">
        <button
          type="button"
          class="typo-small w-full cursor-pointer px-3 py-2 text-left hover:bg-elevated"
          @click="choose(result)"
        >
          {{ result.display_name }}
        </button>
      </li>
    </ul>
    <div class="relative h-[220px] overflow-hidden rounded-md bg-map-land ring-1 ring-default">
      <ClientOnly>
        <LMap
          :zoom="initialZoom"
          :center="initialCenter"
          :use-global-leaflet="false"
          @ready="map = $event"
          @click="onMapClick"
        >
          <LTileLayer
            :url="OSM_TILE_URL"
            :attribution="OSM_ATTRIBUTION"
            layer-type="base"
            name="OpenStreetMap"
          />
          <LMarker v-if="model" :lat-lng="[model.lat, model.lng]">
            <LIcon :icon-size="[22, 22]" class-name="">
              <span class="map-pin size-[22px]!"><UIcon name="i-lucide-map-pin" class="size-3" /></span>
            </LIcon>
          </LMarker>
        </LMap>
      </ClientOnly>
      <div
        v-if="!model"
        class="typo-small pointer-events-none absolute inset-x-0 bottom-3 z-[500] mx-auto w-fit rounded-full bg-default/90 px-3 py-1 text-muted shadow-sm"
      >
        {{ t('form.location.empty') }}
      </div>
    </div>
    <p class="typo-small text-muted">
      {{ model ? `${model.lat}, ${model.lng} · ` : '' }}{{ t('form.location.hint') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { LeafletMouseEvent, Map } from 'leaflet';

// Place search on OpenStreetMap's Nominatim: free and without a key, but at most one request
// per second and no search-as-you-type (https://operations.osmfoundation.org/policies/nominatim/)
interface NominatimResult {
  place_id: number;
  name: string;
  display_name: string;
  lat: string;
  lon: string;
}

const DEFAULT_CENTER: [number, number] = [42.5, 12.5];

const props = defineProps<{
  // where the map starts when there is no position yet
  start?: Coordinates;
}>();
const model = defineModel<Coordinates | undefined>();
const emit = defineEmits<{
  // name of a place chosen from the search results
  picked: [name: string];
}>();

const { t, locale } = useI18n();
const map = shallowRef<Map>();
const query = ref('');
const searching = ref(false);
const searchMessage = ref('');
const results = ref<NominatimResult[]>([]);

// Only the starting view: afterwards the map moves on its own or on a search result,
// not on every click
const startPosition = model.value ?? props.start;
const initialCenter: [number, number] = startPosition ? [startPosition.lat, startPosition.lng] : DEFAULT_CENTER;
const initialZoom = startPosition ? 13 : 5;

const round = (value: number) => Math.round(value * 1e6) / 1e6;

const setPosition = (lat: number, lng: number) => {
  model.value = { lat: round(lat), lng: round(lng) };
};

const onMapClick = (event: LeafletMouseEvent) => {
  setPosition(event.latlng.lat, event.latlng.lng);
};

const search = async () => {
  if (!query.value.trim() || searching.value) return;
  searching.value = true;
  searchMessage.value = '';
  try {
    results.value = await $fetch<NominatimResult[]>('https://nominatim.openstreetmap.org/search', {
      query: { q: query.value, format: 'jsonv2', limit: 5, 'accept-language': locale.value },
    });
    if (!results.value.length) searchMessage.value = t('form.location.no_results');
  } catch {
    results.value = [];
    searchMessage.value = t('form.location.search_error');
  } finally {
    searching.value = false;
  }
};

const choose = (result: NominatimResult) => {
  setPosition(Number(result.lat), Number(result.lon));
  map.value?.setView([Number(result.lat), Number(result.lon)], 13);
  results.value = [];
  emit('picked', result.name || result.display_name);
};
</script>
