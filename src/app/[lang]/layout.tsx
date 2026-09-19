import type { Viewport } from "next";
import "@/main.scss";
import { isSupportedLocale, supportedLocales } from "@/locale-config";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";

export function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={isSupportedLocale(lang) ? lang : "en-US"}>
      <body>
        {children}
        <AnalyticsConsent lang={lang} />
      </body>
    </html>
  );
}
