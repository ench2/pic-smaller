import { expect, test, type Page } from "@playwright/test";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import sharp from "sharp";
import JSZip from "jszip";

const svg = Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect x="40" y="20" width="160" height="120" rx="16" fill="#2563EB"/></svg>',
);
let png: Buffer;
test.beforeAll(async () => {
  png = await sharp(svg).png().toBuffer();
});

test.beforeEach(async ({ page }) => {
  // Core tool regressions run without analytics; consent has its own test suite.
  await page.addInitScript(() => {
    localStorage.setItem(
      "liteframe-analytics-consent-v1",
      JSON.stringify({
        value: "denied",
        updatedAt: Date.now(),
      }),
    );
  });
});

async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
}
async function addImage(page: Page, name = "sample.png") {
  const chooser = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "选择图片", exact: true }).click();
  await (await chooser).setFiles({ name, mimeType: "image/png", buffer: png });
  await expect(page.getByText("已完成", { exact: true })).toBeVisible();
}
async function downloadOne(page: Page) {
  const downloading = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "保存图片", exact: true })
    .first()
    .click();
  const file = await downloading;
  return { file, bytes: readFileSync((await file.path())!) };
}

for (const width of [375, 768, 1440]) {
  test(`${width}px: upload, settings, compare, downloads and responsive layout`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/zh-CN/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "免费在线图片压缩与格式转换工具",
    );
    await expect(
      page.getByRole("button", { name: "选择图片", exact: true }),
    ).toBeVisible();
    await expect(page.locator('a[href*="desktop"]')).toHaveCount(0);
    await noOverflow(page);
    await page.screenshot({
      path: testInfo.outputPath("empty.png"),
      fullPage: true,
      animations: "disabled",
    });
    if (width < 981) {
      const trigger = page.getByRole("button", {
        name: "处理设置",
        exact: true,
      });
      await trigger.click();
      const dialog = page.getByRole("dialog", { name: "处理设置" });
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("button", { name: "关闭设置" }),
      ).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(
        dialog.getByRole("button", { name: "应用选项" }),
      ).toBeFocused();
      await page.screenshot({
        path: testInfo.outputPath("settings.png"),
        animations: "disabled",
      });
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    }
    await addImage(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
      "font-size",
      "24px",
    );
    await noOverflow(page);
    await page.screenshot({
      path: testInfo.outputPath("results.png"),
      animations: "disabled",
    });
    await page.getByRole("button", { name: /^拖动分割线/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const slider = page.getByRole("dialog").getByRole("slider");
    await expect(slider).toHaveAttribute("aria-valuenow", "50");
    await slider.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "55");
    await page.screenshot({
      path: testInfo.outputPath("compare.png"),
      animations: "disabled",
    });
    await noOverflow(page);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    const { file, bytes } = await downloadOne(page);
    expect(file.suggestedFilename()).toMatch(/\.png$/);
    expect((await sharp(bytes).metadata()).width).toBe(240);
    const downloading = page.waitForEvent("download");
    await page.getByRole("button", { name: "保存全部", exact: true }).click();
    const zip = await downloading;
    expect(zip.suggestedFilename()).toBe("liteframe.zip");
    expect(
      Object.keys(
        (await JSZip.loadAsync(readFileSync((await zip.path())!))).files,
      ),
    ).toHaveLength(1);
    expect(errors).toEqual([]);
  });
}

test("conversion, transparent background, resize and crop keep real output dimensions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/zh-CN/");
  await addImage(page);
  const settings = page.locator("#image-settings");
  await settings.getByRole("combobox").nth(1).click();
  await page.getByRole("option", { name: "JPEG", exact: true }).click();
  await settings.getByRole("combobox").nth(0).click();
  await page
    .getByRole("option", { name: "设置宽度，高度自动缩放", exact: true })
    .click();
  await settings.getByRole("spinbutton").fill("120");
  await settings.getByRole("button", { name: "应用选项" }).click();
  await expect(page.getByText("120 x 80", { exact: true })).toBeVisible();
  let result = await downloadOne(page);
  expect(result.file.suggestedFilename()).toMatch(/\.jpg$/);
  let info = await sharp(result.bytes).metadata();
  expect([info.format, info.width, info.height, info.hasAlpha]).toEqual([
    "jpeg",
    120,
    80,
    false,
  ]);
  const pixel = await sharp(result.bytes).raw().toBuffer();
  expect([...pixel.subarray(0, 3)].every((value) => value > 240)).toBeTruthy();
  await settings.getByRole("combobox").nth(0).click();
  await page
    .getByRole("option", { name: "裁剪模式，设置裁剪尺寸", exact: true })
    .click();
  await settings.getByRole("spinbutton").nth(0).fill("80");
  await settings.getByRole("spinbutton").nth(1).fill("60");
  await settings.getByRole("button", { name: "应用选项" }).click();
  await expect(
    page.locator("article").filter({ hasText: "sample.png" }),
  ).toContainText("80 x 60");
  result = await downloadOne(page);
  info = await sharp(result.bytes).metadata();
  expect([info.width, info.height]).toEqual([80, 60]);
  expect(
    await page.evaluate(() =>
      Boolean(localStorage.getItem("pic-smaller-options")),
    ),
  ).toBeTruthy();
});

test("paste and drag/drop add real files without accessing app state", async ({
  page,
}) => {
  await page.goto("/zh-CN/");
  await expect(
    page.getByRole("button", { name: "选择图片", exact: true }),
  ).toBeVisible();
  await page.evaluate((base64) => {
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const transfer = new DataTransfer();
    transfer.items.add(new File([bytes], "dropped.png", { type: "image/png" }));
    // A real drop uses filesystem entries. The files-only branch models a browser
    // without that API while keeping the actual DOM drop handler and workers.
    const target = document.querySelector(
      "input[webkitdirectory]",
    )!.parentElement!;
    const event = new Event("drop", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "dataTransfer", {
      value: { files: transfer.files },
    });
    target.dispatchEvent(event);
  }, png.toString("base64"));
  await expect(page.getByText("dropped.png", { exact: true })).toBeVisible();
  await expect(page.getByText("已完成", { exact: true })).toBeVisible();
  await page.evaluate((base64) => {
    const transfer = new DataTransfer();
    transfer.items.add(
      new File(
        [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
        "pasted.png",
        { type: "image/png" },
      ),
    );
    document.dispatchEvent(
      new ClipboardEvent("paste", {
        clipboardData: transfer,
        bubbles: true,
        cancelable: true,
      }),
    );
  }, png.toString("base64"));
  await expect(page.getByText("pasted.png", { exact: true })).toBeVisible();
  await expect(page.getByText("已完成", { exact: true })).toHaveCount(2);
});

test("folder fallback imports supported images only", async ({ page }) => {
  const folder = mkdtempSync(join(tmpdir(), "liteframe-folder-"));
  writeFileSync(join(folder, "folder-image.png"), png);
  writeFileSync(join(folder, "ignore.txt"), "not an image");
  try {
    await page.addInitScript(() => {
      Object.defineProperty(window, "showDirectoryPicker", {
        value: undefined,
        configurable: true,
      });
    });
    await page.goto("/zh-CN/");
    const chooser = page.waitForEvent("filechooser");
    await page.getByRole("button", { name: "选择文件夹", exact: true }).click();
    await (await chooser).setFiles(folder);
    await expect(
      page.getByText("folder-image.png", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("已完成", { exact: true })).toBeVisible();
    await expect(page.getByText("ignore.txt", { exact: true })).toHaveCount(0);
  } finally {
    // Verify the absolute target before recursively deleting this test-owned fixture.
    expect(dirname(resolve(folder))).toBe(resolve(tmpdir()));
    expect(folder.split(/[\\/]/).pop()).toMatch(/^liteframe-folder-/);
    rmSync(folder, { recursive: true, force: true });
  }
});

test("failure preserves a download and keeps batch actions usable", async ({
  page,
}) => {
  await page.goto("/zh-CN/");
  const chooser = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "选择图片", exact: true }).click();
  await (
    await chooser
  ).setFiles([
    {
      name: "broken.png",
      mimeType: "image/png",
      buffer: Buffer.from("not a png"),
    },
    { name: "valid.png", mimeType: "image/png", buffer: png },
  ]);
  await expect(page.getByText("处理失败", { exact: true })).toBeVisible();
  await expect(page.getByText("已完成", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "保存全部", exact: true }),
  ).toBeEnabled();
});

test("locale switch and metadata use LiteFrame on piczip.ajutx.com", async ({
  page,
  request,
}) => {
  await page.goto("/zh-CN/");
  await expect(page).toHaveTitle(/轻帧/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://piczip.ajutx.com/zh-CN/",
  );
  await page.getByRole("combobox", { name: "语言", exact: true }).click();
  await page.getByRole("option", { name: "繁體中文", exact: true }).click();
  await expect(page).toHaveURL(/\/zh-TW\/?$/);
  await expect(page).toHaveTitle(/輕幀/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "免費線上圖片壓縮與格式轉換工具",
  );
  await page.getByRole("combobox", { name: "語言", exact: true }).click();
  await page.getByRole("option", { name: "English", exact: true }).click();
  await expect(page).toHaveTitle(/LiteFrame/);
  expect(
    await page.evaluate(() => localStorage.getItem("Pic-Smaller-Locale")),
  ).toBe("en-US");
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "https://piczip.ajutx.com/",
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "https://piczip.ajutx.com/sitemap.xml",
  );
  await page.goto("/no-such-page");
  await expect(
    page.getByRole("link", { name: "Back to LiteFrame" }),
  ).toBeVisible();
});

test("HEIF without target retains the original and explains why", async ({
  page,
}) => {
  const heif = readFileSync("tests/fixtures/original.heic");
  await page.goto("/zh-CN/");
  const chooser = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "选择图片", exact: true }).click();
  await (
    await chooser
  ).setFiles({ name: "original.heif", mimeType: "image/heif", buffer: heif });
  await expect(page.getByText("已保留原文件", { exact: true })).toBeVisible({
    timeout: 30_000,
  });
  await expect(
    page.getByText(/未指定输出格式，已保留 HEIC\/HEIF/),
  ).toBeVisible();
  const result = await downloadOne(page);
  expect(result.bytes.equals(heif)).toBeTruthy();
});

test("reduced-motion preference and text contrast remain accessible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/zh-CN/");
  await expect(
    page.getByRole("button", { name: "选择图片", exact: true }),
  ).toHaveCSS("transition-duration", "1e-05s");
  const contrasts = await page.evaluate(() => {
    const luminance = (color: string) => {
      const values = color
        .match(/[\d.]+/g)!
        .slice(0, 3)
        .map(Number)
        .map((value) => {
          value /= 255;
          return value <= 0.04045
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
        });
      return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
    };
    const root = getComputedStyle(document.documentElement);
    return [
      "--color-surface",
      "--color-surface-subtle",
      "--color-action-soft",
    ].map((background) => {
      const span = document.createElement("span");
      span.style.color = root.getPropertyValue("--color-text-muted");
      span.style.backgroundColor = root.getPropertyValue(background);
      document.body.append(span);
      const css = getComputedStyle(span);
      const result =
        (luminance(css.backgroundColor) + 0.05) / (luminance(css.color) + 0.05);
      span.remove();
      return result;
    });
  });
  expect(contrasts.every((contrast) => contrast >= 4.5)).toBeTruthy();
});
