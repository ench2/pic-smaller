import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { brand, getBrandName } from "@/brand";
import { createLocaleMetadata } from "@/seo";
import { siteUrl, supportedLocales } from "@/locale-config";
import { getHomeCopy } from "@/views/home/copy";

test("brand uses Chinese variants and a stable international fallback", () => {
  assert.equal(getBrandName("zh-CN"), "轻帧");
  assert.equal(getBrandName("zh-TW"), "輕幀");
  for (const locale of ["en-US", "fr-FR", "unknown", undefined])
    assert.equal(getBrandName(locale), "LiteFrame");
  assert.equal(brand.archiveName, "liteframe.zip");
});

test("every locale and metadata use the current brand and production origin", async () => {
  assert.equal(siteUrl, "https://piczip.ajutx.com");
  for (const locale of supportedLocales) {
    const data = (await import(`../src/locales/${locale}.ts`)).default;
    assert.equal(data.logo, getBrandName(locale));
    assert.ok(data.siteTitle.startsWith(getBrandName(locale)));
    assert.doesNotMatch(JSON.stringify(data), /PicSmaller|图小小|圖小小/);
    const metadata = createLocaleMetadata(locale, data);
    assert.equal(new URL(String(metadata.metadataBase)).origin, siteUrl);
    assert.equal(metadata.alternates?.canonical, `/${locale}/`);
    assert.equal(metadata.openGraph?.siteName, getBrandName(locale));
    assert.ok(JSON.stringify(metadata.icons).includes("/favicon.svg"));
    assert.ok(JSON.stringify(metadata.openGraph).includes("/social-card.png"));
  }
});

test("landing copy is complete in both Chinese variants and English", () => {
  for (const locale of ["zh-CN", "zh-TW", "en-US"]) {
    const copy = getHomeCopy(locale);
    assert.equal(copy.features.length, 6);
    assert.equal(copy.steps.length, 3);
    assert.equal(Object.keys(copy.status).length, 4);
    assert.doesNotMatch(JSON.stringify(copy), /desktop|桌面|试用/i);
  }
  assert.equal(getHomeCopy("fr-FR"), getHomeCopy("en-US"));
});

test("brand refresh preserves compatibility identifiers and removes remote fonts", () => {
  assert.ok(
    readFileSync("src/states/home.ts", "utf8").includes(
      '"pic-smaller-options"',
    ),
  );
  assert.ok(
    readFileSync("src/locale.ts", "utf8").includes('"Pic-Smaller-Locale"'),
  );
  assert.doesNotMatch(
    readFileSync("src/main.scss", "utf8"),
    /fonts.googleapis|Libre Bodoni|Public Sans/,
  );
  assert.doesNotMatch(
    readFileSync("src/views/home/index.tsx", "utf8"),
    /desktop\.picsmaller|desktopDownload|desktopSection/,
  );
});
