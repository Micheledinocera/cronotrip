---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-design-brief/2026-10-29-materiale-esistente.md
  - raw/compiled/study-design-brief/2026-10-29-domande-design.md
---

# Schermate

Cosa cambia nelle schermate con il redesign: navigazione, login, dashboard, vista dell'itinerario, form. Lo stile: [Identità visiva](./identita-visiva.md). I flussi restano quelli di [Flussi dell'itinerario](../viaggi/flussi.md). I mockup li propone Claude Design dopo il design system.

## Cosa è deciso

### Navigazione

- **Barra in alto, sempre**, con il minimo indispensabile: **logo** (porta alla dashboard), **nuovo itinerario** (un "+" su mobile), **utente** con un menu contestuale per le altre voci (lingua, tema, versione, esci).
- Niente barra in basso su mobile.

### Login come ingresso

- La home pubblica (oggi solo nome e link) **sparisce**: si entra dal **login**. In questa fase le utenze le crea solo l'amministratore, quindi non serve una pagina che presenti l'app.

### Dashboard

- **Filtro "I miei" / "Degli altri"**, di default "I miei".
- **Ricerca** su nome e descrizione.
- **Card** con copertina, stato, descrizione breve, proprietario e numero di giorni.
- Altri filtri e ordinamenti si decidono più avanti.

### Vista dell'itinerario

- **Struttura di oggi confermata** (copertina, giorni, luoghi con foto di intestazione, attività, momenti), ma con più spazio e meno caos.
- **Drawer dell'itinerario**: oggi elenca i luoghi del giorno con la mappa del giorno, e piace. Diventa **un drawer unico con tutte le giornate**, segnate al suo interno.
- **Galleria**: le foto di attività e momenti sono miniature; toccandole si apre una galleria di **tutte le foto del viaggio**, divise per giorno, luogo e attività.

### Form

- Resta la pagina unica di [Flussi dell'itinerario](../viaggi/flussi.md), curata soprattutto per desktop.
- **Riordino**: il trascinamento si adotta se rende il form più usabile, altrimenti restano le frecce. Lo decide il redesign.

## Domande aperte

- Come compattare i momenti nella vista, e luoghi e attività nel form, per evitare la "valanga".
- Trascinamento o frecce per il riordino.
- Cosa diventa la route `/` senza la home pubblica (redirect al login o alla dashboard): da decidere con l'implementazione.
