---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-state.md
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
---

# Ambienti

## Cosa è deciso

- **Due ambienti**: uno locale di test e uno di produzione. Nessun altro.
- **Costo zero**, qualunque sia il provider.
- L'ambiente locale deve somigliare il più possibile a Supabase, in **Docker**, così da eliminare la differenza tra locale e produzione.

## Proposta: Supabase CLI

- `supabase start` avvia in Docker lo stack completo (Postgres, Auth, Storage, API, Studio).
- Lo schema vive nel repo come migrazioni (`supabase/migrations/`) e si applica alla produzione con `supabase db push`.
- Per partire, lo schema di produzione si scarica con `supabase link` e `supabase db pull` (anche con `--schema storage`, per bucket e policy dello storage). Oggi lo schema non è nel repo.
- Le impostazioni di Auth (provider, redirect) non sono nel dump: vanno annotate a mano.
- Serve Docker Desktop.

## Domande aperte

- Confermare la Supabase CLI come strumento per l'ambiente locale.
- Il server MCP di Supabase: quello ufficiale è gratuito e si collega al progetto hosted; lo stack locale della CLI dovrebbe esporre anche un endpoint MCP. Da verificare.
- Come popolare il database locale (seed dai mock in `public/`?).
