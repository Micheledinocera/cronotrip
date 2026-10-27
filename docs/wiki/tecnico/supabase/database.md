---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
---

# Database

Schema, policies and storage of the Supabase project, as migrations in `supabase/migrations/`. How the local stack and the CLI work: [Supabase CLI docs](https://supabase.com/docs/guides/local-development). Environments and release: [Ambienti](../../architettura/ambienti.md), [Rilascio e versioni](../../progetto/rilascio.md).

## Migrations

| Migration | What it does |
|---|---|
| `20261027141357_remote_schema.sql` | Production schema as pulled with `supabase db pull`: tables, grants, RLS enabled, the storage upload policy |
| `20261027142257_authenticated_access.sql` | Temporary access rule: only signed-in users read and write |

## Tables

| Table | Columns | Policies (role `authenticated`) |
|---|---|---|
| `categories` | `category_id` (serial, sequence `events_category_id_seq`), `key` | select |
| `itineraries_json` | `itinerary_json_id` (identity), `created_at`, `itinerary_document` (jsonb, see [Itinerary document](../frontend/itinerary-document.md)) | select, insert, update, delete |

RLS is on for both tables. `anon` has table grants but no policy, so it reads nothing and cannot write. The authenticated rule is **temporary**, until ownership and visibility are decided: see [Condivisione](../../viaggi/condivisione.md).

## Storage

- Bucket `Photos`, **public**: images are served from `/storage/v1/object/public/Photos/<path>` (`useSupabaseImages().getImageUrl()`). Policy on `storage.objects`: signed-in users can upload to it.
- Buckets are not in the migrations. Locally `Photos` is declared in `supabase/config.toml` (`[storage.buckets.Photos]`) and filled from `supabase/storage/Photos` (`objects_path`), a local copy of the production photos that is not in git.
- Production also has a bucket `content`, empty and unused.

## Local seed

`supabase/seed.sql`, applied by `supabase db reset` (local only):

- test user `test@cronotrip.local` / `password` (in `auth.users` and `auth.identities`);
- the categories of `public/categorie.json`;
- the mock itineraries `public/itinerario1-3.json` and `public/umbria.json` as `itinerary_document`.

`npm run db:reset` also runs `supabase seed buckets --local` to upload the photos.

## Open questions

- Production had RLS enabled with no policy on both tables; the policies of `20261027142257` are not online yet. Review them before the first release.
- `categories` keeps the sequence name `events_category_id_seq` and the constraint `events_pkey` from an earlier table name.
