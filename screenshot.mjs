import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ 
      headless: 'new', 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });

    console.log("Navigating to home page...");
    await page.goto('http://localhost:5173/');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'screenshot_home.png' });
    
    // Find the "Learn a song" link and click it
    console.log("Going to /songs...");
    await page.goto('http://localhost:5173/songs');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshot_songs.png' });
    
    // Try to find a song to click
    console.log("Looking for a song to click...");
    // The table might have rows. Let's look for a table row that is not the header
    const rows = await page.$$('div[role="row"]');
    console.log("Found rows:", rows.length);
    if (rows.length > 1) {
      // Click the first data row
      await rows[1].click();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: 'screenshot_modal.png' });
      
      // Look for the "Play" button in the modal
      // The play button is inside a modal, probably a button containing the text "Play" or an icon.
      // We can just go directly to a play URL if we can't find it, but let's try to find the button
      const playBtn = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => b.textContent.includes('Play') || b.innerHTML.includes('Play') || b.className.includes('bg-purple-primary'));
      });
      
      if (playBtn) {
        console.log("Found Play button, clicking...");
        await playBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'screenshot_play.png' });
      } else {
        console.log("Play button not found, navigating directly to /play?id=canon-in-d.mid&source=builtin");
        await page.goto('http://localhost:5173/play?id=canon-in-d.mid&source=builtin');
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'screenshot_play.png' });
      }
    } else {
      console.log("No song rows found. Going directly to /play");
      await page.goto('http://localhost:5173/play?id=canon-in-d.mid&source=builtin');
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: 'screenshot_play.png' });
    }

    console.log("Extracting TopBar HTML from Play screen...");
    const topBarHtml = await page.evaluate(() => {
      const topBar = document.querySelector('.z-10.h-14'); // TopBar usually has these classes
      return topBar ? topBar.innerHTML : 'TopBar not found';
    });
    console.log("TopBar HTML:", topBarHtml);

    await browser.close();
    console.log("Done.");
  } catch (error) {
    console.error("Error:", error);
  }
})();
