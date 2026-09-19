import type { Metadata } from "next";
import { brand, getBrandName } from "./brand";
import type { LocaleData } from "./type";
import {
  getLocalePath,
  siteUrl,
  supportedLocales,
  type SupportedLocale,
} from "./locale-config";

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
      google: "notranslate",
    },
  };
}
