<template>
  <LMap
    :options="NO_CONTROL_MAP_OPTIONS"
    :zoom="10"
    :center="[placeCoordinates.lat, placeCoordinates.lng]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <LCircleMarker
      :lat-lng="[placeCoordinates.lat, placeCoordinates.lng]"
      :radius="6"
      :color="'red'"
    />
  </LMap>
</template>

<script setup lang="ts">
defineProps({
  placeCoordinates: {
    type: Object,
    required: true,
  },
});

const NO_CONTROL_MAP_OPTIONS={
    "zoomControl": false,
    "attributionControl": false,
    "dragging": false,
    "doubleClickZoom": false,
    "scrollWheelZoom": false,
    "boxZoom": false,
    "keyboard": false,
    "tap": false,
    "touchZoom": false
}
</script>
