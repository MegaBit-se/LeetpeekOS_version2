# Leetpeek OS v1 – Specifikation

## Syfte
Intern, statisk webb för de fyra grundarna. Navigation och innehåll sker uteslutande genom **Mermaid‑flowcharts**.

## Arkitektur
- **Statiska HTML-sidor** (en per karta) + **Mermaid.js via CDN**.
- **Ingen auth**, ingen backend, ingen databas.
- Varje karta har **7–9 noder** och **1–3 ord per nod**.

## Informationsmodell
- **L0 – Översikt (9 noder):** Problem • Målgrupper • Principer • Kapabiliteter • Plattform • Kundresa • In‑portar • Ut‑portar • Värde.
- **Spine:** *Säkerhet & efterlevnad* (DPIA/OSL, GDPR, Backup/DR, Audit) – visas som egen nod/vertikal lane, inte pilar till alla.
- **L1 – Domäner:** Principer • Kapabiliteter (5) • Plattform • Kundresa • In‑portar • Ut‑portar • Säkerhet • Värde/KPI • Målgrupper • (ev. Problem).
- **L2 – Playbooks:** PoC kommun • Teams Go‑Live • OCR→Index→Kunskapssök.

## Navigering
- Endast via **Mermaid `click`**: varje nod länkar till korrekt HTML.
- Varje L1/L2 har noderna **Home** och **⬅︎ Tillbaka**.
- L0 pekar till L1; L1 pekar till relevanta L2.

## Namngivning
- **Filer:** `index.html`, `l1/kapabiliteter.html`, `l2/poc_kommun.html` … (inga å/ä/ö).
- **Node‑ID:** `LP-L0-Problem`, `LP-L1-Kapabiliteter`, etc.

## Designregler
- Enkla rubriker (1–3 ord).
- Minimera korsande pilar, vänster→höger berättelse på L0.
- En konsekvent palett och `classDef` i varje diagram (se style‑snippet).

## Acceptanskriterier (DoD)
- L0 har exakt 9 noder + en synlig **Säkerhet**‑nod.
- Samtliga L0‑noder har fungerande `click` till L1.
- Minst 6 L1‑sidor finns med Home/Back‑noder och vidare‑länkar.
- 3 L2‑playbooks finns och är länkade från L1.
- Alla noder följer 1–3 ord‑regeln och färgerna är konsekventa.
