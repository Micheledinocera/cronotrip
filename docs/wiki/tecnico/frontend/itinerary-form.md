---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
  - raw/compiled/itinerary-flow/2026-10-29-task1.md
  - raw/compiled/ui/2026-10-29-schermate.md
---

# Itinerary form

One form to create and edit an itinerary: `app/components/itinerary/ItineraryForm.vue`. The rules it follows: [Flussi dell'itinerario](../../viaggi/flussi.md); the design ("control panel"): [Schermate](../../design/schermate.md).

## Pages

| Page | Route | Saves with |
|---|---|---|
| `app/pages/itinerario/new.vue` | `/itinerario/new` | `saveItinerary()` insert, then opens the [view](./itinerary-view.md) |
| `app/pages/itinerario/modifica/[id].vue` | `/itinerario/modifica/:id` | `saveItinerary()` update, then back to the view; non-owners are redirected to the view |

Both pass the form an `initial` itinerary, a title, a submit label, `cancelTo` (where "Annulla" goes: the dashboard or the view) and a `save(itinerary, parkedPhotos)` callback, which saves and navigates away. A new itinerary starts with one day without a subtitle.

## Layout

- A sticky bar on top with the title, the itinerary name, "Annulla" and the save button; on mobile they move to a fixed bar at the bottom.
- From `lg` two columns: on the left the general data and the list of days (selected day highlighted, error count per day, "Aggiungi un giorno"); on the right the selected day. Below `lg` the days become chips with a "+".
- Places and activities are `molecules/FormPanel.vue`: collapsible, with a drag handle, a summary line (number, header thumbnail, name, activity count; for activities category icon, name, category) and a remove button. The body is mounted only while open, because a Leaflet map created hidden gets no size. A panel opens by itself when a field inside has an error. New items start open; places also open the first one of the day.

## Components

```
ItineraryForm            name, status, short description, description, days list
└── ItineraryDayForm     subtitle, places, remove the day
    └── ItineraryPlaceForm     name, header photo (PhotoPicker), position (LocationPicker), activities
        └── ItineraryActivityForm   name, category, description, link, optional position
```

- Nested components get their item with `defineModel` and a `path` prop (`days.0.places.1`), used as the `name` of their `UFormField`s so that schema errors land on the right field.
- **Reordering** (days, places, activities): `app/composables/useReorder.ts`. `item(i)` goes on the element that moves, `handle(i)` on its `atoms/DragHandle.vue`: HTML5 drag and drop starts only from the handle (pressing it makes the item `draggable`), and the up/down arrows on the focused handle move the item too. Nested lists react only to their own drags. When days move, the selected day follows. `keyOf()` (stable `v-for` keys for items without an id) is in `app/utils/list.ts`.
- Only the selected day is rendered.
- `molecules/LocationPicker.vue`: Nominatim search (button or Enter only) and a Leaflet map; a click sets the point (a `map-pin` marker), rounded to 6 decimals. A search result also names the place if it has no name yet. Prop `start` centres the map of an activity on its place.
- `molecules/PhotoPicker.vue`: one photo with a large preview, upload / change / remove; image files up to 10 MB. In the place form it edits `photos[0]`, the header of the place; other photos are kept.
- Statuses and categories come from the Pinia store (`stores/global.ts`), with labels from i18n (`statuses.*`, `categories.*`) and their icons (`statusLook()`, `categoryIcon()`, see [Design system](./design-system.md)); a category not in the table (old mocks) stays selectable.

## Validation

`buildItinerarySchema(t)` in `app/utils/itinerarySchema.ts`, a Zod schema passed to `UForm` (Nuxt UI validates Standard Schema, see https://ui.nuxt.com/components/form). Messages are functions, so they follow the locale. Required fields have their own message (`form.errors.<field>`, e.g. "Serve un sottotitolo per il giorno"); the others use `form.errors.required`.

- Objects are `looseObject`: fields the form does not edit (photos, prices, moments, day dates, `duration`) survive a save.
- Transforms: strings are trimmed, an empty optional description is dropped, an empty link is dropped and a link without label uses its URL.
- On error (`@error`) the form selects the first day with errors (when all errors are in days), shows a toast that stays until closed and says where to look (the day, or the general data), and scrolls to the first `aria-invalid` field.
- The form provides `FORM_ERRORS` (`app/utils/itineraryForm.ts`): whether a field under a path has an error, read from `UForm`'s errors. The day list and the closed panels use it.

## State and saving

- `toFormState()` (`app/utils/itineraryForm.ts`) deep-copies the itinerary and gives every activity a `link` object to bind to; `emptyPlace()` and `emptyActivity()` create new items. A new place has no coordinates: the schema asks for them.
- **Parked photos** (`app/utils/parkedPhotos.ts`): a chosen file is kept in the browser and the document gets a placeholder `parked:<uuid>`; the form provides the `ParkedPhotos` store (`PARKED_PHOTOS` injection key) to `PhotoPicker`, and passes its files to `save`. `saveItinerary()` uploads them and replaces the placeholders ([Data access](./data-access.md)).
- **Unsaved changes**: a JSON snapshot of the state, taken at load and after a save. `onBeforeRouteLeave` stops the navigation and opens a `ConfirmModal` ("Uscire senza salvare?", Resta / Esci); "Esci" repeats the navigation. `beforeunload` covers closing or reloading the tab with the browser's prompt; nothing is asked during a save.

## Open questions

- A click on Save before hydration submits the native form (GET with the fields in the query): only seen in tests right after a page load.
