# Come contribuire

Convenzioni del repo, valide per le persone e per gli agenti AI (anche per le skill `/start`, `/ingest`, `/close`).

## Rami (git-flow)

- `master`: solo release, taggate `v<versione>` (es. `v1.0.0`).
- `develop`: integrazione, le PR puntano qui (su GitHub il ramo di default è `master`, quindi `--base develop` va sempre indicato).
- `feature/<nome>`: un ramo per ogni task. Si apre da `develop` con `/start <nome>` (oppure `git flow feature start <nome>`).
- `bugfix/`, `release/`, `hotfix/`: come da git-flow (configurazione dopo il clone: `git flow init -d && git config gitflow.prefix.versiontag v`; non viene versionata).

`<nome>` è breve, in inglese, in kebab-case: `wishlist`, `llm-wiki`. Le feature di sola analisi hanno il prefisso `study-` (`study-payouts`): si chiudono anche con l'analisi parziale e si riprendono con una feature nuova. **Non toccano il codice**: solo `docs/`, `.claude/` e file `*.md`. Per implementare ciò che uno studio ha deciso si chiude lo studio e si apre una feature nuova.

## Commit

Formato [Conventional Commits](https://www.conventionalcommits.org/), in **inglese**:

```
<tipo>(<ambito opzionale>): <cosa cambia, all'imperativo, max ~72 caratteri>

<corpo opzionale: perché, non come>
```

| Tipo | Quando |
|---|---|
| `feat` | Nuova funzionalità |
| `fix` | Correzione di un bug |
| `docs` | Solo documentazione (anche wiki: `docs(wiki): …`) |
| `refactor` | Modifica del codice senza cambiare il comportamento |
| `test` | Test |
| `build` / `ci` | Dipendenze, build, pipeline |
| `chore` | Tutto il resto (configurazione, pulizia) |

Ambiti tipici: `app` (frontend Nuxt in `app/`), `server` (API in `server/`), `stores`, `i18n`, `ci`, più `wiki`, `raw`, `output`, `docs`.

Esempi: `feat(api): add wishlist module`, `fix(web): handle missing price`, `docs(wiki): update from wishlist`.

**Commit atomici**: una modifica logica per commit, così la PR si rilegge passo per passo.

## Comandi di check

Da lanciare dalla root prima di ogni PR (`/close` li esegue in quest'ordine):

```bash
npm run generate
```

È la stessa build statica della CI di deploy (`.github/workflows/nuxtjs.yml`). Il progetto non ha ancora né type-check né lint: quando verranno aggiunti, vanno elencati qui prima della build.

## Pull request

1. Prima di aprirla, in locale, i [comandi di check](#comandi-di-check). Per le feature `study-` non servono: `/close` verifica invece che non abbiano toccato codice.
2. Si apre verso `develop` con `/close`, che aggiorna il wiki (commit `docs(wiki): …`), fa il push e crea la PR. A mano: `gh pr create --base develop`.
3. Titolo nello stesso formato dei commit; descrizione dal template (`.github/pull_request_template.md`).
4. Nessun merge senza revisione. Nella revisione si rilegge anche il commit del wiki.

**Merge**:

- feature e bugfix verso `develop`: **squash** (un commit per feature, con il titolo della PR);
- release e hotfix verso `master`, e il loro ritorno su `develop`: **merge normale**, altrimenti `master` e `develop` divergono;
- dopo lo squash il ramo locale si cancella con `git branch -D feature/<nome>` (git non lo vede come unito).

## Documentazione

- Regole per scrivere codice: `CLAUDE.md` della root e i `CLAUDE.md` delle singole cartelle.
- Wiki di progetto, raw e ingest: [docs/CLAUDE.md](docs/CLAUDE.md).
