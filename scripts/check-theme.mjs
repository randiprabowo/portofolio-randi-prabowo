import assert from "node:assert/strict";

export async function checkThemePreferences(browser, origin) {
  const context = await browser.newContext({
    colorScheme: "dark",
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    const current = (p, scheme) =>
      p.waitForFunction(
        (expected) =>
          getComputedStyle(document.documentElement).colorScheme === expected,
        scheme,
      );
    await page.goto(origin + "/en");
    await current(page, "dark");
    await page.emulateMedia({ colorScheme: "light" });
    await current(page, "light");

    const dark = page.getByRole("button", { name: "Dark mode", exact: true });
    await dark.focus();
    await page.keyboard.press("Space");
    await current(page, "dark");
    assert.equal(await dark.getAttribute("aria-pressed"), "true");
    assert.equal(
      await dark.evaluate((el) => getComputedStyle(el).outlineStyle),
      "solid",
    );
    assert.equal(
      await dark.evaluate((el) => getComputedStyle(el).transitionDuration),
      "0s",
    );
    await page.locator(".languages a[hreflang=id]").click();
    await page.waitForURL(origin + "/id");
    await current(page, "dark");
    await page.setViewportSize({ width: 320, height: 740 });
    const light = page.getByRole("button", {
      name: "Mode terang",
      exact: true,
    });
    await light.click();
    await page.emulateMedia({ colorScheme: "dark" });
    await current(page, "light");
    await page.reload();
    await current(page, "light");
    await page
      .getByRole("button", { name: "Mode terang", pressed: true })
      .waitFor();

    const second = await context.newPage();
    await second.goto(origin + "/en/projects");
    await current(second, "light");
    await second
      .getByRole("button", { name: "Dark mode", exact: true })
      .click();
    await current(page, "dark");
    await page.goto(origin + "/studio");
    await current(page, "dark");
    // Sanity UI exposes the scheme used by its own cards.
    await page
      .locator('#sanity [data-scheme="dark"]')
      .first()
      .waitFor({ state: "attached" });
    await second
      .getByRole("button", { name: "Light mode", exact: true })
      .click();
    await current(page, "light");
    await page
      .locator('#sanity [data-scheme="light"]')
      .first()
      .waitFor({ state: "attached" });

    // A returning visitor must see their saved choice even if hydration never starts.
    const firstPaint = await context.newPage();
    await firstPaint.route("**/_next/static/**/*.js", (route) => route.abort());
    await firstPaint.goto(origin + "/id/about");
    await firstPaint.locator("h1").waitFor();
    await current(firstPaint, "light");
    assert.equal(
      await firstPaint
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(247, 246, 240)",
    );
    await second
      .getByRole("button", { name: "Dark mode", exact: true })
      .click();
    await firstPaint.emulateMedia({ colorScheme: "light" });
    await firstPaint.goto(origin + "/en/about");
    await firstPaint.locator("h1").waitFor();
    await current(firstPaint, "dark");
    assert.equal(
      await firstPaint
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(16, 17, 16)",
    );
  } finally {
    await context.close();
  }
  const blocked = await browser.newContext({ colorScheme: "light" });
  try {
    await blocked.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new DOMException("Unavailable", "SecurityError");
        },
      });
    });
    const page = await blocked.newPage();
    await page.goto(origin + "/en");
    await page.getByRole("button", { name: "Dark mode", exact: true }).click();
    await page.waitForFunction(
      () => document.documentElement.dataset.theme === "dark",
    );
  } finally {
    await blocked.close();
  }
  console.log(
    "Theme tests passed for OS changes, keyboard, storage, locale navigation, Studio, pre-hydration paint, reduced motion and blocked storage.",
  );
}
