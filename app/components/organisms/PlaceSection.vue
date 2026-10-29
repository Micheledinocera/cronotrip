<template>
  <section class="grid scroll-mt-4 gap-6">
    <div v-if="photo" class="relative">
      <HeaderPhoto :src="photo" :alt="place.name" class="aspect-4/3 sm:aspect-video" text-class="left-4 bottom-4 right-36 sm:left-6 sm:bottom-6 sm:right-56">
        <div class="flex items-center gap-3">
          <span class="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-on-primary typo-label">{{ number }}</span>
          <h3 class="typo-title-2 sm:text-[28px] sm:leading-[1.15]">{{ place.name }}</h3>
        </div>
      </HeaderPhoto>
      <PlaceMap
        :place="place"
        :number="number"
        class="absolute right-3 bottom-3 h-[68px] w-24 sm:right-4 sm:bottom-4 sm:h-[120px] sm:w-[180px]"
      />
    </div>
    <div v-else class="flex items-center gap-3">
      <span class="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-on-primary typo-label">{{ number }}</span>
      <h3 class="typo-title-2 text-highlighted flex-1">{{ place.name }}</h3>
      <PlaceMap :place="place" :number="number" class="h-[68px] w-24 sm:h-[90px] sm:w-[140px]" />
    </div>

    <div class="grid gap-6 sm:px-1">
      <ActivityItem
        v-for="(activity, i) in place.events"
        :key="`${activity.name}-${i}`"
        :activity="activity"
        @open-photo="(src) => emit('open-photo', src)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
// A place of the day: the header photo is the protagonist, with the number, the name
// and the small map set in its corner. Without a photo, no empty frame: the name as text.
const props = defineProps<{place: Place; number: number}>();
const emit = defineEmits<{'open-photo': [src: string]}>();
const {getImageUrl} = useSupabaseImages();

const photo = computed(() => (props.place.photos?.[0] ? getImageUrl(props.place.photos[0]) : undefined));
</script>
