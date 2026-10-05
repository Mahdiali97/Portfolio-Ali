const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push(`${request.url()}: ${request.failure().errorText}`);
  });

  console.log('Navigating to http://localhost:8085/Portfolio-Ali/ ...');
  await page.goto('http://localhost:8085/Portfolio-Ali/', { waitUntil: 'networkidle' });

  // wait for main element to render
  await page.waitForSelector('main', { timeout: 10000 });
  
  // 1. Screenshot Full Page
  await page.screenshot({ path: 'full_page_desktop.png', fullPage: true });
  console.log('Saved full_page_desktop.png');

  // 2. Check Anchors
  const anchors = ['#work', '#case-studies', '#about', '#gallery'];
  for (const anchor of anchors) {
    await page.goto(`http://localhost:8085/Portfolio-Ali/${anchor}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `anchor_${anchor.replace('#', '')}.png` });
    console.log(`Saved anchor_${anchor}.png`);
  }

  // 3. Mobile Review
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  await mobilePage.goto('http://localhost:8085/Portfolio-Ali/', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'mobile_hero.png' });
  console.log('Saved mobile_hero.png');

  // 4. Summary report
  console.log('\n--- AUDIT SUMMARY ---');
  console.log(`Console Errors: ${consoleErrors.length}`);
  consoleErrors.forEach(err => console.log(`- ${err}`));
  
  console.log(`Failed Requests: ${failedRequests.length}`);
  failedRequests.forEach(req => console.log(`- ${req}`));

  // Check for some critical links
  const links = await mobilePage.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    }));
  });
  console.log(`\nFound ${links.length} links on mobile view:`);
  links.forEach(l => console.log(`- [${l.text}] -> ${l.href}`));

  await browser.close();
})();
