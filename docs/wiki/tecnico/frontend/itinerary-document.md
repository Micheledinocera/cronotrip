---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/study-current-state/2026-10-27-confronto-notion.md
---

# Itinerary document

The shape of an itinerary as the app stores and reads it today. Types in `app/composables/useItineraries.ts`. The target data model is still open: see [Modello dati](../../architettura/modello-dati.md).

## Shape

```
DBItinerary            row of table itineraries_json
├── itinerary_json_id
└── itinerary_document: Itinerary
    ├── name, short_desc, desc, photos?
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
- Photos are paths in the public Supabase Storage bucket `Photos`, turned into URLs by `useSupabaseImages().getImageUrl()`.

## Mock data

`public/` holds mock itineraries (`umbria.json`, `itinerari.json`, `itinerario1-3.json`) and categories (`categorie.json`). The dashboard has a button that saves `umbria.json` to the database.

## Open questions

- `umbria.json` uses `prezzo`, the code reads `price`: prices are never displayed.
- `umbria.json` uses the categories `sightseeing` and `accommodation`, which are not in the category list.
- `umbria.json` has `duration`, which is not in the `Itinerary` type.
