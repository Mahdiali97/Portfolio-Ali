const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
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

  await page.screenshot({ path: 'full_page_mobile_scrolled.png', fullPage: true });
  console.log('Saved full_page_mobile_scrolled.png');

  await browser.close();
})();
