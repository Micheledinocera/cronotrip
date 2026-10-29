---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
  - raw/compiled/itinerary-flow/2026-10-29-task1.md
  - raw/compiled/ui/2026-10-29-schermate.md
---

# Data access

The app reads and writes Supabase directly from the browser with `useSupabaseClient()` (`@nuxtjs/supabase`) and the project's publishable key (`SUPABASE_KEY`). There is no server code: access is decided by the RLS policies in [Database](../supabase/database.md).

| Composable | Function | Query |
|---|---|---|
| `app/composables/useCategories.ts` | `useCategories()` | all rows of `categories` |
| `app/composables/useStatuses.ts` | `useStatuses()` | all rows of `itinerary_statuses`, by `position` |
| `app/composables/useItineraries.ts` | `getItineraries()` | all rows of `itineraries`, newest first |
| | `getItineraryById(id)` | one row by `id` |
| | `saveItinerary(itinerary, parkedPhotos?)` | inserts a row (no `id`) or updates it; uploads the parked photos |
| | `copyItinerary(itinerary, name)` | inserts a skeleton copy |
| | `deleteItinerary(id)` | deletes the photos folder, then the row |

- Every query on `itineraries` selects `*, owner:profiles(display_name)` (`ITINERARY_SELECT`): the owner's name comes with the row.
- Rows are turned into `Itinerary` objects by `toItinerary()`: `id`, `name`, `status`, `owner_id` and `copied_from` come from the columns, `owner_name` from the profile, the rest from `document`. On save `toRow()` takes them out of the document (`owner_id` is never written: it defaults to the signed-in user).
- **Skeleton copy**: `toSkeleton()` keeps a whitelist of fields (descriptions, day subtitles, places with name and coordinates, activities with name, category, description, link, coordinates), so photos, prices, moments, day dates and unknown fields are left out. The copy gets `status` `planning` (`DEFAULT_STATUS`) and `copied_from` = the original.
- **Photos** uploaded from the app go to the bucket `Photos` at `<owner_id>/<itinerary_id>/<uuid>.<ext>` ([Foto](../../viaggi/foto.md)). `saveItinerary()`:
  1. keeps only the parked photos still referenced by the document (`parked:<uuid>`, see [Itinerary form](./itinerary-form.md));
  2. a new itinerary is inserted first without them, because its id names the folder;
  3. uploads them, replaces the placeholders with the paths and updates the row;
  4. removes from the folder the files the document no longer references (best effort, errors only logged);
  5. if anything fails after inserting a new itinerary, deletes it, so a retry does not create a duplicate.
- The client is taken at the start of the composable, before any `await`, so it stays inside the Nuxt context.
- Supabase errors are thrown; callers do not handle them yet.
- The tables have no generated types: rows are cast to the interfaces in `useItineraries.ts` and `useCategories.ts`.
- **Categories** and **statuses** are loaded into the Pinia store by `app/plugins/init-store.ts` only with a signed-in user: at startup if there is one, otherwise right after the login (a watcher on `useSupabaseUser()`).
- Photos are read without queries: `useSupabaseImages().getImageUrl()` returns a full URL (`http://`, `https://`) as is, and turns anything else into the public URL of a path in the `Photos` bucket.

## Open questions

- An error while loading a page (e.g. the table missing, as when `bun run dev:prod` runs before the release) is not shown: navigation stops silently.
