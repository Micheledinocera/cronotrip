---
tipo: decisione
stato: presa
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-design-brief/2026-10-29-materiale-esistente.md
  - raw/compiled/study-design-brief/2026-10-29-domande-design.md
  - raw/compiled/study-design-system/2026-10-29-mockup.md
  - raw/compiled/study-design-system/2026-10-29-mockup-revisione-drawer.md
  - raw/compiled/ui/2026-10-29-schermate.md
---

# Schermate

Come sono fatte le schermate con il redesign: navigazione, login, dashboard, vista dell'itinerario, form. Lo stile: [Identità visiva](./identita-visiva.md); le mappe: [Mappe](./mappe.md). I flussi restano quelli di [Flussi dell'itinerario](../viaggi/flussi.md).

I **mockup** di tutte le schermate, desktop (1440 px) e mobile (390 px), chiaro e scuro, con gli stati principali: https://claude.ai/artifact/CBWByTBhBsEnUL6eTQATrf (artifact privato del proprietario del progetto). Questa pagina ne riassume le scelte.

## Com'è oggi

Il redesign qui sotto è implementato in tutte le schermate: login, dashboard, vista con drawer e galleria, form. Come sono fatte nel codice: [Auth and app shell](../tecnico/frontend/auth-and-shell.md), [Itinerary view](../tecnico/frontend/itinerary-view.md), [Itinerary form](../tecnico/frontend/itinerary-form.md). Le schermate prima del redesign: screenshot in `docs/raw/compiled/study-design-brief/screenshots/`.

## Cosa è deciso

### Navigazione

- **Barra in alto, sempre**, con il minimo indispensabile: **logo** (porta alla dashboard), **nuovo itinerario** (pulsante con testo su desktop, "+" su mobile), **avatar** con un menu per lingua, tema, versione ed "Esci".
- Niente barra in basso su mobile, niente pulsante "indietro".

### Login come ingresso

- La home pubblica **sparisce**: la route `/` porta alla dashboard, e chi non è entrato finisce sul **login**, l'unica schermata "di benvenuto" (una foto, il logo, "Dove si va?"). Email e password, nessuna registrazione.
- Stati: errore ("Email o password non tornano.") e invio in corso.

### Dashboard

- Titolo "I tuoi viaggi", **filtro "I miei" / "Degli altri"** (default "I miei"), **ricerca** su nome e descrizione.
- **Card** a griglia (4 colonne su desktop, 1 su mobile): copertina con il badge dello stato, nome, descrizione breve, proprietario, numero di giorni. Tutta la card apre l'itinerario.
- Stati: nessun itinerario ("Nessun viaggio, per ora" + "Dove si va?"), nessun risultato, caricamento (scheletri), copertina mancante (marchio su fondo tenue).
- Altri filtri e ordinamenti si decidono più avanti.

### Vista dell'itinerario

- **Copertina** grande con stato, nome, descrizione breve, proprietario e giorni; sotto, la descrizione in corsivo.
- **Azioni**: su desktop "Copia", "Modifica" e un menu "⋮" con "Elimina" sopra la copertina; su mobile tutte nel menu "⋮". Modifica ed Elimina solo per il proprietario.
- **Giorni**: si sceglie il giorno con dei chip ("Giorno 1", "Giorno 2", …), un giorno alla volta, con il sottotitolo come titolo.
- **Luoghi**: la foto di intestazione è la protagonista, con il nome e il numero sopra e una **mini mappa incastonata** nell'angolo, che si ingrandisce al tocco.
- **Attività**: icona della categoria, nome, descrizione, link, miniature delle foto.
- **Momenti chiusi** di default: una riga con l'etichetta del gruppo, il conteggio e i primi nomi (es. "MENU · 4 — Funghi e tartufo, Arrosticini…"); si aprono al tocco. È la scelta che toglie la "valanga".
- Contenuto in **una colonna centrale** anche su desktop, niente pannelli fissi a lato.

### Drawer del viaggio

- **Un drawer unico, su desktop e su mobile**: lo apre un pulsante flottante "Il viaggio · Giorno N". Su desktop entra da destra (`USlideover`), su mobile dal basso (`UDrawer`).
- Dentro: la **mappa di tutto l'itinerario** e l'elenco di **tutte le giornate** con i loro luoghi; il luogo visibile è evidenziato, toccando un luogo si va lì.
- **Toccando un giorno** la mappa **evidenzia solo quel tratto** (i suoi luoghi numerati e il suo percorso nel primario, il resto in grigio) e compare "Tutto il viaggio" per tornare indietro; toccarlo di nuovo fa lo stesso.

### Galleria

- Sempre scura, a tutto schermo: la foto grande, il titolo "attività · giorno · luogo", il contatore e una striscia di miniature raggruppate per giorno e luogo. Parte dalla foto toccata.

### Conferme

- **Eliminazione**: modale "Eliminare l'itinerario?" / "«Umbria Trip» verrà eliminato definitivamente. Le sue copie restano.", con Annulla ed Elimina.
- **Modifiche non salvate**: una modale ("Uscire senza salvare?" / "Se esci perdi le modifiche.", Resta / Esci) al posto del `confirm` del browser.

### Form

- Resta la pagina unica di [Flussi dell'itinerario](../viaggi/flussi.md), uguale per "Nuovo itinerario" e "Modifica itinerario" (cambiano titolo e pulsante: "Crea itinerario" / "Salva modifiche").
- **Desktop**: barra fissa in alto con titolo, "Annulla" e salvataggio; a sinistra **dati generali** e **lista dei giorni**, a destra il **giorno scelto** con sottotitolo e luoghi.
- **Mobile**: sezioni una sotto l'altra, giorni come chip con "+", barra in basso fissa con Annulla e salvataggio.
- **Luoghi e attività in pannelli richiudibili**: aperti mostrano i campi (nome, posizione con ricerca e mappa, foto di intestazione; per l'attività categoria, descrizione, link, posizione facoltativa), chiusi una riga di riepilogo (numero, miniatura, nome, conteggio delle attività).
- **Riordino per trascinamento** con una maniglia su giorni, luoghi e attività; le frecce restano come alternativa da tastiera.
- **Errori**: messaggio sotto il campo, segno d'errore sul giorno nella lista, toast "C'è qualcosa da sistemare" che dice dove guardare.

## Domande aperte

- Il nome del proprietario (card, copertina) viene dal profilo dell'utente ([Modello dati](../architettura/modello-dati.md)), ma non c'è ancora una schermata per cambiarlo.
