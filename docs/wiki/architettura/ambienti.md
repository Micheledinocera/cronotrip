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
---

# Ambienti

## Decisione

- **Due ambienti**: uno locale di test e uno di produzione. Nessun altro.
- **Costo zero**, qualunque sia il provider.
- L'ambiente locale è lo stack di Supabase in **Docker**, avviato con la **Supabase CLI** (devDependency del repo), così locale e produzione si comportano allo stesso modo.
- Lo schema vive nel repo come migrazioni (`supabase/migrations/`): si provano in locale e si applicano alla produzione solo dalla CI, al rilascio. Mai modifiche a mano sul database di produzione. Vedi [Rilascio e versioni](../progetto/rilascio.md).
- **Prima si verifica in locale, poi si porta online**: ogni modifica al database (schema, policy) si prova sullo stack locale prima di rilasciarla.

## Ambiente locale

- Serve Docker Desktop acceso. Comandi: `npm run db:start`, `npm run db:reset` (migrazioni, `supabase/seed.sql` e foto), `npm run dev:local` (l'app su `.env.local`, che punta allo stack locale).
- Servizi: API `http://127.0.0.1:54321`, Studio `http://127.0.0.1:54323` (con SQL Editor), Postgres su `127.0.0.1:54322`, Mailpit `http://127.0.0.1:54324` per le email di test.
- Lo stack locale espone anche un **endpoint MCP**: `http://127.0.0.1:54321/mcp`.
- **Dati**: il seed crea un utente di test, le categorie e gli itinerari mock di `public/`. Le foto del bucket `Photos` si scaricano dalla produzione con `npm run db:photos` in `supabase/storage/`, fuori da git perché sono foto personali.
- Dettagli di schema, policy e seed: [Database](../tecnico/supabase/database.md).

## Domande aperte

- Le impostazioni di Auth della produzione (provider, redirect) non sono nel dump dello schema: vanno confrontate a mano con `supabase/config.toml`.
- Il seed usa i mock di `public/`, non i dati reali della produzione.
