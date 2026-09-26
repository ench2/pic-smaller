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

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <body>
        {children}
        <AnalyticsConsent lang="en-US" />
      </body>
    </html>
  );
}
