import type { Viewport } from "next";
import "@/main.scss";
import enUS from "@/locales/en-US";
import { createLocaleMetadata } from "@/seo";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";

export const metadata = createLocaleMetadata("en-US", enUS);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9757609887133257";

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <AnalyticsConsent lang="en-US" />
      </body>
    </html>
  );
}
