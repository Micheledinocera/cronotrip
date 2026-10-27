---
tipo: decisione
stato: presa
aggiornato: 2026-10-27
fonti:
  - raw/compiled/study-current-state/2026-10-27-state.md
  - raw/compiled/study-current-state/2026-10-27-analisi-codice.md
  - raw/compiled/study-current-state/2026-10-27-risposte.md
---

# Sito statico + Supabase

## Decisione

Cronotrip è un **sito statico** (`nuxt generate`) pubblicato su **GitHub Pages**. Il browser parla **direttamente con Supabase** usando la chiave pubblica (anon), e la sicurezza sta nelle **Row Level Security** (RLS) del database. Nessun server applicativo.

Non si passa a Vercel.

## Perché

- **Costo zero**: traffico basso, pochi utenti, nessuna spesa.
- **Locale e produzione uguali**: oggi le route `server/api/` funzionano solo in locale e su GitHub Pages non esistono, quindi in produzione funzionano solo home e login. Senza server il comportamento è lo stesso ovunque. Dettagli: [API routes](../tecnico/server/api-routes.md).
- **Sicurezza**: le route attuali usano la service role key, che salta le RLS. Con le RLS i permessi multi-utente stanno nel database.
- Va bene che il progetto Supabase del piano gratuito **si metta in pausa** quando non viene usato: con un uso personale è anche giusto così.

## Opzioni scartate

- **SSR su Vercel, Netlify o Cloudflare** (piano gratuito): manterrebbe le route `server/api/`, ma aggiunge un servizio da gestire, ha i limiti del piano gratuito, e le route andrebbero comunque riscritte con l'utente autenticato.

## Conseguenze

- Le route di `server/api/` vanno rimosse e sostituite con chiamate a Supabase dal client.
- I permessi multi-utente (chi vede, chi modifica, cosa si copia) vanno scritti come policy RLS: vedi [Condivisione](../viaggi/condivisione.md). La parte multi-utente era solo abbozzata e va rifatta.
- La logica che richiede segreti, se un giorno servirà, va nelle Edge Functions di Supabase.

## Domande aperte

- I limiti attuali del piano gratuito di Supabase (dopo quanto va in pausa, spazio per le foto): da verificare.
