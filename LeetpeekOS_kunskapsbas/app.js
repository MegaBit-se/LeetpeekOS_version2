import { maps } from './maps.js';

const searchEl = document.getElementById('search');
const videoModal = document.getElementById('video-modal');
const modalVideo = videoModal.querySelector('video');
const modalFallback = videoModal.querySelector('.fallback');
const toastEl = document.getElementById('toast');

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 3000);
}

function applyDeadlines() {
  const now = new Date();
  for (const map of Object.values(maps)) {
    if (!map.nodes) continue;
    for (const node of map.nodes) {
      if (node.deadline_at && node.urgency_threshold_days) {
        const diff = (new Date(node.deadline_at) - now) / (1000 * 60 * 60 * 24);
        if (diff <= node.urgency_threshold_days) {
          node.status = 'blocked';
          if (!node.text.includes('\u26A0')) node.text += ' \u26A0';
        }
      }
    }
  }
}

function renderStatus() {
  const container = document.querySelector('.mermaid');
  const totals = {done:0, progress:0, planned:0, blocked:0};
  for (const m of Object.values(maps)) {
    if (!m.nodes) continue;
    for (const n of m.nodes) {
      totals[n.status] = (totals[n.status] || 0) + 1;
    }
  }
  const lines = [
    'flowchart LR',
    `done["Gjort ${totals.done}"] --> progress["Nu ${totals.progress}"] --> planned["Plan ${totals.planned}"] --> blocked["Block ${totals.blocked}"]`,
    'classDef done fill:#4caf50,stroke:#333,color:#fff;',
    'classDef progress fill:#2196f3,stroke:#333,color:#fff;',
    'classDef planned fill:#ccc,stroke:#333,color:#000;',
    'classDef blocked fill:#f44336,stroke:#333,color:#fff;',
    'class done done;',
    'class progress progress;',
    'class planned planned;',
    'class blocked blocked;',
    'click done "#/l1/projekt-hub" _self',
    'click progress "#/l1/projekt-hub" _self',
    'click planned "#/l1/projekt-hub" _self',
    'click blocked "#/l1/projekt-hub" _self'
  ];
  container.textContent = lines.join('\n');
  mermaid.init(undefined, container);
}

function renderMap(key) {
  const container = document.querySelector('.mermaid');
  const map = maps[key];
  if (!map) {
    container.textContent = `Saknar karta: ${key}`;
    showToast(`404 ${key}`);
    return;
  }
  const lines = ['flowchart LR'];
  if (map.subgraphs) {
    for (const sg of map.subgraphs) {
      lines.push(`subgraph ${sg.name}`);
      for (const id of sg.nodes) {
        lines.push(`  ${id}`);
      }
      lines.push('end');
    }
  }
  for (const n of map.nodes) {
    lines.push(`${n.id}["${n.text}"]`);
  }
  if (map.connections) {
    for (const [a,b] of map.connections) {
      lines.push(`${a} --> ${b}`);
    }
  }
  for (const n of map.nodes) {
    if (n.link) {
      const target = n.link;
      const targetAttr = target.endsWith('.md') ? '_blank' : '_self';
      lines.push(`click ${n.id} "${target}" ${targetAttr}`);
    }
  }
  container.textContent = lines.join('\n');
  mermaid.init(undefined, container);

  map.nodes.forEach(n => {
    if (n.video) {
      const el = document.getElementById(n.id);
      if (el) {
        el.addEventListener('click', e => {
          e.preventDefault();
          modalFallback.style.display = 'none';
          modalVideo.src = n.video;
          modalVideo.load();
          modalVideo.play().catch(() => {
            modalFallback.style.display = 'block';
          });
          videoModal.style.display = 'block';
        });
      }
    }
  });
  highlightSearch();
}

function render() {
  const key = (location.hash || '/l1/projekt-hub').replace('#', '');
  if (key === '/status') {
    renderStatus();
  } else {
    renderMap(key);
  }
}

function highlightSearch() {
  const query = (searchEl.value || '').toLowerCase();
  window.dispatchEvent(new CustomEvent('OS.search', { detail: query }));
  document.querySelectorAll('.glow').forEach(el => el.classList.remove('glow'));
  if (!query) return;
  const key = (location.hash || '/l1/projekt-hub').replace('#', '');
  const map = maps[key];
  if (!map) return;
  for (const n of map.nodes) {
    const hay = n.text.toLowerCase() + ' ' + (n.tags || []).join(' ').toLowerCase();
    if (hay.includes(query)) {
      const el = document.getElementById(n.id);
      if (el) el.classList.add('glow');
    }
  }
}

function playScenario() {
  window.dispatchEvent(new Event('OS.scenario.play'));
  const key = (location.hash || '/l1/projekt-hub').replace('#', '');
  const map = maps[key];
  if (!map || !map.nodes) return;
  let i = 0;
  const seq = map.nodes.map(n => n.id);
  const interval = setInterval(() => {
    document.querySelectorAll('.glow').forEach(el => el.classList.remove('glow'));
    const id = seq[i];
    const el = document.getElementById(id);
    if (el) el.classList.add('glow');
    i++;
    if (i >= seq.length) clearInterval(interval);
  }, 1000);
}

window.addEventListener('hashchange', render);
applyDeadlines();
render();

document.getElementById('home-btn').addEventListener('click', () => {
  location.hash = '#/index';
});
document.getElementById('back-btn').addEventListener('click', () => {
  history.back();
});

searchEl.addEventListener('input', highlightSearch);
document.getElementById('play-path').addEventListener('click', playScenario);
document.getElementById('video-close').addEventListener('click', () => {
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  videoModal.style.display = 'none';
  modalFallback.style.display = 'none';
});
