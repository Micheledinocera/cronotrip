---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-state.md
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
  - raw/compiled/supabase-local/2026-10-27-checklist-primo-rilascio.md
  - raw/compiled/starting-point/2026-10-27-bun.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/starting-point/2026-10-27-dev-locale.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
---

# Rilascio e versioni

- **Produzione**: https://micheledinocera.github.io/cronotrip/ (GitHub Pages, sotto il percorso `/cronotrip/`).
- **Deploy**: il workflow `.github/workflows/nuxtjs.yml` parte a ogni **push su `master`**, cioè alla chiusura di una release o di un hotfix (o a mano). Tre job in fila: build (`bun install --frozen-lockfile`, `bun run generate`), migrazioni (`supabase db push` sulla produzione), pubblicazione di `.output/public`. Se la build o le migrazioni falliscono, il sito non si aggiorna.
- **Versioni**: si aggiornano nel ramo della release con `bun pm version <x.y.z> --no-git-tag-version`. La CI legge la versione da `package.json` e scrive `public/version.json` (versione, commit, data della build), che l'header dell'app mostra. I tag `v<versione>` di git-flow restano, ma non fanno partire niente.
- **Segreti della CI**: `SUPABASE_URL` e `SUPABASE_KEY` (la *publishable key*: il secret va aggiornato prima del primo rilascio, vedi sotto) per la build, scritti nel `.env`; `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD` e `SUPABASE_PROJECT_REF` per le migrazioni. La service role key non serve più.
- **Rami e PR**: git-flow, con le convenzioni e i passi della release in `CONTRIBUTING.md`. Il ramo delle release è `master`, l'integrazione avviene su `develop`.

L'architettura del rilascio, e perché resta su GitHub Pages: [Sito statico + Supabase](../architettura/sito-statico-supabase.md). Gli ambienti: [Ambienti](../architettura/ambienti.md).

## Prima del primo rilascio con questo flusso

Nessuna release è ancora uscita con il deploy da `master` e le migrazioni in CI. Prima si sistema e si verifica tutto in locale, poi:

1. Verifica completa in locale (`bun run dev`): login, dashboard, dettaglio itinerario, salvataggio, foto.
2. Rivedere le policy da portare online: oggi in produzione le tabelle hanno le RLS attive senza policy; le migrazioni nuove portano gli itinerari con proprietario (vedi [Database](../tecnico/supabase/database.md)).
3. **Dump dei dati di produzione** (`bunx supabase db dump --linked --data-only -f <file>`, fuori da git): la migrazione `20261027151039` elimina `itineraries_json` dopo averla copiata in `itineraries`.
4. Controllare che il **primo utente registrato** in produzione sia quello giusto: riceve tutti gli itinerari esistenti.
5. Aggiornare il secret GitHub `SUPABASE_KEY` con la *publishable key* di produzione.
6. Aggiungere i secrets GitHub `SUPABASE_ACCESS_TOKEN` (dashboard Supabase, Account → Access Tokens), `SUPABASE_DB_PASSWORD` e `SUPABASE_PROJECT_REF`.
7. Controllare lo storico delle migrazioni in produzione (`bunx supabase migration list --linked`): se la prima migrazione (`20261027141357`, lo schema scaricato) non risulta applicata, segnarla con `bunx supabase migration repair --status applied 20261027141357 --linked`. Altrimenti il primo `db push` prova a ricreare tabelle che esistono già e fallisce.
8. Decidere se eliminare il bucket `content` della produzione, vuoto e non usato.
9. Fare la release come da `CONTRIBUTING.md`, poi controllare che il job delle migrazioni sia passato e che l'app online, dopo il login, mostri gli itinerari.
10. **Solo dopo il rilascio**, nella dashboard di Supabase: "Disable legacy API keys". Spegne la `anon` (usata dal sito precedente, per questo va fatto dopo) e la `service_role`, finita per sbaglio nel log di una sessione di lavoro. Rigenerare il JWT secret per ruotare la sola `service_role` invaliderebbe anche la `anon` e disconnetterebbe tutti: non si fa.

## Domande aperte

- Le CLI della CI (`supabase/setup-cli`, versione fissa nel workflow) e del repo (devDependency) vanno tenute alla stessa versione a mano.
