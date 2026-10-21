import { expect, test, type Page } from "@playwright/test";

async function openHero(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-preloader")).toHaveCount(0);
  await expect(page.locator(".cinematic-hero__canvas")).toHaveAttribute("data-frame", "0");
}

async function scrollSequence(page: Page, reverse = false) {
  return page.evaluate(async (backwards) => {
    const section = document.querySelector<HTMLElement>(".cinematic-hero")!;
    const canvas = document.querySelector<HTMLCanvasElement>(".cinematic-hero__canvas")!;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - canvas.clientHeight;
    const frames: number[] = [];
    const started = performance.now();
    while (performance.now() - started < 3500) {
      const elapsed = Math.min(1, (performance.now() - started) / 3500);
      window.scrollTo({ top: top + distance * (backwards ? 1 - elapsed : elapsed), behavior: "instant" });
      frames.push(Number(canvas.dataset.frame));
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    return frames;
  }, reverse);
}

test("continuous cold-cache scrolling survives production latency and reverses", async ({ page }) => {
  const errors: string[] = [];
  let failedRequests = 0;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => { if (request.url().includes("/frame-")) failedRequests++; });
  await page.route("**/frame-*.webp?*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 220));
    await route.continue();
  });
  await openHero(page);
  const forwards = await scrollSequence(page);
  expect(new Set(forwards).size).toBeGreaterThan(18);
  expect(forwards.at(-1)).toBeGreaterThan(190);
  const backwards = await scrollSequence(page, true);
  expect(new Set(backwards).size).toBeGreaterThan(25);
  expect(backwards.at(-1)).toBeLessThan(15);
  expect(failedRequests).toBe(0);
  expect(errors).toEqual([]);
});

test("mobile pause freezes the film and resume catches up without another scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHero(page);
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>(".cinematic-hero")!;
    window.scrollTo({ top: section.offsetTop + (section.offsetHeight - innerHeight) / 2, behavior: "instant" });
  });
  await expect(page.locator("canvas")).toHaveAttribute("data-frame", "0");
  await page.getByRole("button", { name: "Resume motion", exact: true }).click();
  await expect(page.locator("canvas")).toHaveAttribute("data-frame", "120");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test("a temporary frame download failure is retried", async ({ page }) => {
  let attempts = 0;
  await page.route("**/frame-0121.webp?*", async (route) => {
    attempts++;
    if (attempts === 1) await route.fulfill({ status: 503, body: "Temporary failure" });
    else await route.continue();
  });
  await openHero(page);
  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>(".cinematic-hero")!;
    window.scrollTo({ top: section.offsetTop + (section.offsetHeight - innerHeight) / 2, behavior: "instant" });
  });
  await expect(page.locator("canvas")).toHaveAttribute("data-frame", "120", { timeout: 10_000 });
  expect(attempts).toBe(2);
});

test("reduced motion never downloads animation frames", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const frames: string[] = [];
  page.on("request", (request) => { if (request.url().includes("/frame-")) frames.push(request.url()); });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(frames).toEqual([]);
  await expect(page.locator(".cinematic-hero")).toHaveCSS("height", "900px");
});
