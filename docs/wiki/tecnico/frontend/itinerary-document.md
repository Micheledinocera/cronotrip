---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/study-current-state/2026-10-27-confronto-notion.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
---

# Itinerary document

The shape of an itinerary as the app stores and reads it. Types in `app/composables/useItineraries.ts`. Why it is split between columns and a JSON document, and what is still open: [Modello dati](../../architettura/modello-dati.md).

## Shape

```
DBItinerary            row of table itineraries
├── id, owner_id, name, created_at, updated_at
└── document
    ├── short_desc, desc, photos?
    └── days: Day[]
        ├── subtitle?, data?
        └── places: Place[]
            ├── name, coordinates {lat, lng}, photos?
            └── events: Activity[]
                ├── name, desc?, category, link? {label, url}
                ├── coordinates?, price?, photos?
                └── moments?: Moment[]
                    └── name, desc?, photos?, price?, coordinates?
```

- `category` is a free string. Known values come from the `categories` table (`app/composables/useCategories.ts`, loaded into the Pinia store by `app/plugins/init-store.ts`): `trekking`, `food`, `museum`, `concert`, `any`.
- The app works with `Itinerary` (`id` and `name` plus the content of `document`): the mapping is in [Data access](./data-access.md).
- Photos are either full URLs, used as they are, or paths in the public Supabase Storage bucket `Photos`, turned into URLs by `useSupabaseImages().getImageUrl()`.

## Mock data

`public/` holds mock itineraries (`umbria.json`, `itinerari.json`, `itinerario1-3.json`) and categories (`categorie.json`). The dashboard has a button that saves `umbria.json` to the database.

## Open questions

- `umbria.json` uses `prezzo`, the code reads `price`: prices are never displayed.
- `umbria.json` uses the categories `sightseeing` and `accommodation`, which are not in the category list.
- `umbria.json` has `duration`, which is not in the `Itinerary` type.
