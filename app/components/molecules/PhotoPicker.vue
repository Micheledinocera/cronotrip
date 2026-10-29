<template>
  <div class="flex items-center gap-4">
    <img v-if="model" :src="previewUrl" alt="" class="h-24 w-40 object-cover rounded-md" />
    <div
      v-else
      class="h-24 w-40 rounded-md border border-dashed border-accented flex items-center justify-center text-muted"
    >
      <UIcon name="i-lucide-image" class="size-8" />
    </div>
    <div class="flex flex-col items-start gap-2">
      <UButton
        :label="model ? t('form.photo.change') : t('form.photo.add')"
        icon="i-lucide-upload"
        color="neutral"
        variant="outline"
        size="sm"
        @click="input?.click()"
      />
      <UButton
        v-if="model"
        :label="t('form.photo.remove')"
        icon="i-lucide-trash-2"
        color="error"
        variant="ghost"
        size="sm"
        @click="model = undefined"
      />
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
    toast.add({ title: t('form.photo.not_an_image'), color: 'error' });
    return;
  }
  if (file.size > MAX_PHOTO_SIZE) {
    toast.add({ title: t('form.photo.too_large', { max: MAX_PHOTO_SIZE / 1024 / 1024 }), color: 'error' });
    return;
  }
  model.value = parkedPhotos.park(file);
};
</script>
