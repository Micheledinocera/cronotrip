# Chiavi Supabase e URL delle foto

## Chiavi (da fare al rilascio, non ora)

- L'app usa le nuove **publishable key** al posto della `anon` legacy: `.env` ha quella di produzione, `.env.local` quella dello stack locale (sono diverse, quella di produzione in locale non funziona). Provata in locale: login, dashboard, dettaglio.
- Al rilascio, in quest'ordine:
  1. aggiornare il secret GitHub `SUPABASE_KEY` con la publishable key di produzione;
  2. fare il rilascio;
  3. solo dopo, nella dashboard Supabase, "Disable legacy API keys": spegne la `anon` (usata dal sito attuale, per questo va fatto dopo) e la `service_role`, finita per sbaglio nel log di una sessione di Claude Code.
- Rigenerare il JWT secret per ruotare la sola `service_role` invaliderebbe anche la `anon` e disconnetterebbe tutti: non si fa.

## Foto

- `useSupabaseImages().getImageUrl()`: se il valore è un URL completo (`http://` o `https://`) si usa così com'è, altrimenti è un percorso nel bucket `Photos` come prima. Prima gli URL completi dei mock (picsum) venivano attaccati all'indirizzo dello storage e le immagini non si caricavano.
