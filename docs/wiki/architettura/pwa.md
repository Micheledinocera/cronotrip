---
tipo: decisione
stato: aperta
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-design-brief/2026-10-29-domande-design.md
  - raw/compiled/study-design-system/2026-10-29-proposta-design-system.md
  - raw/compiled/study-design-system/2026-10-29-scelte-e-mappe.md
---

# PWA

L'idea è che Cronotrip diventi anche una **PWA**, installabile sul telefono (icona sulla home, schermo intero): durante il viaggio l'app si usa soprattutto da mobile ([Identità visiva](../design/identita-visiva.md)). Da fare in una feature a parte.

## Cosa è deciso

- L'**icona dell'app** è decisa, chiara e scura: [Identità visiva](../design/identita-visiva.md). Le PNG per il manifest si esportano dai suoi SVG.
- Le **tile della mappa** non vanno messe in cache dal service worker: la policy di OpenStreetMap vieta l'uso offline ([Mappe](../design/mappe.md)).

## Domande aperte

- Cosa deve funzionare offline (per esempio l'itinerario del giorno senza rete), se qualcosa.
- Come si concilia con il sito statico su GitHub Pages sotto `/cronotrip/` ([Sito statico + Supabase](./sito-statico-supabase.md)).
