IMPLEMENTATION_SPEC_v1_2.md (final)
Mål

Utöka LeetpeekOS v1 med tre moduler (MVP, Kommunarkiv, Website) och två stöd-kartor (Positionering L1, Offentlig L1 + Pre-upphandling L2). Allt ska följa chart-only (Mermaid), ≤9 noder/sida inkl. nav, 1–3 ord/etikett, ASCII-filnamn, och konsekventa statusklasser. Uppdatera klicknavigering mellan L0/L1/L2 enligt nedan. Baseras på nuvarande PROJECT_SUMMARY.md och PDF med nodlistor. 
 

0) Globala regler (gäller alla nya/ändrade sidor)

En karta per sida, ingen brödtext.

≤9 noder/sida inklusive Home och ⬅︎ Back.

Svenska etiketter, 1–3 ord.

ASCII, kebab-case filnamn.

På varje sida deklarera statusklasser (ingen legend som noder):

classDef done fill:#94D1BE,stroke:#3B413C,stroke-width:2px;
classDef progress fill:#FFEDB5,stroke:#C97E00,stroke-width:2px;
classDef planned fill:#ECEFF1,stroke:#90A4AE,stroke-width:2px;
classDef blocked fill:#FDE0E0,stroke:#D32F2F,stroke-width:2px;


Navigation (noder på alla sidor):

L1: Home → /index.html, ⬅︎ Back → angiven L0/L1-förälder.

L2: Home → /index.html, ⬅︎ Back → sin L1-sida.

Template: återanvänd befintlig single-chart-mall; om den saknas, skapa os/_shared/mermaid.html (Mermaid CDN + ett <pre class="mermaid">).

Lint-undantag (L0): Om L0 fortfarande överstiger 9 noder p.g.a. OSL/GDPR-spine eller Exec/Dev-toggle – exkludera just spine/toggle i räkningen (styleguide-undantag). Kör filnamns-lint på sökvägar, ej etiketter. (Motiv: nuvarande as-built har kända L0/L2-överskridanden och svenska tecken i filnamn som ska rättas framåt.) 

1) Modul A — Leetpeek MVP (L1→L2)

Skapa

os/mvp/index.html (L1)

os/mvp/hw-deploy.html, os/mvp/rag.html, os/mvp/teams.html, os/mvp/n8n.html, os/mvp/security.html (L2)

(vid behov) os/_shared/mermaid.html

L1 (vänster→höger + nav)

Noder: Hårdvara • LLM-stack • RAG/Index • Teams • n8n-brygga • Säkerhet • Pilot Go-Live • Home • ⬅︎ Back

Clicks:
Hårdvara→/os/mvp/hw-deploy.html
RAG/Index→/os/mvp/rag.html
Teams→/os/mvp/teams.html
n8n-brygga→/os/mvp/n8n.html
Säkerhet→/os/mvp/security.html

Back: /l1/plattform.html

Initial status: Hårdvara, LLM-stack = progress; övriga = planned. 

L2 (7 steg + nav/styling)

hw-deploy: Custom PC → GPU/Drivers → Docker → Compose → Traefik → DNS/TLS → Health/Bench

rag: Docs ingest → OCR/Cleanup → Chunking → Embedding → Qdrant upsert → Retrieval → Citations
(valfritt: Citations -.gap-> Chunking som streckad feedback)

teams: App reg → Bot service → Auth/scopes → Message flow → Citations → ABAC → Tenant install

n8n: n8n up → Queue/Worker → LLM node → Tool calls → Secrets/Vault → Audit logs → Retry policy

security: Zonmodell → Air-gap → RBAC → Audit logs → Backups → Patching → DPIA lite 

Wire-ins (uppdateringar)

I /l1/plattform.html: lägg en diskret MVP-flöde-nod som klickar → /os/mvp/index.html.

I Dev L0: sätt click på pipeline-noder (Ingress, Identitet, Gateway, Routing, Inferens, Data, Automation, UI, Observability) → /l1/plattform.html. 

2) Modul B — AI Kommunarkiv (L1→L2)

Skapa

os/arkiv/index.html (L1)

os/arkiv/juridik.html, os/arkiv/ingest-ocr.html, os/arkiv/index-rag.html, os/arkiv/teams.html, os/arkiv/lifecycle.html (L2)

L1 (vänster→höger + nav)

Noder: Stakeholders • OSL/Klassning • DPIA/PUB • Ingest/OCR • Index/RAG • Teams Go-Live • Export/Radering • Home • ⬅︎ Back

Clicks:
OSL/Klassning & DPIA/PUB→/os/arkiv/juridik.html
Ingest/OCR→/os/arkiv/ingest-ocr.html
Index/RAG→/os/arkiv/index-rag.html
Teams Go-Live→/os/arkiv/teams.html
Export/Radering→/os/arkiv/lifecycle.html

Back: /l1/kapabiliteter.html

Initial status: Stakeholders = progress; övriga = planned.
Prioritering du gav: markera Juridik och Index/RAG som progress (de två du pekade ut). 

L2 (7 steg + nav)

juridik: Inventering → OSL-klass → PUB-utkast → DPIA-screen → DPIA full → Zon/Policy → Sign-off

ingest-ocr: Urval → Skanning → OCR → Cleanup → QA-sample → Fixloop → Approve

index-rag: Chunking → Embedding → Qdrant upsert → Retrieval → Citeringar → Eval set → Smoke tests
(valfritt: Citeringar -.gap-> Chunking)

teams: App reg → Bot/iframe → Auth/scopes → Msg flow → Citations → Tenant install → UAT/Smoke

lifecycle: Retention → Exportformat → Raderingstest → Logg/Audit → Ärenden → Verifikation → Sign-off 

Wire-ins

I /l1/kapabiliteter.html: koppla OCR (eller lägg en diskret “Kommunarkiv”) → /os/arkiv/index.html. 

3) Modul C — Leetpeek Website (L1→L2)

Skapa

os/site/index.html (L1)

os/site/build-lead.html, os/site/lead-funnel.html, os/site/analytics.html, os/site/content-plan.html (L2)

L1 (vänster→höger + nav)

Noder: Hero/CTA • Segment • Vår teknik • Why-us • Om oss • FAQ • Kontakt • Home • ⬅︎ Back

Clicks:
Hero/CTA→/os/site/build-lead.html
Vår teknik→/os/site/content-plan.html
Why-us→/os/site/analytics.html
Om oss→/os/site/content-plan.html
FAQ→/os/site/content-plan.html
Kontakt→/os/site/lead-funnel.html

Back: /l1/affarsnav.html

Initial status: Hero/CTA, Segment, Kontakt = done; övriga = progress. 

L2 (7 steg + nav)

build-lead: Content/MDX → Komponenter → Bygg/Preview → Deploy → Lead capture → Uppföljning → Gate: GDPR (gate styled dashed)

lead-funnel: Form → Validering → Routning → Calendly → Bekräftelse → CRM/Logg → Metrik

analytics: Policy/No-track → Consent → Event-karta → Server-logg → Klient-event → Dashboard → CWV-monitor

content-plan: Vår teknik → Why-us → Om oss → FAQ → Proof-points → Case-teasers → CTA/Calendly 

Wire-ins

I /l1/affarsnav.html: lägg diskret nod Website → /os/site/index.html. 

4) Stöd-kartor — Positionering & Offentlig (L1) + Pre-upphandling (L2)

Skapa

l1/positionering.html (L1)

l1/offentlig.html (L1)

l2/pre-upphandling.html (L2)

L1: positionering

Noder: Varför här • Norrland • Grön industri • Datasuveränitet • Local-first • Förtroendegap • Leetpeek-skill • Home • ⬅︎ Back

Clicks (förslag):
Varför här→/l1/positionering_proofs.html (stub)
Norrland→/l1/ekosystem.html
Grön industri→/l1/malgrupper.html
Datasuveränitet→/l1/sakerhet.html
Local-first→/l1/plattform.html
Förtroendegap→/l1/sakerhet.html
Leetpeek-skill→/l1/kapabiliteter.html

Back: /index.html (Exec L0) 

L1: offentlig

Noder: OSL-klass • PUB-avtal • DPIA • Upphandling • Pilot-90 • Teams-nav • Export/Radering • Home • ⬅︎ Back

Clicks:
DPIA→/l2/ai_readiness.html (stub)
Upphandling→/l2/pre-upphandling.html
Pilot-90→/l2/poc_kommun.html
Teams-nav→/l2/teams_golive.html
Export/Radering→/l1/datapolicy.html (stub)

Back: /index.html (Exec L0) 

L2: pre-upphandling (offentlig)

Noder: Stakeholders • Behov • Kravutkast • DPIA-stöd • Pilot-scope • RFI/RFP • Go/Stop • Home • ⬅︎ Back

Back: /l1/offentlig.html

Förslag till cross-clicks:
Stakeholders→/l1/offentlig.html • Behov→/l1/kundresa.html • Kravutkast→/l1/positionering_proofs.html • DPIA-stöd→/l1/sakerhet.html • Pilot-scope→/l2/poc_kommun.html • RFI/RFP→/l1/affarsnav.html • Go/Stop→/l1/kundresa.html 

5) Wiring-uppdateringar (sammanfattning)

Dev L0 pipeline-noder click → /l1/plattform.html. 

Plattform L1: lägg nod MVP-flöde → /os/mvp/index.html. 

Kapabiliteter L1: koppla OCR (alt. “Kommunarkiv”) → /os/arkiv/index.html. 

Affärsnav L1: lägg Website → /os/site/index.html. 

6) Status-init (enligt dina val)

MVP: HW/Deploy = progress, n8n = progress; övriga i MVP = planned.

Kommunarkiv: Juridik och Index/RAG = progress; övriga = planned.

Website: Hero/CTA, Segment, Kontakt = done; övriga = progress. 

7) Mappar för framtida struktur (tomma placeholders)

os/strategy/ (t.ex. finansiering, positionering, ICP, roadmap m.m.)

os/ops/ (t.ex. SLA, incident, DR, RACI, deployment, modell-utvärdering m.m.)

(Endast struktur nu; verktyg/processer fylls senare — enligt dina svar.)

8) Acceptans / QA

Alla nya sidor renderar en Mermaid-karta, ≤9 noder inkl. nav, etiketter 1–3 ord.

Alla filnamn ASCII/kebab-case; alla clicks fungerar (L1↔L2 + Home/Back).

Statusklasser deklareras på varje sida (ingen legend som noder).

L0 lint pass med spine/toggle-undantag aktiverat; filename-lint kollar path (grönt).

Regenerera:

/PROJECT_SUMMARY.md (uppdaterad sitemap, status, deltas)

/reports/link_map.json (alla From→Node→Target)

/reports/lint_report.json (grönt)

Referenser: as-built inventering & deltas i PROJECT_SUMMARY.md; nodlistor/filvägar i leetpeekOS-version1.pdf.