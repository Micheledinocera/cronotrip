# Flussi: un solo oggetto, per ora

## Proposta dell'utente

Andiamo a ritroso e semplifichiamo il flusso. Esistono solo i viaggi (per ora possiamo chiamarli itinerari): itinerari e viaggi diventano indistinguibili. Al massimo esiste una **copia scheletro**, che non si porta dietro alcune informazioni, per esempio le foto. Così si mantiene la divisione tra viaggi e itinerari detta all'inizio, ma di oggetto ce n'è uno solo. Si comincia così, poi in un secondo momento si vede.

Questa direzione **sostituisce, per ora**, quella in [Itinerario e viaggio](../../wiki/viaggi/itinerario-e-viaggio.md) (itinerario come blueprint e viaggio come oggetto separato): l'ingest deve aggiornare quella decisione, non tenerla come conflitto.

## Analisi

- **Combacia con quello che c'è**: oggi esiste solo la tabella `itineraries` (proprietario + documento JSON). Non serve una tabella `trips`: il lavoro si sposta sui flussi (crea, modifica, copia), non sul modello dati.
- **Due copie**:
  - *copia completa*: duplica tutto il documento;
  - *copia scheletro*: tiene la struttura (nome, descrizioni, giorni, luoghi, attività con categoria, link, coordinate) e lascia fuori quello che appartiene a chi il viaggio l'ha fatto. Dal documento di oggi: `photos` a ogni livello, `price`, `moments`, la data dei giorni (`data`).
- È coerente con la [condivisione](../../wiki/viaggi/condivisione.md): "da un altro utente si copiano solo luoghi, spostamenti e attività" = la copia scheletro.
- **Proposta**: tenere sulla riga copiata un riferimento all'originale (`copied_from`). Costa una colonna, e permette più avanti di ritrovare la distinzione itinerario/viaggio ("questo nasce da quello") senza migrare i dati.

## Domande aperte

- Copiando un itinerario **di un altro utente**, la copia è sempre scheletro, o si può scegliere?
- Copiando un itinerario **proprio**, servono entrambe le copie?
- I `moments` sono "cosa è successo" (vanno tolti nella copia scheletro) o possono essere previsti in anticipo?
- Uno stato (in programmazione, in corso, fatto) e le date servono già sull'oggetto unico, o si rimandano?
- Le foto della copia completa: si riusano gli stessi file del bucket o si duplicano? Oggi l'app non carica né cancella foto, quindi riusarli è innocuo.
