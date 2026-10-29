# Domande per il design brief

Le domande aperte prima di passare il brief a Claude Design. Scrivi la risposta sotto ogni domanda, al posto di `Risposta:`; lascia vuoto quello che non sai o vuoi lasciare a Claude Design ("carta bianca" va bene). Il materiale già raccolto è in [2026-10-29-materiale-esistente.md](./2026-10-29-materiale-esistente.md).

## 1. Identità

**1.1 Nome e logo.** Il nome resta "Cronotrip"? C'è un logo o un'idea di logo (simbolo, solo scritta), o carta bianca?

Risposta: Carta bianca, il nome va bene quello se hai alternative valide le valutiamo

**1.2 Sensazione.** Che effetto deve dare l'app, in tre aggettivi? Per esempio più "diario di viaggio" (caldo, fotografico, editoriale) o più "strumento" (pulito, denso, tipo Notion), o un equilibrio tra i due?

Risposta: la parte di visualizzazione deve essere più diario di viaggio mentre la parte di inserimento più pannello di controllo, ma mi piaceva l'idea di avere cmq un design pulito e conciso senza avere una "valanga" di informazioni

**1.3 Riferimenti.** Oltre a Wanderlog, app o siti di cui ti piace la grafica (anche fuori dai viaggi)? Di Wanderlog cosa prenderesti e cosa no?

Risposta: wanderlog mi piace in generale come grafica, ma non mi piace il fatto che hanno la mappa troppo in primo piano e in generale troppo "AI-centrica"

**1.4 Colori.** Ci sono colori da usare o da evitare? Il primario oggi è blu nel tema chiaro e verde nel tema scuro: uno dei due va tenuto? 

Risposta: vedi tu, in generale penso che sfumature di blu vadano bene ma vedi pure tu cosa legare al viaggio magari facciamo un paio di prove e valutiamo

**1.5 Font.** Preferenze sui caratteri (es. un serif per i titoli, tipo diario)? Vanno bene i Google Fonts?

Risposta: vanno bene gfonts

**1.6 Tono dei testi.** Come parla l'app: informale ("Dove vai?"), neutro ("Nuovo itinerario"), altro?

Risposta: Informale

## 2. Piattaforma e uso

**2.1 Dispositivo principale.** Mobile-first, desktop-first o entrambi alla pari? Per esempio: si pianifica da desktop e si consulta da telefono durante il viaggio?

Risposta: Tutta responsive, focus desktop per la pianificazione e focus mobile durante il viaggio.

**2.2 Tema.** Il tema scuro resta quello di default? Va progettato bene anche il chiaro, o uno dei due è secondario?

Risposta: hanno uguale importanza

**2.3 Installabile.** Ti interessa che sul telefono si apra come un'app (icona sulla home, schermo intero)? Cambia poco il design ma serve un'icona.

Risposta: l'idea è di farne anche una pwa (aggiungila come TODO nei documenti), quindi serve un'icona, fai tu come al punti 1.1

## 3. Schermate

**3.1 Perimetro.** Quali schermate deve progettare Claude Design in questo giro? Oggi ci sono: home, login, dashboard, vista itinerario (con modale di cancellazione), form di creazione e modifica.

Risposta: tutte quelle elencate da te

**3.2 Vista dell'itinerario.** Si ridisegna da zero o si tiene la struttura di oggi (copertina, giorni come card, luoghi con banner, attività come card, momenti, stepper laterale con la mappa del giorno)? Cosa funziona e cosa no, secondo te?

Risposta: in linea di massima ci dovremmo essere ma mi sembra un po' caotico, magari dandogli gli spazi giusti si può migliorare, una cosa che mi piace parecchio è il drawer con l'itinerario, ad oggi è divso per giorni, magari ha senso farne uno solo con tutte le giornate che però vengono segnate all'interno

**3.3 Dashboard.** Oggi mostra tutti gli itinerari, propri e degli altri, mescolati. Vanno separati ("I miei" / "Degli altri")? Cosa deve mostrare ogni card (copertina, stato, descrizione breve, proprietario, numero di giorni)? Servono filtri o ricerca (per stato, per proprietario)?

Risposta: da capire più avanti, per adesso facciamo il filtro ("I miei" / "Degli altri") con default "I miei" e una barra di ricerca che cerca sul nome e descrizione. La card mostra copertina, stato, descrizione breve, proprietario, numero di giorni

**3.4 Home pubblica.** Oggi è solo il nome con il link al login. Resta così, diventa una piccola landing che spiega l'app, o si va dritti al login? 

Risposta: possiamo fare direttamente login tanto in questa fase embrionale sarà l'unico a poter creare le utenze

**3.5 Form.** Resta una pagina unica lunga? Il riordino con le frecce va bene o il redesign deve prevedere il trascinamento (rimandato "a quando si sistema la grafica", [flussi.md](../../wiki/viaggi/flussi.md))?

Risposta: quello che è più usabile, anche il riordino con dragndrop è da implementare se è migliorativo, se no vanno bene le frecce

**3.6 Header e navigazione.** Cosa ci deve essere sempre a portata (logo, dashboard, nuovo itinerario, utente, lingua, tema)? Su mobile una barra in basso o un menu?

Risposta: il minimo indispensabile, metterei: logo (che rimanda alla dashboard), aggiunta itinerario (magari diventa una "+" in mobile), e utente con menu contestuale con le varie voci, sempre in alto.

**3.7 Parti future da prevedere.** Il design deve già lasciare spazio a cose non ancora fatte (prezzi e totale delle spese, date del viaggio, voci "Extra" opzionali, stati operativi tipo "da prenotare", foto delle attività e dei momenti caricabili dall'app), o solo a quello che esiste?

Risposta: solo quello che esiste, è troppo embrionale per prevedere roba

## 4. Contenuti

**4.1 Foto.** Quanto contano nel design: protagoniste (copertine grandi, gallerie) o di contorno? Le foto degli utenti hanno formati qualsiasi (molte verticali da telefono).

Risposta: quelle che fanno parte delle intestazioni magari hanno una rilevanza particolare, mentre quelle "da galleria", magari le farei abbastanza piccole ma se cliccate si apre un componente galleria che magari mostra tutte le foto del viaggio divise per giorni,luoghi, attività)

**4.2 Icone delle categorie.** Le icone di oggi (trekking, cibo, museo, concerto, altro) vanno ridisegnate in uno stile unico? Ogni categoria deve avere anche un colore?

Risposta: ridisegnale con un o stile unico ed eviterei il colore che se no diventa un casino

**4.3 Mappe.** Lo stile delle mappe va adattato al design (tile più chiare o scure, marker personalizzati) o va bene OpenStreetMap standard?

Risposta: proviamo a personalizzarlo un po' e vedere che ne esce

## 5. Consegna

**5.1 Cosa ti aspetti da Claude Design.** Solo il design system (colori, font, componenti) da applicare poi noi a Nuxt UI, o anche i mockup delle schermate? In che lingua le schermate (italiano, inglese, entrambe)?

Risposta: prima design system e poi mockup delle schermate. La lingua va bene italiano poi implementaremo i18n ad un certo punto

**5.2 Altro.** Qualcosa che non ti piace della grafica di oggi e non è venuto fuori sopra?

Risposta: principalmente l'effetto "valanga di informazioni"
