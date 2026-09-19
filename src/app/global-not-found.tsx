import { brand } from "@/brand";
import { NotFound } from "@/components/NotFound";
import "@/main.scss";

export const metadata = { title: `404 · ${brand.en}` };

export default function GlobalNotFound() {
  return (
    <html lang="en-US">
      <body>
        <NotFound />
      </body>
    </html>
  );
}
