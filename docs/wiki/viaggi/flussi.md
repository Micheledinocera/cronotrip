---
tipo: decisione
stato: presa
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-flows/2026-10-27-form-creazione.md
  - raw/compiled/study-flows/2026-10-27-form-risposte.md
  - raw/compiled/study-flows/2026-10-27-modifica-cancellazione.md
---

# Flussi dell'itinerario

Come si crea, modifica, copia e cancella un itinerario. Il piano è deciso; l'implementazione è da fare. Cosa è un itinerario e cosa si copia: [Itinerario e viaggio](./itinerario-e-viaggio.md).

## Form di creazione e modifica

- **Un unico form** per creare e modificare: creare è modificare un itinerario vuoto. Due pagine (nuovo itinerario e modifica) sullo stesso form; il salvataggio crea o aggiorna.
- **Pagina unica organizzata per giorni**, come il form di oggi: dati generali e stato → giorni → per ogni giorno, sottotitolo e luoghi → per ogni luogo, nome, posizione e attività. Un form a passi non serve per ora.
- **Prima lo scheletro**: il form copre i campi che una copia si porta dietro (nome, descrizioni, stato, giorni, luoghi, attività con categoria, descrizione, link, posizione). **Foto, prezzi e momenti** vengono in un secondo passo; le foto richiedono l'upload dall'app, che oggi non c'è ([Foto](./foto.md)).
- **Posizione dei luoghi**: ricerca per nome (geocoding, per esempio Nominatim di OpenStreetMap: gratuito e senza chiave, ma con limiti d'uso) più una piccola mappa dove cliccare o spostare il punto. La posizione di un'attività è facoltativa.
- **Riordino** di giorni, luoghi e attività, già in creazione.
- **Validazione con uno schema** (per esempio Zod, accettato direttamente da `UForm` di Nuxt UI) al posto delle funzioni scritte a mano, valido anche per luoghi e attività annidati.
- **Testi tradotti** con i18n per etichette e messaggi.
- La data dei giorni resta fuori dal form: lo stato è manuale e le date non servono per ora.
- **Modifiche non salvate**: uscendo dal form compare un avviso ("se esci potresti perdere i dati").

Il form di oggi, da cui si parte: [Itinerary form](../tecnico/frontend/itinerary-form.md).

## Modifica, cancellazione, copia

- Le azioni stanno nella **pagina dell'itinerario**. **Modifica** ed **Elimina** si vedono solo per il proprietario (le policy del database già impediscono agli altri di farle). **Copia** per tutti gli utenti registrati ([Condivisione](./condivisione.md)).
- **Modifica**: apre il form con i dati caricati; al salvataggio si torna alla pagina dell'itinerario.
- **Cancellazione definitiva**, senza cestino: modale di conferma, poi si torna alla dashboard. Le copie restano e perdono solo il riferimento all'originale.

## Opzioni valutate

- **Form a passi** (c'è già uno `StepperWidget`): rimandato, per ora pagina unica.
- **Cestino** con recupero: scartato per la prima versione, più semplice la cancellazione definitiva.
- **Riordino solo in modifica**: scartato; il form è lo stesso, quindi il riordino c'è anche in creazione.

## Domande aperte

- La visualizzazione dell'itinerario, abbozzata ma la parte più matura, va rivista: da studiare in una feature a parte ([Itinerary view](../tecnico/frontend/itinerary-view.md)).
