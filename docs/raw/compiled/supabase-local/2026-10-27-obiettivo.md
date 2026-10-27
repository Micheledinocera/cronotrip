# Obiettivo — supabase-local

Ripristiniamo `.mcp.json` dallo stash (`stash@{0}`), scarichiamo lo schema con `supabase db pull`, stack locale in Docker e rimozione di `server/api/`.

Si parte da:

- [Ambienti](../../wiki/architettura/ambienti.md) (`in analisi`): Supabase CLI per l'ambiente locale in Docker, schema come migrazioni.
- [Sito statico + Supabase](../../wiki/architettura/sito-statico-supabase.md): le route di `server/api/` vanno rimosse e sostituite con chiamate a Supabase dal client.
