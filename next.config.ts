import type { NextConfig } from "next";

const isPagesBuild =
  process.env.CF_PAGES === "1" ||
  process.env.npm_lifecycle_event === "build:pages";

const nextConfig: NextConfig = {
  output: isPagesBuild ? "export" : "standalone",
  // Canonical/hreflang/sitemap all use /<locale>/; export matching index.html files.
  trailingSlash: true,
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
