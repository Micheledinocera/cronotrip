---
tipo: decisione
stato: presa
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-flows/2026-10-27-form-creazione.md
  - raw/compiled/study-flows/2026-10-27-form-risposte.md
  - raw/compiled/study-flows/2026-10-27-modifica-cancellazione.md
  - raw/compiled/itinerary-flow/2026-10-29-obiettivo.md
  - raw/compiled/itinerary-flow/2026-10-29-implementazione.md
  - raw/compiled/itinerary-flow/2026-10-29-task1.md
  - raw/compiled/study-design-brief/2026-10-29-domande-design.md
---

# Flussi dell'itinerario

Come si crea, modifica, copia e cancella un itinerario. Cosa è un itinerario e cosa si copia: [Itinerario e viaggio](./itinerario-e-viaggio.md). Come è fatto nel codice: [Itinerary form](../tecnico/frontend/itinerary-form.md) e [Itinerary view](../tecnico/frontend/itinerary-view.md).

## Form di creazione e modifica

- **Un unico form** per creare e modificare: creare è modificare un itinerario vuoto. Due pagine (nuovo itinerario e modifica) sullo stesso form; il salvataggio crea o aggiorna.
- **Pagina unica organizzata per giorni**: dati generali e stato → giorni → per ogni giorno, sottotitolo e luoghi → per ogni luogo, nome, foto di intestazione, posizione e attività. Un form a passi non serve per ora.
- **Prima lo scheletro**: il form copre i campi che una copia si porta dietro (nome, descrizioni, stato, giorni, luoghi, attività con categoria, descrizione, link, posizione) più la **foto di intestazione del luogo**. Le altre foto, i prezzi e i momenti vengono in un secondo passo; intanto un salvataggio li conserva così come sono.
- **Campi obbligatori**: nome, descrizione breve (al massimo 50 caratteri), descrizione, stato, almeno un giorno; per ogni giorno il sottotitolo; per ogni luogo nome e posizione; per ogni attività nome e categoria. La descrizione **non ha un limite** di lunghezza: nel database non c'è un vincolo da rispettare.
- **Link** di un'attività: facoltativo; un link senza testo mostra l'indirizzo, che deve iniziare con `http://` o `https://`.
- **Posizione dei luoghi**: ricerca per nome su Nominatim di OpenStreetMap (gratuito e senza chiave; si cerca con il pulsante, non mentre si scrive, come chiedono le sue regole d'uso) più una mappa dove cliccare per mettere o spostare il punto. La posizione di un'attività è facoltativa.
- **Riordino** di giorni, luoghi e attività, già in creazione, con i pulsanti "sposta prima" e "sposta dopo". Il trascinamento si adotta se il redesign lo trova più usabile ([Schermate](../design/schermate.md)).
- **Errori**: il form porta al primo giorno con errori e al primo campo da correggere.
- **Testi tradotti** (italiano e inglese) per etichette e messaggi.
- La data dei giorni resta fuori dal form: lo stato è manuale e le date non servono per ora.
- **Modifiche non salvate**: uscendo dal form compare un avviso ("se esci potresti perdere i dati"), anche chiudendo o ricaricando la scheda.
- **Foto di intestazione del luogo**: si carica dal form; cosa succede al file è in [Foto](./foto.md).

## Modifica, cancellazione, copia

- Le azioni stanno nella **pagina dell'itinerario**, insieme allo stato. **Modifica** ed **Elimina** si vedono solo per il proprietario (le policy del database già impediscono agli altri di farle). **Copia** per tutti gli utenti registrati ([Condivisione](./condivisione.md)).
- **Modifica**: apre il form con i dati caricati; al salvataggio si torna alla pagina dell'itinerario.
- **Cancellazione definitiva**, senza cestino: modale di conferma, poi si torna alla dashboard. Si cancellano anche le foto caricate dall'app per quell'itinerario. Le copie restano e perdono solo il riferimento all'originale.
- **Copia**: crea la copia scheletro e apre la sua pagina. Il nome è quello dell'originale seguito da "(copia)", per ora.

## Opzioni valutate

- **Form a passi** (c'è già uno `StepperWidget`): rimandato, per ora pagina unica.
- **Cestino** con recupero: scartato per la prima versione, più semplice la cancellazione definitiva.
- **Riordino solo in modifica**: scartato; il form è lo stesso, quindi il riordino c'è anche in creazione.
- **Riordino trascinando**: rimandato al redesign, per ora pulsanti.
- **Copia con lo stesso nome**: scartata; il suffisso "(copia)" è una scelta momentanea.

## Domande aperte

- La visualizzazione dell'itinerario, abbozzata ma la parte più matura, va rivista: da studiare in una feature a parte ([Itinerary view](../tecnico/frontend/itinerary-view.md)).
- Gli itinerari creati prima del form possono avere una descrizione breve oltre i 50 caratteri o sottotitoli vuoti: per salvarli in modifica vanno sistemati.
