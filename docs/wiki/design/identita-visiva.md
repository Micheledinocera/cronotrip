---
tipo: decisione
stato: presa
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-design-brief/2026-10-29-obiettivo.md
  - raw/compiled/study-design-brief/2026-10-29-materiale-esistente.md
  - raw/compiled/study-design-brief/2026-10-29-domande-design.md
  - raw/compiled/study-design-system/2026-10-29-obiettivo.md
  - raw/compiled/study-design-system/2026-10-29-proposta-design-system.md
  - raw/compiled/study-design-system/2026-10-29-scelte-e-mappe.md
  - raw/compiled/ui/2026-10-29-token.md
  - raw/compiled/ui/2026-10-29-componenti.md
---

# Identità visiva

Come appare Cronotrip: sensazione, colori, font, logo, tono, icone, foto. Il riferimento completo, con token, componenti e lo snippet per Nuxt UI, è il **design system**: https://claude.ai/artifact/8atLk41aCxS51rZyBKTav2 (artifact privato del proprietario del progetto). Le schermate: [Schermate](./schermate.md); le mappe: [Mappe](./mappe.md).

## Com'è oggi

Il design system qui sotto è implementato: token (palette, variabili `--ui-*` per chiaro e scuro, font, stili di testo, ombre) e componenti condivisi (logo, badge dello stato, icone delle categorie, card, foto, modali, barra e menu utente). Come sono fatti nel codice: [Design system](../tecnico/frontend/design-system.md). Gli screenshot dell'app prima del redesign sono in `docs/raw/compiled/study-design-brief/screenshots/`.

## Cosa è deciso

### Direzione

- **Due anime, un sistema solo**: la **vista** di un itinerario è un **diario di viaggio** (fotografico, arioso); il **form** è un **pannello di controllo** (ordinato, denso il giusto). Pulito e conciso ovunque: niente "valanga di informazioni", l'essenziale in vista e il resto a un tocco.
- **Tema chiaro e scuro** di uguale importanza. **Responsive**: desktop per pianificare (il form), mobile durante il viaggio (la vista).
- **Solo quello che esiste**: nessuno spazio per funzioni future (spese, date, prenotazioni).
- Riferimento: [Wanderlog](../business/concorrenti.md), ma senza la mappa in primo piano e senza l'impostazione "AI-centrica".

### Nome e logo

- Il nome resta **Cronotrip**.
- **Marchio**: un arco aperto (la "C", il quadrante di un orologio, il giro) con un punto d'arrivo nel varco; arco nel primario, punto nel secondario. **Logotipo** "cronotrip" in minuscolo, Fraunces 600.
- **Icona dell'app** (per la [PWA](../architettura/pwa.md)): quadrato pieno con il marchio nel 60% centrale; chiara su blu `primary-700`, scura su `neutral-950`.

### Colori: palette "Atlante"

Scelta tra due proposte (scartata "Lago": blu petrolio + ocra su ardesia).

- **Primario** "atlante": blu oltremare, l'inchiostro delle carte (`primary-700` `#185ab0` nel chiaro, `primary-300` `#9cc6ff` nello scuro).
- **Secondario** "terracotta" (`#944115` / `#f8b19a`): accento raro, solo per lo stato "In corso", il luogo attivo su mappa e drawer e il punto del marchio. Mai per azioni.
- **Neutri** "carta", grigi caldi: lo sfondo chiaro è carta (`#fdf9f5`), quello scuro un marrone quasi nero (`#28251f`).
- Stati: verde, ambra e rosso di Tailwind, sempre con icona e testo; `info` coincide col primario.
- Testi ad almeno 4.5:1 sullo sfondo principale in entrambi i temi; il testo attenuato e i colori di stato scendono a ~4.2:1 sugli sfondi di hover, dove non si usano per testo da leggere.
- **Niente colori per categoria**: le categorie si distinguono per icona.

### Tipografia

- **Fraunces** (serif morbido, "da diario") solo nella vista e nei titoli delle modali: nome sulla copertina, luoghi, card, descrizione in corsivo.
- **Figtree** per tutta l'interfaccia; il form usa solo questo. Scartata la coppia Bricolage Grotesque + Instrument Sans.
- Entrambi da Google Fonts.

### Forme e spazi

- Raggio base `--ui-radius` 6px: controlli 9px, pannelli e modali 12px, foto 18px.
- Spaziatura di Tailwind; nella vista tanto respiro tra i luoghi, nel form campi ravvicinati.
- Poche ombre (menu, toast, modali, drawer); il form si regge sui bordi.

### Tono dei testi

Italiano, **informale**, si dà del tu, niente emoji. Esempi: "Dove si va?", "Nessun viaggio, per ora", "Eliminare l'itinerario?", "Serve un sottotitolo per il giorno", "Email o password non tornano".

### Icone

- **Lucide** (`i-lucide-*`), la collezione di default di Nuxt UI, già usata dall'app.
- Categorie: Trekking `footprints`, Cibo `utensils`, Museo `landmark`, Concerto `music`, Visita `binoculars`, Alloggio `bed-double`, Altro `compass`.
- Stati dell'itinerario: In programmazione `circle-dashed` (neutro, contorno), In corso `route` (secondario pieno), Fatto `circle-check` (primario tenue).

### Foto

- Le foto di **intestazione** (copertina dell'itinerario, intestazione del luogo) sono il tratto "diario"; quelle di attività e momenti sono **miniature** che aprono la galleria.
- Ritagli che reggono le foto verticali: copertina 21:9 su desktop e mai più alta del 60% dello schermo su mobile, intestazione del luogo 16:9 / 4:3, miniature 64px; sempre `object-fit: cover` centrato poco sopra la metà. Testo bianco sulle foto solo sopra un velo scuro.
- Foto mancante: niente immagine rotta (card con il marchio su un fondo tenue, luogo senza riquadro).

### Implementazione

Il design system è espresso nei termini di **Nuxt UI 4 e Tailwind 4**: i token sono le variabili `--ui-*` e le scale `primary`/`secondary`/`neutral` sono i colori semantici. Il design system contiene lo snippet pronto per `app.config.ts` e `main.css`. Riferimenti: https://ui.nuxt.com/docs/getting-started/theme/design-system e https://ui.nuxt.com/docs/getting-started/theme/css-variables

## Domande aperte

- I messaggi d'errore sotto i campi del form sono solo testo: il design system li vuole con un'icona, che il `UFormField` di Nuxt UI non mette.
- Le icone PNG della PWA (192, 512, *maskable*) vanno esportate dagli SVG del design system quando si fa la [PWA](../architettura/pwa.md).
