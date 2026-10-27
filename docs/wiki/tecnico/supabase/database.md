---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/starting-point/2026-10-27-foto-bucket.md
---

# Database

Schema, policies and storage of the Supabase project, as migrations in `supabase/migrations/`. How the local stack and the CLI work: [Supabase CLI docs](https://supabase.com/docs/guides/local-development). Environments and release: [Ambienti](../../architettura/ambienti.md), [Rilascio e versioni](../../progetto/rilascio.md).

## Migrations

| Migration | What it does |
|---|---|
| `20261027141357_remote_schema.sql` | Production schema as pulled with `supabase db pull`: tables, grants, RLS enabled, the storage upload policy |
| `20261027142257_authenticated_access.sql` | Signed-in users read and write; its policies on `itineraries_json` go away with that table, the select policy on `categories` stays |
| `20261027151039_itineraries_with_owner.sql` | Creates `itineraries`, moves the rows of `itineraries_json` into it and drops it, per-owner policies, read-only `categories` |

The third migration moves the old rows keeping their ids, so `/itinerario/:id` links stay valid. They had no owner: they go to the **first registered user** (`auth.users` by `created_at`). If there are rows but no user, it raises an error instead of losing data.

## Tables

| Table | Columns | Access |
|---|---|---|
| `itineraries` | `id` (identity), `owner_id` (uuid, default `auth.uid()`, FK to `auth.users`, on delete cascade), `name`, `document` (jsonb, see [Itinerary document](../frontend/itinerary-document.md)), `created_at`, `updated_at` | `authenticated`: select all; insert with `owner_id = auth.uid()`; update and delete own rows only |
| `categories` | `category_id` (serial, sequence `categories_category_id_seq`), `key` | `authenticated`: select |

- RLS is on for both tables. `anon` has no grant on them: without a login nothing is readable. The rules come from [Condivisione](../../viaggi/condivisione.md).
- `updated_at` is set by the trigger `itineraries_set_updated_at`, function `public.set_updated_at()`.

## Storage

- Bucket `Photos`, **public**: images are served from `/storage/v1/object/public/Photos/<path>` (`useSupabaseImages().getImageUrl()`), even without a login. Why it stays public for now, and the folder structure still to decide: [Foto](../../viaggi/foto.md).
- Policy on `storage.objects`: signed-in users can upload anywhere in `Photos`. No update or delete policy.
- Buckets are not in the migrations. Locally `Photos` is declared in `supabase/config.toml` (`[storage.buckets.Photos]`) and filled from `supabase/storage/Photos` (`objects_path`), a local copy of the production photos that is not in git.
- Production also has a bucket `content`, empty and unused.

## Local seed

`supabase/seed.sql`, applied by `supabase db reset` (local only):

- test user `test@cronotrip.local` / `password` (in `auth.users` and `auth.identities`);
- the categories of `public/categorie.json`;
- the mock itineraries `public/itinerario1-3.json` and `public/umbria.json`, owned by the test user: `name` as a column, the rest of the mock in `document`.

`bun run db:reset` also runs `supabase seed buckets --local` to upload the photos.

## Open questions

- The policies of `20261027142257` and `20261027151039` are not online yet: production still has `itineraries_json` with RLS on and no policy. They go online with the first release.
