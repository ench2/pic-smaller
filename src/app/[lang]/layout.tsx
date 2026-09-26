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

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
const DEFAULT_ADSENSE_CLIENT_ID = ADSENSE_CLIENT_ID || "ca-pub-9757609887133257";

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={isSupportedLocale(lang) ? lang : "en-US"}>
      <head>
        {DEFAULT_ADSENSE_CLIENT_ID ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${DEFAULT_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body>
        {children}
        <AnalyticsConsent lang={lang} />
      </body>
    </html>
  );
}
