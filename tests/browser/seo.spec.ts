import { expect, test } from "@playwright/test";
import {
  supportedLocales,
  getLocalePath,
  siteUrl,
} from "../../src/locale-config";
import { getHomeCopy } from "../../src/views/home/copy";
import { createStructuredData } from "../../src/structured-data";

test.describe("crawlable HTML without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  for (const path of ["/", ...supportedLocales.map(getLocalePath)]) {
    test(`${path} includes localized content, canonical links and JSON-LD`, async ({
      page,
    }) => {
      const lang =
        supportedLocales.find((locale) => path === getLocalePath(locale)) ??
        "en-US";
      const copy = getHomeCopy(lang);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      expect(response?.request().redirectedFrom()).toBeNull();
      expect(response?.headers()["x-robots-tag"] ?? "").not.toMatch(
        /noindex|none/i,
      );
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(copy.title);
      await expect(page).toHaveTitle(copy.pageTitle);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        copy.summary,
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        copy.pageTitle,
      );
      await expect(
        page.locator('meta[name="twitter:description"]'),
      ).toHaveAttribute("content", copy.summary);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${siteUrl}${getLocalePath(lang)}`,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "index, follow",
      );
      for (const locale of supportedLocales) {
        await expect(
          page.locator(`link[hreflang="${locale}"]`),
        ).toHaveAttribute("href", `${siteUrl}${getLocalePath(locale)}`);
        await expect(page.locator(`a[hreflang="${locale}"]`)).toHaveAttribute(
          "href",
          getLocalePath(locale),
        );
      }
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
        "href",
        `${siteUrl}/en-US/`,
      );
      for (const [question, answer] of copy.faq) {
        await expect(
          page
            .locator("#faq")
            .getByRole("heading", { name: question, exact: true }),
        ).toBeVisible();
        await expect(
          page.locator("#faq").getByText(answer, { exact: true }),
        ).toBeVisible();
      }
      await expect(page.locator("#specs")).toBeVisible();
      await expect(page.locator("#comparison")).toBeVisible();
      const json = await page
        .locator('script[type="application/ld+json"]')
        .textContent();
      expect(JSON.parse(json!)).toEqual(createStructuredData(lang));
    });
  }
});

test("root page forces English without automatic JS redirect, even with saved preference", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("Pic-Smaller-Locale", "zh-TW"),
  );
  await page.goto("/");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("h1")).toHaveText(getHomeCopy("en-US").title);
});

test("root page stays in English for non-English browser locale until manually switched", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "fr-FR" });
  const page = await context.newPage();
  await page.goto(test.info().project.use.baseURL!);
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("h1")).toHaveText(getHomeCopy("en-US").title);
  await page.getByRole("combobox", { name: "Language", exact: true }).click();
  await page.getByRole("option", { name: "Français", exact: true }).click();
  await expect(page).toHaveURL(/\/fr-FR\/?$/);
  await expect(page.locator("h1")).toHaveText(getHomeCopy("fr-FR").title);
  await context.close();
});

test("blocked storage does not break root page or manual language switching", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "ja-JP" });
  await context.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(test.info().project.use.baseURL!);
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("h1")).toHaveText(getHomeCopy("en-US").title);
  await page.getByRole("combobox", { name: "Language", exact: true }).click();
  await page.getByRole("option", { name: "日本語", exact: true }).click();
  await expect(page).toHaveURL(/\/ja-JP\/?$/);
  await expect(page.locator("h1")).toHaveText(getHomeCopy("ja-JP").title);
  expect(errors).toEqual([]);
  await context.close();
});

for (const width of [375, 768, 1440]) {
  test(`${width}px: all translated landing pages fit and Persian text is RTL`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of supportedLocales) {
      await page.goto(getLocalePath(lang));
      await expect(page.locator("h1")).toHaveText(getHomeCopy(lang).title);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      if (lang === "fa-IR") {
        await expect(page.locator("#faq")).toHaveAttribute("dir", "rtl");
        await expect(page.locator("h1")).toHaveCSS("direction", "rtl");
      }
      if (["en-US", "fa-IR", "fr-FR"].includes(lang))
        await page.screenshot({
          path: testInfo.outputPath(`${lang}.png`),
          fullPage: true,
        });
    }
  });
}

test("robots and sitemap serve correct types; unknown pages return real 404", async ({
  request,
}) => {
  const legacy = await request.get("/en-US", { maxRedirects: 0 });
  expect([307, 308]).toContain(legacy.status());
  expect(legacy.headers().location).toMatch(/\/en-US\/$/);
  expect((await request.get("/privacy.html")).status()).toBe(200);
  expect((await request.get("/googlea944d83ee3f48de1.html")).status()).toBe(
    200,
  );
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect(await robots.text()).toMatch(/User-Agent: \*\s+Allow: \//i);
  expect(await robots.text()).toContain(`${siteUrl}/sitemap.xml`);
  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  expect(await llms.text()).toContain("LiteFrame");
  const llmsFull = await request.get("/llms-full.txt");
  expect(llmsFull.status()).toBe(200);
  expect(await llmsFull.text()).toContain("LiteFrame");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  expect((await sitemap.text()).match(/<loc>/g)).toHaveLength(9);
  expect((await request.get("/no-such-seo-page")).status()).toBe(404);
});
