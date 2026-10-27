---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/starting-point/2026-10-27-foto-bucket.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
  - raw/compiled/study-flows/2026-10-27-risposte-copia-stato.md
  - raw/compiled/study-flows/2026-10-27-form-risposte.md
---

# Foto

Dove stanno le foto, chi le vede e come si organizzano.

## Com'è oggi

- L'app **non carica** immagini: le foto si mettono a mano nel bucket `Photos` dalla dashboard di Supabase, e il documento dell'itinerario ne contiene il percorso (es. `Carpinone/carpinone 1.jpg`). In alternativa può contenere un URL completo, usato così com'è.
- Le cartelle del bucket sono un'organizzazione manuale, non la gestione definitiva: l'app non le conosce.
- Dettagli tecnici del bucket e delle policy: [Database](../tecnico/supabase/database.md).

## Cosa è deciso

- Per la prima versione il **bucket resta pubblico**: chi ha l'URL vede la foto anche senza login. È una scelta consapevole: renderlo privato richiede URL firmati con scadenza (`getImageUrl` asincrona, molti punti da toccare), troppo per una versione minimale. Gli URL non sono facili da trovare se non vengono condivisi.
- Le foto appartengono al viaggio di chi l'ha fatto: la copia scheletro **non le copia** ([Itinerario e viaggio](./itinerario-e-viaggio.md)).
- Struttura delle cartelle, privacy e upload dall'app si decidono quando il form gestirà le foto: il [form](./flussi.md) parte dallo scheletro e aggiunge foto, prezzi e momenti in un secondo passo.

## Opzioni valutate

- Percorsi `<owner_id>/<itinerary_id>/<file>`, con una policy di storage "scrivi solo nella cartella col tuo id", come per gli itinerari. Proposta, da valutare con l'upload.
- Bucket privato con URL firmati: più riservato, ma più lavoro nel frontend.

## Domande aperte

- Il bucket diventa privato quando arriva l'upload delle foto personali?
- Le foto di oggi vanno spostate nella nuova struttura: sono poche e i percorsi stanno solo nei documenti JSON.
- Oggi ogni utente loggato può caricare ovunque nel bucket, e nessuno può modificare o cancellare: va rivisto insieme all'upload.
