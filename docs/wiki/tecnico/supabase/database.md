---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/starting-point/2026-10-27-foto-bucket.md
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
  - raw/compiled/itinerary-flow/2026-10-29-task1.md
---

# Database

Schema, policies and storage of the Supabase project, as migrations in `supabase/migrations/`. How the local stack and the CLI work: [Supabase CLI docs](https://supabase.com/docs/guides/local-development). Environments and release: [Ambienti](../../architettura/ambienti.md), [Rilascio e versioni](../../progetto/rilascio.md).

## Migrations

| Migration | What it does |
|---|---|
| `20261027141357_remote_schema.sql` | Production schema as pulled with `supabase db pull`: tables, grants, RLS enabled, the storage upload policy |
| `20261027142257_authenticated_access.sql` | Signed-in users read and write; its policies on `itineraries_json` go away with that table, the select policy on `categories` stays |
| `20261027151039_itineraries_with_owner.sql` | Creates `itineraries`, moves the rows of `itineraries_json` into it and drops it, per-owner policies, read-only `categories` |
| `20261029100000_itinerary_status_and_copies.sql` | Creates `itinerary_statuses` with its three rows; adds `status` (existing rows: `planning`) and `copied_from` to `itineraries` |
| `20261029110000_itinerary_photos_storage.sql` | Replaces the "upload anywhere" storage policy with per-owner policies on `<owner_id>/<itinerary_id>/` |

The third migration moves the old rows keeping their ids, so `/itinerario/:id` links stay valid. They had no owner: they go to the **first registered user** (`auth.users` by `created_at`). If there are rows but no user, it raises an error instead of losing data.

## Tables

| Table | Columns | Access |
|---|---|---|
| `itineraries` | `id` (identity), `owner_id` (uuid, default `auth.uid()`, FK to `auth.users`, on delete cascade), `name`, `status` (text, default `planning`, FK to `itinerary_statuses.key`, on update cascade), `copied_from` (bigint, FK to `itineraries.id`, on delete set null, indexed), `document` (jsonb, see [Itinerary document](../frontend/itinerary-document.md)), `created_at`, `updated_at` | `authenticated`: select all; insert with `owner_id = auth.uid()`; update and delete own rows only |
| `categories` | `category_id` (serial, sequence `categories_category_id_seq`), `key` | `authenticated`: select |
| `itinerary_statuses` | `key` (primary key: `planning`, `in_progress`, `done`), `position` (order in the app) | `authenticated`: select |

- RLS is on for every table. `anon` has no grant on them: without a login nothing is readable. The rules come from [Condivisione](../../viaggi/condivisione.md).
- `updated_at` is set by the trigger `itineraries_set_updated_at`, function `public.set_updated_at()`.
- `copied_from` is emptied by the foreign key when the original is deleted, also on other users' copies: referential actions are not subject to RLS.
- The statuses are data, inserted by the migration: a new status is a new row (and its labels in i18n).

## Storage

- Bucket `Photos`, **public**: images are served from `/storage/v1/object/public/Photos/<path>` (`useSupabaseImages().getImageUrl()`), even without a login. Why it stays public for now, and the folder structure still to decide: [Foto](../../viaggi/foto.md).
- Policies on `storage.objects`, for photos uploaded from the app at `<owner_id>/<itinerary_id>/<file>` ([Foto](../../viaggi/foto.md)):
  - insert: in `Photos`, first folder = `auth.uid()`, second folder = the id of an itinerary owned by the user. Inside the `EXISTS` the column is written `objects.name`: a bare `name` would resolve to `itineraries.name`;
  - select (needed to list) and delete: in `Photos`, first folder = `auth.uid()`;
  - no update policy: files are never overwritten, each upload has a new name.
- Buckets are not in the migrations. Locally `Photos` is declared in `supabase/config.toml` (`[storage.buckets.Photos]`) and filled from `supabase/storage/Photos` (`objects_path`), a local copy of the production photos that is not in git.
- Production also has a bucket `content`, empty and unused.

## Local seed

`supabase/seed.sql`, applied by `supabase db reset` (local only):

- test user `test@cronotrip.local` / `password` (in `auth.users` and `auth.identities`);
- the categories of `public/categorie.json`;
- the mock itineraries `public/itinerario1-3.json` and `public/umbria.json`, owned by the test user: `name` as a column, the rest of the mock in `document`. The JSON of each mock is inlined in the SQL: when a mock changes, its copy in `seed.sql` must be updated too.

`bun run db:reset` also runs `supabase seed buckets --local` to upload the photos.

## Open questions

- Photos uploaded by hand from the dashboard (e.g. `Carpinone/…`) are outside the per-owner folders: no user can delete them from the app.
