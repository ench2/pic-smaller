import { readFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { brand } from "../src/brand";
import { siteUrl } from "../src/locale-config";

// Regenerate raster compatibility assets from the editable SVG, not screenshots.
const root = new URL("../", import.meta.url);
const path = (relative: string) => fileURLToPath(new URL(relative, root));
const logo = await readFile(path("public/logo.svg"));
await copyFile(path("public/logo.svg"), path("public/favicon.svg"));
for (const [file, size] of [
  ["public/favicon.png", 32],
  ["public/apple-touch-icon.png", 180],
  ["public/logo.png", 256],
  ["logo.png", 256],
] as const) {
  await sharp(logo).resize(size, size).png().toFile(path(file));
}
const card =
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#F7F9FC"/>
  <rect x="64" y="64" width="1072" height="502" rx="32" fill="white" stroke="#E2E8F0"/>
  <g font-family="Segoe UI, sans-serif">
    <text x="120" y="190" font-weight="600" font-size="24" fill="#2563EB">${brand.en.toUpperCase()} / IMAGE TOOLS</text>
    <text x="120" y="300" font-weight="700" font-size="72" fill="#182230">Image work. Made lighter.</text>
    <text x="120" y="374" font-size="28" fill="#5C6B80">Compress. Convert. Resize. Crop. All on your device.</text>
    <text x="120" y="500" font-size="24" fill="#2563EB">${new URL(siteUrl).host}</text>
  </g>
</svg>`);
await sharp(card)
  .composite([
    {
      input: await sharp(logo).resize(64, 64).toBuffer(),
      left: 1016,
      top: 128,
    },
  ])
  .png()
  .toFile(path("public/social-card.png"));
