# Foto nel bucket: com'è e cosa si rimanda

## Com'è oggi

- L'app non carica immagini: non c'è nessun upload nel codice. Le foto si mettono a mano nel bucket `Photos` dalla dashboard di Supabase e il documento dell'itinerario ne contiene il percorso (es. `Carpinone/carpinone 1.jpg`).
- Le cartelle (`Bassano`, `Carpinone`, `Castel San Vincenzo`, `Marmore/{Discesa,Fine,Inizio,pranzo,Salita}`, `Pescasseroli`, `private`) sono un'organizzazione manuale dell'utente, non la gestione definitiva: l'app non le conosce.
- Il bucket è **pubblico**: chi ha l'URL vede la foto anche senza login.
- Unica policy dello storage: ogni utente autenticato può caricare ovunque nel bucket. Nessuna policy di modifica o cancellazione.

## Decisione per la prima versione

- **Il bucket resta pubblico**, come scelta consapevole: renderlo privato richiede URL firmati con scadenza (`getImageUrl` asincrona, 17 punti da toccare), troppo per una versione minimale. Gli URL non sono facili da trovare se non vengono condivisi.
- Struttura delle cartelle, privacy e upload dall'app si rimandano alla **feature dei viaggi**: le foto appartengono al viaggio, non all'itinerario (non si copiano), e i viaggi non sono in questa versione.

## Proposta da valutare più avanti

- Percorsi `<owner_id>/<trip_id>/<file>`, con policy di storage "scrivi solo nella cartella col tuo id" (come per gli itinerari).
- Decidere se il bucket diventa privato (URL firmati) quando arrivano le foto personali dei viaggi.
- Spostare le foto di oggi nella nuova struttura: sono poche e i percorsi stanno solo nei documenti JSON.
