---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
---

# Itinerary view

The read-only page of an itinerary: `app/pages/itinerario/[id].vue`, for signed-in users only (see [Condivisione](../../viaggi/condivisione.md)). It is the most complete part of the app.

## Structure

- **Header**: cover photo, name, status badge and the actions ([Flussi dell'itinerario](../../viaggi/flussi.md)): **Edit** (link to `/itinerario/modifica/:id`) and **Delete** (confirmation in a `UModal`, then back to the dashboard) for the owner only (`owner_id` equal to the signed-in user); **Copy** for everyone (`copyItinerary()`, name with the translated suffix `itinerary.copy_suffix`, then opens the copy). Errors are shown as toasts.
- **Day selector** (`organisms/DaySelector.vue`): carousel of the days; with `withControls` it can also add and remove days (used by the [itinerary form](./itinerary-form.md)); without it, read-only.
- **Places of the selected day**: one accordion per place, all open by default, with photos and activities.
- **Stepper** (`molecules/StepperWidget.vue`): the places of the day as steps, plus a slide-over with the day map (`molecules/NoControlMapDay.vue`). Clicking a step scrolls to the place.
- **Activity card** (`Day.vue`): icon by category (`atoms/TypeIcon.vue`), description, link, photos (`molecules/PhotosCarousel.vue`, `ZoomableCarousel.vue`, `ZoomableImage.vue`) and, if the activity has moments, a section labelled by category (`moments.<category>` in i18n) and a map of the moments (`molecules/NoControlMapTrip.vue`) in a modal.
- **Maps**: Leaflet maps without controls (`molecules/NoControlMap*.vue`), not interactive in the page, zoomable in a modal.

## Scroll sync

`app/composables/useDayScroll.ts` keeps a module-level registry of the place elements (`place_<index>`) and an `IntersectionObserver` on the scroll container: the place most visible becomes `activeRef`, which drives the active step. `scrollToDayElement` scrolls to a registered element.

## Open questions

- `Day.vue` maps every category to `Events/AnyMoments.vue`: the per-category components (`FoodMoments`, `TrekkingMoments`, `MuseumMoments`, `ConcertMoments`) exist but are not used.
- `i18n/locales/it.json` has `moments.any` = "Moments", in English.
