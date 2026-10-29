---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
  - raw/compiled/ui/2026-10-29-componenti.md
  - raw/compiled/ui/2026-10-29-schermate.md
---

# Auth and app shell

## Auth

- **Login** (`app/pages/login.vue`): email and password with Supabase Auth (`signInWithPassword`), then redirect to `/dashboard`. No sign-up page. It has no layout (`layout: false`): photo from the public bucket, logo, error and sending states.
- **Global middleware** (`app/middleware/auth.global.ts`): without a Supabase user, every page redirects to `/login`, except pages with `definePageMeta({ auth: false })`: the login.
- `@nuxtjs/supabase` runs with `redirect: false` (the middleware above does the redirect) and SSR cookies.

## Pages

| Route | Page | Auth |
|---|---|---|
| `/` | `index.vue`: redirects to `/dashboard` (and so to the login without a user) | logged in |
| `/login` | `login.vue` | public |
| `/dashboard` | `dashboard.vue`: "I tuoi viaggi", mine / others filter, search on name and short description, card grid, skeletons and empty states | logged in |
| `/itinerario/new` | [itinerary form](./itinerary-form.md) | logged in |
| `/itinerario/:id` | [itinerary view](./itinerary-view.md) | logged in |
| `/itinerario/modifica/:id` | [itinerary form](./itinerary-form.md), edit | logged in, owner (others are sent to the view) |

## Shell

- `app/app.vue`: `UApp` (toasts, overlays) around the layout.
- `app/layouts/default.vue`: a column with the top bar (`organisms/AppHeader.vue`) and a scrollable content area below it.
- The language (it, en; `i18n/locales/`), the color mode (dark by default), the version read from `/version.json` and the logout are in the user menu (`molecules/UserMenu.vue`). Components: [Design system](./design-system.md).
- The dashboard loads the itineraries on the client only (`useAsyncData` with `server: false`) and shows the skeletons while the status is `idle` or `pending`, so the prerendered page and the client agree.
- **Store** (`stores/global.ts`, Pinia): the categories and the itinerary statuses (loaded only with a signed-in user, see [Data access](./data-access.md)) and the selected itinerary.

## Open questions

- `fetchCurrentItinerary` in `stores/global.ts` never loads anything: `selectedItinerary` starts as `{}`, which is truthy.
- `types/LocaleCode.ts` calls `useI18n()` at module level, outside a component.
