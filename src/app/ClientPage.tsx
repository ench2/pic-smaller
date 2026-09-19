import ClientApp from "@/ClientApp";
import type { SupportedLocale } from "@/locale-config";
import type { LocaleData } from "@/type";
import {
  createStructuredData,
  serializeStructuredData,
} from "@/structured-data";

type ClientPageProps = {
  lang: SupportedLocale;
  locale: LocaleData;
  rememberLocale?: boolean;
};

export default function ClientPage({
  lang,
  locale,
  rememberLocale = true,
}: ClientPageProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(createStructuredData(lang)),
        }}
      />
      <ClientApp lang={lang} locale={locale} rememberLocale={rememberLocale} />
    </>
  );
}
