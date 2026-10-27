---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
---

# API routes

Nitro routes in `server/api/`. They are going to be removed: the app will call Supabase from the client, with RLS. See [Sito statico + Supabase](../../architettura/sito-statico-supabase.md).

| Route | File | What it does |
|---|---|---|
| `GET /api/categories/list` | `categories/list.get.ts` | all rows of `categories` |
| `GET /api/itineraries/list` | `itineraries/list.get.ts` | all rows of `itineraries_json` |
| `GET /api/itineraries/single?id=` | `itineraries/single.get.ts` | one row of `itineraries_json` by `itinerary_json_id` |
| `POST /api/itineraries/add` | `itineraries/add.post.ts` | inserts the body as `itinerary_document` |

Each route creates its own Supabase client with the **service role key** (`runtimeConfig.supabaseServiceRoleKey`, from `SUPABASE_SECRET_KEY`). On error it returns `{ success: false, error }` with status 200.

## Open questions

- The service role key bypasses RLS and the routes do not check the user: locally anyone who reaches the server reads every itinerary and can insert new ones.
- In production the routes do not exist: the site is static on GitHub Pages (`/cronotrip/api/categories/list` returns 404), and the CI does not pass `SUPABASE_SECRET_KEY`, so they also fail during the build.
