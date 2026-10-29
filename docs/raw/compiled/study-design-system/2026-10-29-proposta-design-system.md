# Proposta di design system — prima versione

Design system pubblicato come artifact (privato, da condividere a scelta): https://claude.ai/artifact/8atLk41aCxS51rZyBKTav2

## Cosa contiene

- **Due palette**, ognuna in chiaro e scuro (4 temi), con i token mappati 1:1 sulle variabili `--ui-*` di Nuxt UI e le scale `primary`/`secondary`/`neutral` 50–950:
  - **Atlante** (consigliata): blu oltremare (primary-700 `#185ab0`) + terracotta, neutri caldi "carta"; sfondo chiaro carta `#fdf9f5`, scuro `#28251f`.
  - **Lago**: blu petrolio (primary-700 `#006987`) + ocra, neutri freddi "ardesia"; sfondo chiaro bianco, scuro `#1f262b`.
  - Contrasto testo ≥4.5:1 su `ui-bg` in tutti e 4 i temi; `ui-text-dimmed` e i colori di stato scendono a ~4.2:1 su `ui-bg-muted`/`ui-bg-elevated`.
- **Due coppie di font**: A Fraunces (titoli, solo nella vista) + Figtree (interfaccia), consigliata; B Bricolage Grotesque + Instrument Sans.
- **Logo**: arco aperto (la "C", il quadrante, il giro) con un punto d'arrivo nel varco; logotipo "cronotrip" minuscolo in Fraunces. Icona dell'app chiara (su primary-700) e scura (su neutral-950).
- Raggio base `--ui-radius` 6px; spaziatura Tailwind; tre ombre.
- Componenti (anteprime che imitano Nuxt UI): pulsanti, badge di stato (In programmazione = neutral outline + `circle-dashed`, In corso = secondary solid + `route`, Fatto = primary soft + `circle-check`), card itinerario, campi del form, modali (eliminazione, modifiche non salvate), toast, menu utente, barra di navigazione, foto, mappa.
- **Icone**: Lucide (`i-lucide-*`). Categorie: footprints Trekking, utensils Cibo, landmark Museo, music Concerto, binoculars Visita, bed-double Alloggio, compass Altro.
- **Mappe**: tile CARTO Positron (chiaro) / Dark Matter (scuro); marker tondi numerati in primary, luogo attivo in secondary, percorso a puntini.
- Proposte per le domande aperte del brief: momenti chiusi di default (una riga "MENU · 4"), sezioni del form richiudibili con riga di riepilogo, riordino per trascinamento con frecce come alternativa da tastiera.

## Da validare prima dei mockup

- Palette: Atlante o Lago.
- Font: coppia A o B.
- Logo e icona.
- Tile della mappa (Positron/Dark Matter o Voyager); limiti d'uso gratuiti di CARTO da verificare.
