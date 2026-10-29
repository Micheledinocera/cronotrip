---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
  - raw/compiled/ui/2026-10-29-schermate.md
---

# Itinerary view

The read-only page of an itinerary, the "diary": `app/pages/itinerario/[id].vue`, for signed-in users only (see [Condivisione](../../viaggi/condivisione.md)). The design: [Schermate](../../design/schermate.md).

## Structure

- **Cover** (`organisms/ItineraryCover.vue`): cover photo (at most 60% of a phone screen), status, name, short description, owner name, days. The actions go in its `actions` slot ([Flussi dell'itinerario](../../viaggi/flussi.md)): on desktop **Copy**, **Edit** and a menu with **Delete**; on mobile everything in one menu. Edit and Delete for the owner only (`owner_id` equal to the signed-in user). Copy uses `copyItinerary()` with the suffix `itinerary.copy_suffix`, then opens the copy; Delete asks with `ConfirmModal`, then goes back to the dashboard. Errors are toasts.
- **Description** in italics, then the **day chips** (`molecules/DayChips.vue`): one day at a time, its subtitle as title.
- **Places** (`organisms/PlaceSection.vue`): header photo with number and name, and the small map (`molecules/PlaceMap.vue`) set in its corner, which opens full screen with the activities that have a position. Without a photo: the name as text with the map beside it.
- **Activities** (`molecules/ActivityItem.vue`): category icon, name, category and price, description, link, thumbnails (`PhotoThumbs`), and the moments (`molecules/MomentsGroup.vue`), closed by default: one line with the group label (`moments.<category>` in i18n), the count and the names.
- A button to the **next day** at the end.

## Drawer and gallery

- **Trip drawer** (`organisms/TripDrawer.vue`): a floating button "Il viaggio · Giorno N" opens it, as a `USlideover` from the right on desktop and a `UDrawer` from the bottom on mobile (`useIsDesktop()`). It holds the map of the whole trip (`molecules/TripMap.vue`: numbered places and dotted routes per day) and every day with its places. Tapping a day highlights its stretch on the map (the others grey); tapping a place selects its day, closes the drawer and scrolls to it.
- **Place on screen**: an `IntersectionObserver` on the page's scroll container (the page is its own scroll container) tracks the place in the middle of the screen; the drawer shows it in the secondary color.
- **Gallery** (`organisms/PhotoGallery.vue`): full screen, always dark (`dark` class on the modal content), big photo, "title · day · place · category", counter, previous/next (also with the arrow keys) and a strip of thumbnails grouped by day and place. The photos come from `galleryPhotos()` (`app/utils/gallery.ts`): day → place (its header first) → activity → moments. A thumbnail opens the gallery at that photo.
