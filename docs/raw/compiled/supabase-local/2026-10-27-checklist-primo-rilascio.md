# Checklist per il primo rilascio con il nuovo flusso

Decisione dell'utente: prima si sistema e si verifica tutto in locale, poi si fa il primo rilascio. Questa lista va ripresa quando si rilascia davvero (deve finire nel wiki, in `progetto/rilascio.md`).

1. **Verifica in locale completata**: login, dashboard, dettaglio itinerario, salvataggio e foto provati nel browser con `npm run dev:local`.
2. **Decidere le policy da portare online**: oggi la migrazione `20261027142257_authenticated_access.sql` permette lettura e scrittura solo agli utenti autenticati. L'utente non è sicuro di come sono configurate ora in produzione: rivederle prima.
3. **Secrets GitHub** (repo → Settings → Secrets and variables → Actions):
   - `SUPABASE_ACCESS_TOKEN`: dal dashboard Supabase, Account → Access Tokens.
   - `SUPABASE_DB_PASSWORD`: la password del DB (reimpostata il 2026-10-27; si reimposta da Database → Settings).
   - `SUPABASE_PROJECT_REF`: `lezczeypkybilgpyubdn`.
4. **Storico migrazioni in produzione**: con la password in `SUPABASE_DB_PASSWORD`, `npx supabase migration list --linked`. Se `20261027141357` (lo schema scaricato) non risulta applicata: `npx supabase migration repair --status applied 20261027141357 --linked`. Senza, il primo `db push` della CI prova a ricreare tabelle esistenti e fallisce.
5. **Bucket `Photos`**: esiste già in produzione; la configurazione in `supabase/config.toml` vale solo in locale. Il bucket `content` è vuoto e non usato: decidere se eliminarlo.
6. **Release**: `git flow release start <versione>`, `npm version <versione> --no-git-tag-version`, commit `chore(release): <versione>`, `git flow release finish <versione>`, push di `master`, `develop` e tag. Il push su `master` fa partire build, migrazioni e deploy.
7. **Dopo il deploy**: controllare che il job `migrate` sia passato e che l'app online, dopo il login, mostri gli itinerari.
8. **Pulizia**: `SUPABASE_SECRET_KEY` nel `.env` locale non serve più; eventualmente ruotare la service role key nel dashboard.
