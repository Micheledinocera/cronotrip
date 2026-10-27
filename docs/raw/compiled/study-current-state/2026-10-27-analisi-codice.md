# Analisi del codice esistente (Claude, 2026-10-27)

Analisi del repo su `develop` (ultimo deploy: tag `v0.1.13`, 2026-10-02) e del sito pubblicato su GitHub Pages.

## Cosa c'è

- **Frontend Nuxt 4** con Nuxt UI 4, Tailwind 4, Pinia, i18n (it/en), Leaflet, @nuxt/image, Supabase.
- **Visualizzazione itinerario** (`app/pages/itinerario/[id].vue`): selettore dei giorni, luoghi in accordion con scroll sincronizzato (IntersectionObserver in `useDayScroll`), mappe senza controlli per giorno e viaggio, caroselli di foto con zoom, componenti per categoria di attività (cibo, museo, concerto, trekking, generica). È la parte più matura.
- **Creazione itinerario** (`app/pages/itinerario/new.vue`): form con validazione e form del giorno, ma il submit fa solo `console.log`: non salva.
- **Dashboard**: elenco degli itinerari e un pulsante che salva il mock `public/umbria.json`.
- **Login** email/password con Supabase Auth e un middleware globale che manda su `/login` chi non è autenticato (le pagine con `auth: false` sono esenti: home, login, dettaglio itinerario).
- **Modello dati**: un itinerario è un unico documento JSON (`itineraries_json.itinerary_document`): itinerario → giorni → luoghi → attività (con categoria) → momenti. Più una tabella `categories`. Nessun concetto di utente proprietario, visibilità o viaggio.
- **API server** (`server/api/`): 4 route (lista e dettaglio itinerari, inserimento, lista categorie) che usano la **service role key** di Supabase.
- Mock in `public/` (`itinerari.json`, `itinerario1-3.json`, `umbria.json`, `categorie.json`).
- Lo schema del DB non è nel repo: nessuna cartella `supabase/`, nessuna migrazione.

## La disparità tra locale e produzione

Il deploy è `nuxt generate` (sito statico) su GitHub Pages. Un sito statico non esegue le route di `server/api/`: in produzione non esistono (`/cronotrip/api/categories/list` → 404).

Verificato sul sito pubblicato:

- `/` → 200
- `/dashboard` → 301 (redirect: al prerender non c'è un utente loggato)
- `/itinerario/1` → 404 (le pagine dinamiche non vengono prerenderizzate)
- `/api/categories/list` → 404

Inoltre la CI scrive nel `.env` solo `SUPABASE_URL` e `SUPABASE_KEY`, non `SUPABASE_SECRET_KEY`: anche durante la build le API rispondono "Missing Supabase server key". In pratica in produzione funzionano solo la home e il login.

## Rischi

- Le route API usano la service role key, che **salta le Row Level Security**: in locale chiunque raggiunga il server legge tutti gli itinerari e ne inserisce di nuovi, senza autenticazione.
- Tutta la sicurezza multi-utente (chi vede cosa, chi modifica cosa) oggi non esiste.

## Piccoli difetti notati

- `stores/global.ts`, `fetchCurrentItinerary`: lo stato iniziale è `{}` (truthy), quindi l'itinerario non viene mai caricato.
- `types/LocaleCode.ts` chiama `useI18n()` al livello del modulo, fuori da un componente.
- Le 4 route API duplicano la creazione del client Supabase.
- Nessun type-check né lint configurati.

## Opzioni per l'architettura (da decidere)

1. **Sito statico + Supabase dal client.** Niente server: il browser parla con Supabase con la chiave anon, e la sicurezza sta nelle RLS. Resta su GitHub Pages (o qualunque hosting statico), gratis. Locale e produzione si comportano allo stesso modo. Va bene per un'app personale con pochi utenti. Contro: tutta la logica di permessi va nelle policy SQL; niente segreti lato server (per cose server-side ci sono le Edge Functions di Supabase).
2. **SSR su Vercel / Netlify / Cloudflare (piano gratuito).** Le route `server/api/` continuano a funzionare. Contro: un servizio in più da gestire, limiti del piano gratuito, e le route con la service role key andrebbero comunque riscritte con l'utente autenticato.

## Ambiente locale

La **Supabase CLI** (`supabase start`) avvia in Docker lo stack completo (Postgres, Auth, Storage, API, Studio). Con `supabase/migrations/` versionato nel repo, lo schema è lo stesso in locale e in produzione (`supabase db push`). Va installato Docker Desktop.

Il **server MCP ufficiale di Supabase** è gratuito: si collega al progetto hosted con un personal access token. Lo stack locale della CLI dovrebbe esporre anche un endpoint MCP: da verificare.

Il piano gratuito di Supabase **mette in pausa i progetti dopo circa una settimana di inattività**: con poco traffico può succedere. Da verificare i limiti attuali.

## Domande aperte

- Il modello "itinerario → viaggio" (un viaggio come istanza di un itinerario, in programma / in corso / trascorso): il viaggio copia l'itinerario o lo referenzia? Le modifiche durante il viaggio (prezzi reali, foto, cambi di programma) dove vanno?
- Condivisione: gli itinerari sono pubblici, visibili agli amici o privati per scelta? Gli altri possono copiarli?
- Il documento JSON unico regge la condivisione e i viaggi, o serve un modello relazionale almeno per utenti, itinerari e viaggi?
- Quale schema DB c'è oggi su Supabase in produzione (tabelle, policy, bucket `Photos`)?
