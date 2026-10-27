---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
---

# Itinerary form

The creation page of an itinerary: `app/pages/itinerario/new.vue`. Work in progress: places cannot be added yet.

## Structure

- `UForm` with name, short description (required, max 50 characters) and description (required).
- **Days**: `DaySelector` with controls to add and remove days; the selected day is edited by `itinerary/ItineraryDayForm.vue` (subtitle, list of places, "add place").
- **Validation**: a custom `validate` function on the page collects `ValidationError`s (`app/types/validation.ts`) from the page fields and from the day form, which exposes its own `validate()`.
- **Submit**: saves the itinerary with `saveItinerary()` ([Data access](./data-access.md)), owned by the signed-in user, then opens its [view](./itinerary-view.md).

## Open questions

- `ItineraryDayForm.vue` renders `ItineraryPlaceForm`, which does not exist in the repo: the place form is missing.
