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
    const slug = key.split('/').filter(Boolean).pop();
    const pdfFile = path.join(dist, `${slug}.pdf`);
    await page.pdf({ path: pdfFile, format: 'A3', landscape: true });
    const svg = await page.evaluate(() => document.querySelector('svg')?.outerHTML || '');
    if (svg) {
      fs.writeFileSync(path.join(dist, `${slug}.svg`), svg);
    }
    await page.close();
  }
  await browser.close();
})();
