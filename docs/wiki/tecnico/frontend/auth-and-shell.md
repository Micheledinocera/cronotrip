---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
---

# Auth and app shell

## Auth

- **Login** (`app/pages/login.vue`): email and password with Supabase Auth (`signInWithPassword`), then redirect to `/dashboard`. No sign-up page.
- **Global middleware** (`app/middleware/auth.global.ts`): without a Supabase user, every page redirects to `/login`, except pages with `definePageMeta({ auth: false })`: home and login.
- `@nuxtjs/supabase` runs with `redirect: false` (the middleware above does the redirect) and SSR cookies.

## Pages

| Route | Page | Auth |
|---|---|---|
| `/` | `index.vue`: app name and link to the login | public |
| `/login` | `login.vue` | public |
| `/dashboard` | `dashboard.vue`: list of itineraries, button to save the `umbria.json` mock | logged in |
| `/itinerario/new` | [itinerary form](./itinerary-form.md) | logged in |
| `/itinerario/:id` | [itinerary view](./itinerary-view.md) | logged in |

## Shell

- `app/layouts/default.vue`: header plus a scrollable content area below it.
- `app/components/Header.vue`: language selector (it, en; `i18n/locales/`), color mode toggle (dark by default), logout, and the version read from `/version.json`.
- **Store** (`stores/global.ts`, Pinia): the categories (loaded only with a signed-in user, see [Data access](./data-access.md)) and the selected itinerary.

## Open questions

- `fetchCurrentItinerary` in `stores/global.ts` never loads anything: `selectedItinerary` starts as `{}`, which is truthy.
- `types/LocaleCode.ts` calls `useI18n()` at module level, outside a component.
