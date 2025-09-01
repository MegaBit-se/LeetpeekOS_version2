#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const src = path.resolve(__dirname, '../sources/maps.yaml');
const dest = path.resolve(__dirname, '../maps.js');

const raw = fs.readFileSync(src, 'utf8');
const data = JSON.parse(raw);

const allowedStatus = new Set(['done', 'progress', 'planned', 'blocked']);
const allMaps = {};

for (const [key, map] of Object.entries(data)) {
  const { title, layout, nodes = [], connections = [] } = map;
  if (nodes.length > 9) {
    throw new Error(`Map ${key} has more than 9 nodes`);
  }
  nodes.forEach(n => {
    const wordCount = n.text.trim().split(/\s+/).length;
    if (wordCount > 3) {
      throw new Error(`Node ${n.id} has more than 3 words`);
    }
    if (!allowedStatus.has(n.status)) {
      throw new Error(`Invalid status ${n.status} in node ${n.id}`);
    }
  });
  allMaps[key] = { title, layout, nodes, connections };
}

const output = `const allMaps = ${JSON.stringify(allMaps, null, 2)};\n`;
fs.writeFileSync(dest, output, 'utf8');
console.log(`Generated maps.js with ${Object.keys(allMaps).length} map(s).`);
