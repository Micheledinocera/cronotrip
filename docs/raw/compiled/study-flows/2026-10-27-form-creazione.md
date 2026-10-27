# Form di creazione — stato attuale e piano

L'utente vuole pianificare l'implementazione dei flussi: creazione, modifica, cancellazione e poi la visualizzazione. Si parte dal form di creazione, già cominciato ma con pochissimo dentro e da sistemare.

## Com'è oggi

`app/pages/itinerario/new.vue` + `app/components/itinerary/ItineraryDayForm.vue`:

- campi dell'itinerario: nome, descrizione breve (max 50), descrizione (il contatore dice /100 ma il limite non è controllato);
- giorni: `DaySelector` aggiunge e toglie giorni; per il giorno selezionato c'è solo il sottotitolo;
- "Aggiungi luogo" aggiunge un luogo vuoto, ma il form del luogo (`ItineraryPlaceForm`) non esiste: è commentato. Non si possono inserire luoghi né attività;
- validazione a mano: una funzione `validate` sulla pagina che raccoglie quella del giorno via `ref`. Con luoghi e attività annidati diventa difficile da tenere;
- etichette tecniche (`name`, `short_desc`) invece che testi tradotti, anche se `@nuxtjs/i18n` è già nel progetto;
- non c'è la modifica: il salvataggio fa solo `insert`.

## Proposta di piano (da validare)

1. **Un solo form per creare e modificare**: la modifica serve comunque, e creare è modificare un itinerario vuoto. Due pagine (`/itinerario/new`, una pagina di modifica) sullo stesso componente; il salvataggio fa `insert` o `update`.
2. **Prima lo scheletro**: il form copre per primi i campi che una copia si porta dietro (nome, descrizioni, stato, giorni, luoghi, attività con categoria, descrizione, link, posizione). Foto, prezzi e momenti, cioè i dati del viaggio vissuto, in un secondo passo: le foto richiedono l'upload, che oggi non c'è ([Foto](../../wiki/viaggi/foto.md)).
3. **Struttura**: dati generali + stato → giorni (il `DaySelector` che c'è) → per ogni giorno, sottotitolo e lista dei luoghi → per ogni luogo, nome, posizione e lista delle attività.
4. **Posizione dei luoghi**: oggi bisognerebbe scrivere latitudine e longitudine. Proposta: ricerca per nome (geocoding, per esempio Nominatim di OpenStreetMap, gratuito e senza chiave, ma con limiti d'uso) più una piccola mappa Leaflet dove cliccare o spostare il punto. La posizione di un'attività è facoltativa.
5. **Validazione con uno schema** (per esempio Zod, che `UForm` di Nuxt UI accetta direttamente) al posto delle funzioni a mano: copre luoghi e attività annidati con un solo schema, riusabile anche in modifica.
6. **Testi tradotti** con i18n per etichette e messaggi.
7. **Database** (migrazione nella feature di implementazione): colonna dello stato, con gli stati in una tabella a parte come le categorie (così se ne aggiungono altri senza toccare lo schema), e `copied_from`.
8. La data dei giorni (`Day.data`) resta fuori dal form: lo stato è manuale, le date non servono per ora.

## Domande per l'utente

- Va bene partire dallo scheletro e rimandare foto, prezzi e momenti?
- Posizione dei luoghi: ricerca per nome + mappa va bene?
- Una pagina unica, o un form a passi (c'è già uno `StepperWidget`)?
- Serve poter riordinare luoghi e attività (trascinandoli) già dalla prima versione?
