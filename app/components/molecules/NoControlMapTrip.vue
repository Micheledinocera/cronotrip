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
      <LMarker
        v-for="(moment, momentIndex) in moments"
        :key="moment.coordinates!.lat + '_' + moment.coordinates!.lng"
        :lat-lng="[moment.coordinates!.lat, moment.coordinates!.lng]"
      >
        <LIcon class-name="bg-red-600 rounded-4xl !h-6 !w-6 !-mt-2 !-ml-3.5 !flex h-2">
          <div class="!text-white w-full h-auto m-auto text-center">
            {{ momentIndex + 1 }}
          </div></LIcon
        >
        <LPopup>
          <div
            class="cursor-pointer"
            @click="
              scrollToDayElement(
                `moment_${props.indexes.eventIndex}_${props.indexes.placeIndex}_${momentIndex}`
              )
            "
          >
            <span> {{ moment.name }} </span>
            <NuxtImg
              v-if="moment.photos && moment.photos?.length > 0"
              :src="moment.photos[0]"
            />
          </div>
        </LPopup>
      </LMarker>
    </LMap>
    <template #body="{ close }">
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
          <LMarker
            v-for="(moment, momentIndex) in moments"
            :key="moment.coordinates!.lat + '_' + moment.coordinates!.lng"
            :lat-lng="[moment.coordinates!.lat, moment.coordinates!.lng]"
          >
            <LIcon
              class-name="bg-red-600 rounded-4xl !h-6 !w-6 !-mt-2 !-ml-3.5 !flex h-2"
            >
              <div class="!text-white w-full h-auto m-auto text-center">
                {{ momentIndex + 1 }}
              </div></LIcon
            >
            <LPopup>
              <div
                class="cursor-pointer"
                @click="
                  () => {
                    close();
                    scrollToDayElement(
                      `moment_${props.indexes.placeIndex}_${props.indexes.eventIndex}_${momentIndex}`
                    );
                  }
                "
              >
                <span> {{ moment.name }} </span>
                <NuxtImg
                  v-if="moment.photos && moment.photos?.length > 0"
                  :src="moment.photos[0]"
                />
              </div>
            </LPopup>
          </LMarker>
        </LMap>
      </div>
    </template>
    <template #footer="{ close }">
      <UButton @click="close"> OK </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { scrollToDayElement } = useDayScroll();

const props = defineProps({
  moments: {
    type: Array as PropType<Moment[]>,
    required: true,
  },
  modalTitle: {
    type: String,
    default: "",
  },
  indexes: {
    type: Object as PropType<{ eventIndex: number; placeIndex: number }>,
    required: true,
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

const mapRef = ref<any>(null);
const zoomedMapRef = ref<any>(null);
const bounds = props.moments?.map((moment) => [
  moment.coordinates!.lat,
  moment.coordinates!.lng,
]);

const applyBounds = () => {
  nextTick(() => {
    if (mapRef.value?.leafletObject)
      mapRef.value.leafletObject.fitBounds(bounds, { padding: [20, 20] });
    if (zoomedMapRef.value?.leafletObject)
      zoomedMapRef.value.leafletObject.fitBounds(bounds);
  });
};

</script>
