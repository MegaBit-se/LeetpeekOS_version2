# LeetpeekOS_kunskapsbas

Denna kunskapsbas beskriver **Leetpeek OS v1** – ett internt, statiskt och helt **Mermaid‑diagram-baserat** mini-OS för de 4 grundarna. 
All implementering sker som **separata HTML-filer** med Mermaid.js. **Ingen brödtext** visas i själva webbgränssnittet – endast diagram.

## Snabböversikt
- **Nivåer:** L0 (Översikt) → L1 (Domänkartor) → L2 (Playbooks). Max 3.
- **L0 (9 noder):** Problem • Målgrupper • Principer • Kapabiliteter • Plattform • Kundresa • In‑portar • Ut‑portar • Värde.
- **Spine:** Säkerhet & efterlevnad (gäller allt).
- **Navigering:** `click` i Mermaid mellan HTML-sidor. Varje L1/L2 har noderna **Home** och **⬅︎ Tillbaka** som en del av diagrammet.
- **Design:** Färger ur Leetpeek-palett, 1–3 ord per nod, 7–9 noder per karta.

## Snabbstart för agent
1. Läs `/specs/LeetpeekOS_v1_spec.md` och `/policies/constraints.md`.
2. Använd `/templates/html_boilerplate.html` som bas för varje sida.
3. Starta med `/templates/mermaid_L0_overview.mmd` → lägg in i `index.html`.
4. Skapa L1-sidorna enligt `/specs/filstruktur.md` och använd `/templates/mermaid_L1_skeleton.mmd`.
5. Lägg in **click‑länkar** exakt enligt specifikationen.
6. Kör QA enligt `/checklists/qa_checklist.md`.

## Färger (Brand)
- `#DAF0EE` (ljus bakgrund/sektion)
- `#94D1BE` (principer/värde)
- `#66969B` (kapabiliteter/erbjudanden)
- `#3B413C` (säkerhet/ryggrad, ljus text)

## Viktigt
- Filnamn utan å/ä/ö (ex: `sakerhet.html`, `inportar.html`).
- Node‑ID standard: `LP-L0-…`, `LP-L1-…`, `LP-L2-…`.
- Ingen text utanför diagrammen i UI:t.
