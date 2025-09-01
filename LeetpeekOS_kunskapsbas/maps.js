export const maps = {
  "/l1/projekt-hub": {
    "title": "L1: Projekt-hub",
    "layout": "cluster",
    "subgraphs": [
      {
        "name": "Kärnprojekt",
        "nodes": [
          "mvp",
          "arkiv",
          "site"
        ]
      },
      {
        "name": "Styrning",
        "nodes": [
          "roadmap",
          "finansiering"
        ]
      }
    ],
    "nodes": [
      {
        "id": "mvp",
        "text": "Leetpeek MVP",
        "status": "progress",
        "link": "#/os/mvp",
        "tags": [
          "mvp",
          "#teams"
        ]
      },
      {
        "id": "arkiv",
        "text": "Arkiv",
        "status": "planned",
        "link": "#/os/arkiv"
      },
      {
        "id": "site",
        "text": "Site",
        "status": "planned",
        "link": "#/os/site"
      },
      {
        "id": "roadmap",
        "text": "Roadmap",
        "status": "planned",
        "link": "#/os/roadmap"
      },
      {
        "id": "finansiering",
        "text": "Finansiering",
        "status": "progress",
        "link": "#/os/strategy/finansiering",
        "tags": [
          "blocked-deadline"
        ]
      }
    ],
    "connections": [
      [
        "mvp",
        "roadmap"
      ],
      [
        "arkiv",
        "finansiering"
      ],
      [
        "site",
        "roadmap"
      ]
    ]
  },
  "/l1/marknad-hub": {
    "title": "L1: Marknad-hub",
    "layout": "cluster",
    "subgraphs": [
      {
        "name": "Marknadsstrategi",
        "nodes": [
          "segment",
          "budskap",
          "position"
        ]
      },
      {
        "name": "Exekvering",
        "nodes": [
          "kampanjer",
          "kanaler"
        ]
      },
      {
        "name": "Omvärld",
        "nodes": [
          "trender"
        ]
      }
    ],
    "nodes": [
      {
        "id": "segment",
        "text": "Segment",
        "status": "progress",
        "link": "#"
      },
      {
        "id": "budskap",
        "text": "Budskap",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "position",
        "text": "Position",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "kampanjer",
        "text": "Kampanjer",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "kanaler",
        "text": "Kanaler",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "trender",
        "text": "Trender",
        "status": "planned",
        "link": "#"
      }
    ],
    "connections": [
      [
        "segment",
        "kampanjer"
      ],
      [
        "trender",
        "segment"
      ],
      [
        "segment",
        "budskap"
      ],
      [
        "budskap",
        "kampanjer"
      ],
      [
        "position",
        "segment"
      ],
      [
        "kanaler",
        "kampanjer"
      ]
    ]
  },
  "/l1/sakerhet-drift-hub": {
    "title": "L1: Säkerhet-Drift",
    "layout": "cluster",
    "subgraphs": [
      {
        "name": "Policies",
        "nodes": [
          "data-policy",
          "sla"
        ]
      },
      {
        "name": "Operativa",
        "nodes": [
          "incident",
          "deployment"
        ]
      }
    ],
    "nodes": [
      {
        "id": "data-policy",
        "text": "Data policy",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "sla",
        "text": "SLA",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "incident",
        "text": "Incident",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "deployment",
        "text": "Deployment",
        "status": "planned",
        "link": "#"
      }
    ],
    "connections": [
      [
        "incident",
        "deployment"
      ],
      [
        "data-policy",
        "sla"
      ]
    ]
  },
  "/os/arkiv/pitea-pilot": {
    "title": "L2: Piteå-pilot",
    "nodes": [
      {
        "id": "start",
        "text": "Start",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "forstudie",
        "text": "Förstudie",
        "status": "progress",
        "link": "os/arkiv/pitea-pilot.md#forstudie"
      },
      {
        "id": "skanning",
        "text": "Skanning",
        "status": "planned",
        "link": "os/arkiv/pitea-pilot.md#skanning"
      },
      {
        "id": "driftstart",
        "text": "Driftstart",
        "status": "planned",
        "link": "os/arkiv/pitea-pilot.md#driftstart"
      },
      {
        "id": "utvardering",
        "text": "Utvärdering",
        "status": "planned",
        "link": "os/arkiv/pitea-pilot.md#utvardering"
      },
      {
        "id": "skalplan",
        "text": "Skalplan",
        "status": "planned",
        "link": "os/arkiv/pitea-pilot.md#skalplan"
      },
      {
        "id": "finans",
        "text": "Finansiering",
        "status": "progress",
        "link": "#/os/strategy/finansiering",
        "tags": [
          "blocked-deadline",
          "vinnova-20250910",
          "tillvaxt-20250916",
          "echoes-20250916",
          "raa-20250131"
        ]
      }
    ],
    "connections": [
      [
        "start",
        "forstudie"
      ],
      [
        "forstudie",
        "skanning"
      ],
      [
        "skanning",
        "driftstart"
      ],
      [
        "driftstart",
        "utvardering"
      ],
      [
        "utvardering",
        "skalplan"
      ],
      [
        "skalplan",
        "forstudie"
      ],
      [
        "finans",
        "forstudie"
      ]
    ]
  },
  "/os/mvp/index": {
    "title": "L2: MVP-Översikt",
    "layout": "cluster",
    "subgraphs": [
      {
        "name": "DevOps",
        "nodes": [
          "ansible",
          "cicd"
        ]
      },
      {
        "name": "Infrastruktur",
        "nodes": [
          "hardvara",
          "llm-stack"
        ]
      }
    ],
    "nodes": [
      {
        "id": "ansible",
        "text": "Ansible/CI 🎥",
        "status": "progress",
        "link": "/os/mvp/index.md",
        "tags": [
          "devops"
        ],
        "video": "/videos/karnan.mp4"
      },
      {
        "id": "cicd",
        "text": "CI/CD",
        "status": "planned",
        "link": "#",
        "tags": [
          "devops"
        ]
      },
      {
        "id": "hardvara",
        "text": "Hardvara",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "llm-stack",
        "text": "LLM Stack",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "backend",
        "text": "FastAPI",
        "status": "progress",
        "link": "#"
      },
      {
        "id": "export",
        "text": "Export",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "overvak",
        "text": "Övervakning",
        "status": "planned",
        "link": "#"
      }
    ],
    "connections": [
      [
        "ansible",
        "hardvara"
      ],
      [
        "ansible",
        "cicd"
      ],
      [
        "backend",
        "llm-stack"
      ],
      [
        "export",
        "overvak"
      ]
    ]
  },
  "/os/arkiv/index": {
    "title": "L2: Arkiv-Översikt",
    "layout": "cluster",
    "subgraphs": [
      {
        "name": "Kärnflöde",
        "nodes": [
          "ingest",
          "ocr",
          "index",
          "rag"
        ]
      },
      {
        "name": "Styrning",
        "nodes": [
          "juridik",
          "dpia"
        ]
      }
    ],
    "nodes": [
      {
        "id": "ingest",
        "text": "Ingest",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "ocr",
        "text": "OCR",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "index",
        "text": "Index",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "rag",
        "text": "RAG",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "juridik",
        "text": "Juridik",
        "status": "progress",
        "link": "/os/arkiv/index.md"
      },
      {
        "id": "dpia",
        "text": "DPIA",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "lifecycle",
        "text": "Lifecycle",
        "status": "planned",
        "link": "#"
      }
    ],
    "connections": [
      [
        "ingest",
        "ocr"
      ],
      [
        "ocr",
        "index"
      ],
      [
        "index",
        "rag"
      ],
      [
        "juridik",
        "dpia"
      ],
      [
        "rag",
        "lifecycle"
      ]
    ]
  },
  "/os/site/index": {
    "title": "L2: Site-Översikt",
    "layout": "cluster",
    "subgraphs": [
      {
        "name": "Publikt",
        "nodes": [
          "hero",
          "why",
          "cta"
        ]
      },
      {
        "name": "Tillväxt",
        "nodes": [
          "lead",
          "funnel",
          "seo"
        ]
      }
    ],
    "nodes": [
      {
        "id": "hero",
        "text": "Hero 🎥",
        "status": "progress",
        "link": "/os/site/index.md",
        "video": "/videos/karnan.mp4"
      },
      {
        "id": "why",
        "text": "Why us",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "cta",
        "text": "CTA",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "lead",
        "text": "Lead",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "funnel",
        "text": "Funnel",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "seo",
        "text": "SEO",
        "status": "planned",
        "link": "#"
      },
      {
        "id": "roadmap",
        "text": "Roadmap",
        "status": "planned",
        "link": "#"
      }
    ],
    "connections": [
      [
        "hero",
        "lead"
      ],
      [
        "lead",
        "funnel"
      ],
      [
        "funnel",
        "seo"
      ],
      [
        "seo",
        "roadmap"
      ],
      [
        "why",
        "cta"
      ]
    ]
  }
} ;
