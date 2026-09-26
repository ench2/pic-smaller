import type { MetadataRoute } from "next";
import {
  getLocalePath,
  siteUrl,
  supportedLocales,
} from "@/locale-config";
import { getToolPath, supportedTools } from "@/tools-data";

export const dynamic = "force-static";

const languages = Object.fromEntries(
  [
    ...supportedLocales.map((locale) => [
      locale,
      `${siteUrl}${getLocalePath(locale)}`,
    ]),
    ["x-default", `${siteUrl}/en-US/`],
  ],
);

export default function sitemap(): MetadataRoute.Sitemap {
  const mainEntries = supportedLocales.map((locale) => ({
    url: `${siteUrl}${getLocalePath(locale)}`,
    changeFrequency: "monthly" as const,
    priority: locale === "en-US" || locale === "zh-CN" ? 1 : 0.8,
    alternates: { languages },
  }));

  const toolEntries = supportedLocales.flatMap((locale) =>
    supportedTools.map((tool) => ({
      url: `${siteUrl}${getToolPath(locale, tool)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries([
          ...supportedLocales.map((l) => [
            l,
            `${siteUrl}${getToolPath(l, tool)}`,
          ]),
          ["x-default", `${siteUrl}${getToolPath("en-US", tool)}`],
        ]),
      },
    })),
  );

  return [...mainEntries, ...toolEntries];
}
