---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/study-current-state/2026-10-27-confronto-notion.md
  - raw/compiled/starting-point/2026-10-27-obiettivo.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
  - raw/compiled/study-flows/2026-10-27-oggetto-unico.md
  - raw/compiled/study-flows/2026-10-27-form-creazione.md
---

# Modello dati

## Oggi: misto leggero

Deciso per la prima versione dell'app:

- tabella **`itineraries`** relazionale per quello che serve a permessi e liste: id, **proprietario**, nome, date di creazione e di modifica;
- il **contenuto** (descrizioni, foto, giorni → luoghi → attività → momenti) resta in un **documento JSON** nella stessa riga (colonna `document`). Così si riusano il documento, la vista e il form che c'erano già.
- C'è anche la tabella `categories`.

Tabelle e policy: [Database](../tecnico/supabase/database.md). Struttura del documento: [Itinerary document](../tecnico/frontend/itinerary-document.md).

## Prossimo passo: un oggetto solo

Itinerari e viaggi sono [un oggetto solo](../viaggi/itinerario-e-viaggio.md): **non serve una tabella `trips`**, resta `itineraries`. Da aggiungere con una migrazione, nella feature che implementa i [flussi](../viaggi/flussi.md):

- lo **stato** dell'itinerario (in programmazione, in corso, fatto), con gli stati in una **tabella a parte** come le categorie: così se ne aggiungono altri inserendo una riga, senza toccare lo schema;
- **`copied_from`**: riferimento all'itinerario da cui nasce la copia, vuoto se l'originale viene cancellato.

## Opzioni valutate

- **Documento JSON unico**, com'era prima (tabella `itineraries_json`, senza proprietario). Pro: semplice. Contro: difficile da gestire con le RLS per parti, con la copia selettiva e con le query trasversali (es. tutte le spese, tutti i viaggi in corso).
- **Modello relazionale completo**, anche per giorni, luoghi e attività. Pro: RLS per tabella, copia selettiva, stati e spese interrogabili. Contro: più tabelle e migrazioni, e da riscrivere accesso ai dati e form: troppo per una prima versione.
- **Misto**: relazionale per utenti e itinerari, JSON per il contenuto dei giorni. È la scelta fatta.

L'orientamento resta verso più relazionale dove serve.

## Domande aperte

- Fino a che livello serve il relazionale (anche giorni, luoghi, attività)? Con un oggetto solo e la copia scheletro fatta sul documento, il JSON per ora basta.
- Le categorie delle attività: l'elenco (trekking, food, museum, concert, any) non copre quelle usate nei mock (`sightseeing`, `accommodation`). Gli alloggi sono un'attività o un'entità a sé?
