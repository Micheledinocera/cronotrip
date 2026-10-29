---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
  - raw/compiled/itinerary-flow/2026-10-29-task1.md
---

# Itinerary form

One form to create and edit an itinerary: `app/components/itinerary/ItineraryForm.vue`. The rules it follows: [Flussi dell'itinerario](../../viaggi/flussi.md).

## Pages

| Page | Route | Saves with |
|---|---|---|
| `app/pages/itinerario/new.vue` | `/itinerario/new` | `saveItinerary()` insert, then opens the [view](./itinerary-view.md) |
| `app/pages/itinerario/modifica/[id].vue` | `/itinerario/modifica/:id` | `saveItinerary()` update, then back to the view; non-owners are redirected to the view |

Both pass the form an `initial` itinerary, a submit label and a `save(itinerary, parkedPhotos)` callback, which saves and navigates away.

## Components

```
ItineraryForm            name, status, short description, description, days (DaySelector)
└── ItineraryDayForm     subtitle, places
    └── ItineraryPlaceForm     name, header photo (PhotoPicker), position (LocationPicker), activities
        └── ItineraryActivityForm   name, category, description, link, optional position
```

- Nested components get their item with `defineModel` and a `path` prop (`days.0.places.1`), used as the `name` of their `UFormField`s so that schema errors land on the right field.
- `molecules/ListItemControls.vue`: move before / move after / remove buttons, for days (horizontal), places and activities. `moveItem()` and `keyOf()` (stable `v-for` keys for items without an id) are in `app/utils/list.ts`.
- `organisms/DaySelector.vue` selects the day being edited and adds or removes days; only the selected day is rendered.
- `molecules/LocationPicker.vue`: Nominatim search (button or Enter only) and a Leaflet map; a click sets the point (`LCircleMarker`), rounded to 6 decimals. A search result also names the place if it has no name yet. Prop `start` centres the map of an activity on its place.
- `molecules/PhotoPicker.vue`: one photo with preview, upload / change / remove; image files up to 10 MB. In the place form it edits `photos[0]`, the header of the place; other photos are kept.
- Statuses and categories come from the Pinia store (`stores/global.ts`), with labels from i18n (`statuses.*`, `categories.*`); a category not in the table (old mocks) stays selectable.

## Validation

`buildItinerarySchema(t)` in `app/utils/itinerarySchema.ts`, a Zod schema passed to `UForm` (Nuxt UI validates Standard Schema, see https://ui.nuxt.com/components/form). Messages are functions, so they follow the locale.

- Objects are `looseObject`: fields the form does not edit (photos, prices, moments, day dates, `duration`) survive a save.
- Transforms: strings are trimmed, an empty optional description is dropped, an empty link is dropped and a link without label uses its URL.
- On error (`@error`) the form shows a toast, selects the first day with errors (when all errors are in days) and scrolls to the first `aria-invalid` field.

## State and saving

- `toFormState()` (`app/utils/itineraryForm.ts`) deep-copies the itinerary and gives every activity a `link` object to bind to; `emptyPlace()` and `emptyActivity()` create new items. A new place has no coordinates: the schema asks for them.
- **Parked photos** (`app/utils/parkedPhotos.ts`): a chosen file is kept in the browser and the document gets a placeholder `parked:<uuid>`; the form provides the `ParkedPhotos` store (`PARKED_PHOTOS` injection key) to `PhotoPicker`, and passes its files to `save`. `saveItinerary()` uploads them and replaces the placeholders ([Data access](./data-access.md)).
- **Unsaved changes**: a JSON snapshot of the state, taken at load and after a save. `onBeforeRouteLeave` asks with `window.confirm`, `beforeunload` covers closing or reloading the tab; nothing is asked during a save.

## Open questions

- A click on Save before hydration submits the native form (GET with the fields in the query): only seen in tests right after a page load.
