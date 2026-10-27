# Note di lavoro — supabase-local

## Supabase CLI e stack locale

- CLI come devDependency (`supabase` 2.122.0), script `db:start`, `db:stop`, `db:reset`.
- `supabase start` richiede Docker Desktop acceso. URL locali: API `http://127.0.0.1:54321`, Studio `http://127.0.0.1:54323` (ha l'SQL Editor), DB `postgresql://postgres:postgres@127.0.0.1:54322/postgres`, Mailpit `http://127.0.0.1:54324`.
- Lo stack locale espone un **endpoint MCP**: `http://127.0.0.1:54321/mcp` (risponde alla domanda aperta in `wiki/architettura/ambienti.md`).
- `supabase migration new <nome>` legge SQL da stdin: lanciato da uno script resta in attesa. Crearla e poi scriverci dentro, o passare `</dev/null`.

## db pull

- `supabase db pull --linked` senza password fallisce: la CLI prova a creare il ruolo temporaneo `cli_login_postgres` e il progetto risponde `permission denied to alter role`. Serve la password del DB in `SUPABASE_DB_PASSWORD`.
- La password del DB non si può rivedere, solo reimpostare: dashboard, **Database → Settings → Database password**.
- In Git Bash: `read -rs SUPABASE_DB_PASSWORD && export SUPABASE_DB_PASSWORD` (non finisce nella history; la sintassi `$env:` è di PowerShell).
- Lo schema scaricato è la prima migrazione `20261027141357_remote_schema.sql`: tabelle `categories` e `itineraries_json`, RLS attive **senza policy**, una policy di insert per gli autenticati sul bucket `Photos`.
- I bucket non sono nelle migrazioni. In produzione: `Photos` (pubblico, usato dall'app) e `content` (vuoto, non usato).

## RLS

- Con le route `server/api/` la service role key ignorava le RLS; dal client con la chiave anon, senza policy, non si legge niente.
- Decisione dell'utente, **temporanea**: solo gli utenti autenticati leggono e scrivono, "così siamo tranquilli fino a quando non risolviamo bene il giro". Migrazione `20261027142257_authenticated_access.sql`: select su `categories`, select/insert/update/delete su `itineraries_json`.
- Verificato in locale: anon non vede le righe e non può inserire; authenticated legge e inserisce.
- Bucket `Photos` locale in `supabase/config.toml` (`public = true`), creato con `supabase seed buckets --local`.

## Da ricordare

- Le migrazioni non sono ancora applicate alla produzione (`supabase db push`): finché non lo sono, l'app pubblicata con questa feature non legge niente.
- La build statica a volte va in 500 su `/` nel prerender per i messaggi i18n: succede anche su `develop`.

## Verifica in locale (decisione dell'utente)

- L'utente non è sicuro delle impostazioni attuali in produzione: **prima si verifica tutto in locale, poi si decide cosa portare online**. Nessuna migrazione applicata alla produzione in questa feature.
- `supabase/seed.sql`: utente di test `test@cronotrip.local` / `password`, le categorie di `public/categorie.json`, i 4 itinerari mock (`itinerario1-3.json`, `umbria.json`).
- Le foto di produzione si scaricano con `npm run db:photos` in `supabase/storage/` (fuori da git, sono foto personali) e si caricano nel bucket locale con `objects_path`; `npm run db:reset` fa reset, seed e upload.
- `npm run dev:local` avvia l'app su `.env.local` (URL e chiave anon dello stack locale, fuori da git).
- Verificato via API: anon vede liste vuote; l'utente di test vede 4 itinerari e 5 categorie; le foto si servono dal bucket locale.

## Nuove regole di rilascio (decisione dell'utente)

- Il deploy parte a ogni **push su `master`** (chiusura di release o hotfix), non più dai tag. I tag di git-flow restano, ma non fanno partire niente.
- La **versione** si aggiorna nel ramo della release con `npm version <x.y.z> --no-git-tag-version`; la CI la legge da `package.json`. Versione di partenza: `0.1.13` (ultimo tag).
- Le **migrazioni** si applicano alla produzione **in automatico in CI**: job `migrate` dopo la build e prima del deploy (`supabase link` + `supabase db push`). Se fallisce, il sito non si aggiorna.
- Nuovi secrets GitHub: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`, `SUPABASE_PROJECT_REF`.
- Tolto `cat .env` dalla CI (domanda aperta in `wiki/progetto/rilascio.md`).
- Prima del primo rilascio: verificare che la migrazione `20261027141357_remote_schema` risulti già applicata in produzione (`supabase migration list --linked`), altrimenti `supabase migration repair --status applied 20261027141357 --linked`. Senza, il primo `db push` prova a ricreare tabelle che esistono già.
