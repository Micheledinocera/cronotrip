---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-design-brief/2026-10-29-obiettivo.md
  - raw/compiled/study-design-brief/2026-10-29-materiale-esistente.md
  - raw/compiled/study-design-brief/2026-10-29-domande-design.md
---

# Identità visiva

Come deve apparire Cronotrip: sensazione, colori, font, tono, icone, mappe, foto. La direzione è decisa; il design system (palette, font, logo) lo propone Claude Design e va poi scelto. Le schermate: [Schermate](./schermate.md).

## Com'è oggi

Nessuna identità: niente logo, font, palette o tono. Componenti Nuxt UI quasi di default; il primario è blu nel tema chiaro e verde nel tema scuro. Gli screenshot dell'app prima del redesign sono in `docs/raw/compiled/study-design-brief/screenshots/`.

## Cosa è deciso

- **Due anime, un sistema solo**: la **visualizzazione** di un itinerario è un **diario di viaggio** (fotografico, arioso); l'**inserimento** è un **pannello di controllo** (ordinato, efficiente).
- **Pulito e conciso** ovunque: il difetto principale di oggi è l'effetto **"valanga di informazioni"**. Gerarchia e respiro, l'essenziale in vista e il resto a un tocco.
- **Riferimento**: [Wanderlog](../business/concorrenti.md), ma senza la mappa in primo piano e senza l'impostazione "AI-centrica". In Cronotrip la mappa è un supporto.
- **Nome**: resta Cronotrip, salvo alternative valide da valutare. **Logo** e **icona dell'app**: da proporre, l'icona deve servire anche alla [PWA](../architettura/pwa.md).
- **Colori**: da proporre almeno due palette da confrontare; le sfumature di **blu** sono gradite.
- **Font**: Google Fonts.
- **Tono dei testi**: **informale**.
- **Tema chiaro e scuro** di **uguale importanza**.
- **Responsive**: **desktop** per pianificare (il form), **mobile** durante il viaggio (la vista).
- **Icone delle categorie**: ridisegnate in **uno stile unico**, **senza colore** per categoria.
- **Mappe**: OpenStreetMap con uno stile un po' personalizzato (tile e marker in tono con il tema), da provare.
- **Foto**: quelle di intestazione (copertina dell'itinerario, intestazione del luogo) hanno rilievo; quelle "da galleria" (attività e momenti) sono miniature che aprono una galleria ([Schermate](./schermate.md)).
- **Solo quello che esiste**: il design non prevede spazi per funzioni future (spese, date, prenotazioni, extra); l'app è troppo embrionale.
- Il design system si esprime nei termini di **Nuxt UI 4 e Tailwind 4** (colori semantici, variabili `--ui-*`, `@theme`), per tradurlo in configurazione senza reinterpretazioni: https://ui.nuxt.com/docs/getting-started/theme/design-system
- **Consegna di Claude Design in due fasi**: prima il design system, poi i mockup delle schermate, in italiano. Il brief che gli si passa: [2026-10-29-design-brief.md](../../output/2026-10-29-design-brief.md).

## Domande aperte

- Palette e font definitivi, tra le proposte di Claude Design.
- Logo, icona ed eventuale nome alternativo.
- Stile delle tile della mappa (tra i provider gratuiti).
