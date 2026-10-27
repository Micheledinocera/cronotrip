# Confronto Notion ↔ `umbria.json` (Claude, 2026-10-27)

Confronto tra la pagina Notion del viaggio "Umbria" (screen in `image-1.png`) e il mock `public/umbria.json`, per capire cosa manca al modello dati rispetto a come si organizza oggi un viaggio.

## Cosa c'è in Notion e manca nel JSON

- **Il viaggio ha date e stato**: nella lista (`image.png`) ogni viaggio ha un intervallo di date e uno stato (in programmazione, programmazione finita, fatto / "Ended"). Nel JSON le date sono solo nel testo della descrizione e lo stato non esiste.
- **Giorni con nome**: Notion usa i giorni della settimana (Venerdì, Sabato, Domenica). Il JSON ha 2 giorni con `subtitle` vuoto; la Domenica ("Ritorno") non c'è.
- **Tappe opzionali**: Notion segna gli "Extra" (Castel San Vincenzo, Lago di San Domenico, Mole di Narni). Il JSON non ha il concetto di opzionale; Lago di San Domenico e Mole di Narni mancano.
- **Stati operativi** sulle singole voci: "da prenotare" (ristoranti), e dalla nota dell'utente anche "da saldare" (hotel). Il JSON non ha stati.
- **Alloggi**: Notion ha l'alloggio di ogni notte (Albergo del Sangro a Pescasseroli, Casa Matilde a Bassano in Teverina). Nel JSON c'è solo Casa Matilde, come attività di categoria `accommodation`.
- **Indirizzi e link a Maps** per ogni luogo, alloggio e ristorante. Il JSON ha coordinate e al massimo un link per attività.
- **Informazioni pratiche**: orari (Cascate delle Marmore "dalle 11.00 alle 18.00"), parcheggio gratuito, indicazioni per il sentiero.
- **Spese**: già sostenute e da sostenere, con totale (dalla nota dell'utente). Il JSON ha un prezzo per attività, senza totale né distinzione pagato / da pagare.

## Cosa c'è nel JSON e manca in Notion

- **Foto** su luoghi, attività e momenti: Notion serve solo per organizzare, il JSON è già pensato per il racconto.
- **Momenti** dentro un'attività (es. inizio sentiero → cascate), con coordinate e foto.
- **Categorie** delle attività, con un componente di visualizzazione per categoria.

## Incongruenze nel JSON e nel codice

- Il JSON usa il campo `prezzo`, il codice (`Activity.price`, componenti `Events/*`) legge `price`: i prezzi non vengono mai mostrati.
- Il JSON usa le categorie `sightseeing` e `accommodation`, che non sono in `categorie.json` (trekking, food, museum, concert, any).
- `duration` è nel JSON ma non nell'interfaccia `Itinerary`.

## Spunti per il modello dati

Le due fonti corrispondono alle due fasi del viaggio: Notion è la **programmazione** (date, stati, prenotazioni, spese, extra), il JSON è il **racconto** (foto, momenti). Questo è coerente con l'idea itinerario (blueprint) → viaggio (istanza con stato e valorizzazioni):

- appartengono all'itinerario, e si copiano: giorni, luoghi, spostamenti, attività, categorie, extra, info pratiche, link;
- appartengono al viaggio, e non si copiano: date, stato, stati operativi (da prenotare / da saldare), spese reali, foto, momenti, note personali.

Da validare con l'utente.
