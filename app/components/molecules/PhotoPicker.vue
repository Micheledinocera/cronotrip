<template>
  <div class="grid grid-cols-[minmax(0,1fr)] gap-2">
    <img v-if="model" :src="previewUrl" alt="" class="h-[186px] w-full rounded-md object-cover object-[center_40%]" />
    <button
      v-else
      type="button"
      class="typo-small grid h-[186px] w-full place-items-center content-center gap-2 rounded-md border border-dashed border-accented text-muted hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      @click="input?.click()"
    >
      <UIcon name="i-lucide-image-plus" class="size-6" />
      {{ t('form.photo.add') }}
    </button>
    <div v-if="model" class="flex gap-2">
      <UButton
        :label="t('form.photo.change')"
        icon="i-lucide-upload"
        color="neutral"
        variant="outline"
        @click="input?.click()"
      />
      <UButton :label="t('form.photo.remove')" color="neutral" variant="ghost" @click="model = undefined" />
    </div>
    <input ref="input" type="file" accept="image/*" class="hidden" @change="onFile" />
  </div>
</template>

<script setup lang="ts">
// One photo: a path in the bucket, a full URL, or a photo parked until the save (parkedPhotos.ts)
const model = defineModel<string | undefined>();

const { t } = useI18n();
const toast = useToast();
const { getImageUrl } = useSupabaseImages();
const parkedPhotos = inject(PARKED_PHOTOS)!;
const input = useTemplateRef('input');

const previewUrl = computed(() =>
  model.value && isParkedPhoto(model.value) ? parkedPhotos.preview(model.value) : getImageUrl(model.value)
);

const onFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  target.value = '';
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    toast.add({ title: t('form.photo.not_an_image'), color: 'error', icon: 'i-lucide-circle-x' });
    return;
  }
  if (file.size > MAX_PHOTO_SIZE) {
    toast.add({ title: t('form.photo.too_large', { max: MAX_PHOTO_SIZE / 1024 / 1024 }), color: 'error', icon: 'i-lucide-circle-x' });
    return;
  }
  model.value = parkedPhotos.park(file);
};
</script>
