import type { Metadata } from "next";
import { brand, getBrandName } from "./brand";
import type { LocaleData } from "./type";
import {
  getLocalePath,
  siteUrl,
  supportedLocales,
  type SupportedLocale,
} from "./locale-config";
import {
  getToolPath,
  getToolSeoCopy,
  type SupportedTool,
} from "./tools-data";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9757609887133257";

export const metadataBase = new URL(siteUrl);

export const languageAlternates = Object.fromEntries(
  supportedLocales.map((locale) => [locale, getLocalePath(locale)]),
);

export function createLocaleMetadata(
  locale: SupportedLocale,
  localeData: LocaleData,
): Metadata {
  return {
    metadataBase,
    title: localeData.siteTitle,
    description: localeData.siteDescription,
    robots: { index: true, follow: true },
    verification: {
      google: "4OqUksuSHiPgaiX5ogytpBdvgq6qDOk6XnUMSe6lBN4",
      other: {
        "msvalidate.01": "0FA8918D1895135F5DBCAF3472286DD0",
      },
    },
    alternates: {
      canonical: getLocalePath(locale),
      languages: {
        ...languageAlternates,
        "x-default": "/en-US/",
      },
    },
    openGraph: {
      type: "website",
      url: getLocalePath(locale),
      title: localeData.siteTitle,
      description: localeData.siteDescription,
      siteName: getBrandName(locale),
      locale: locale.replace("-", "_"),
      images: [
        { url: "/social-card.png", width: 1200, height: 630, alt: brand.en },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localeData.siteTitle,
      description: localeData.siteDescription,
      images: ["/social-card.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: "/apple-touch-icon.png",
    },
    other: {
      ...(ADSENSE_CLIENT_ID ? { "google-adsense-account": ADSENSE_CLIENT_ID } : {}),
      google: "notranslate",
    },
  };
}

export function createToolMetadata(
  locale: SupportedLocale,
  tool: SupportedTool,
): Metadata {
  const toolCopy = getToolSeoCopy(locale, tool);
  const path = getToolPath(locale, tool);
  const toolAlternates = Object.fromEntries(
    supportedLocales.map((l) => [l, getToolPath(l, tool)]),
  );

  return {
    metadataBase,
    title: toolCopy.pageTitle,
    description: toolCopy.summary,
    robots: { index: true, follow: true },
    verification: {
      google: "4OqUksuSHiPgaiX5ogytpBdvgq6qDOk6XnUMSe6lBN4",
      other: {
        "msvalidate.01": "0FA8918D1895135F5DBCAF3472286DD0",
      },
    },
    alternates: {
      canonical: path,
      languages: {
        ...toolAlternates,
        "x-default": getToolPath("en-US", tool),
      },
    },
    openGraph: {
      type: "website",
      url: path,
      title: toolCopy.pageTitle,
      description: toolCopy.summary,
      siteName: getBrandName(locale),
      locale: locale.replace("-", "_"),
      images: [
        { url: "/social-card.png", width: 1200, height: 630, alt: brand.en },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: toolCopy.pageTitle,
      description: toolCopy.summary,
      images: ["/social-card.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: "/apple-touch-icon.png",
    },
    other: {
      ...(ADSENSE_CLIENT_ID ? { "google-adsense-account": ADSENSE_CLIENT_ID } : {}),
      google: "notranslate",
    },
  };
}
