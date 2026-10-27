---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
---

# Data access

The app reads and writes Supabase directly from the browser with `useSupabaseClient()` (`@nuxtjs/supabase`) and the project's publishable key (`SUPABASE_KEY`). There is no server code: access is decided by the RLS policies in [Database](../supabase/database.md).

| Composable | Function | Query |
|---|---|---|
| `app/composables/useCategories.ts` | `useCategories()` | all rows of `categories` |
| `app/composables/useItineraries.ts` | `getItineraries()` | all rows of `itineraries`, newest first |
| | `getItineraryById(id)` | one row by `id` |
| | `saveItinerary(itinerary)` | inserts a row; `owner_id` defaults to the signed-in user |

- Rows are turned into `Itinerary` objects by `toItinerary()`: `id` and `name` come from the columns, the rest from `document`. On save, `id` and `name` are taken out of the document.
- The client is taken at the start of the composable, before any `await`, so it stays inside the Nuxt context.
- Supabase errors are thrown; callers do not handle them yet.
- The tables have no generated types: rows are cast to the interfaces in `useItineraries.ts` and `useCategories.ts`.
- **Categories** are loaded into the Pinia store by `app/plugins/init-store.ts` only with a signed-in user: at startup if there is one, otherwise right after the login (a watcher on `useSupabaseUser()`).
- Photos are not queried: `useSupabaseImages().getImageUrl()` returns a full URL (`http://`, `https://`) as is, and turns anything else into the public URL of a path in the `Photos` bucket.

## Open questions

- An error while loading a page (e.g. the table missing, as when `bun run dev:prod` runs before the release) is not shown: navigation stops silently.
