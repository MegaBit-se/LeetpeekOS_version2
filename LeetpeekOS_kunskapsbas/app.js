import { maps } from './maps.js';

const searchEl = document.getElementById('search');
const videoPopup = document.getElementById('video-popup');

function renderStatus() {
  const container = document.querySelector('.mermaid');
  container.innerHTML = '';
  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Karta</th><th>Done</th><th>Progress</th><th>Planned</th><th>Blocked</th><th>Urgent</th></tr>';
  for (const [k, m] of Object.entries(maps)) {
    if (!m.nodes) continue;
    const counts = {done:0, progress:0, planned:0, blocked:0, urgent:[]};
    for (const n of m.nodes) {
      counts[n.status] = (counts[n.status] || 0) + 1;
      if (n.tags && n.tags.includes('blocked-deadline')) counts.urgent.push(n.text);
    }
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${m.title || k}</td><td>${counts.done}</td><td>${counts.progress}</td><td>${counts.planned}</td><td>${counts.blocked}</td><td>${counts.urgent.join(', ')}</td>`;
    table.appendChild(tr);
  }
  container.appendChild(table);
}

function renderMap(key) {
  const container = document.querySelector('.mermaid');
  const map = maps[key];
  if (!map) {
    container.textContent = `Saknar karta: ${key}`;
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
        el.addEventListener('mouseenter', e => {
          videoPopup.src = n.video;
          videoPopup.style.left = e.pageX + 'px';
          videoPopup.style.top = e.pageY + 'px';
          videoPopup.style.display = 'block';
          videoPopup.play();
        });
        el.addEventListener('mouseleave', () => {
          videoPopup.pause();
          videoPopup.style.display = 'none';
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
render();

document.getElementById('home-btn').addEventListener('click', () => {
  location.hash = '#/index';
});
document.getElementById('back-btn').addEventListener('click', () => {
  history.back();
});

searchEl.addEventListener('input', highlightSearch);
document.getElementById('play-path').addEventListener('click', playScenario);
