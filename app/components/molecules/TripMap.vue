<template>
  <LMap
    :zoom="7"
    :center="center"
    :use-global-leaflet="false"
    class="h-full"
    @ready="onReady"
  >
    <LTileLayer :url="OSM_TILE_URL" :attribution="OSM_ATTRIBUTION" layer-type="base" name="OpenStreetMap" />
    <template v-for="(day, dayIndex) in days" :key="dayIndex">
      <LPolyline
        v-if="day.places.length > 1"
        :lat-lngs="day.places.map((p) => [p.coordinates.lat, p.coordinates.lng])"
        :weight="3"
        dash-array="1 8"
        line-cap="round"
        :class-name="isOn(dayIndex) ? 'map-route' : 'map-route--muted'"
      />
      <LMarker
        v-for="(place, placeIndex) in day.places"
        :key="`${dayIndex}-${placeIndex}`"
        :lat-lng="[place.coordinates.lat, place.coordinates.lng]"
        :z-index-offset="isActive(dayIndex, placeIndex) ? 1000 : isOn(dayIndex) ? 500 : 0"
        @click="emit('select-place', dayIndex, placeIndex)"
      >
        <LIcon :icon-size="isActive(dayIndex, placeIndex) ? [36, 36] : [28, 28]" class-name="">
          <span
            class="map-pin"
            :class="{'map-pin--active': isActive(dayIndex, placeIndex), 'map-pin--muted': !isOn(dayIndex)}"
          >{{ placeIndex + 1 }}</span>
        </LIcon>
        <LTooltip>{{ place.name }}</LTooltip>
      </LMarker>
    </template>
  </LMap>
</template>

<script setup lang="ts">
// The map of the whole trip (drawer): numbered places and the route of each day.
// `highlightDay` keeps only that day in the primary color, the others grey;
// `active` is the place on screen, in the secondary color.
const props = defineProps<{
  days: Day[];
  highlightDay: number | null;
  active?: {dayIndex: number; placeIndex: number};
}>();
const emit = defineEmits<{'select-place': [dayIndex: number, placeIndex: number]}>();

const isOn = (dayIndex: number) => props.highlightDay === null || props.highlightDay === dayIndex;
const isActive = (dayIndex: number, placeIndex: number) =>
  props.active?.dayIndex === dayIndex && props.active?.placeIndex === placeIndex;

const points = computed(() => {
  const days = props.highlightDay === null ? props.days : [props.days[props.highlightDay]!];
  return days.flatMap((d) => d.places.map((p) => [p.coordinates.lat, p.coordinates.lng] as [number, number]));
});
const center = computed(() => points.value[0] ?? [42.5, 12.5]);

// The map is created inside an opening drawer: fit it once its size is final.
let map: any;
const fit = () => {
  if (!map || !points.value.length) return;
  map.invalidateSize();
  map.fitBounds(points.value, {padding: [32, 32], maxZoom: 12});
};
const onReady = (m: any) => {
  map = m;
  setTimeout(fit, 300);
};
watch(() => props.highlightDay, fit);
</script>
