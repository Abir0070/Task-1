/**
 * Capture responsive screenshots at 375px, 768px, 1440px.
 * Requires: npm install --save-dev puppeteer
 * Run with app served: npm start (in another terminal), then npm run screenshots
 */
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { width: 375, height: 812, name: '375px' },
  { width: 768, height: 1024, name: '768px' },
  { width: 1440, height: 900, name: '1440px' }
];

const OUT_DIR = path.join(__dirname, '..', 'screenshots');
const URL = process.env.APP_URL || 'http://localhost:4200';

async function main() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.error('Puppeteer not found. Install with: npm install --save-dev puppeteer');
    process.exit(1);
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}.png`), fullPage: true });
    console.log(`Saved ${vp.name}.png`);
  }

  await browser.close();
  console.log('Screenshots saved to', OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
