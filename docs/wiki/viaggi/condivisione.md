---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-base.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
  - raw/compiled/starting-point/2026-10-27-decisioni-db.md
---

# Condivisione

Chi vede gli itinerari e i viaggi degli altri, e cosa si può copiare.

## Cosa è deciso

- Per ora è **tutto visibile e copiabile tra gli utenti registrati**: ogni utente loggato legge tutti gli itinerari.
- **Solo il proprietario** (chi ha creato l'itinerario) lo modifica o lo cancella.
- **Chi non ha fatto il login non vede niente**, nemmeno il dettaglio di un itinerario: un link condiviso porta al login.
- Quando si copia, si portano solo **luoghi, spostamenti e attività**. Le **foto** e le **valorizzazioni** (prezzi reali, spese) non si copiano.
- Eccezione consapevole: le **foto** del bucket sono raggiungibili da chiunque abbia l'URL, vedi [Foto](./foto.md).

Policy nel database: [Database](../tecnico/supabase/database.md).

## Opzioni valutate

- In futuro alcune parti potranno essere **private**: da capire quali e con che granularità.
- La lettura pubblica del dettaglio (anche senza login, per condividere un link) è stata scartata per la prima versione: esporrebbe i dati.

## Domande aperte

- Da un viaggio di un altro utente si copia il suo itinerario di partenza o il viaggio "ripulito"? Vedi [Itinerario e viaggio](./itinerario-e-viaggio.md).
- Quali parti potranno diventare private (note, spese, foto, l'intero viaggio)?
