<template>
  <div>
    <button
      type="button"
      class="group/map relative block size-full overflow-hidden rounded-lg bg-map-land ring-1 ring-default shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :aria-label="t('view.enlarge_map', {name: place.name})"
      @click="open = true"
    >
      <ClientOnly>
        <LMap
          class="pointer-events-none"
          :zoom="11"
          :center="[place.coordinates.lat, place.coordinates.lng]"
          :options="STATIC_MAP_OPTIONS"
          :use-global-leaflet="false"
        >
          <LTileLayer :url="OSM_TILE_URL" :attribution="OSM_ATTRIBUTION" layer-type="base" name="OpenStreetMap" />
          <LMarker :lat-lng="[place.coordinates.lat, place.coordinates.lng]">
            <LIcon :icon-size="[28, 28]" class-name="">
              <span class="map-pin">{{ number }}</span>
            </LIcon>
          </LMarker>
        </LMap>
      </ClientOnly>
      <span class="absolute top-1.5 right-1.5 z-[500] grid size-7 place-items-center rounded-md bg-default/90 text-highlighted shadow-sm">
        <UIcon name="i-lucide-maximize-2" class="size-4" />
      </span>
    </button>

    <UModal v-model:open="open" :title="place.name" fullscreen :ui="{body: 'p-0 sm:p-0'}">
      <template #body>
        <LMap
          :zoom="13"
          :center="[place.coordinates.lat, place.coordinates.lng]"
          :use-global-leaflet="false"
          class="h-full"
        >
          <LTileLayer :url="OSM_TILE_URL" :attribution="OSM_ATTRIBUTION" layer-type="base" name="OpenStreetMap" />
          <LMarker :lat-lng="[place.coordinates.lat, place.coordinates.lng]">
            <LIcon :icon-size="[28, 28]" class-name="">
              <span class="map-pin">{{ number }}</span>
            </LIcon>
          </LMarker>
          <LMarker
            v-for="(activity, i) in located"
            :key="i"
            :lat-lng="[activity.coordinates!.lat, activity.coordinates!.lng]"
          >
            <LIcon :icon-size="[22, 22]" class-name="">
              <span class="map-activity"><CategoryIcon :category="activity.category" class="size-3.5" /></span>
            </LIcon>
            <LTooltip>{{ activity.name }}</LTooltip>
          </LMarker>
        </LMap>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Small map of a place, set in its header photo; a tap opens it full screen,
// with the activities that have a position. The attribution stays on both (OSM policy).
const props = defineProps<{place: Place; number: number}>();
const {t} = useI18n();
const open = ref(false);

const located = computed(() => props.place.events.filter((a) => a.coordinates));
</script>
