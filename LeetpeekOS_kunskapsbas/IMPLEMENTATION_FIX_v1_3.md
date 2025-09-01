Mål

Åtgärda kvarstående brister från v1.2:

Bring down 4×L1 till ≤9 noder (inkl. Home/Back).

Normalisera 4 filnamn till ASCII/kebab-case.

Validera samtliga länkar och regenerera rapporter.
Status & deltas enligt PROJECT_SUMMARY.md. 

0) Globala regler (oförändrade)

En (1) Mermaid-karta per sida, ingen brödtext.

≤9 noder/sida inkl. Home + ⬅︎ Back.

Etiketter på svenska, 1–3 ord.

ASCII, kebab-case filnamn.

Statusklasser deklareras på varje sida (ingen legend som noder):

classDef done fill:#94D1BE,stroke:#3B413C,stroke-width:2px;
classDef progress fill:#FFEDB5,stroke:#C97E00,stroke-width:2px;
classDef planned fill:#ECEFF1,stroke:#90A4AE,stroke-width:2px;
classDef blocked fill:#FDE0E0,stroke:#D32F2F,stroke-width:2px;


L1-nav: Home → /index.html, ⬅︎ Back → sin L0/L1-förälder.

L2-nav: Home → /index.html, ⬅︎ Back → sin L1.

L0-undantag kvar: exkludera OSL/GDPR-spine + Exec/Dev-toggle i nodräkning. 

1) L1-nodkonsolidering (mål: 7 innehållsnoder + 2 nav = 9)
1.1 /l1/affarsnav.html (nu: 12 noder → 9) 

Ny set (7):

Marknad/ICP (slå ihop “Segment/ICP/Personas”)

Funnel/CRM (slå ihop “Leads/Deals/Stages”)

Erbjudanden

Website (click → /os/site/index.html)

Prissättning (click → ev. /l2/prismodell.html när den finns)

Partner/Nät

Rapport/KPI

Home, ⬅︎ Back

1.2 /l1/plattform.html (nu: 12 noder → 9) 

Ny set (7):

Ingress

Identitet

Gateway

Inferens

Data

Automation

Observability

Home, ⬅︎ Back
(MVP-flöde-klick till /os/mvp/index.html behålls på relevant nod.)

1.3 /l1/sakerhet.html (nu: 11 noder → 9) 

Ny set (7):

Zonmodell

IAM/ABAC

Logg/Audit

Backup/DR

Patching

DPIA/OSL

Policy

Home, ⬅︎ Back

1.4 /l1/kapabiliteter.html (nu: 11 noder → 9) 

Ny set (7):

Datasuveränitet

RAG

Teams

OCR

Agenter

Playbooks (klick vidare till PoC/Go-Live m.m.)

Säkerhetskrav (länka till “sakerhet” L1)

Home, ⬅︎ Back
(Behåll klick: OCR → /os/arkiv/index.html.)

2) Filnamn – ASCII-normalisering (4 st) 

Utför villkorade rename (om tecken med å/ä/ö förekommer i filsystemet):

målgrupper.html → malgrupper.html

värde.html → varde.html

säkerhet.html → sakerhet.html

affärsnav.html → affarsnav.html

Efter rename: uppdatera samtliga inkommande länkar till nya paths.

3) Länkvalidering & rapporter

Kör länkpass: validera att alla 163 click targets pekar på existerande filer efter konsolidering/rename. 

Regenerera:

/PROJECT_SUMMARY.md (uppdaterad sitemap + compliance)

/reports/link_map.json (From file → Node → Target)

/reports/lint_report.json (alla gröna)

4) Acceptans

Alla L1-sidor ≤9 noder (7 + Home/Back).

Inga filnamn med å/ä/ö.

Alla länkar validerade.

PROJECT_SUMMARY.md, link_map.json, lint_report.json uppdaterade och gröna.