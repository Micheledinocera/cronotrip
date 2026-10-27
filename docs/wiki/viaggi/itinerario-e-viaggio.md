---
tipo: decisione
stato: presa
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-base.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/study-current-state/2026-10-27-confronto-notion.md
  - raw/compiled/study-flows/2026-10-27-oggetto-unico.md
  - raw/compiled/study-flows/2026-10-27-risposte-copia-stato.md
  - raw/compiled/study-flows/2026-10-27-stato-manuale.md
---

# Itinerario e viaggio

Come si legano un itinerario e un viaggio.

## Cosa è deciso: un oggetto solo, per ora

- Itinerari e viaggi sono **indistinguibili**: esiste un solo oggetto, chiamato per ora **itinerario**. Non c'è un oggetto "viaggio" separato.
- La distinzione detta all'inizio (l'itinerario come base, il viaggio come quello che succede davvero) si ottiene con la **copia scheletro**: copiando un itinerario si porta dietro solo la struttura, non quello che è legato al viaggio di chi l'ha fatto.
- Si comincia così per semplificare; un oggetto viaggio separato si potrà rivalutare più avanti.

## Copia scheletro

- È l'**unica copia** che esiste: non c'è una copia completa.
- Vale sempre, sia copiando un itinerario proprio sia quello di un altro utente.
- **Si copia**: nome, descrizioni, giorni, luoghi, attività con categoria, descrizione, link e posizione.
- **Non si copia** quello che è successo o è legato al viaggio del singolo utente: foto (a ogni livello), prezzi, momenti, date dei giorni. I momenti sono "cosa è successo", quindi restano fuori.
- La copia **ricorda l'originale** (`copied_from`): permette più avanti di ritrovare la distinzione itinerario/viaggio ("questo nasce da quello") senza migrare i dati. Se l'originale viene cancellato, la copia resta e perde solo il riferimento.
- Una copia appena fatta parte dallo stato **in programmazione**.

## Stato

- Ogni itinerario ha uno stato: **in programmazione**, **in corso**, **fatto**.
- Si **cambia a mano**, non si ricava dalle date: così si possono aggiungere altri stati senza regole automatiche, per esempio **programmato** (non c'è più niente da sistemare, ma il viaggio non è ancora partito).

Come si regge nel database: [Modello dati](../architettura/modello-dati.md). I flussi che lo usano: [Flussi dell'itinerario](./flussi.md).

## Opzioni valutate

- **Itinerario come blueprint e viaggio come oggetto separato**, creato dall'itinerario e modificato da lì in poi (prezzi reali, foto, cambi di programma), con la possibilità di ricavare un nuovo itinerario da un viaggio. Era la direzione iniziale, dal [confronto con Notion](../business/organizzazione-con-notion.md). Messa da parte per ora: due oggetti e il passaggio tra loro sono più lavoro, e la copia scheletro dà la stessa separazione con un oggetto solo.
- **Copia completa** accanto alla copia scheletro: scartata per ora.
- **Stato ricavato dalle date**: scartato, lo stato è manuale.

## Domande aperte

- Le spese: un prezzo previsto e uno reale sullo stesso itinerario? Come si calcola il totale?
- Servono le date sull'itinerario (inizio e fine del viaggio), ora che lo stato non dipende da esse?
