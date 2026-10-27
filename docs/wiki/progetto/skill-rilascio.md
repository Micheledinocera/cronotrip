---
tipo: decisione
stato: in analisi
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-flows/2026-10-27-skill-rilascio.md
  - raw/compiled/study-flows/2026-10-27-risposte-copia-stato.md
---

# Skill per il rilascio

Si vuole una skill (`/release`) che guidi il rilascio, così da non saltare passi. È deciso di farla; cosa deve fare è una proposta, da scrivere in una feature a parte. I passi manuali di oggi: [Rilascio e versioni](./rilascio.md) e `CONTRIBUTING.md`.

Il motivo: al rilascio 0.2.0 la versione in `package.json` non è stata aggiornata (online c'è ancora `v0.1.13`) e il tag è finito su `master` invece che sul ramo della release. Non si corregge all'indietro: da qui in poi i rilasci si fanno bene.

## Cosa dovrebbe fare (proposta)

- **Controlli prima di partire**, fermandosi se uno fallisce: working tree pulito, git-flow inizializzato, `develop` allineato a `origin/develop`, nessuna release o hotfix già aperta. Mostra le feature entrate dall'ultima release (`git log origin/master..origin/develop`).
- **Versione**: propone la versione semver dai commit (`feat` → minor, solo `fix` → patch), l'utente conferma; prima del finish controlla che `package.json` sia aggiornato.
- **Migrazioni**: elenca quelle nuove rispetto a `master`; se ce ne sono, ricorda la verifica in locale (`bun run db:reset`) e mostra cosa farà in produzione (`bunx supabase db push --linked --dry-run`). Se una migrazione elimina o trasforma dati, propone prima un dump della produzione, fuori da git.
- **Release**: `git flow release start`, aggiornamento della versione con commit `chore(release): <versione>`, `git flow release finish`, push di `master`, `develop` e tag. Chiede conferma prima del push su `master`, che manda in produzione.
- **Dopo il push**: segue il run del workflow (`gh run watch`) e riporta l'esito dei tre job; controlla che `version.json` online abbia la versione e il commit attesi; verifica che `master`, `develop` e il tag siano su origin.

## Domande aperte

- Hotfix: la stessa skill o una a parte?
- Serve un changelog (file o note della release su GitHub) generato dai PR?
- La verifica dell'app online dopo il rilascio (login, dashboard) si fa a mano o con Playwright?
