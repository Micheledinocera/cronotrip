# Componenti del design system — come sono implementati

Fonte: le schede dei componenti del design system (artifact, `project/components/*/README.md` e `bundle.css`).

- **Atomi**: `LogoMark` (marchio SVG; `mono` lo dipinge in `currentColor`, per il segnaposto delle copertine), `AppLogo` (marchio + logotipo, link alla dashboard; `compact` nasconde il logotipo su mobile), `CategoryIcon` (icona Lucide della categoria; `chip` = cerchio 36px della vista), `StatusBadge` (stato con colore e icona; `on-photo` dà il fondo pieno al badge outline sulle copertine). Rimosso `TypeIcon`, che usava icone di altre collezioni.
- **Molecole**: `HeaderPhoto` (foto ritagliata dal CSS, velo e testo bianco nello slot, slot `fallback` se manca o non carica), `ItineraryCard` + `ItineraryCardSkeleton`, `PhotoThumbs` (miniature 64px, "+N" oltre le 4, emette l'indice per la galleria), `ConfirmModal` (eliminazione `error` o modifiche non salvate `warning`), `UserMenu` (lingua, tema chiaro/scuro/sistema, versione, esci).
- **Organismi**: `AppHeader` al posto di `Header.vue`: logo, "Nuovo itinerario" (quadrato "+" su mobile), avatar. Niente più "indietro". Il layout è ora una colonna: barra + contenuto che scorre (`--ui-header-height`); tolto `--header-height`.
- **Utility**: `utils/categories.ts` (`categoryIcon`, comprese `sightseeing` e `accommodation` che `umbria.json` usa ma la tabella `categories` non ha), `utils/map.ts` (indirizzo esatto delle tile OSM senza `{s}`, attribuzione, opzioni delle mappe statiche, HTML dei marker numerati).
- **Mappe**: tutte le mappe esistenti ora usano `OSM_TILE_URL` e mostrano l'attribuzione (tolto `attributionControl: false`). Filtro per tema su `.leaflet-tile-pane` e stile dei marker (`.map-pin`) in `main.css`.
- **Toast**: `UApp` fuori dal layout (prima era dentro), toaster in basso a destra su desktop e in alto su mobile, 5 secondi.
- **Tipo corretto**: `Itinerary.photos` era `string`, i dati sono un array: ora `string[]`.

## Punti aperti

- Il **nome del proprietario** (card, copertina) non esiste nel database: c'è solo `owner_id`. La card lo mostra solo se riceve `ownerName`; il menu utente mostra l'email.
- La build stampa un errore i18n in prerender (`_i18n/.../it/messages.json` 500) che c'era già prima di questa feature.
