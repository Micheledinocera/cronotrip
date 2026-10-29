---
tipo: decisione
stato: presa
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-design-system/2026-10-29-scelte-e-mappe.md
  - raw/compiled/study-design-system/2026-10-29-mockup-revisione-drawer.md
  - raw/compiled/ui/2026-10-29-componenti.md
  - raw/compiled/ui/2026-10-29-schermate.md
---

# Mappe

Quali tile usano le mappe, come si accordano al design e che regole d'uso vanno rispettate. Dove compaiono le mappe nelle schermate: [Schermate](./schermate.md).

## Com'è oggi

Leaflet (`@nuxtjs/leaflet`) con le tile standard di OpenStreetMap all'indirizzo esatto, il filtro per tema, l'attribuzione su tutte le mappe e i marker del sistema, come deciso qui sotto. Le mappe sono tre: quella piccola del luogo nella vista (ingrandibile), quella di tutto il viaggio nel drawer e quella per scegliere la posizione nel form. Nel codice: [Design system](../tecnico/frontend/design-system.md).

## Cosa è deciso

- Restano le **tile standard di OpenStreetMap**: gratuite, senza chiave, già integrate.
- **Scartato CARTO** (Positron / Dark Matter), proposto all'inizio: dai termini del 29 settembre 2026 serve una chiave API personale (gratis per uso non commerciale fino a 5 milioni di richieste al mese), che starebbe in chiaro nel sito statico e che CARTO può revocare quando vuole. Usabile, ma aggiunge account, chiave e una dipendenza dai termini appena cambiati. https://carto.com/legal/basemap-terms/
- **Personalizzazione** con un filtro CSS sul solo pannello delle tile (non su marker e percorsi):
  - chiaro: `saturate(.45) brightness(1.02)`;
  - scuro: `invert(1) hue-rotate(180deg) saturate(.35) sepia(.25) brightness(.85) contrast(.9)`.
- **Marker e percorsi** nei colori del sistema: luoghi come cerchi numerati nel primario, luogo visibile più grande nel secondario, percorso a puntini nel primario, attività con posizione in un cerchio chiaro con l'icona della categoria.
- La mappa è un **supporto**: piccola e dentro il contenuto, ingrandibile.
- **Regole della policy di OSM** da rispettare (https://operations.osmfoundation.org/policies/tiles/):
  - indirizzo esatto `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, senza i sottodomini `{s}`;
  - attribuzione "© OpenStreetMap" sempre visibile, anche sulle mappe piccole;
  - niente scaricamento in anticipo né uso offline: il service worker della [PWA](../architettura/pwa.md) non deve mettere in cache le tile;
  - Referer del browser non disattivato.
- L'accesso alle tile di OSM è "best effort": può essere bloccato a chi degrada il servizio. Per l'uso di Cronotrip (pochi utenti) non è un problema.
