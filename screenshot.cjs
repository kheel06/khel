const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 900,
    },
    deviceScaleFactor: 1,
  });

  console.log("🌐 Opening Khel's Portfolio...");

  await page.goto("http://localhost:5173", {
    waitUntil: "networkidle",
  });

  // Wait for fonts
  await page.evaluate(async () => {
    if (document.fonts) {
      await document.fonts.ready;
    }
  });

  // Wait for React / loading animation
  await page.waitForTimeout(3000);

  console.log("⬇️ Scrolling through website...");

  let previousHeight = 0;
  let stableCount = 0;

  while (true) {
    const currentHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    console.log(`📏 Page height: ${currentHeight}px`);

    // Check if page height has stopped changing
    if (currentHeight === previousHeight) {
      stableCount++;
    } else {
      stableCount = 0;
    }

    // Require it to be stable for 2 checks
    if (stableCount >= 2) {
      const atBottom = await page.evaluate(() => {
        return (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 10
        );
      });

      if (atBottom) {
        break;
      }
    }

    previousHeight = currentHeight;

    // Scroll gradually
    await page.evaluate(async () => {
      const distance = 400;

      await new Promise((resolve) => {
        window.scrollBy({
          top: distance,
          behavior: "smooth",
        });

        setTimeout(resolve, 700);
      });
    });

    // Allow scroll-triggered animations to render
    await page.waitForTimeout(500);
  }

  console.log("✅ Reached bottom");

  // Give final section animations time to finish
  await page.waitForTimeout(3000);

  console.log("📸 Taking full-page screenshot...");

  await page.screenshot({
    path: "screenshots/khel-portfolio-full.png",
    fullPage: true,
  });

  console.log("✅ Screenshot saved!");
  console.log("📁 screenshots/khel-portfolio-full.png");

  await browser.close();
})();