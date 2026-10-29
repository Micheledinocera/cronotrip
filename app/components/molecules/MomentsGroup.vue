<template>
  <div class="rounded-lg bg-muted">
    <button
      type="button"
      class="flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="typo-overline text-toned shrink-0">{{ label }}</span>
      <span class="typo-caption text-muted shrink-0">· {{ moments.length }}</span>
      <span v-if="!open" class="typo-small text-muted truncate">{{ peek }}</span>
      <span class="flex-1" />
      <UIcon :name="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-4 shrink-0 text-muted" />
    </button>
    <ul v-if="open" class="grid gap-3 px-3 pb-3">
      <li v-for="(moment, i) in moments" :key="i" class="flex items-start gap-3">
        <button
          v-if="moment.photos?.length"
          type="button"
          class="size-12 shrink-0 overflow-hidden rounded-md bg-accented focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :aria-label="t('photo.open')"
          @click="emit('open-photo', moment.photos[0]!)"
        >
          <img :src="getImageUrl(moment.photos[0])" alt="" loading="lazy" class="size-full object-cover object-[center_40%]" />
        </button>
        <div class="min-w-0">
          <p class="typo-body-strong text-highlighted">
            {{ moment.name }}<span v-if="moment.price" class="typo-small text-muted font-normal"> · {{ formatPrice(moment.price) }}</span>
          </p>
          <p v-if="moment.desc" class="typo-small text-muted">{{ moment.desc }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// The moments of an activity, closed by default: one line with the group label,
// the count and the first names; a tap opens them.
const props = defineProps<{moments: Moment[]; category: string}>();
const emit = defineEmits<{'open-photo': [src: string]}>();
const {t, te} = useI18n();
const {getImageUrl} = useSupabaseImages();

const open = ref(false);
const label = computed(() => t(te(`moments.${props.category}`) ? `moments.${props.category}` : 'moments.any'));
const peek = computed(() => props.moments.map((m) => m.name).join(', '));
</script>
