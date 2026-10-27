---
tipo: info
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-state.md
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
---

# Rilascio e versioni

- **Produzione**: https://micheledinocera.github.io/cronotrip/ (GitHub Pages, sotto il percorso `/cronotrip/`).
- **Deploy**: il workflow `.github/workflows/nuxtjs.yml` parte a ogni tag `v*.*.*` (o a mano). Fa `npm run generate` e pubblica `.output/public`.
- **Versioni**: tag `v0.1.x`, creati da git-flow sulle release (prefisso `v`). La CI scrive `public/version.json` (versione, commit, data della build), che l'header dell'app mostra.
- **Segreti della CI**: `SUPABASE_URL` e `SUPABASE_KEY` dai secrets del repo, scritti nel `.env` durante la build. `SUPABASE_SECRET_KEY` non viene passata.
- **Rami e PR**: git-flow, con le convenzioni in `CONTRIBUTING.md`. Il ramo delle release è `master`, l'integrazione avviene su `develop`.

L'architettura del rilascio, e perché resta su GitHub Pages: [Sito statico + Supabase](../architettura/sito-statico-supabase.md). Gli ambienti: [Ambienti](../architettura/ambienti.md).

## Domande aperte

- La CI stampa il `.env` nei log (`cat .env`): con la sola chiave anon non è grave, ma è da rimuovere.
