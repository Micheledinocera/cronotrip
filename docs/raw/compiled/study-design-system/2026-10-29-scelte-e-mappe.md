# Scelte del design system e verifica delle mappe

## Scelte (confermate da Michele)

- Palette **Atlante** (blu oltremare + terracotta, neutri carta), chiaro e scuro. Lago scartata.
- Font **Fraunces** (titoli, solo nella vista) + **Figtree** (interfaccia). Bricolage Grotesque + Instrument Sans scartati.
- Logo e icona dell'app come proposti; nome Cronotrip.
- Il resto della proposta (token, componenti, icone Lucide, foto, compattazione di momenti e form) va bene.
- Design system aggiornato: https://claude.ai/artifact/8atLk41aCxS51rZyBKTav2

## Mappe: CARTO no, OpenStreetMap sì

Richiesta: verificare che le tile proposte (CARTO Positron / Dark Matter) si possano usare tranquillamente, altrimenti valutare OpenStreetMap, già usato dall'app.

**CARTO** (termini aggiornati il 29 settembre 2026, https://carto.com/legal/basemap-terms/):
- serve una **chiave API personale** (senza chiave le tile escono con la filigrana "API key required");
- gratis per uso non commerciale fino a 5 milioni di richieste al mese; attribuzione OSM + CARTO obbligatoria;
- la chiave starebbe in chiaro nel sito statico; CARTO può sospendere o revocare l'accesso gratuito in qualsiasi momento; niente cache sul dispositivo oltre 30 giorni.
- Usabile per un progetto personale, ma aggiunge account, chiave e una dipendenza i cui termini sono appena cambiati. Scartato.

**OpenStreetMap standard** (https://operations.osmfoundation.org/policies/tiles/), scelto:
- gratis, senza chiave, già integrato (`@nuxtjs/leaflet`);
- personalizzato con un **filtro CSS** sul pannello delle tile, provato dal vivo sulla mappa del Giorno 1:
  - chiaro: `saturate(.45) brightness(1.02)`;
  - scuro: `invert(1) hue-rotate(180deg) saturate(.35) sepia(.25) brightness(.85) contrast(.9)`.
- Obblighi della policy da rispettare nell'implementazione:
  - URL esatto `https://tile.openstreetmap.org/{z}/{x}/{y}.png`: oggi l'app usa `https://{s}.tile.openstreetmap.org/...` (sottodomini non più previsti);
  - **attribuzione sempre visibile**: oggi `NoControlMap`, `NoControlMapDay` e `NoControlMapTrip` hanno `attributionControl: false`, va tolto;
  - niente prefetch né uso offline: il service worker della futura PWA non deve mettere in cache le tile;
  - Referer del browser non disattivato.
- Accesso "best effort": OSM può bloccare chi degrada il servizio; per l'uso di Cronotrip (pochi utenti) non è un problema.
