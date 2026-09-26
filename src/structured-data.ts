import { brand, getBrandName } from "./brand";
import {
  getLocalePath,
  siteUrl,
  supportedLocales,
  type SupportedLocale,
} from "./locale-config";
import { getSeoCopy } from "./seo-copy";
import {
  getToolPath,
  getToolSeoCopy,
  type SupportedTool,
} from "./tools-data";

export function createStructuredData(
  locale: SupportedLocale,
  tool?: SupportedTool,
) {
  const copy = getSeoCopy(locale);
  const toolCopy = tool ? getToolSeoCopy(locale, tool) : null;
  const url = tool
    ? `${siteUrl}${getToolPath(locale, tool)}`
    : `${siteUrl}${getLocalePath(locale)}`;
  const description = toolCopy ? toolCopy.summary : copy.summary;
  const faqItems = toolCopy ? toolCopy.faq : copy.faq;
  const appName = toolCopy
    ? `${toolCopy.navLabel} — ${getBrandName(locale)}`
    : getBrandName(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: brand.en,
        alternateName: [brand.zhCN, brand.zhTW],
        inLanguage: supportedLocales,
        sameAs: [brand.sourceUrl],
      },
      {
        "@type": "WebApplication",
        "@id": `${url}#application`,
        url,
        name: appName,
        description,
        inLanguage: locale,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript, Web Workers and WebAssembly",
        softwareRequirements: "HTML5, Web Workers, WebAssembly",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        license: "https://opensource.org/license/mit",
        sameAs: [brand.sourceUrl],
        featureList: [
          "Client-side batch image compression",
          "Zero server uploads - 100% private and on-device",
          "Format conversion across JPEG, PNG, WebP, AVIF, HEIC, GIF, and SVG",
          "Batch resizing and aspect-ratio cropping",
          "Side-by-side split visual diff preview",
          "Zip archive batch download",
        ],
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url: `${url}#faq`,
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${url}#application` },
        mainEntity: faqItems.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
