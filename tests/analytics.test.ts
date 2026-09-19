import assert from "node:assert/strict";
import test from "node:test";
import { pageContext, parseConsent, safeFormat } from "../src/analytics";

test("consent is explicit, expires and rejects invalid or future records", () => {
  const now = Date.now();
  for (const raw of [
    null,
    "bad",
    "true",
    "{}",
    JSON.stringify({ value: "granted", updatedAt: now + 1 }),
    JSON.stringify({ value: "granted", updatedAt: 0 }),
  ]) {
    assert.equal(parseConsent(raw, now), null);
  }
  for (const value of ["granted", "denied"]) {
    assert.equal(
      parseConsent(JSON.stringify({ value, updatedAt: now }), now),
      value,
    );
  }
});

test("analytics uses allowlisted routes and formats, never full referrer URLs", () => {
  assert.deepEqual(
    pageContext(
      { origin: "https://piczip.ajutx.com", pathname: "/zh-CN/" },
      "https://example.com/private?email=secret#token",
    ),
    {
      page_location: "https://piczip.ajutx.com/zh-CN/",
      page_referrer: "https://example.com",
      page_title: "LiteFrame — Image tools",
    },
  );
  const context = pageContext(
    { origin: "https://piczip.ajutx.com", pathname: "/private-file-name" },
    "invalid",
  );
  assert.equal(context.page_location, "https://piczip.ajutx.com/");
  assert.equal(context.page_referrer, "");
  assert.equal(safeFormat("image/png"), "png");
  assert.equal(safeFormat("secret-filename"), "other");
});
