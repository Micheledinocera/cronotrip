# Implementazione dei flussi dell'itinerario

Implementato tutto il piano di [Flussi dell'itinerario](../../wiki/viaggi/flussi.md) in un colpo solo, su richiesta dell'utente ("puoi fare anche tutto insieme"). Provato sullo stack locale con Playwright: creazione, validazione, ricerca del luogo, riordino, modifica, copia, cancellazione, avviso di uscita.

## Database

Migrazione `20261029100000_itinerary_status_and_copies.sql`:

- tabella **`itinerary_statuses`** (`key` come chiave primaria, `position` per l'ordine): `planning`, `in_progress`, `done`. Lettura per gli utenti registrati, come `categories`. Un nuovo stato è una riga in più;
- **`itineraries.status`**: testo con FK su `itinerary_statuses.key`, default `planning`. Gli itinerari esistenti, anche in produzione, partono da `planning`;
- **`itineraries.copied_from`**: FK su `itineraries.id`, `on delete set null`, con indice.

## Codice

- **Form unico** `ItineraryForm.vue`, usato da `/itinerario/new` e dalla nuova pagina `/itinerario/modifica/[id]` (il percorso era già previsto da un link commentato nella dashboard). Sotto: `ItineraryDayForm` → `ItineraryPlaceForm` → `ItineraryActivityForm`.
- **Schema Zod** in `app/utils/itinerarySchema.ts`, messaggi tradotti. Gli oggetti sono "loose": i campi che il form non tocca ancora (foto, prezzi, momenti, date dei giorni, `duration` dei mock) restano dopo un salvataggio. Verificato sull'itinerario Umbria del seed.
- **Link**: un link vuoto viene tolto al salvataggio; un link senza testo mostra l'URL; l'URL deve iniziare con `http://` o `https://`.
- **Posizione** (`LocationPicker.vue`): ricerca su Nominatim solo con il pulsante o Invio, non mentre si scrive (le regole d'uso di Nominatim lo vietano); clic sulla mappa per mettere o spostare il punto. Scegliendo un risultato, se il luogo non ha ancora un nome prende quello trovato. La posizione dell'attività è facoltativa e la sua mappa parte dalla posizione del luogo.
- **Riordino** con pulsanti sposta prima/dopo (frecce) su giorni, luoghi e attività, non con il trascinamento: più semplice e senza librerie in più. Il trascinamento si può aggiungere dopo.
- **Errori**: un toast, il form passa al primo giorno con errori e scorre fino al primo campo sbagliato.
- **Modifiche non salvate**: conferma del browser (`window.confirm`) navigando dentro l'app, avviso standard del browser chiudendo o ricaricando la scheda.
- **Pagina dell'itinerario**: badge dello stato; Modifica ed Elimina solo per il proprietario; Copia per tutti. L'eliminazione chiede conferma in un modale e torna alla dashboard.
- **Copia**: copia scheletro fatta nel browser con una whitelist dei campi (nome, descrizioni, sottotitoli dei giorni, luoghi con posizione, attività con nome, categoria, descrizione, link, posizione). Stato `planning`, `copied_from` all'originale. Dopo la copia si apre la pagina della copia.
- Testi del form e della pagina tradotti in `it` ed `en`, anche le categorie e gli stati.
- Corretto `DaySelector`: in sola lettura mostrava la "X" per togliere un giorno.
- Tolto `app/types/validation.ts`, non più usato. Aggiunta la dipendenza `zod`.

## Scelte da confermare con l'utente

- La copia ha **lo stesso nome** dell'originale (la regola dice "si copia il nome"); niente suffisso tipo "(copia)".
- **Descrizione**: nessun limite di lunghezza (il vecchio contatore diceva /100, ma il limite non c'era).
- I mock del seed hanno descrizioni brevi oltre i 50 caratteri e sottotitoli vuoti: per salvarli in modifica vanno sistemati. In produzione può succedere lo stesso con gli itinerari vecchi.

## Note

- In locale `bun run generate` stampa un errore di @nuxtjs/i18n durante il prerender ("I18n server context has not been set up yet"), ma l'exit code è 0 e i file dei messaggi vengono generati. Succede anche su `develop`, non in CI: non dipende da questa feature.
