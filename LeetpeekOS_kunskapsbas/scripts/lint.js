const fs = require('fs');
const path = require('path');

function lint(maps, baseDir) {
  const allowedStatus = ['done', 'progress', 'planned', 'blocked'];
  const report = { errors: [], nodeCount: 0 };
  for (const [name, map] of Object.entries(maps)) {
    if (!map.nodes) continue;
    const ids = new Set();
    report.nodeCount += map.nodes.length;
    for (const node of map.nodes) {
      if (!/^[a-z0-9-]+$/.test(node.id)) {
        report.errors.push(`${name}: invalid id ${node.id}`);
      }
      if (node.text.trim().split(/\s+/).length > 3) {
        report.errors.push(`${name}: text '${node.text}' >3 words`);
      }
      if (!allowedStatus.includes(node.status)) {
        report.errors.push(`${name}: invalid status ${node.status} on ${node.id}`);
      }
      if (node.link) {
        if (node.link.endsWith('.md')) {
          const target = path.join(baseDir, node.link);
          if (!fs.existsSync(target)) {
            report.errors.push(`${name}: missing link target ${node.link}`);
          }
        } else if (node.link.startsWith('#/')) {
          const route = node.link.slice(1);
          if (!maps[route]) {
            report.errors.push(`${name}: missing route ${node.link}`);
          }
        }
      }
      if (node.image) {
        const imgPath = path.join(baseDir, node.image);
        if (!fs.existsSync(imgPath)) {
          report.errors.push(`${name}: missing image ${node.image}`);
        }
      }
      ids.add(node.id);
    }
    const allIds = new Set(ids);
    if (map.subgraphs) {
      for (const sg of map.subgraphs) {
        for (const nid of sg.nodes) {
          if (!ids.has(nid)) {
            report.errors.push(`${name}: subgraph references unknown node ${nid}`);
          }
          allIds.add(nid);
        }
      }
    }
    if (allIds.size > 9) {
      report.errors.push(`${name}: too many nodes (${allIds.size})`);
    }
    const connected = new Set();
    if (map.connections) {
      for (const pair of map.connections) {
        if (pair.length !== 2) {
          report.errors.push(`${name}: invalid connection ${JSON.stringify(pair)}`);
          continue;
        }
        const [a, b] = pair;
        if (!ids.has(a) || !ids.has(b)) {
          report.errors.push(`${name}: connection references unknown node ${a} or ${b}`);
        } else {
          connected.add(a);
          connected.add(b);
        }
      }
    }
    if (allIds.size > 1) {
      for (const id of ids) {
        if (!connected.has(id)) {
          report.errors.push(`${name}: node ${id} is isolated`);
        }
      }
    }
  }
  return report;
}

if (require.main === module) {
  const mapsPath = path.join(process.cwd(), 'sources', 'maps.yaml');
  const maps = JSON.parse(fs.readFileSync(mapsPath, 'utf8'));
  const result = lint(maps, process.cwd());
  fs.writeFileSync(path.join(process.cwd(), 'reports', 'lint_report.json'), JSON.stringify(result, null, 2));
  if (result.errors.length) {
    console.error('Lint errors found');
    process.exit(1);
  } else {
    console.log('Lint passed');
  }
}

module.exports = lint;
