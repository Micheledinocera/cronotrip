# Design brief — Cronotrip

> **Data:** 2026-10-29 · **Feature:** study-design-brief · **Fonti:** wiki `business/cronotrip.md`, `business/organizzazione-con-notion.md`, `business/concorrenti.md`, `viaggi/itinerario-e-viaggio.md`, `viaggi/condivisione.md`, `viaggi/flussi.md`, `viaggi/foto.md`, `tecnico/frontend/*`; raw `study-design-brief/2026-10-29-materiale-esistente.md` e `2026-10-29-domande-design.md`

Brief per Claude Design: tutto quello che serve per progettare il **design system** e poi i **mockup delle schermate** di Cronotrip. Autosufficiente: non serve leggere altro. Gli screenshot dell'app di oggi sono in `docs/raw/compiled/study-design-brief/screenshots/` (vedi [Screenshot](#screenshot-dellapp-di-oggi)).

## 1. Il prodotto

**Cronotrip** è una web app a metà tra un **diario di viaggio** e un **gestore di viaggi**:

- si prepara un **itinerario** giorno per giorno (luoghi, attività, link, posizioni);
- durante e dopo il viaggio lo si arricchisce con foto e "momenti" (cosa è successo, cosa si è mangiato, le tappe di un sentiero), così resta uno storico dei viaggi fatti;
- gli utenti registrati vedono gli itinerari degli altri e possono **copiarli** come base per il proprio viaggio (si copia solo lo scheletro: giorni, luoghi, attività; non foto, prezzi e momenti).

Oggi i viaggi si organizzano su Notion (lista dei viaggi con date e stato, pagina per viaggio con programma giorno per giorno). Cronotrip vuole tenere insieme la programmazione e il racconto, in un posto solo.

**Utenti**: uso personale più pochi amici. Non c'è registrazione: le utenze le crea l'amministratore. Non è un prodotto commerciale: niente marketing, niente onboarding, niente monetizzazione.

**Fase**: embrionale. Il design copre **solo quello che esiste oggi** (sezione 5). Niente spazi per funzioni future (spese, date, prenotazioni): verranno progettate quando arrivano.

## 2. Direzione visiva

### Sensazione

- **Due anime, un sistema solo.** La **visualizzazione** di un itinerario è un **diario di viaggio**: fotografico, arioso, piacevole da sfogliare. L'**inserimento** (form di creazione e modifica) è un **pannello di controllo**: ordinato, efficiente, denso il giusto.
- **Pulito e conciso** ovunque. Il problema principale di oggi è l'effetto **"valanga di informazioni"**: tutto è aperto, tutto è allo stesso livello, la pagina è un lungo muro di card. Il redesign deve dare **gerarchia e respiro**: mostrare l'essenziale, il resto a un tocco di distanza.

### Riferimenti

- **Wanderlog** (https://wanderlog.com): piace la grafica in generale. **Da non prendere**: la mappa troppo in primo piano (in Cronotrip la mappa è un supporto, non la protagonista) e l'impostazione "AI-centrica".

### Identità

- **Nome**: "Cronotrip" va bene. Se ci sono alternative valide, proporle (facoltativo).
- **Logo**: carta bianca. Serve anche un'**icona dell'app** (l'app diventerà una PWA installabile sul telefono): deve funzionare piccola, quadrata e su sfondo pieno, in chiaro e in scuro.
- **Colori**: carta bianca. Le sfumature di **blu** sono gradite; valuta se legare la palette al viaggio (cielo, mare, mappe, carta, ecc.). **Proporre un paio di alternative** di palette da confrontare.
- **Font**: Google Fonts. Libertà di scelta (per esempio un carattere più "da diario" per i titoli nella vista e uno più neutro per l'interfaccia), purché leggibile in italiano e su mobile.
- **Tono dei testi**: **informale** ("Dove si va?", "Nessun viaggio, per ora", "Sicuro di volerlo eliminare?"). Le schermate sono in **italiano**.
- **Tema chiaro e scuro**: **uguale importanza**, entrambi da progettare con cura. Oggi il default è lo scuro.

### Icone

- **Categorie delle attività**: Trekking, Cibo, Museo, Concerto, Altro (nei dati di esempio compaiono anche Visita e Alloggio, da prevedere). Ridisegnarle con **uno stile unico**, **senza colori per categoria** (diventerebbe confuso): le distingue la forma, non il colore.
- Le icone si useranno da **Iconify** (qualunque collezione): indicare una collezione coerente per interfaccia e categorie.

### Mappe

- Le mappe sono Leaflet con tile OpenStreetMap. **Personalizzarle un po'** per integrarle nel design: uno stile di tile che si accordi al tema chiaro e scuro (scegliendo tra provider gratuiti di tile, es. stili chiari/scuri basati su OpenStreetMap), marker e percorsi con i colori del sistema.
- Ruolo di **supporto**: piccole e dentro il contenuto, ingrandibili su richiesta.

### Foto

- Le **foto di intestazione** (copertina dell'itinerario, intestazione di ogni luogo) hanno **rilevanza**: sono il tratto "diario".
- Le foto **"da galleria"** (di attività e momenti) sono **piccole** (miniature). Toccandole si apre una **galleria** con **tutte le foto del viaggio**, organizzate per **giorno → luogo → attività**, che parte dalla foto toccata.
- Le foto degli utenti hanno formati qualsiasi, **molte verticali** da telefono: i ritagli devono reggere (oggi una copertina verticale riempie tutto lo schermo del telefono).

## 3. Piattaforma

- **Tutto responsive.** Due usi principali:
  - **desktop** per la **pianificazione**: si crea e si modifica l'itinerario;
  - **mobile** **durante il viaggio**: si consulta l'itinerario del giorno.
- Il form va quindi curato soprattutto su desktop (ma deve funzionare su mobile); la vista soprattutto su mobile (ma deve essere bella su desktop).
- Larghezze di riferimento per i mockup: mobile 390 px, desktop 1440 px.

## 4. Vincoli tecnici per il design system

Il design system sarà implementato con **Nuxt UI 4** e **Tailwind CSS 4**. Va quindi espresso nei loro termini, così si traduce in configurazione senza reinterpretazioni:

- **Colori semantici** di Nuxt UI: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`, ognuno come scala Tailwind **50–950** (anche colori custom, definiti con `@theme`).
- **Token** (variabili CSS `--ui-*`) per chiaro e scuro: testo (`--ui-text`, `-muted`, `-dimmed`, `-toned`, `-highlighted`, `-inverted`), sfondi (`--ui-bg`, `-muted`, `-elevated`, `-accented`, `-inverted`), bordi (`--ui-border`, `-muted`, `-accented`, `-inverted`), raggio base `--ui-radius`.
- **Tipografia**: famiglie di font (`--font-sans`, eventuale font per i titoli), scala dei testi.
- **Componenti**: partire dai componenti di Nuxt UI (Button, Badge, Card, Input, Textarea, Select, Modal, Slideover, Drawer, Carousel, Tabs, DropdownMenu, Toast, Avatar, …) indicando varianti e stili, non inventarne di nuovi quando ne esiste uno.
- **Icone**: Iconify (`i-<collezione>-<nome>`).
- **Sito statico** su GitHub Pages: niente elaborazione delle immagini lato server.

Riferimento: https://ui.nuxt.com/docs/getting-started/theme/design-system e https://ui.nuxt.com/docs/getting-started/theme/css-variables

## 5. Contenuto: cosa si mostra

### Struttura di un itinerario

```
Itinerario    nome · descrizione breve (max 50 caratteri) · descrizione · stato · foto di copertina · proprietario
└── Giorno    "Giorno N" · sottotitolo (es. "Carpinone, Castel San Vincenzo e Pescasseroli")
    └── Luogo     nome · posizione sulla mappa · foto di intestazione
        └── Attività   nome · categoria · descrizione · link (testo + indirizzo) · posizione facoltativa · foto
            └── Momento    nome · descrizione · foto · prezzo
```

- **Stati** dell'itinerario: **In programmazione**, **In corso**, **Fatto**. Si cambiano a mano; ne potranno arrivare altri.
- **Momenti**: cosa è successo dentro un'attività. L'etichetta del gruppo dipende dalla categoria: **Tappe** (trekking), **Menu** (cibo), **Opere** (museo), **Scaletta** (concerto), **Momenti** (altro, visita, alloggio). Il prezzo di un momento si mostra (es. "Arrosticini · 12 €").
- **Copia**: una copia appena fatta si chiama "<nome originale> (copia)" e parte "In programmazione".

### Esempio reale da usare nei mockup: "Umbria Trip"

- **Descrizione breve**: Molise, Abruzzo, Marmore e Bassano in Teverina
- **Stato**: In programmazione · 3 giorni

**Giorno 1 — Carpinone, Castel San Vincenzo e Pescasseroli**
- **Carpinone**
  - *Trekking* · Cascata dello Schioppo — sentiero che scende seguendo l'indicazione per la cascata. Tappe: Inizio, Cascate (con foto)
  - *Cibo* · Pranzo al sacco
- **Castel San Vincenzo**
  - *Altro* · Lago — lago ai piedi della rocca (2 foto)
- **Pescasseroli**
  - *Cibo* · Ristorante A Cavu't — cena, link TripAdvisor. Menu: Funghi e tartufo, Arrosticini, Ragù di cervo, Spalla d'agnello (con foto)
  - *Alloggio* · Albergo nel centro — pernottamento, colazione inclusa. Momenti: Colazione

**Giorno 2 — Cascate delle Marmore e Bassano in Teverina**
- **Cascate delle Marmore**
  - *Visita* · Visita Cascate — aperto dalle 11:00 alle 18:00. Tappe: Inizio, Salita, Discesa, Fine
  - *Cibo* · Pranzo — "quello che capita". Momenti: Negozio di souvenir
- **Bassano in Teverina**
  - *Alloggio* · Casa Matilde
  - *Cibo* · Ristorante Borgo Antico — cena, prenotazione obbligatoria. Menu: Tagliolini, Pappardelle, Secondo di carne, Tagliata con verdure, Cheesecake

**Giorno 3 — Lago di Bolsena e Orvieto**
- **Lago di Bolsena**
  - *Altro* · Passeggiata sul lungolago — sosta sulla spiaggia. Momenti: L'acqua più limpida
- **Orvieto** (senza foto di intestazione)
  - *Museo* · Museo dell'Opera del Duomo — Cappella di San Brizio con gli affreschi di Signorelli. Opere: Cappella di San Brizio, Pozzo di San Patrizio
  - *Cibo* · Trattoria in centro — pranzo con piatti umbri. Menu: Umbrichelli al tartufo, Cinghiale in umido
  - *Concerto* · Concerto in piazza del Duomo — jazz serale davanti al Duomo. Scaletta: Primo set, Bis

Altri itinerari da usare nella dashboard: "Sentieri del Gragnano e Sapore di Mare" (Un itinerario tra natura, storia e gastronomia campana), "Campania Felix: Arte, Storia e Reggia" (Tre giorni tra Napoli, Pompei e Caserta), "Muscardoni e dintorni".

## 6. Schermate

Da progettare **tutte**, in chiaro e in scuro, mobile e desktop.

### Navigazione (comune a tutte le pagine dopo il login)

- **Barra in alto, sempre**, il minimo indispensabile:
  - **logo**, che porta alla dashboard;
  - **nuovo itinerario** (pulsante con testo su desktop, **"+"** su mobile);
  - **utente**, con un **menu contestuale**: lingua, tema chiaro/scuro, versione dell'app, esci.
- Niente barra in basso su mobile. Proposta: il pulsante "indietro" di oggi non serve più, si torna con il logo o con il browser.

### Login (punto d'ingresso)

- La home pubblica di oggi (solo il nome e un link) **sparisce**: chi apre l'app arriva al **login**. Email e password, nessuna registrazione, nessun "password dimenticata" per ora.
- È l'unica schermata "di benvenuto": può portare un po' di identità (logo, una foto, una frase).
- Stati: errore di credenziali, invio in corso.

### Dashboard

- **Filtro "I miei" / "Degli altri"**, default **"I miei"**.
- **Ricerca** su nome e descrizione.
- **Card** di un itinerario: **copertina**, **nome**, **stato**, **descrizione breve**, **proprietario**, **numero di giorni**. Tutta la card apre l'itinerario.
- Stati: **nessun itinerario** (con invito a crearne uno, tono informale), **nessun risultato** della ricerca, caricamento, copertina mancante (oggi si vede un'immagine rotta).

### Vista dell'itinerario (anima "diario")

La struttura di oggi va bene; è il disordine il problema. Va ridistribuita con gli spazi giusti.

- **Intestazione**: copertina, nome, stato, descrizione breve, descrizione, proprietario. **Azioni**: **Modifica** ed **Elimina** solo per il proprietario, **Copia** per tutti; su mobile possono stare in un menu.
- **Giorni**: si sceglie il giorno (oggi un carosello di card "Giorno N + sottotitolo"); si vede un giorno alla volta.
- **Luoghi del giorno**: per ognuno la **foto di intestazione** (protagonista) e una piccola mappa; dentro, le attività.
- **Attività**: icona della categoria, nome, descrizione, link, miniature delle foto, e i suoi **momenti** (oggi tutti aperti: sono la causa principale della "valanga"; valutare di mostrarli compatti o chiusi).
- **Drawer dell'itinerario** (oggi una linguetta laterale che apre l'elenco dei luoghi del giorno con la mappa del giorno). **Piace molto**. Da evolvere in **un drawer unico con tutte le giornate**, segnate al suo interno (es. Giorno 1 → i suoi luoghi, Giorno 2 → …), con la mappa. Toccando un luogo si va lì; il luogo visibile è evidenziato.
- **Galleria**: toccando una miniatura si apre la galleria di tutte le foto del viaggio, divise per giorno, luogo e attività.
- **Mappe** ingrandibili (oggi in una modale).
- **Modale di eliminazione**: "Eliminare l'itinerario? «Umbria Trip» verrà eliminato definitivamente. Le sue copie restano." con Annulla / Elimina.
- Stati: itinerario non trovato, caricamento, luogo senza foto (es. Orvieto), attività senza descrizione né foto.

### Form di creazione e modifica (anima "pannello di controllo")

Lo stesso form per creare ("Nuovo itinerario") e modificare ("Modifica itinerario"); cambia solo il titolo e il pulsante di salvataggio.

- **Dati generali**: nome\*, stato\*, descrizione breve\* (contatore 0/50), descrizione\*.
- **Giorni**\* (almeno uno): si seleziona il giorno da modificare, si aggiunge e si toglie; per ogni giorno il **sottotitolo**\*.
- **Luoghi** del giorno: nome\*, **foto di intestazione** (carica, cambia, togli; anteprima), **posizione**\* (ricerca per nome con un pulsante "Cerca" + mappa dove cliccare per mettere o spostare il punto).
- **Attività** del luogo: nome\*, categoria\* (select con icone), descrizione, link (testo + indirizzo), posizione facoltativa (stessa ricerca + mappa).
- **Riordino** di giorni, luoghi e attività: oggi frecce "sposta prima / dopo". Scegliere la soluzione **più usabile**: il **trascinamento** si implementa se migliora l'uso, altrimenti restano le frecce.
- **Rimozione** di giorni, luoghi e attività.
- **Errori**: messaggio sotto il campo; al salvataggio il form porta al primo giorno e al primo campo con errori, con un toast.
- **Modifiche non salvate**: uscendo compare un avviso ("Se esci perdi le modifiche"); oggi è il `confirm` del browser, va progettata una modale.
- Il form è lungo: evitare la "valanga" anche qui (es. luoghi e attività richiudibili, riepilogo compatto quando chiusi).

## 7. Cosa consegnare

In **due fasi**, la seconda dopo l'approvazione della prima:

1. **Design system**
   - logo e icona dell'app (PWA), eventuali alternative di nome;
   - **almeno due palette** da confrontare, in chiaro e in scuro;
   - tipografia, raggi, spaziature, ombre;
   - token mappati su Nuxt UI (sezione 4);
   - componenti base con le loro varianti (pulsanti, badge di stato, card, campi del form, modali, toast, menu);
   - icone delle categorie in stile unico;
   - stile delle mappe e dei marker.
2. **Mockup delle schermate** della sezione 6, con i contenuti della sezione 5, in italiano: login, dashboard, vista dell'itinerario (con drawer, galleria, modale di eliminazione), form (nuovo e modifica, con stati di errore), in mobile e desktop, chiaro e scuro.

## Screenshot dell'app di oggi

In `docs/raw/compiled/study-design-brief/screenshots/`, fatti il 2026-10-29. Nome: `<schermata>-<mobile|desktop>-<dark|light>.jpg`. Schermate: `home`, `login`, `dashboard`, `itinerario`, `elimina`, `nuovo`, `modifica`; le versioni `-intera` sono a pagina intera (vista e form, tema scuro). Servono a capire la **struttura e i contenuti** di oggi, **non** lo stile: la grafica attuale è quasi quella di default di Nuxt UI e non va presa come riferimento.

Da allegare almeno: `itinerario-desktop-dark-intera.jpg`, `itinerario-mobile-dark.jpg`, `modifica-desktop-dark-intera.jpg`, `dashboard-desktop-light.jpg`.

## Domande aperte

Lasciate a Claude Design, da decidere con le proposte:

- Palette definitiva (tra le alternative proposte) e font.
- Logo, icona e un eventuale nome alternativo.
- Riordino nel form: trascinamento o frecce.
- Come compattare i momenti nella vista e luoghi e attività nel form.
- Stile delle tile della mappa.
