# Schermate — come sono implementate

Fonte: i mockup (artifact delle schermate) e [Schermate](../../wiki/design/schermate.md).

## Decisioni prese durante l'implementazione (con l'utente)

- **Route `/`**: va alla dashboard; il middleware manda al login chi non è entrato. Chiude la domanda aperta di [Schermate](../../wiki/design/schermate.md).
- **Nome del proprietario**: nuova tabella `profiles` (migrazione `20261029120000_profiles.sql`): una riga per utente creata da un trigger su `auth.users`, `display_name` dai metadati (`display_name`, poi `name`) o dalla parte dell'email prima della @; letta da tutti gli utenti autenticati, modificabile solo dal proprietario (nessuna schermata per farlo, per ora). FK `itineraries.owner_id → profiles.id` per il join; l'app legge `owner_name` con `select('*, owner:profiles(display_name)')`.

## Login e dashboard

- Login senza barra (`layout: false`): foto del seed (`Castel San Vincenzo/lago 1.jpg` dal bucket pubblico), stati errore e invio. Mostra/nascondi password.
- Dashboard: filtro "I miei"/"Degli altri" (`UTabs`), ricerca su nome e descrizione breve, griglia 1/2/3/4 colonne (breakpoint `wide` = 1440px in `main.css`), scheletri, stati vuoti. I dati si caricano solo sul client (`useAsyncData` con `server: false`); gli scheletri valgono anche per lo stato `idle`, altrimenti il prerender mostra lo stato vuoto e l'idratazione non torna.

## Vista dell'itinerario

- Componenti: `ItineraryCover`, `DayChips`, `PlaceSection` (foto + `PlaceMap` incastonata), `ActivityItem`, `MomentsGroup` (chiuso, con anteprima dei nomi), `TripDrawer` (`USlideover` da destra su desktop, `UDrawer` dal basso su mobile, con `TripMap`), `PhotoGallery` (sempre scura, frecce da tastiera), `ConfirmModal` per l'eliminazione.
- Il luogo "visibile" si calcola con un `IntersectionObserver` nella pagina; sostituisce `useDayScroll`.
- Foto della galleria: `utils/gallery.ts`, nell'ordine giorno → luogo (prima l'intestazione) → attività → momenti.
- Prezzi formattati all'italiana (`utils/format.ts`).
- Rimossi i vecchi componenti della vista: `Day`, `Events/*`, `Accordion`, `StepperWidget`, `NoControlMap*`, `PhotosCarousel`, `Zoomable*`.

## Form

- Barra in alto fissa (sticky) con titolo, nome dell'itinerario, Annulla e salvataggio; su mobile barra in basso. A sinistra (da `lg`) dati generali e lista dei giorni, a destra il giorno scelto.
- Luoghi e attività in `FormPanel` richiudibili; il corpo si monta solo da aperto (le mappe Leaflet in un pannello nascosto non prendono le misure). Un pannello si apre da solo se dentro c'è un errore (`FORM_ERRORS` fornito dal form).
- Riordino con `useReorder`: drag and drop HTML5 dalla maniglia (`DragHandle`), frecce su/giù sulla maniglia come alternativa. Sostituisce le frecce di `ListItemControls` e `DaySelector` (rimossi).
- Errori: messaggi specifici per campo (`form.errors.<campo>`, es. "Serve un sottotitolo per il giorno"), conteggio sul giorno nella lista, toast "C'è qualcosa da sistemare" che resta finché non si chiude, con il giorno da controllare.
- Modifiche non salvate: `ConfirmModal` (Resta / Esci) al posto di `window.confirm`; alla chiusura della scheda resta il prompt del browser.
- Un giorno nuovo nasce senza sottotitolo (prima "Giorno N"): il campo è obbligatorio e il placeholder suggerisce cosa scrivere.

## Punti aperti

- I messaggi d'errore sotto i campi non hanno l'icona che il design system chiede (il `UFormField` di Nuxt UI mostra solo il testo).
- Nessuna schermata per cambiare il proprio nome (`profiles.display_name`).
- In sviluppo Nuxt UI dà avvisi di idratazione sullo stile del `USelect` (stringa di stile diversa tra server e client), innocui.
