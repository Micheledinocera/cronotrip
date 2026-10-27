# Modifica e cancellazione

Proposta discussa con l'utente e approvata.

- **Dove**: nella pagina dell'itinerario. **Modifica** ed **Elimina** solo per il proprietario (le policy del database già impediscono agli altri di modificare o cancellare; nasconderli è solo comodità). **Copia** per tutti gli utenti registrati.
- **Modifica**: apre il form unico di creazione/modifica con i dati caricati; al salvataggio si torna alla pagina dell'itinerario.
- **Cancellazione definitiva**, niente cestino: modale di conferma, poi l'itinerario viene eliminato e si torna alla dashboard.
- Le **copie** di un itinerario cancellato restano; perdono solo il riferimento all'originale (`copied_from` diventa vuoto).
- **Modifiche non salvate**: uscendo dal form con modifiche non salvate compare il solito avviso ("se esci potresti perdere i dati").
