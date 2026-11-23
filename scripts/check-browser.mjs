import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";
const require = createRequire(import.meta.url);
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3000";
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || undefined,
  headless: true,
});
const page = await browser.newPage({ reducedMotion: "reduce" });
const errors = [];
const internalPaths = new Set();
page.on("pageerror", (error) => errors.push(error.message));
try {
  for (const locale of ["en", "id"]) {
    await page.goto(origin + "/" + locale + "/projects");
    const projects = await page
      .locator("a.project-link")
      .evaluateAll((nodes) => nodes.map((node) => new URL(node.href).pathname));
    const paths = [
      "/" + locale,
      ...["about", "experience", "projects", "contact"].map(
        (route) => "/" + locale + "/" + route,
      ),
      ...projects,
    ];
    for (const path of paths) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200, path);
      assert.equal(await page.locator("html").getAttribute("lang"), locale);
      assert.equal(await page.locator("main h1").count(), 1, path);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      assert.equal(new URL(canonical).pathname, path);
      for (const lang of ["en", "id"]) {
        const href = await page
          .locator('link[rel="alternate"][hreflang="' + lang + '"]')
          .getAttribute("href");
        assert.equal(
          new URL(href).pathname,
          path.replace("/" + locale, "/" + lang),
        );
      }
      for (const href of await page
        .locator("a[href]")
        .evaluateAll((nodes) => nodes.map((node) => node.href))) {
        const target = new URL(href);
        if (target.origin === origin) internalPaths.add(target.pathname);
      }
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "Overflow at " + path + " width " + width,
        );
      }
      const alternate = locale === "en" ? "id" : "en";
      assert.equal(
        await page
          .locator(".languages a[hreflang=" + alternate + "]")
          .getAttribute("href"),
        path.replace("/" + locale, "/" + alternate),
      );
      await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
      const issues = await page.evaluate(async () =>
        (
          await window.axe.run(document, {
            runOnly: ["wcag2a", "wcag2aa", "wcag21aa"],
          })
        ).violations.map((v) => v.id),
      );
      assert.deepEqual(
        issues,
        [],
        path + " accessibility violations: " + issues.join(", "),
      );
    }
  }
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(origin + "/en");
  await page.locator("h1").waitFor();
  assert.ok(
    await page
      .locator("h1")
      .evaluate((el) => !el.getAnimations({ subtree: true }).length),
  );
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").getAttribute("href"), "#main");
  await page.locator(".mobile-menu summary").focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), "");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".mobile-menu").getAttribute("open"), null);
  assert.ok(
    await page
      .locator("summary")
      .evaluate((el) => el === document.activeElement),
  );
  await page.locator(".languages a[hreflang=id]").click();
  await page.waitForURL(origin + "/id");
  for (const path of internalPaths)
    assert.equal((await page.request.get(origin + path)).status(), 200, path);
  const sitemap = await page.request.get(origin + "/sitemap.xml");
  assert.equal(sitemap.status(), 200);
  const xml = await sitemap.text();
  for (const path of internalPaths)
    assert.ok(xml.includes(path + "</loc>"), "Missing from sitemap: " + path);
  assert.ok(
    (await (await page.request.get(origin + "/robots.txt")).text()).includes(
      "/studio",
    ),
  );
  assert.equal((await page.request.get(origin + "/studio")).status(), 200);
  assert.equal(
    (
      await page.goto(origin + "/en/projects/no-such-portfolio-project")
    ).status(),
    404,
  );
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(origin + "/id");
  assert.ok(await staticPage.locator("main h1").isVisible());
  await noJs.close();
  assert.deepEqual(errors, []);
  console.log(
    "Passed bilingual routes, project details, five viewport widths, axe WCAG checks, mobile keyboard focus, language navigation, 404 and no-JavaScript rendering.",
  );
} finally {
  await browser.close();
}
