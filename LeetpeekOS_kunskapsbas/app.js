import { maps } from './maps.js';

function render() {
  const container = document.querySelector('.mermaid');
  const key = (location.hash || '/l1/projekt-hub').replace('#', '');
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
}

window.addEventListener('hashchange', render);
render();

document.getElementById('home-btn').addEventListener('click', () => {
  location.hash = '#/index';
});
document.getElementById('back-btn').addEventListener('click', () => {
  history.back();
});
