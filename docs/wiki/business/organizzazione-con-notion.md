---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/study-current-state/2026-10-27-confronto-notion.md
  - raw/compiled/study-current-state/image.png
  - raw/compiled/study-current-state/image-1.png
---

# Come si organizza un viaggio oggi (Notion)

Oggi i viaggi si organizzano su Notion. È il riferimento per la parte organizzativa di Cronotrip; Notion invece non ha le foto né il racconto del viaggio.

## La lista dei viaggi

Una pagina per viaggio, in una lista con:

- l'intervallo di date (es. Umbria, 19–21 settembre 2025);
- lo stato: in programmazione, programmazione finita, viaggio fatto ("Ended").

## La pagina di un viaggio

- Il programma **giorno per giorno**, con i giorni della settimana (Venerdì, Sabato, Domenica), fino al ritorno.
- Per ogni giorno i luoghi, e per ogni luogo alloggi, ristoranti e attività.
- Un **link a Maps** e l'indirizzo per ogni luogo, alloggio e ristorante.
- Le tappe **opzionali**, segnate come "Extra".
- **Informazioni pratiche** e note: orari di apertura, parcheggio, indicazioni per un sentiero.
- Gli **stati operativi** delle singole voci: ristorante da prenotare, hotel da saldare.
- Le **spese** già sostenute e da sostenere, con il totale.

## Programmazione e racconto

Notion copre la **programmazione** (date, stati, prenotazioni, spese, extra). Il prototipo di Cronotrip copre il **racconto** (foto, momenti, categorie delle attività): vedi [Itinerary document](../tecnico/frontend/itinerary-document.md). Il modello dati deve coprire entrambe le fasi: vedi [Itinerario e viaggio](../viaggi/itinerario-e-viaggio.md).

Nel mock `umbria.json`, rispetto alla pagina Notion dello stesso viaggio, mancano: il giorno di ritorno, gli extra Lago di San Domenico e Mole di Narni, l'Albergo del Sangro, gli stati, gli orari e le spese.
