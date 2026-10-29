# Mockup — revisione del drawer

Feedback di Michele sui mockup (2026-10-29): "va benissimo", con due modifiche, fatte nel canvas https://claude.ai/artifact/CBWByTBhBsEnUL6eTQATrf

- **Drawer anche su desktop**: nella vista dell'itinerario non c'è più il pannello fisso con la mappa. Il contenuto sta in una colonna centrale; il pulsante flottante "Il viaggio · Giorno 1" (in basso a destra su desktop, in basso al centro su mobile) apre il drawer. Su desktop è un pannello che entra da destra (`USlideover`), su mobile dal basso (`UDrawer`).
- **Mappa del drawer = tutto l'itinerario**: di base mostra tutti i giorni (marker con il numero del giorno, percorso di tutto il viaggio). Toccando un giorno nell'elenco si **evidenzia solo quel tratto**: i suoi luoghi numerati e il suo percorso in `ui-primary`, il resto in grigio; il giorno scelto si colora e compare "Tutto il viaggio" per tornare indietro (toccare di nuovo il giorno fa lo stesso). L'elenco mostra sempre tutte le giornate con i loro luoghi; il luogo visibile resta evidenziato in `ui-secondary`.
- Nel canvas i due drawer (desktop e mobile) sono interattivi; le varianti mostrano gli stati con un giorno evidenziato.
