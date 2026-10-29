---
tipo: info
aggiornato: 2026-10-29
fonti:
  - raw/compiled/study-current-state/2026-10-27-state.md
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/supabase-local/2026-10-27-note-lavoro.md
  - raw/compiled/supabase-local/2026-10-27-checklist-primo-rilascio.md
  - raw/compiled/starting-point/2026-10-27-bun.md
  - raw/compiled/starting-point/2026-10-27-note-db.md
  - raw/compiled/starting-point/2026-10-27-dev-locale.md
  - raw/compiled/starting-point/2026-10-27-chiavi-e-foto.md
  - raw/compiled/study-flows/2026-10-27-obiettivo.md
  - raw/compiled/study-flows/2026-10-27-skill-rilascio.md
  - raw/compiled/study-flows/2026-10-27-risposte-copia-stato.md
  - raw/compiled/itinerary-flow/2026-10-29-chiavi-legacy.md
---

# Rilascio e versioni

- **Produzione**: https://micheledinocera.github.io/cronotrip/ (GitHub Pages, sotto il percorso `/cronotrip/`).
- **Deploy**: il workflow `.github/workflows/nuxtjs.yml` parte a ogni **push su `master`**, cioè alla chiusura di una release o di un hotfix (o a mano). Tre job in fila: build (`bun install --frozen-lockfile`, `bun run generate`), migrazioni (`supabase db push` sulla produzione), pubblicazione di `.output/public`. Se la build o le migrazioni falliscono, il sito non si aggiorna.
- **Versioni**: si aggiornano nel ramo della release con `bun pm version <x.y.z> --no-git-tag-version`. La CI legge la versione da `package.json` e scrive `public/version.json` (versione, commit, data della build), che l'header dell'app mostra. I tag `v<versione>` di git-flow restano, ma non fanno partire niente.
- **Segreti della CI**: `SUPABASE_URL` e `SUPABASE_KEY` (la *publishable key*) per la build, scritti nel `.env`; `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD` e `SUPABASE_PROJECT_REF` per le migrazioni. La service role key non serve più.
- **Rami e PR**: git-flow, con le convenzioni e i passi della release in `CONTRIBUTING.md`. Il ramo delle release è `master`, l'integrazione avviene su `develop`.

L'architettura del rilascio, e perché resta su GitHub Pages: [Sito statico + Supabase](../architettura/sito-statico-supabase.md). Gli ambienti: [Ambienti](../architettura/ambienti.md).

## Primo rilascio con questo flusso

Il primo rilascio con deploy da `master` e migrazioni in CI è la release 0.2.0, andata a buon fine. La versione in `package.json` non è stata aggiornata e il tag è finito su `master`: si lascia così e si rilascia bene da qui in poi, con una [skill per il rilascio](./skill-rilascio.md).

Dopo il rilascio le **chiavi API legacy** di Supabase sono state disattivate dalla dashboard ("Disable legacy API keys"): la `anon`, usata dal sito precedente, e la `service_role`, finita per sbaglio nel log di una sessione di lavoro. L'app e la CI usano solo la *publishable key*.

## Domande aperte

- Le CLI della CI (`supabase/setup-cli`, versione fissa nel workflow) e del repo (devDependency) vanno tenute alla stessa versione a mano.
