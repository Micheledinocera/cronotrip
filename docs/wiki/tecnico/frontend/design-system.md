---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/ui/2026-10-29-token.md
  - raw/compiled/ui/2026-10-29-componenti.md
---

# Design system

How the "Atlante" design system ([Identità visiva](../../design/identita-visiva.md), [Mappe](../../design/mappe.md)) is built in the app. Theming in Nuxt UI: https://ui.nuxt.com/docs/getting-started/theme/design-system and https://ui.nuxt.com/docs/getting-started/theme/css-variables.

## Tokens

- `app/app.config.ts`: the semantic colors (`primary: 'atlante'`, `secondary: 'terracotta'`, `neutral: 'carta'`, `info: 'atlante'`, green/amber/red for the states) and `md` buttons by default.
- `app/assets/css/main.css`, the only CSS entry besides `assets/scss/main.scss`:
  - the three scales in `@theme static` (`--color-atlante-*`, `--color-terracotta-*`, `--color-carta-*`) and the fonts (`--font-sans` Figtree, `--font-display` Fraunces);
  - the `--ui-*` variables for light (`:root`) and dark (`.dark`);
  - tokens outside Nuxt UI, as Tailwind colors: `on-primary`, `on-secondary` (text over a filled primary/secondary), `scrim` (the veil under white text on photos), `map-land`, `map-water`, `map-road`;
  - shadows `shadow-sm/md/lg`, with dark values in `.dark`;
  - the `wide` breakpoint (1440px, the 4-column dashboard);
  - the map styles: tile filter per theme on `.leaflet-tile-pane`, attribution, place markers (`.map-pin`, `--active`, `--muted`), activity markers (`.map-activity`), routes (`.map-route`, `--muted`).
- **Type styles** are utilities `typo-display`, `typo-title-1..3`, `typo-quote` (Fraunces) and `typo-heading`, `typo-body`, `typo-body-strong`, `typo-small`, `typo-label`, `typo-caption`, `typo-overline` (Figtree). The prefix is `typo-`, not `text-`: tailwind-merge, which Nuxt UI uses on classes, would take `text-caption` for a color and drop it next to `text-muted`.
- **Fonts** come from Google Fonts through `@nuxt/fonts` (shipped with Nuxt UI), configured under `fonts` in `nuxt.config.ts`.

## Shared components

| Component | What it is |
|---|---|
| `atoms/LogoMark.vue` | The mark (SVG arc + dot); `mono` paints it in `currentColor` |
| `atoms/AppLogo.vue` | Mark + logotype, link to the dashboard; `compact` hides the logotype on mobile |
| `atoms/CategoryIcon.vue` | Lucide icon of a category; `chip` = 36px circle |
| `atoms/StatusBadge.vue` | Status with color and icon; `on-photo` for covers |
| `atoms/DragHandle.vue` | Grip button of a reorderable item (see [Itinerary form](./itinerary-form.md)) |
| `molecules/HeaderPhoto.vue` | Photo cropped by CSS, scrim + white text in the default slot, `fallback` slot when missing or broken; size from the parent |
| `molecules/ItineraryCard.vue`, `ItineraryCardSkeleton.vue` | Dashboard card (the whole card is the link) and its loading shape |
| `molecules/PhotoThumbs.vue` | 64px thumbnails, "+N" beyond 4, emits the index |
| `molecules/ConfirmModal.vue` | Confirmation: `error` (delete) or `warning` (unsaved changes) |
| `molecules/UserMenu.vue` | Avatar menu: language, theme (light/dark/system), version, log out |
| `organisms/AppHeader.vue` | Top bar: logo, "Nuovo itinerario" ("+" on mobile), user menu |

- `app/utils/categories.ts`: `categoryIcon()`, including `sightseeing` and `accommodation`, used by mocks but not in the `categories` table.
- `app/utils/statuses.ts`: `statusLook()`, icon, color and variant of each status (badge and status select).
- `app/utils/map.ts`: `OSM_TILE_URL`, `OSM_ATTRIBUTION`, `STATIC_MAP_OPTIONS` (maps without interaction).
- `app/utils/format.ts`: `formatPrice()`, euros the Italian way.
- `app/composables/useIsDesktop.ts`: true from 640px up (drawer side, toast position).
- **Toasts**: `UApp` in `app/app.vue` wraps the layout; bottom right on desktop, top on mobile, 5 seconds. Error toasts pass `duration: 0` and stay until closed.

## Open questions

- Error messages under form fields have no icon: `UFormField` shows only text.
