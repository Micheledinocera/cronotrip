# Cronotrip

Nuxt 4 app, deployed as a static site on GitHub Pages (`bun run generate`, on every push to `master`; the same workflow applies the Supabase migrations). Data and auth on Supabase.

- **Local stack**: `bun run db:start` (Docker), `bun run db:reset` (migrations + `supabase/seed.sql` + photos), `bun run dev:local` (app on `.env.local`). Schema changes go in `supabase/migrations/`, never by hand on production.

## Project wiki and workflow

- **Conventions** (branches, commits, PRs, check commands): `CONTRIBUTING.md`.
- **Project wiki** (business rules, decisions, custom code): `docs/wiki/`, starting from `docs/wiki/index.md`. Rules for reading and writing it: `docs/CLAUDE.md`.
- **Order of sources when coding**: this file and the `CLAUDE.md` of the folder you work in (framework docs), then `docs/wiki/tecnico/` for custom code, then the business and decision pages before implementing a business rule. If a rule is missing, ask instead of inventing it.
- **Task workflow**: `/start <name>` opens a feature, notes go in `docs/raw/<name>/`, `/report <topic>` writes a dated document for people in `docs/output/`, `/close` updates the wiki (`/ingest`), runs the checks and opens the PR toward `develop`. Analysis-only features are named `study-<topic>`.
- **Study features touch no code**: on a `feature/study-*` branch, change only `docs/`, `.claude/` and `*.md` files. If asked to implement something, don't: propose to close the study (`/close`) and open a new feature (`/start <name>`).

## Framework docs

Read these instead of guessing framework behaviour; `/ingest` and `/report` cite them instead of copying them into the wiki.

- **Nuxt 4**: the `Nuxt` MCP server (`get-documentation-page`, `list-modules`, …), or https://nuxt.com/docs
- **Nuxt UI 4**: https://ui.nuxt.com
- **Supabase** (`@nuxtjs/supabase`): https://supabase.nuxtjs.org and https://supabase.com/docs
- **Pinia**: https://pinia.vuejs.org
- **@nuxtjs/i18n**: https://i18n.nuxtjs.org
- **@nuxt/image**: https://image.nuxt.com
- **@nuxtjs/leaflet**: https://leaflet.nuxtjs.org
- **Tailwind CSS 4**: https://tailwindcss.com/docs
