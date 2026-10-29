<template>
  <ul class="flex flex-wrap gap-2">
    <li v-for="(photo, i) in shown" :key="photo + i">
      <button
        type="button"
        class="relative block size-16 overflow-hidden rounded-md bg-accented focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :aria-label="isMore(i) ? t('photo.more', {n: hidden}) : t('photo.open')"
        @click="emit('open', i)"
      >
        <img
          :src="getImageUrl(photo)"
          alt=""
          loading="lazy"
          class="size-full object-cover object-[center_40%]"
        />
        <span
          v-if="isMore(i)"
          class="absolute inset-0 grid place-items-center bg-scrim typo-label text-white"
        >
          +{{ hidden }}
        </span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
// 64px thumbnails of an activity or moment; beyond `max` the last one shows "+N".
// Clicking emits the index of the photo, for the gallery.
const props = withDefaults(defineProps<{photos: string[]; max?: number}>(), {max: 4});
const emit = defineEmits<{open: [index: number]}>();
const {t} = useI18n();
const {getImageUrl} = useSupabaseImages();

const shown = computed(() => props.photos.slice(0, props.max));
const hidden = computed(() => props.photos.length - props.max + 1);
const isMore = (i: number) => props.photos.length > props.max && i === props.max - 1;
</script>
