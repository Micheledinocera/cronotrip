---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
---

# Itinerary view

The read-only page of an itinerary: `app/pages/itinerario/[id].vue`, public (`auth: false`). It is the most complete part of the app.

## Structure

- **Day selector** (`organisms/DaySelector.vue`): carousel of the days; with `withControls` it can also add and remove days (used by the [itinerary form](./itinerary-form.md)).
- **Places of the selected day**: one accordion per place, all open by default, with photos and activities.
- **Stepper** (`molecules/StepperWidget.vue`): the places of the day as steps, plus a slide-over with the day map (`molecules/NoControlMapDay.vue`). Clicking a step scrolls to the place.
- **Activity card** (`Day.vue`): icon by category (`atoms/TypeIcon.vue`), description, link, photos (`molecules/PhotosCarousel.vue`, `ZoomableCarousel.vue`, `ZoomableImage.vue`) and, if the activity has moments, a map of the moments (`molecules/NoControlMapTrip.vue`) in a modal.
- **Maps**: Leaflet maps without controls (`molecules/NoControlMap*.vue`), not interactive in the page, zoomable in a modal.

## Scroll sync

`app/composables/useDayScroll.ts` keeps a module-level registry of the place elements (`place_<index>`) and an `IntersectionObserver` on the scroll container: the place most visible becomes `activeRef`, which drives the active step. `scrollToDayElement` scrolls to a registered element.

## Open questions

- `Day.vue` maps every category to `Events/AnyMoments.vue`: the per-category components (`FoodMoments`, `TrekkingMoments`, `MuseumMoments`, `ConcertMoments`) exist but are not used.
- The page loads the itinerary through `/api/itineraries/single`, which does not exist in production: see [API routes](../server/api-routes.md).
