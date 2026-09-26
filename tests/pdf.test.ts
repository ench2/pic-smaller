import assert from "node:assert/strict";
import test from "node:test";
import { PDFDocument } from "pdf-lib";

test("PDFDocument can create and manipulate PDF pages in memory", async () => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([400, 400]);
  page.drawText("LiteFrame Local PDF Test", { x: 50, y: 350 });
  const bytes = await doc.save();
  assert.ok(bytes.length > 0);
  assert.equal(bytes[0], 0x25); // %
  assert.equal(bytes[1], 0x50); // P
  assert.equal(bytes[2], 0x44); // D
  assert.equal(bytes[3], 0x46); // F
});
