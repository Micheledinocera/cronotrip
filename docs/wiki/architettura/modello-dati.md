---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/study-current-state/2026-10-27-confronto-notion.md
---

# Modello dati

## Oggi

Un itinerario è un **unico documento JSON** nella tabella `itineraries_json` (colonna `itinerary_document`): itinerario → giorni → luoghi → attività → momenti. C'è anche una tabella `categories`. Non esistono utente proprietario, visibilità né viaggi. Struttura del documento: [Itinerary document](../tecnico/frontend/itinerary-document.md).

## Opzioni valutate

- **Documento JSON unico**, come oggi. Pro: semplice, si legge e si scrive in un colpo solo. Contro: difficile da gestire con le RLS per parti (es. parti private), con la copia selettiva da itinerario a viaggio e con le query trasversali (es. tutte le spese, tutti i viaggi in corso).
- **Modello relazionale**, almeno per utenti, itinerari e viaggi, eventualmente anche per giorni, luoghi e attività. Pro: RLS per tabella, copia selettiva, stati e spese interrogabili. Contro: più tabelle e più migrazioni.
- **Misto**: relazionale per utenti, itinerari e viaggi, JSON per il contenuto dei giorni.

L'orientamento è verso il relazionale, da confermare strada facendo.

## Domande aperte

- Fino a che livello serve il relazionale (solo itinerari e viaggi, o anche giorni, luoghi, attività)?
- Le categorie delle attività: oggi l'elenco (trekking, food, museum, concert, any) non copre quelle usate nei mock (`sightseeing`, `accommodation`). Gli alloggi sono un'attività o un'entità a sé?
- Dipende dalle scelte in [Itinerario e viaggio](../viaggi/itinerario-e-viaggio.md) e [Condivisione](../viaggi/condivisione.md).
