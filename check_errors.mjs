import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: 'new', 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    console.log("Navigating to home page...");
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    
    console.log("Navigating to freeplay page...");
    await page.goto('http://localhost:5173/freeplay', { waitUntil: 'networkidle0' });

    console.log("Navigating to songs page...");
    await page.goto('http://localhost:5173/songs', { waitUntil: 'networkidle0' });

    console.log("Navigating to about page...");
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle0' });
    
    await browser.close();
    console.log("Done.");
  } catch (error) {
    console.error("Error:", error);
  }
})();
