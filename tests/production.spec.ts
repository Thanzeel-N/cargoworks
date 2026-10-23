import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

for (const width of [1440, 1024, 768, 390]) {
  test(`navigation, images and feature cards work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.locator(".site-preloader")).toHaveCount(0);

    if (width <= 900) {
      await page.getByRole("button", { name: "Open navigation", exact: true }).click();
      await page.locator(".mobile-services__toggle").click();
      await page.locator("#mobile-navigation").getByRole("link", { name: "Warehousing", exact: true }).click();
      await expect(page.locator("#mobile-menu-toggle")).toHaveAttribute("aria-expanded", "false");
    } else {
      await page.locator(".nav-dropdown summary").click();
      await page.locator(".nav-dropdown__menu").getByRole("link", { name: /Warehousing/ }).click();
      await expect(page.locator(".nav-dropdown details")).not.toHaveAttribute("open", "");
    }
    await expect(page.locator("#service-4")).toBeInViewport();
    await expect(page.locator(".service-card")).toHaveCount(5);
    await page.locator(".why-showcase").scrollIntoViewIfNeeded();
    if (width > 720) {
      const lead = await page.locator(".why-showcase__lead").boundingBox();
      const grid = await page.locator(".why-showcase__grid").boundingBox();
      expect(grid!.x).toBeGreaterThan(lead!.x + lead!.width);
      expect(Math.abs(grid!.y - lead!.y)).toBeLessThan(2);
    }
    await page.getByRole("button", { name: "Show End-to-End Logistics", exact: true }).click();
    await expect(page.locator(".why-showcase__lead h3")).toHaveText("End-to-End Logistics");
    await expect.poll(() => page.locator(".why-showcase__lead img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator("#mission img")).toHaveCount(0);
    await expect(page.locator("#mission .delivery-step")).toHaveCount(4);

    for (const id of ["services", "why-us", "industries", "mission", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll((anchors) => anchors
      .map((anchor) => anchor.getAttribute("href")!)
      .filter((href) => href !== "#" && !document.getElementById(href.slice(1))));
    expect(brokenAnchors).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("enquiry validation and draft preserve shipment details without sending", async ({ page, context }) => {
  // Block external destinations: this test only verifies preparation of a draft.
  await context.route(/^(?:https:\/\/wa\.me\/|mailto:)/, (route) => route.abort());
  await page.goto("/");
  await expect(page.locator(".site-preloader")).toHaveCount(0);
  const form = page.locator(".shipment-form");
  await form.scrollIntoViewIfNeeded();
  await form.getByRole("button", { name: /Prepare email enquiry|Continue on WhatsApp/ }).click();
  await expect(form.locator(":invalid").first()).toBeVisible();
  await expect(form.locator(".shipment-form__status")).toBeEmpty();
  await page.locator("#shipment-name").fill("Production QA");
  await page.locator("#shipment-email").fill("qa@example.com");
  await page.locator("#shipment-service").selectOption("Sea Freight");
  await page.locator("#shipment-origin").fill("Kochi");
  await page.locator("#shipment-destination").fill("Dubai");
  await page.locator("#shipment-message").fill("QA only: 2 pallets & fragile cargo");
  await form.getByRole("button", { name: /Prepare email enquiry|Continue on WhatsApp/ }).click();
  await expect(form.getByRole("status")).toContainText("Nothing has been sent yet.");
  const href = await form.getByRole("status").getByRole("link").getAttribute("href");
  const draft = decodeURIComponent(href!);
  for (const value of ["Production QA", "qa@example.com", "Sea Freight", "Kochi", "Dubai", "2 pallets & fragile cargo"]) {
    expect(draft).toContain(value);
  }
  await page.locator("#shipment-message").fill("Changed shipment");
  await expect(form.locator(".shipment-form__status")).toBeEmpty();
});

test("production metadata, image optimizer and security headers respond", async ({ request }) => {
  const home = await request.get("/");
  expect(home.ok()).toBe(true);
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
  expect(home.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(home.headers()["x-powered-by"]).toBeUndefined();
  expect(await home.text()).toContain('rel="canonical" href="https://cargoworkslogistics.com"');
  expect(await (await request.get("/robots.txt")).text()).toContain("https://cargoworkslogistics.com/sitemap.xml");
  expect(await (await request.get("/sitemap.xml")).text()).toContain("https://cargoworkslogistics.com");
  const image = await request.get("/_next/image?url=%2Fimages%2Ffreight_warehouse.webp&w=640&q=75", {
    headers: { accept: "image/webp" },
  });
  expect(image.ok()).toBe(true);
  expect(image.headers()["content-type"]).toBe("image/webp");
  const original = await request.get("/images/freight_warehouse.webp");
  expect((await image.body()).byteLength).toBeLessThan((await original.body()).byteLength);
});
