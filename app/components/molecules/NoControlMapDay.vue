<template>
  <UModal
    :title="day.subtitle"
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
        v-for="(place, placeIndex) in day.places"
        :key="place.coordinates!.lat + '_' + place.coordinates!.lng"
        :lat-lng="[place.coordinates!.lat, place.coordinates!.lng]"
      >
        <LIcon
          :class-name="`rounded-4xl !h-6 !w-6 !-mt-2 !-ml-3.5 !flex ${
            placeIndex <= activePlaceIndex ? 'bg-primary' : 'bg-red-600'
          }`"
        >
          <div
            class="font-bold w-full h-auto m-auto text-center"
            :class="[placeIndex <= activePlaceIndex ? '!text-default' : '!text-white']"
          >
            {{ placeIndex + 1 }}
          </div>
        </LIcon>
        <LPopup>
          <div
            class="cursor-pointer"
            @click="emit('clicked-place', placeIndex)"
          >
            <span class="!text-black"> {{ place.name }} </span>
            <NuxtImg
              v-if="place.photos && place.photos?.length > 0"
              :src="getImageUrl(place.photos[0])"
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
            v-for="(place, placeIndex) in day.places"
            :key="place.coordinates!.lat + '_' + place.coordinates!.lng"
            :lat-lng="[place.coordinates!.lat, place.coordinates!.lng]"
          >
            <LIcon
              :class-name="`rounded-4xl !h-6 !w-6 !-mt-2 !-ml-3.5 !flex ${
                placeIndex <= activePlaceIndex ? 'bg-red-600' : 'bg-primary'
              }`"
            >
              <div
                class="font-bold w-full h-auto m-auto text-center"
                :class="[
                  placeIndex <= activePlaceIndex ? '!text-default' : '!text-white',
                ]"
              >
                {{ placeIndex + 1 }}
              </div>
            </LIcon>
            <LPopup>
              <div
                class="cursor-pointer "
                @click="
                  () => {
                    close();
                    emit('clicked-place', placeIndex);
                  }
                "
              >
                <span class="!text-black"> {{ place.name }} </span>
                <NuxtImg
                  v-if="place.photos && place.photos?.length > 0"
                  :src="getImageUrl(place.photos[0])"
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
const emit = defineEmits(["clicked-place"]);
const {getImageUrl}=useSupabaseImages();

const props = defineProps({
  day: {
    type: Object as PropType<Day>,
    required: true,
  },
  activePlaceIndex: {
    type: Number,
    default: 0,
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
const bounds = props.day.places?.map((moment) => [
  moment.coordinates!.lat,
  moment.coordinates!.lng,
]);

const applyBounds = () => {
  nextTick(() => {
    if (mapRef.value?.leafletObject)
      mapRef.value.leafletObject.fitBounds(bounds, { padding: [50, 50] });
    if (zoomedMapRef.value?.leafletObject)
      zoomedMapRef.value.leafletObject.fitBounds(bounds);
  });
};
</script>
