<template>
  <div class="group/photo relative overflow-hidden rounded-xl bg-accented">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt ?? ''"
      :loading="eager ? 'eager' : 'lazy'"
      class="size-full object-cover object-[center_40%] transition-transform duration-300"
      :class="{'group-hover/photo:scale-[1.03]': zoomOnHover}"
      @error="failed = true"
    />
    <slot v-else name="fallback" />
    <template v-if="$slots.default">
      <div class="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-scrim to-transparent" />
      <div class="absolute inset-x-4 bottom-4 text-white">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// A header photo (cover, place, card): cropped by CSS, never a broken image.
// The ratio comes from the parent's classes. The default slot is the white text
// over the photo, on the scrim; `fallback` replaces a missing photo.
defineProps<{
  src?: string;
  alt?: string;
  eager?: boolean;
  zoomOnHover?: boolean;
}>();

const failed = ref(false);
</script>
