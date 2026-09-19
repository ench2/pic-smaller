import { brand } from "@/brand";

export function NotFound() {
  return (
    <main className="globalNotFound">
      <img src="/logo.svg" width={56} height={56} alt={brand.en} />
      <strong>404</strong>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <a className="button buttonPrimary" href="/en-US/">
        Back to {brand.en}
      </a>
    </main>
  );
}
