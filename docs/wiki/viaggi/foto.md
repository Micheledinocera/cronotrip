---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-29
fonti:
  - raw/compiled/starting-point/2026-10-27-foto-bucket.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
  - raw/compiled/study-flows/2026-10-27-risposte-copia-stato.md
  - raw/compiled/study-flows/2026-10-27-form-risposte.md
  - raw/compiled/itinerary-flow/2026-10-29-task1.md
---

# Foto

Dove stanno le foto, chi le vede e come si organizzano.

## Com'è oggi

- Le foto stanno nel bucket `Photos`; il documento dell'itinerario ne contiene il **percorso** nel bucket, oppure un URL completo, usato così com'è.
- Dall'app si carica per ora solo la **foto di intestazione di un luogo** (la prima foto del luogo, quella che la pagina dell'itinerario mostra in testa al luogo). Le altre foto (dell'itinerario, delle attività, dei momenti) si mettono ancora a mano nel bucket dalla dashboard di Supabase.
- Le foto messe a mano prima dell'upload stanno in cartelle libere (es. `Carpinone/carpinone 1.jpg`) e restano lì.
- Dettagli tecnici del bucket e delle policy: [Database](../tecnico/supabase/database.md).

## Cosa è deciso

- **Struttura delle cartelle** per le foto caricate dall'app: `<id del proprietario>/<id dell'itinerario>/<file>`. L'id dell'itinerario c'è sempre.
- In un itinerario nuovo, che non ha ancora un id, la foto scelta resta **parcheggiata nel browser** fino al primo salvataggio, e solo allora viene caricata. Scelta al posto di creare l'itinerario al primo caricamento, che lascerebbe itinerari vuoti se si abbandona il form. Anche in modifica la foto si carica al salvataggio: annullando non restano file inutili.
- Le foto non più usate da un itinerario (sostituite o tolte) vengono **cancellate** al salvataggio; cancellando l'itinerario si cancella la sua cartella.
- **Permessi**: ognuno carica solo nella propria cartella e solo per un proprio itinerario; vede l'elenco e cancella solo le proprie foto. Prima ogni utente registrato poteva caricare ovunque.
- Solo immagini, al massimo 10 MB ciascuna.
- Per la prima versione il **bucket resta pubblico** in lettura: chi ha l'URL vede la foto anche senza login. È una scelta consapevole: renderlo privato richiede URL firmati con scadenza (`getImageUrl` asincrona, molti punti da toccare), troppo per una versione minimale. Gli URL non sono facili da trovare se non vengono condivisi.
- Le foto appartengono al viaggio di chi l'ha fatto: la copia scheletro **non le copia** ([Itinerario e viaggio](./itinerario-e-viaggio.md)), quindi copie diverse non condividono mai un file.

## Opzioni valutate

- `<id del proprietario>/<file>`, senza l'itinerario: permetteva l'upload prima del primo salvataggio, ma le foto non sarebbero raggruppate per itinerario. Scartata.
- Creare l'itinerario al primo caricamento di una foto: scartata, vedi sopra.
- Bucket privato con URL firmati: più riservato, ma più lavoro nel frontend. Rimandato.

## Domande aperte

- Il bucket diventa privato quando arrivano le foto personali?
- Le foto messe a mano vanno spostate nella nuova struttura? Sono poche e i percorsi stanno solo nei documenti JSON.
- Upload delle altre foto (itinerario, attività, momenti): quando arrivano foto, prezzi e momenti nel form.
