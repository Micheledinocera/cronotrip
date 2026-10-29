# Materiale esistente per il design brief

Cosa c'è già da passare a Claude Design per il design system e il design delle schermate, raccolto il 2026-10-29 dopo il merge di `itinerary-flow` (form completo, modifica, stati, foto di intestazione). Le domande ancora aperte sono in [2026-10-29-domande-design.md](./2026-10-29-domande-design.md).

## Prodotto e regole (dal wiki)

Da passare così come sono, o riassunti nel brief:

- Cos'è Cronotrip e a che bisogni risponde: [cronotrip.md](../../wiki/business/cronotrip.md). Via di mezzo tra **diario di viaggio** (racconto: foto, momenti) e **gestore di viaggi** (programmazione: giorni, luoghi, stati, spese).
- Come si organizza un viaggio oggi su Notion, il riferimento per la parte organizzativa: [organizzazione-con-notion.md](../../wiki/business/organizzazione-con-notion.md).
- Ispirazione: Wanderlog ([concorrenti.md](../../wiki/business/concorrenti.md)).
- Oggetto unico itinerario, copia scheletro, stati manuali: [itinerario-e-viaggio.md](../../wiki/viaggi/itinerario-e-viaggio.md).
- Chi vede e chi fa cosa: [condivisione.md](../../wiki/viaggi/condivisione.md).
- Form, modifica, copia, cancellazione: [flussi.md](../../wiki/viaggi/flussi.md).
- Foto: [foto.md](../../wiki/viaggi/foto.md).
- Utenti: uso personale più pochi amici, costo zero, sito statico.

## Struttura dei dati da mostrare

Itinerario → giorni → luoghi → attività → momenti ([itinerary-document.md](../../wiki/tecnico/frontend/itinerary-document.md)).

- **Itinerario**: nome, descrizione breve (max 50 caratteri), descrizione, stato, foto, proprietario, copia di un altro.
- **Giorno**: sottotitolo (data per ora non usata).
- **Luogo**: nome, posizione, foto di intestazione (più altre foto).
- **Attività**: nome, categoria, descrizione, link, posizione facoltativa, prezzo, foto, momenti.
- **Momento**: nome, descrizione, foto, prezzo, posizione. Nella vista l'etichetta dipende dalla categoria (es. "Tappe" per il trekking, "Menu" per il cibo).
- **Stati**: In programmazione, In corso, Fatto (ne potranno arrivare altri, es. Programmato).
- **Categorie** e icone di oggi (`atoms/TypeIcon.vue`): Trekking (`iconoir:trekking`), Cibo (`fluent:food-20-filled`), Museo (`icon-park-solid:museum-one`), Concerto (`streamline-ultimate:concert-dj-bold`), Altro (`material-symbols:search-activity`). Nel mock ci sono anche `sightseeing` e `accommodation`, fuori elenco.
- **Contenuto realistico**: `public/umbria.json` (Umbria Trip, tre giorni, foto a ogni livello, prezzi, momenti, tutte le categorie). La descrizione è in inglese mentre l'interfaccia è in italiano.

## Schermate di oggi

| Schermata | Route | Accesso | Note |
|---|---|---|---|
| Home | `/` | pubblica | solo nome dell'app e link al login |
| Login | `/login` | pubblica | email e password, niente registrazione |
| Dashboard | `/dashboard` | loggato | elenco di tutti gli itinerari (propri e altrui insieme), "Nuovo itinerario" |
| Vista itinerario | `/itinerario/:id` | loggato | copertina, nome, stato, azioni (Modifica, Copia, Elimina), giorni, luoghi, attività, momenti, mappe, stepper laterale |
| Modale elimina | sulla vista | proprietario | conferma della cancellazione definitiva |
| Nuovo itinerario | `/itinerario/new` | loggato | form unico, organizzato per giorni |
| Modifica itinerario | `/itinerario/modifica/:id` | proprietario | stesso form |

Header comune: indietro, tema chiaro/scuro, lingua (it/en), logout, versione.

Schermate e stati che **non esistono** ancora e che il design dovrebbe coprire: dashboard vuota, caricamento, errori (oggi solo toast), itinerario non trovato, avviso di modifiche non salvate (oggi il `confirm` del browser), slide-over della mappa del giorno, mappa dei momenti in modale, foto ingrandite.

## Screenshot

In [screenshots/](./screenshots/), fatti sullo stack locale con i dati del seed, il 2026-10-29. Nome: `<schermata>-<mobile|desktop>-<dark|light>.jpg` (mobile 390×844, desktop 1440×900). Schermate: `home`, `login`, `dashboard`, `itinerario`, `elimina`, `nuovo`, `modifica`. Le versioni `-intera` sono a pagina intera (vista e form, tema scuro).

## Stato grafico di oggi

- **Nessuna identità**: niente logo, font, palette o tono di voce. Componenti Nuxt UI quasi di default.
- **Colore primario incoerente**: blu `#4698e5` nel tema chiaro, verde `#10b981` nel tema scuro (`app/assets/scss/themes.scss`). Il pulsante "Nuovo Itinerario" usa un altro verde.
- **Tema scuro di default**, con il passaggio al chiaro dall'header.
- **Header**: barra grigia semitrasparente con i controlli a destra, senza logo né navigazione.
- **Dashboard**: card a tutta larghezza con un'immagine verticale centrata e un link "Visualizza". Le immagini mancanti si vedono come icone rotte. Non mostra né lo stato né il proprietario.
- **Vista itinerario**: la copertina verticale occupa quasi tutto lo schermo su mobile. Luoghi come banner orizzontali con una mini mappa, attività come card con icona della categoria, momenti come card con bordo colorato e foto. Lo stepper dei luoghi è una linguetta verde sul bordo sinistro.
- **Form**: lungo, a pagina unica; giorni come card selezionabili con pallini di paginazione, riordino con frecce, mappe Leaflet per la posizione.
- **Scrollbar nascoste** in tutta l'app (`app/assets/scss/main.scss`).

## Vincoli tecnici per il design system

- **Nuxt UI 4 + Tailwind CSS 4**: il design system va espresso nei termini di Nuxt UI: colori semantici (`primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`) con scale Tailwind 50–950, variabili `--ui-*` (testo, sfondi, bordi, `--ui-radius`), font con `@theme` di Tailwind, varianti dei componenti in `app.config.ts`. Riferimento: https://ui.nuxt.com/docs/getting-started/theme/design-system
- **Tema chiaro e scuro** entrambi da progettare.
- **Icone**: Iconify (`i-<collezione>:<nome>`), qualunque collezione.
- **Mappe**: Leaflet con tile OpenStreetMap; lo stile delle tile si può cambiare solo con provider gratuiti.
- **Lingue**: italiano e inglese, testi più lunghi in una delle due da prevedere.
- **Sito statico** su GitHub Pages: niente server, niente ottimizzazione delle immagini lato server.
