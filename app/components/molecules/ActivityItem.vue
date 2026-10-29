<template>
  <article class="flex gap-3">
    <CategoryIcon :category="activity.category" chip :title="categoryLabel" />
    <div class="grid min-w-0 flex-1 gap-2">
      <div class="flex flex-wrap items-baseline gap-x-2">
        <h4 class="typo-heading text-highlighted">{{ activity.name }}</h4>
        <span class="typo-caption text-muted">
          {{ categoryLabel }}<template v-if="activity.price"> · {{ formatPrice(activity.price) }}</template>
        </span>
      </div>
      <p v-if="activity.desc" class="typo-body text-default">{{ activity.desc }}</p>
      <UButton
        v-if="activity.link?.url"
        :to="activity.link.url"
        target="_blank"
        :label="activity.link.label || activity.link.url"
        trailing-icon="i-lucide-chevron-right"
        variant="link"
        class="justify-self-start p-0"
      />
      <PhotoThumbs
        v-if="activity.photos?.length"
        :photos="activity.photos"
        @open="(i) => emit('open-photo', activity.photos![i]!)"
      />
      <MomentsGroup
        v-if="activity.moments?.length"
        :moments="activity.moments"
        :category="activity.category"
        @open-photo="(src) => emit('open-photo', src)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
// An activity in the view: category icon, name, description, link, thumbnails, moments.
const props = defineProps<{activity: Activity}>();
const emit = defineEmits<{'open-photo': [src: string]}>();
const {t, te} = useI18n();

const categoryLabel = computed(() =>
  t(te(`categories.${props.activity.category}`) ? `categories.${props.activity.category}` : 'categories.any'),
);
</script>
