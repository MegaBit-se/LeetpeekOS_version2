const fs = require('fs');
const path = require('path');
const lint = require('./lint');

const mapsPath = path.join(process.cwd(), 'sources', 'maps.yaml');
const maps = JSON.parse(fs.readFileSync(mapsPath, 'utf8'));
const report = lint(maps, process.cwd());
fs.writeFileSync(path.join(process.cwd(), 'reports', 'lint_report.json'), JSON.stringify(report, null, 2));
if (report.errors.length) {
  throw new Error('Lint errors:\n' + report.errors.join('\n'));
}
const content = 'export const maps = ' + JSON.stringify(maps, null, 2) + ' ;\n';
fs.writeFileSync(path.join(process.cwd(), 'maps.js'), content);
console.log('maps.js generated');
