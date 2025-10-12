<template>
  <UModal
    :title="modalTitle"
    fullscreen
    @after:enter="applyBounds"
    @after:leave="applyBounds"
  >
    <LMap
      :options="NO_CONTROL_MAP_OPTIONS"
      :center="[43.7696, 11.2558]"
      :zoom="6"
      :use-global-leaflet="false"
      @ready="applyBounds"
      ref="mapRef"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LCircleMarker
        v-for="placeCoordinates in placesCoordinates"
        :key="placeCoordinates.lat + '_' + placeCoordinates.lng"
        :lat-lng="[placeCoordinates.lat, placeCoordinates.lng]"
        :radius="2"
        :color="'red'"
      />
    </LMap>
    <template #body>
      <div class="h-full">
        <LMap
          :use-global-leaflet="false"
          :bounds="bounds"
          @ready="applyBounds"
          ref="zoomedMapRef"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          />
          <LCircleMarker
            v-for="placeCoordinates in placesCoordinates"
            :key="placeCoordinates.lat + '_' + placeCoordinates.lng"
            :lat-lng="[placeCoordinates.lat, placeCoordinates.lng]"
            :radius="2"
            :color="'red'"
          />
        </LMap>
      </div>
    </template>
    <template #footer="{ close }">
      <UButton @click="close"> OK </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  placesCoordinates: {
    type: Array as PropType<{ lat: number; lng: number }[]>,
  },
  modalTitle: {
    type: String,
    default: "",
  },
});

const NO_CONTROL_MAP_OPTIONS = {
  zoomControl: false,
  attributionControl: false,
  dragging: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  boxZoom: false,
  keyboard: false,
  tap: false,
  touchZoom: false,
  preferCanvas: true,
};

const mapRef = ref(null);
const zoomedMapRef = ref(null);
const bounds = props.placesCoordinates?.map((placeCoordinates) => [
  placeCoordinates.lat,
  placeCoordinates.lng,
]);

const applyBounds = () => {
  nextTick(() => {
    if (mapRef.value?.leafletObject) mapRef.value.leafletObject.fitBounds(bounds);
    if (zoomedMapRef.value?.leafletObject) zoomedMapRef.value.leafletObject.fitBounds(bounds);
  });
};
</script>
