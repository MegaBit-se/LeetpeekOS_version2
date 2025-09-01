const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const lint = require('./lint');

// Mermaid v10.9.x
const mapsPath = path.join(process.cwd(), 'sources', 'maps.yaml');
const maps = JSON.parse(fs.readFileSync(mapsPath, 'utf8'));

for (const map of Object.values(maps)) {
  if (!map.nodes) continue;
  for (const node of map.nodes) {
    if (node.video && !node.text.includes('\u{1F3A5}')) {
      node.text += '\u{1F3A5}';
    }
    if (node.image && !node.text.includes('\u{1F4F7}')) {
      node.text += '\u{1F4F7}';
    }
    if (node.link && node.link.endsWith('.md') && !node.text.includes('\u{1F517}')) {
      node.text += '\u{1F517}';
    }
  }
}

const report = lint(maps, process.cwd());
fs.writeFileSync(path.join(process.cwd(), 'reports', 'lint_report.json'), JSON.stringify(report, null, 2));
if (report.errors.length) {
  throw new Error('Lint errors:\n' + report.errors.join('\n'));
}
const content = 'export const maps = ' + JSON.stringify(maps, null, 2) + ' ;\n';
fs.writeFileSync(path.join(process.cwd(), 'maps.js'), content);
console.log('maps.js generated');

try {
  execSync('node scripts/export-pdf.js', { stdio: 'inherit' });
} catch (err) {
  console.warn('PDF export skipped:', err.message);
}
