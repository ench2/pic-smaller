import { expect, test, type Page } from "@playwright/test";

const key = "liteframe-analytics-consent-v1";
async function events(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? []).map((entry) =>
      Array.from(entry as ArrayLike<unknown>),
    ),
  );
}

test("analytics opt-in, sanitized single pageview, worker events, downloads and withdrawal", async ({
  page,
}) => {
  let scriptRequests = 0;
  await page.route("https://www.googletagmanager.com/**", async (route) => {
    scriptRequests++;
    await route.fulfill({
      contentType: "application/javascript",
      body: "/* Offline GA stub: do not send test visits to Google. */",
    });
  });
  await page.route(/google-analytics\.com/, (route) => route.abort());
  await page.goto("/zh-CN/?email=private@example.com#private-name");
  await expect(
    page.getByRole("button", { name: "允许统计", exact: true }),
  ).toBeVisible();
  expect(scriptRequests).toBe(0);
  expect(await events(page)).toEqual([]);

  await page.getByRole("button", { name: "允许统计", exact: true }).click();
  await expect.poll(() => scriptRequests).toBe(1);
  let commands = await events(page);
  expect(
    commands.filter(
      ([command, event]) => command === "event" && event === "page_view",
    ),
  ).toHaveLength(1);
  expect(commands.find(([command]) => command === "config")?.[1]).toBe(
    "G-CMCBVVY1XF",
  );
  expect(JSON.stringify(commands)).not.toContain("private@example.com");
  expect(JSON.stringify(commands)).not.toContain("private-name");
  expect(commands[0]).toEqual([
    "consent",
    "default",
    {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ]);

  const picker = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "选择图片", exact: true }).click();
  await (
    await picker
  ).setFiles({
    name: "private-customer-file.svg",
    mimeType: "image/svg+xml",
    buffer: Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="red"/></svg>',
    ),
  });
  await expect(page.getByText("已完成", { exact: true })).toBeVisible();
  for (const label of ["保存图片", "保存全部"]) {
    const downloading = page.waitForEvent("download");
    await page.getByRole("button", { name: label, exact: true }).click();
    await downloading;
  }
  commands = await events(page);
  for (const name of [
    "images_imported",
    "compression_completed",
    "image_download",
    "batch_download",
  ]) {
    expect(
      commands.filter(
        ([command, event]) => command === "event" && event === name,
      ),
    ).toHaveLength(1);
  }
  expect(JSON.stringify(commands)).not.toContain("private-customer-file");

  await page.getByRole("button", { name: "统计偏好", exact: true }).click();
  await page.getByRole("button", { name: "拒绝统计", exact: true }).click();
  const count = (await events(page)).filter(
    ([command]) => command === "event",
  ).length;
  await page.getByRole("button", { name: "保存图片", exact: true }).click();
  expect(
    (await events(page)).filter(([command]) => command === "event"),
  ).toHaveLength(count);
  expect(
    await page.evaluate(
      () =>
        (window as unknown as Record<string, unknown>)[
          "ga-disable-G-CMCBVVY1XF"
        ],
    ),
  ).toBe(true);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "统计偏好", exact: true }),
  ).toBeVisible();
  expect(scriptRequests).toBe(1);
  expect(await events(page)).toEqual([]);
});

test("denied and corrupt preferences never load Google; blocked storage and script do not break tools", async ({
  page,
}) => {
  const requests: string[] = [];
  await page.route("https://www.googletagmanager.com/**", (route) => {
    requests.push(route.request().url());
    return route.abort();
  });
  await page.addInitScript(
    ({ key }) => {
      localStorage.setItem(key, "broken");
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (name, value) {
        if (name === key) throw new Error("Storage blocked");
        return original.call(this, name, value);
      };
    },
    { key },
  );
  await page.goto("/en-US/");
  await page
    .getByRole("button", { name: "Decline analytics", exact: true })
    .click();
  expect(requests).toHaveLength(0);
  await page
    .getByRole("button", { name: "Analytics preferences", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Allow analytics", exact: true })
    .click();
  await expect.poll(() => requests.length).toBe(1);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Analytics preferences", exact: true }),
  ).toBeVisible();
});

test("saved consent survives locale navigation and withdrawal synchronizes across tabs", async ({
  page,
  context,
}) => {
  await context.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "/* GA offline */",
    }),
  );
  await context.route(/google-analytics\.com/, (route) => route.abort());
  await page.goto("/zh-CN/");
  await page.getByRole("button", { name: "允许统计", exact: true }).click();
  await page.getByRole("combobox", { name: "语言", exact: true }).click();
  await page.getByRole("option", { name: "English", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Analytics preferences", exact: true }),
  ).toBeVisible();
  expect(
    (await events(page)).filter(
      ([command, event]) => command === "event" && event === "page_view",
    ),
  ).toHaveLength(1);
  const other = await context.newPage();
  await other.goto("/en-US/");
  await expect(
    other.getByRole("button", { name: "Analytics preferences", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Analytics preferences", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Decline analytics", exact: true })
    .click();
  await expect
    .poll(() =>
      other.evaluate(
        () =>
          (window as unknown as Record<string, unknown>)[
            "ga-disable-G-CMCBVVY1XF"
          ],
      ),
    )
    .toBe(true);
});

test("consenting on mobile keeps the tool accessible and policy is available", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/zh-CN/");
  await expect(
    page.getByRole("region", { name: "访问统计设置" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "拒绝统计", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "选择图片", exact: true }),
  ).toBeVisible();
  const policy = await request.get("/privacy.html");
  expect(policy.ok()).toBe(true);
  expect(await policy.text()).toContain("Google Analytics 4");
});
