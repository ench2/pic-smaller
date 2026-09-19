import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getSeoCopy, seoCopy } from "../src/seo-copy";
import { getHomeCopy } from "../src/views/home/copy";
import { getLocaleData } from "../src/locale-data";
import { supportedLocales, siteUrl, getLocalePath } from "../src/locale-config";
import { createLocaleMetadata } from "../src/seo";
import {
  createStructuredData,
  serializeStructuredData,
} from "../src/structured-data";
import robots, { aiCrawlerUserAgents } from "../src/app/robots";
import sitemap from "../src/app/sitemap";

test("all nine locales have their own complete landing copy and consistent metadata", async () => {
  assert.equal(Object.keys(seoCopy).length, supportedLocales.length);
  assert.equal(
    new Set(supportedLocales.map((lang) => getHomeCopy(lang).title)).size,
    9,
  );
  for (const lang of supportedLocales) {
    const copy = getHomeCopy(lang);
    const data = await getLocaleData(lang);
    const metadata = createLocaleMetadata(lang, data);
    assert.equal(data.siteTitle, copy.pageTitle);
    assert.equal(data.siteDescription, copy.summary);
    assert.equal(metadata.title, copy.pageTitle);
    assert.equal(metadata.description, copy.summary);
    assert.equal(metadata.openGraph?.title, copy.pageTitle);
    assert.equal(metadata.twitter?.description, copy.summary);
    assert.equal(metadata.alternates?.canonical, getLocalePath(lang));
    assert.equal(metadata.alternates?.languages?.["x-default"], "/en-US/");
    for (const alternate of supportedLocales)
      assert.equal(
        metadata.alternates?.languages?.[alternate],
        getLocalePath(alternate),
      );
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(copy.features.length, 6);
    assert.equal(copy.steps.length, 3);
    assert.equal(copy.faq.length, 5);
    assert.equal(new Set(copy.faq.map(([q]) => q)).size, 5);
    assert.ok(copy.faq.every(([q, a]) => q.trim() && a.trim()));
    assert.equal(copy.specs.length, 7);
    assert.equal(copy.comparison.length, 6);
    assert.ok(copy.specsTitle.trim());
    assert.ok(copy.comparisonTitle.trim());
    if (lang !== "en-US") {
      assert.notEqual(copy.featuresTitle, getHomeCopy("en-US").featuresTitle);
      assert.notEqual(copy.faqTitle, getHomeCopy("en-US").faqTitle);
      assert.notEqual(copy.specsTitle, getHomeCopy("en-US").specsTitle);
      assert.notEqual(copy.comparisonTitle, getHomeCopy("en-US").comparisonTitle);
    }
  }
  assert.equal(getSeoCopy("unknown"), getSeoCopy("en-US"));
});

test("JSON-LD uses the canonical locale URL and the exact visible FAQ data", () => {
  for (const lang of supportedLocales) {
    const graph = createStructuredData(lang)["@graph"];
    assert.deepEqual(
      graph.map((entry) => entry["@type"]),
      ["WebSite", "WebApplication", "FAQPage"],
    );
    assert.equal(graph[1].url, `${siteUrl}${getLocalePath(lang)}`);
    assert.equal(graph[1].inLanguage, lang);
    assert.deepEqual(graph[0].sameAs, ["https://github.com/joye61/pic-smaller"]);
    assert.deepEqual(graph[1].sameAs, ["https://github.com/joye61/pic-smaller"]);
    assert.equal(
      graph[1].softwareRequirements,
      "HTML5, Web Workers, WebAssembly",
    );
    assert.ok(Array.isArray(graph[1].featureList) && graph[1].featureList.length > 0);
    assert.deepEqual(
      graph[2].mainEntity,
      getHomeCopy(lang).faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    );
    assert.doesNotMatch(JSON.stringify(graph), /aggregateRating|reviewCount/);
  }
  const payload = { text: "</script><script>alert(1)</script>" };
  assert.doesNotMatch(serializeStructuredData(payload), /</);
  assert.deepEqual(JSON.parse(serializeStructuredData(payload)), payload);
});

test("robots allows all crawlers and sitemap lists only canonical locale pages", () => {
  assert.deepEqual(robots(), {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [...aiCrawlerUserAgents],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  });
  const entries = sitemap();
  assert.equal(entries.length, supportedLocales.length);
  assert.deepEqual(
    entries.map((entry) => entry.url),
    supportedLocales.map((lang) => `${siteUrl}${getLocalePath(lang)}`),
  );
  for (const entry of entries) {
    assert.equal(Object.keys(entry.alternates!.languages!).length, 10);
    assert.equal(
      entry.alternates!.languages!["x-default"],
      `${siteUrl}/en-US/`,
    );
  }
});

test("llms.txt and llms-full.txt exist and provide structured AI reference documentation", () => {
  const summary = readFileSync("public/llms.txt", "utf8");
  const full = readFileSync("public/llms-full.txt", "utf8");
  assert.ok(summary.includes("LiteFrame"));
  assert.ok(summary.includes("WebAssembly"));
  assert.ok(summary.includes("MozJPEG"));
  assert.ok(summary.includes("OxiPNG"));
  assert.ok(summary.includes("Zero Server Uploads"));
  assert.ok(full.includes("Objective Comparison"));
  assert.ok(full.includes("TinyPNG"));
  assert.ok(full.includes("Squoosh"));
  assert.ok(full.includes("Frequently Asked Questions"));
});
