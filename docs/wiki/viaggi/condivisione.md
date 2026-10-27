---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-base.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
---

# Condivisione

Chi vede gli itinerari e i viaggi degli altri, e cosa si può copiare.

## Cosa è deciso

- Per ora è **tutto visibile e copiabile** tra gli utenti.
- **Regola temporanea nel database**: itinerari e categorie si leggono e si scrivono solo da utenti autenticati, "così siamo tranquilli fino a quando non risolviamo bene il giro". Policy in [Database](../tecnico/supabase/database.md).
- Quando si copia, si portano solo **luoghi, spostamenti e attività**. Le **foto** e le **valorizzazioni** (prezzi reali, spese) non si copiano.

## Opzioni valutate

- In futuro alcune parti potranno essere **private**: da capire quali e con che granularità.

## Domande aperte

- Da un viaggio di un altro utente si copia il suo itinerario di partenza o il viaggio "ripulito"? Vedi [Itinerario e viaggio](./itinerario-e-viaggio.md).
- Quali parti potranno diventare private (note, spese, foto, l'intero viaggio)?
- "Tutto visibile" significa visibile agli utenti registrati o anche a chi non ha fatto il login? Oggi la pagina del dettaglio di un itinerario è pubblica, ma con la regola temporanea chi non ha fatto il login non ne legge i dati: va deciso quale delle due cambia ([Itinerary view](../tecnico/frontend/itinerary-view.md)).
