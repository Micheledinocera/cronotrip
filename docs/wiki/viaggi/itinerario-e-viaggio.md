---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-base.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/study-current-state/2026-10-27-confronto-notion.md
---

# Itinerario e viaggio

Come si legano un itinerario e un viaggio.

## Cosa è deciso

- L'**itinerario** è un *blueprint*: la base da cui si crea un viaggio.
- Il **viaggio** nasce dall'itinerario, e da quel momento tutte le modifiche vanno solo sul viaggio (prezzi reali, foto, cambi di programma). L'itinerario di partenza non cambia.
- Da un viaggio, con le sue modifiche, si può ricavare un **nuovo itinerario**.
- Un viaggio ha uno stato nel tempo.

La direzione è questa; i dettagli si chiariscono strada facendo.

## Cosa sta nell'itinerario e cosa nel viaggio (proposta)

Dal [confronto con Notion](../business/organizzazione-con-notion.md):

- **Itinerario**, si copia: giorni, luoghi, spostamenti, attività, categorie, extra, informazioni pratiche, link.
- **Viaggio**, non si copia: date, stato, stati operativi (da prenotare, da saldare), spese reali, foto, momenti, note personali.

È coerente con le regole di copia della [condivisione](./condivisione.md), ma va ancora validata.

## Domande aperte

- Quali stati ha un viaggio? Le note parlano di "in programma / in corso / trascorsa", Notion usa "in programmazione / programmazione finita / fatto". Potrebbero servire tutti: in programmazione, pronto, in corso, fatto.
- Le date di un viaggio si salvano o si ricavano dai giorni? L'itinerario ha solo giorni relativi (giorno 1, 2…)?
- I momenti dentro un'attività appartengono solo al viaggio, o un itinerario può prevederli?
- Le spese: un prezzo previsto nell'itinerario e uno reale nel viaggio? Come si calcola il totale?
- Il modello dati che regge tutto questo: vedi [Modello dati](../architettura/modello-dati.md).
