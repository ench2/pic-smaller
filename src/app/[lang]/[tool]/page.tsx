import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientPage from "../../ClientPage";
import { isSupportedLocale, supportedLocales } from "@/locale-config";
import { getLocaleData } from "@/locale-data";
import { createToolMetadata } from "@/seo";
import { isSupportedTool, supportedTools } from "@/tools-data";

export function generateStaticParams() {
  return supportedLocales.flatMap((lang) =>
    supportedTools.map((tool) => ({ lang, tool })),
  );
}

function assertParams(lang: string, tool: string) {
  if (!isSupportedLocale(lang) || !isSupportedTool(tool)) {
    notFound();
  }
  return { locale: lang, toolSlug: tool };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; tool: string }>;
}): Promise<Metadata> {
  const { lang, tool } = await params;
  const { locale, toolSlug } = assertParams(lang, tool);
  return createToolMetadata(locale, toolSlug);
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ lang: string; tool: string }>;
}) {
  const { lang, tool } = await params;
  const { locale, toolSlug } = assertParams(lang, tool);
  const localeData = await getLocaleData(locale);
  return <ClientPage lang={locale} locale={localeData} tool={toolSlug} />;
}
