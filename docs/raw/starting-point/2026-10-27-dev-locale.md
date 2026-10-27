# `bun run dev` punta al locale

- `bun run dev` ora avvia l'app sullo stack locale (`.env.local`). Prima usava `.env`, cioè la produzione, e `bun run dev:local` serviva per il locale: il comando più ovvio portava sul db online, contro la regola "prima si verifica in locale".
- `bun run dev:prod` avvia l'app sulla produzione (`.env`), per quando serve guardare i dati online. `dev:local` non esiste più.
- Tolta `SUPABASE_SECRET_KEY` dal `.env` locale (non serviva più). Resta da ruotare la service role key nella dashboard di Supabase: è stata stampata per sbaglio nel log di una sessione di Claude Code.
- Nelle pagine del wiki `architettura/ambienti.md` e `progetto/rilascio.md`, `dev:local` diventa `dev`.
