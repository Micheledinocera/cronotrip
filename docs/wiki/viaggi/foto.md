---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/starting-point/2026-10-27-foto-bucket.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
---

# Foto

Dove stanno le foto, chi le vede e come si organizzano.

## Com'è oggi

- L'app **non carica** immagini: le foto si mettono a mano nel bucket `Photos` dalla dashboard di Supabase, e il documento dell'itinerario ne contiene il percorso (es. `Carpinone/carpinone 1.jpg`). In alternativa può contenere un URL completo, usato così com'è.
- Le cartelle del bucket sono un'organizzazione manuale, non la gestione definitiva: l'app non le conosce.
- Dettagli tecnici del bucket e delle policy: [Database](../tecnico/supabase/database.md).

## Cosa è deciso

- Per la prima versione il **bucket resta pubblico**: chi ha l'URL vede la foto anche senza login. È una scelta consapevole: renderlo privato richiede URL firmati con scadenza (`getImageUrl` asincrona, molti punti da toccare), troppo per una versione minimale. Gli URL non sono facili da trovare se non vengono condivisi.
- Struttura delle cartelle, privacy e upload dall'app si decidono con la **feature dei viaggi**: le foto appartengono al viaggio, non all'itinerario, e non si copiano ([Condivisione](./condivisione.md), [Itinerario e viaggio](./itinerario-e-viaggio.md)).

## Opzioni valutate

- Percorsi `<owner_id>/<trip_id>/<file>`, con una policy di storage "scrivi solo nella cartella col tuo id", come per gli itinerari. Proposta, da valutare con i viaggi.
- Bucket privato con URL firmati: più riservato, ma più lavoro nel frontend.

## Domande aperte

- Il bucket diventa privato quando arrivano le foto personali dei viaggi?
- Le foto di oggi vanno spostate nella nuova struttura: sono poche e i percorsi stanno solo nei documenti JSON.
- Oggi ogni utente loggato può caricare ovunque nel bucket, e nessuno può modificare o cancellare: va rivisto insieme all'upload.
