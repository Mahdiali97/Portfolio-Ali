const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  await page.goto('http://localhost:8085/Portfolio-Ali/', { waitUntil: 'networkidle' });

  // Scroll down the page to trigger Framer Motion animations
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 0; i < height; i += 400) {
    await page.evaluate((y) => window.scrollTo(0, y), i);
    await page.waitForTimeout(200); // wait for animation
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'full_page_desktop_scrolled.png', fullPage: true });
  console.log('Saved full_page_desktop_scrolled.png');

  await browser.close();
})();
