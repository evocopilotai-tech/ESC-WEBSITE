import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:5173/';
const OUTPUT_DIR = path.resolve('audit-results');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runAudit() {
  console.log('--- STARTING COMPREHENSIVE BROWSER AUDIT ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const failedRequests = [];
  page.on('requestfailed', (req) => {
    failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
  });

  // 1. Desktop Viewport Audit
  console.log('1. Auditing Desktop Viewport (1440x900)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle2' });

  // Check horizontal overflow
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_desktop_hero.png'), fullPage: false });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_desktop_full.png'), fullPage: true });

  // 2. Test Gallery Filter & Lightbox
  console.log('2. Auditing Gallery & Lightbox...');
  const galleryClicked = await page.evaluate(() => {
    const firstGalleryCard = document.querySelector('#gallery .cursor-pointer');
    if (firstGalleryCard) {
      firstGalleryCard.click();
      return true;
    }
    return false;
  });

  if (galleryClicked) {
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03_desktop_lightbox.png'), fullPage: false });
    // Press Escape to close
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));
  }

  // 3. Tablet Viewport Audit (768x1024)
  console.log('3. Auditing Tablet Viewport (768x1024)...');
  await page.setViewport({ width: 768, height: 1024 });
  await new Promise((r) => setTimeout(r, 500));
  const tabletOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_tablet_full.png'), fullPage: true });

  // 4. Mobile Viewport Audit (390x844 iPhone 14)
  console.log('4. Auditing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 500));
  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_mobile_hero.png'), fullPage: false });

  // Test Mobile Menu Toggle
  console.log('5. Testing Mobile Drawer...');
  const mobileToggleClicked = await page.evaluate(() => {
    const toggle = document.querySelector('#mobile-menu-toggle');
    if (toggle) {
      toggle.click();
      return true;
    }
    return false;
  });

  if (mobileToggleClicked) {
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06_mobile_drawer.png'), fullPage: false });
  }

  await browser.close();

  const results = {
    consoleErrors,
    failedRequests,
    overflow: {
      desktop: desktopOverflow,
      tablet: tabletOverflow,
      mobile: mobileOverflow,
    },
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'audit_report.json'), JSON.stringify(results, null, 2));
  console.log('--- AUDIT FINISHED ---');
  console.log('Results:', JSON.stringify(results, null, 2));
}

runAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
