const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  
  // 1. Desktop Check
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8085/Portfolio-Ali/', { waitUntil: 'networkidle' });
  
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'intro_desktop.png' });
  console.log('Saved intro_desktop.png');

  // 2. Mobile Check
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)'
  });
  await mobilePage.goto('http://localhost:8085/Portfolio-Ali/', { waitUntil: 'networkidle' });

  await mobilePage.evaluate(() => window.scrollTo(0, 800));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: 'intro_mobile.png' });
  console.log('Saved intro_mobile.png');

  await browser.close();
})();
