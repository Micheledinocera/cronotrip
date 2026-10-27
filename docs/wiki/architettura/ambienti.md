---
tipo: decisione
stato: presa
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-state.md
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
  - raw/compiled/supabase-local/2026-10-27-obiettivo.md
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
  - raw/compiled/starting-point/2026-10-27-bun.md
  - raw/compiled/starting-point/2026-10-27-dev-locale.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
---

# Ambienti

## Decisione

- **Due ambienti**: uno locale di test e uno di produzione. Nessun altro.
- **Costo zero**, qualunque sia il provider.
- L'ambiente locale è lo stack di Supabase in **Docker**, avviato con la **Supabase CLI** (devDependency del repo), così locale e produzione si comportano allo stesso modo.
- Lo schema vive nel repo come migrazioni (`supabase/migrations/`): si provano in locale e si applicano alla produzione solo dalla CI, al rilascio. Mai modifiche a mano sul database di produzione. Vedi [Rilascio e versioni](../progetto/rilascio.md).
- **Prima si verifica in locale, poi si porta online**: ogni modifica al database (schema, policy) si prova sullo stack locale prima di rilasciarla.

## Ambiente locale

- Serve Docker Desktop acceso. Comandi: `bun run db:start`, `bun run db:reset` (migrazioni, `supabase/seed.sql` e foto), `bun run dev` (l'app su `.env.local`, che punta allo stack locale).
- **Di base si lavora in locale**: `bun run dev` usa lo stack locale; `bun run dev:prod` avvia l'app sulla produzione (`.env`), solo per quando serve guardare i dati online. Finché una migrazione non è rilasciata, il codice del ramo e il database di produzione possono non essere allineati.
- **Chiavi**: l'app usa le *publishable key* di Supabase (`SUPABASE_KEY`), una per ambiente: quella di produzione in `.env`, quella dello stack locale (`bunx supabase status`) in `.env.local`. Non sono intercambiabili.
- Servizi: API `http://127.0.0.1:54321`, Studio `http://127.0.0.1:54323` (con SQL Editor), Postgres su `127.0.0.1:54322`, Mailpit `http://127.0.0.1:54324` per le email di test.
- Lo stack locale espone anche un **endpoint MCP**: `http://127.0.0.1:54321/mcp`.
- **Dati**: il seed crea un utente di test (`test@cronotrip.local` / `password`), le categorie e gli itinerari mock di `public/`, di proprietà dell'utente di test. Le foto del bucket `Photos` si scaricano dalla produzione con `bun run db:photos` in `supabase/storage/`, fuori da git perché sono foto personali.
- Dettagli di schema, policy e seed: [Database](../tecnico/supabase/database.md).

## Strumenti

- **Bun** è l'unico package manager e lancia gli script: `bun install`, `bun run <script>`, `bunx` al posto di `npx`. Lockfile `bun.lock`; la versione è fissata in `package.json` (`packageManager`). La CLI di Nuxt gira comunque su Node.
- Bun blocca gli script di install delle dipendenze non *trusted*. Restano bloccati `@parcel/watcher` e `@tailwindcss/oxide`: servono solo se manca il binario precompilato, e la build funziona senza.

## Domande aperte

- Le impostazioni di Auth della produzione (provider, redirect) non sono nel dump dello schema: vanno confrontate a mano con `supabase/config.toml`.
- Il seed usa i mock di `public/`, non i dati reali della produzione.
