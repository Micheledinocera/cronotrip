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
