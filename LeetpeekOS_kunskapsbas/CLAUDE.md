# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LeetpeekOS v1** is an internal, static, Mermaid diagram-based mini-OS for the 4 founders. All implementation consists of separate HTML files with Mermaid.js. No body text is shown in the web interface - only diagrams.

## Architecture

- **Static HTML pages** (one per map) + **Mermaid.js via CDN**
- **No auth**, no backend, no database
- **3-level hierarchy**: L0 (Overview) → L1 (Domain maps) → L2 (Playbooks)
- **Navigation**: exclusively through Mermaid `click` between HTML pages
- **Design**: Colors from Leetpeek palette, 1-3 words per node, 7-9 nodes per map

## Information Model

- **L0 – Overview (9 nodes)**: Problem • Target groups • Principles • Capabilities • Platform • Customer journey • In-ports • Out-ports • Value
- **Spine**: *Security & compliance* (DPIA/OSL, GDPR, Backup/DR, Audit) - shown as separate node/vertical lane, not arrows to everything
- **L1 – Domains**: Principles • Capabilities (5) • Platform • Customer journey • In-ports • Out-ports • Security • Value/KPI • Target groups • (possibly Problem)
- **L2 – Playbooks**: PoC municipality • Teams Go-Live • OCR→Index→Knowledge search

## File Structure

```
/index.html                 ← L0 Overview
/l1/
  kapabiliteter.html
  kundresa.html
  principer.html
  plattform.html
  inportar.html
  utportar.html
  sakerhet.html
  malgrupper.html
  varde.html
  problem.html
/l2/
  poc_kommun.html
  teams_golive.html
  ocr_index.html
/assets/
  styles.css                ← (optional) simple layout - no body text
```

## Development Commands

This is a static HTML project with no build process:
- Open `index.html` directly in browser for local development
- No npm commands or package.json - pure HTML + Mermaid.js from CDN

## Critical Constraints (MUST be followed)

- **No** text in UI outside the actual Mermaid diagrams
- **Max 3 levels** (L0→L1→L2). No L3
- **1-3 words per node**. Swedish, no abbreviations requiring explanation
- **7-9 nodes per map**. If more needed - break into new map
- **Color palette** according to brand. No extra colors
- **Left→right** on L0. Minimize crossing arrows
- **Security** shown as separate node/backbone (not arrows to everything)
- **Filenames without å/ä/ö**. Node-ID according to standard
- **Home** and **⬅︎ Back** are always nodes in the diagram

## Brand Colors

- `#DAF0EE` (light background/section)
- `#94D1BE` (principles/value)
- `#66969B` (capabilities/offerings)
- `#3B413C` (security/backbone, light text)

## Standard Templates

### HTML Boilerplate
Use `/templates/html_boilerplate.html` as base for every page:
```html
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Leetpeek OS</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <style>
    html,body{margin:0;padding:0}
    .wrap{padding:16px;max-width:1400px;margin:0 auto}
    .mermaid{min-height:60vh}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="mermaid">
      %% PLACEHOLDER: paste your Mermaid flowchart here
    </div>
  </div>
  <script>mermaid.initialize({startOnLoad:true});</script>
</body>
</html>
```

### Mermaid Classes (include in every diagram)
```mermaid
classDef seg fill:#DAF0EE,stroke:#3B413C,color:#3B413C;
classDef fund fill:#94D1BE,stroke:#3B413C,color:#0b0b0b;
classDef cap  fill:#66969B,stroke:#3B413C,color:#ffffff;
classDef core fill:#DAF0EE,stroke:#3B413C,color:#0b0b0b;
classDef gov  fill:#3B413C,stroke:#3B413C,color:#ffffff;
classDef io   fill:#DAF0EE,stroke:#3B413C,color:#0b0b0b;
classDef out  fill:#DAF0EE,stroke:#3B413C,color:#0b0b0b;
classDef val  fill:#94D1BE,stroke:#3B413C,color:#0b0b0b;
```

## Navigation Implementation

- Only via **Mermaid `click`**: each node links to correct HTML
- Every L1/L2 has nodes **Home** and **⬅︎ Back**
- L0 points to L1; L1 points to relevant L2
- Click syntax: `click NODE_ID "path/file.html" _self`

## Naming Conventions

- **Files**: `index.html`, `l1/kapabiliteter.html`, `l2/poc_kommun.html` … (no å/ä/ö)
- **Node-ID**: `LP-L0-Problem`, `LP-L1-Kapabiliteter`, etc.

## Quality Acceptance Criteria (Definition of Done)

- L0 has exactly 9 nodes + one visible **Security** node
- All L0 nodes have working `click` to L1
- At least 6 L1 pages exist with Home/Back nodes and forward links
- 3 L2 playbooks exist and are linked from L1
- All nodes follow 1-3 word rule and colors are consistent
- Navigation works correctly between all levels

## Development Workflow

1. Read `/specs/LeetpeekOS_v1_spec.md` and `/policies/constraints.md`
2. Use `/templates/html_boilerplate.html` as base for each page
3. Start with `/templates/mermaid_L0_overview.mmd` → put in `index.html`
4. Create L1 pages according to `/specs/filstruktur.md` and use `/templates/mermaid_L1_skeleton.mmd`
5. Add **click-links** exactly according to specification
6. Run QA according to `/checklists/qa_checklist.md`

## Important Notes

- This is Swedish-first content (URLs and codebase in English - page content mainly in Swedish)
- UI should not show body text - `styles.css` used only for spacing/centering
- No frameworks, no build step - pure static HTML with Mermaid.js
- Every page contains exactly one Mermaid diagram and nothing else in the UI