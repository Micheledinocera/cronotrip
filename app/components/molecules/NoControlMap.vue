<template>
  <UModal :title="modalTitle" fullscreen >
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
        :radius="2"
        :color="'red'"
      />
    </LMap>
    <template #body>
      <div class="h-full">
        <LMap
          :zoom="8"
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
            :radius="2"
            :color="'red'"
          />
        </LMap>
      </div>
    </template>
    <template #footer="{ close }">
      <UButton @click="close" > OK </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps({
  placeCoordinates: {
    type: Object,
    required: true,
  },
  modalTitle:{
    type:String,
    default:''
  }
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
