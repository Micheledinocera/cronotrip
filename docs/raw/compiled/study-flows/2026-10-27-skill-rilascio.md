# Skill per il rilascio — cosa c'è da fare

Richiesta: creare una skill (`/release`) per quando facciamo la release. In questo studio si prepara solo l'elenco di cosa deve fare; la skill si scrive dopo, in una feature a parte.

## Cosa fa oggi a mano chi rilascia

Dai passi di `CONTRIBUTING.md` (sezione Rilascio) e da [Rilascio e versioni](../../wiki/progetto/rilascio.md):

1. Migrazioni nuove verificate in locale (`bun run db:reset`, `bun run dev`).
2. `git flow release start <versione>`.
3. `bun pm version <versione> --no-git-tag-version`, commit `chore(release): <versione>`.
4. `git flow release finish <versione>`, push di `master`, `develop` e dei tag.
5. Il push su `master` fa partire build, `supabase db push` sulla produzione e pubblicazione.

Al primo rilascio (0.2.0) il passo 3 è stato saltato: la produzione mostra ancora `v0.1.13` e su origin non c'è il tag `v0.2.0`. Una skill serve proprio a non saltare passi.

## Cosa dovrebbe fare la skill (proposta)

**Controlli prima di partire** (si ferma se uno fallisce):
- working tree pulito, git-flow inizializzato, `develop` allineato a `origin/develop`;
- nessuna release o hotfix già aperta;
- CI verde sull'ultimo commit di `develop` (se c'è una CI sui PR);
- elenco delle feature entrate da quest'ultima release (`git log origin/master..origin/develop`) da mostrare all'utente.

**Versione**:
- proporre la versione (semver) leggendo i commit: `feat` → minor, solo `fix` → patch; l'utente conferma;
- controllare che `package.json` sia davvero aggiornato prima del finish.

**Migrazioni**:
- elencare le migrazioni nuove rispetto a `master`;
- se ce ne sono: ricordare `db:reset` in locale e mostrare cosa farà in produzione (`bunx supabase db push --linked --dry-run`); se una migrazione elimina o trasforma dati, proporre prima un dump della produzione (fuori da git).

**Release**: i passi 2–4 sopra, chiedendo conferma prima del push su `master` (è il momento in cui va in produzione).

**Dopo il push**:
- seguire il run del workflow (`gh run watch`) e riportare l'esito dei tre job;
- controllare `https://micheledinocera.github.io/cronotrip/version.json`: versione e commit attesi;
- verificare che `master` e `develop` siano allineati su origin e che il tag esista.

## Domande aperte

- Hotfix: la stessa skill (`/release` e `/hotfix`) o una a parte?
- Serve un changelog (file o note della release su GitHub) generato dai PR?
- La verifica dell'app online dopo il rilascio (login, dashboard) si fa a mano o con Playwright?
- Pendenza del primo rilascio, da fare a mano e non nella skill: "Disable legacy API keys" nella dashboard di Supabase.
