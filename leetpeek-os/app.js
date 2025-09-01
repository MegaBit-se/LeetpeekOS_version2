const container = document.getElementById('chart-container');

function getPath() {
  return location.hash.startsWith('#/') ? location.hash.slice(2) : 'index';
}

function buildDiagram(map) {
  const lines = [`flowchart ${map.layout}`];
  map.nodes.forEach(n => {
    lines.push(`  ${n.id}["${n.text}"]`);
  });
  map.connections.forEach(([from, to]) => {
    lines.push(`  ${from} --> ${to}`);
  });
  map.nodes.forEach(n => {
    lines.push(`  class ${n.id} ${n.status};`);
  });
  lines.push('  classDef done fill:#94D1BE,stroke:#333,stroke-width:2px;');
  lines.push('  classDef progress fill:#FFCF56,stroke:#333,stroke-width:2px;');
  lines.push('  classDef planned fill:#d3d3d3,stroke:#333,stroke-width:2px;');
  lines.push('  classDef blocked fill:#F28F8F,stroke:#333,stroke-width:2px;');
  return lines.join('\n');
}

async function render() {
  const path = getPath();
  const map = allMaps[path] || allMaps['index'];

  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      fontSize: getComputedStyle(document.documentElement).getPropertyValue('--mermaid-font-size') || '18px',
      nodePadding: getComputedStyle(document.documentElement).getPropertyValue('--mermaid-node-padding') || '20px'
    }
  });

  const code = buildDiagram(map);
  const { svg } = await mermaid.render('graph', code);
  container.innerHTML = svg;

  map.nodes.forEach(n => {
    const nodeEl = container.querySelector(`#${n.id}`);
    if (nodeEl && n.link) {
      nodeEl.style.cursor = 'pointer';
      nodeEl.addEventListener('click', () => {
        if (n.link.startsWith('#')) {
          location.hash = n.link;
        } else {
          window.open(n.link, '_blank');
        }
      });
    }
  });
}

function ensureNav() {
  let home = document.getElementById('btn-home');
  if (!home) {
    home = document.createElement('button');
    home.id = 'btn-home';
    home.textContent = 'Home';
    home.addEventListener('click', () => { location.hash = '#/index'; });
    document.body.insertBefore(home, container);
  }
  let back = document.getElementById('btn-back');
  if (!back) {
    back = document.createElement('button');
    back.id = 'btn-back';
    back.textContent = 'Back';
    back.addEventListener('click', () => history.back());
    document.body.insertBefore(back, container);
  }
}

window.addEventListener('hashchange', render);
ensureNav();
render();
