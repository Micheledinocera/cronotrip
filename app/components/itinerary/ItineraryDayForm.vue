<template>
  <section class="grid grid-cols-[minmax(0,1fr)] gap-6" :aria-label="t('itinerary.form.day_n', {n: number})">
    <div class="flex items-center gap-3">
      <h2 class="typo-heading text-xl text-highlighted">{{ t('itinerary.form.day_n', {n: number}) }}</h2>
      <UButton
        v-if="removable"
        :label="t('itinerary.form.remove_day')"
        icon="i-lucide-trash-2"
        color="neutral"
        variant="ghost"
        class="ml-auto"
        @click="emit('remove')"
      />
    </div>
    <UFormField :name="`${path}.subtitle`" :label="t('itinerary.fields.subtitle')" required>
      <UInput v-model="day.subtitle" size="lg" :placeholder="t('itinerary.form.placeholders.subtitle')" class="w-full" />
    </UFormField>

    <div class="mt-2 flex items-center gap-2">
      <h3 class="typo-label text-highlighted">{{ t('itinerary.form.places') }}</h3>
      <UBadge v-if="day.places.length" :label="String(day.places.length)" color="neutral" variant="soft" />
    </div>
    <div class="grid grid-cols-[minmax(0,1fr)] gap-3">
      <p v-if="!day.places.length" class="typo-small text-muted">{{ t('itinerary.form.no_places') }}</p>
      <FormPanel
        v-for="(place, placeIndex) in day.places"
        :key="keyOf(place)"
        v-bind="reorder.item(placeIndex)"
        :title="place.name || t('itinerary.form.new_place')"
        :has-error="hasError(`${path}.places.${placeIndex}`)"
        :default-open="!place.name || placeIndex === 0"
        body-class="gap-6"
        @remove="day.places.splice(placeIndex, 1)"
      >
        <template #handle>
          <DragHandle v-bind="reorder.handle(placeIndex)" />
        </template>
        <template #summary>
          <span class="grid size-6 shrink-0 place-items-center rounded-full bg-elevated typo-caption text-toned">{{ placeIndex + 1 }}</span>
          <img
            v-if="place.photos?.[0]"
            :src="photoUrl(place.photos[0])"
            alt=""
            class="size-10 shrink-0 rounded-md object-cover"
          />
          <span class="typo-body-strong truncate text-[15px]" :class="place.name ? 'text-highlighted' : 'text-muted'">
            {{ place.name || t('itinerary.form.new_place') }}
          </span>
          <UBadge
            v-if="place.events.length"
            :label="t('view.activities', place.events.length)"
            color="neutral"
            variant="soft"
            class="shrink-0"
          />
        </template>
        <ItineraryPlaceForm v-model="day.places[placeIndex]!" :path="`${path}.places.${placeIndex}`" />
      </FormPanel>
      <UButton
        :label="t('itinerary.form.add_place')"
        icon="i-lucide-plus"
        variant="soft"
        size="lg"
        class="justify-self-start"
        @click="day.places.push(emptyPlace())"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{path: string; number: number; removable: boolean}>();
const day = defineModel<Day>({required: true});
const emit = defineEmits<{remove: []}>();

const {t} = useI18n();
const {getImageUrl} = useSupabaseImages();
const parkedPhotos = inject(PARKED_PHOTOS)!;
const hasError = inject(FORM_ERRORS, () => false);
const reorder = useReorder(() => day.value.places);

const photoUrl = (photo: string) => (isParkedPhoto(photo) ? parkedPhotos.preview(photo) : getImageUrl(photo));
</script>
