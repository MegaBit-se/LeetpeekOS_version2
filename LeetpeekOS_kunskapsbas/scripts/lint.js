const fs = require('fs');
const path = require('path');

function lint(maps, baseDir) {
  const allowedStatus = ['done', 'progress', 'planned', 'blocked'];
  const report = { errors: [], nodeCount: 0 };
  for (const [name, map] of Object.entries(maps)) {
    if (!map.nodes) continue;
    const ids = new Set();
    report.nodeCount += map.nodes.length;
    if (map.nodes.length > 9) {
      report.errors.push(`${name}: too many nodes (${map.nodes.length})`);
    }
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
      if (node.link && node.link.endsWith('.md')) {
        const target = path.join(baseDir, node.link);
        if (!fs.existsSync(target)) {
          report.errors.push(`${name}: missing link target ${node.link}`);
        }
      }
      ids.add(node.id);
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
    if (map.nodes.length > 1) {
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
