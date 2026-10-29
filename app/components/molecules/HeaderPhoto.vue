<template>
  <div class="group/photo relative overflow-hidden bg-accented" :class="{'rounded-xl': !square}">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt ?? ''"
      :loading="eager ? 'eager' : 'lazy'"
      class="absolute inset-0 size-full object-cover object-[center_40%] transition-transform duration-300"
      :class="{'group-hover/photo:scale-[1.03]': zoomOnHover}"
      @error="failed = true"
    />
    <slot v-else name="fallback" />
    <template v-if="$slots.default">
      <div class="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-scrim to-transparent" />
      <div class="absolute text-white" :class="textClass">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// A header photo (cover, place, card): cropped by CSS, never a broken image.
// Its size comes from the parent's classes (an aspect ratio or a grid cell).
// The default slot is the white text over the photo, on the scrim; `fallback`
// replaces a missing photo. `square` drops the rounded corners (full-bleed photos).
withDefaults(defineProps<{
  src?: string;
  alt?: string;
  eager?: boolean;
  zoomOnHover?: boolean;
  square?: boolean;
  textClass?: string;
}>(), {textClass: 'inset-x-4 bottom-4'});

const failed = ref(false);
</script>
