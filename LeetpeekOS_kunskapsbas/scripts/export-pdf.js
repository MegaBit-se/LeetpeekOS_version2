const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { maps } = require('../maps.js');

(async () => {
  const dist = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(dist)) fs.mkdirSync(dist);
  const browser = await puppeteer.launch();
  for (const key of Object.keys(maps)) {
    const page = await browser.newPage();
    const url = `http://localhost:8000/#${key}`;
    await page.goto(url, { waitUntil: 'networkidle0' });
    const file = key.replace(/[\\/]/g, '_') + '.pdf';
    await page.pdf({ path: path.join(dist, file) });
    await page.close();
  }
  await browser.close();
})();
