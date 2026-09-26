import ClientApp from "@/ClientApp";
import type { SupportedLocale } from "@/locale-config";
import type { LocaleData } from "@/type";
import {
  createStructuredData,
  serializeStructuredData,
} from "@/structured-data";
import type { SupportedTool } from "@/tools-data";

type ClientPageProps = {
  lang: SupportedLocale;
  locale: LocaleData;
  rememberLocale?: boolean;
  tool?: SupportedTool;
};

export default function ClientPage({
  lang,
  locale,
  rememberLocale = true,
  tool,
}: ClientPageProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(createStructuredData(lang, tool)),
        }}
      />
      <ClientApp
        lang={lang}
        locale={locale}
        rememberLocale={rememberLocale}
        tool={tool}
      />
    </>
  );
}
