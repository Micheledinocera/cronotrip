# Decisioni per la prima versione (db)

Risposte dell'utente, 2026-10-27:

- **Modello**: misto leggero. Tabella `itineraries` relazionale (id, proprietario, titolo, date di creazione e modifica) con il contenuto dei giorni ancora in una colonna JSON. Si riusano il documento e il form esistenti; i dati di produzione si migrano.
- **Permessi**: ogni utente loggato legge (e può copiare) tutti gli itinerari; solo il proprietario li modifica o li cancella.
- **Pubblico**: chi non ha fatto il login non vede niente, nemmeno il dettaglio di un itinerario. La pagina `/itinerario/:id` diventa privata.
- **Viaggi**: non entrano in questa prima versione, arrivano in una feature successiva.
