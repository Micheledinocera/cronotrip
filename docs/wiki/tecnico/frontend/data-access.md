---
tipo: info
aggiornato: 2026-10-27
fonti: []
---

# Data access

The app reads and writes Supabase directly from the browser with `useSupabaseClient()` (`@nuxtjs/supabase`) and the anon key. There is no server code: access is decided by the RLS policies in [Database](../supabase/database.md).

| Composable | Function | Query |
|---|---|---|
| `app/composables/useCategories.ts` | `useCategories()` | all rows of `categories` |
| `app/composables/useItineraries.ts` | `getItineraries()` | all rows of `itineraries_json` |
| | `getItineraryById(id)` | one row by `itinerary_json_id`, returns its `itinerary_document` |
| | `saveItinerary(doc)` | inserts `doc` as `itinerary_document`, returns the new row |

- The client is taken at the start of the composable, before any `await`, so it stays inside the Nuxt context.
- Supabase errors are thrown; callers do not handle them yet.
- The tables have no generated types: rows are cast to the interfaces in `useItineraries.ts` and `useCategories.ts`.
- Photos are not queried: their public URL is built by `useSupabaseImages().getImageUrl()`.
