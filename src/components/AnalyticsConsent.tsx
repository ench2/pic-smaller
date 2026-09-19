"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  analyticsEnabled,
  applyConsent,
  consentKey,
  measurementId,
  readConsent,
  saveConsent,
  trackPageView,
  type Consent,
} from "@/analytics";
import style from "./AnalyticsConsent.module.scss";

export function AnalyticsConsent({ lang }: { lang: string }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const zh = lang.startsWith("zh");

  useEffect(() => {
    const sync = () => {
      const saved = readConsent();
      applyConsent(saved);
      setConsent(saved);
      setOpen(saved === null);
      setReady(true);
      trackPageView();
    };
    sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key === consentKey || event.key === null) sync();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [lang]);

  if (!analyticsEnabled) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    applyConsent(value);
    setConsent(value);
    setOpen(false);
    trackPageView();
  };

  return (
    <>
      {ready && consent === "granted" && (
        <Script
          id="liteframe-ga4"
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="afterInteractive"
        />
      )}
      {ready &&
        (open ? (
          <section
            className={style.notice}
            aria-label={zh ? "访问统计设置" : "Analytics preferences"}
          >
            <strong>{zh ? "允许访问统计？" : "Allow usage analytics?"}</strong>
            <p>
              {zh
                ? "同意后，我们使用 Google Analytics 和 Cookie 统计访问、压缩与下载操作。图片仍在本地处理，不发送图片内容或文件名。拒绝不影响使用，随时可撤回。"
                : "With your consent, Google Analytics and cookies measure visits, compression and downloads. Images stay on your device; image contents and filenames are not sent. Declining does not affect the tool. You can withdraw anytime."}
            </p>
            <a href="/privacy.html" target="_blank" rel="noreferrer">
              {zh ? "隐私政策" : "Privacy policy"}
            </a>
            <div className={style.actions}>
              <button className="button" onClick={() => choose("denied")}>
                {zh ? "拒绝统计" : "Decline analytics"}
              </button>
              <button className="button" onClick={() => choose("granted")}>
                {zh ? "允许统计" : "Allow analytics"}
              </button>
            </div>
          </section>
        ) : (
          <button className={style.preferences} onClick={() => setOpen(true)}>
            {zh ? "统计偏好" : "Analytics preferences"}
          </button>
        ))}
    </>
  );
}
