"use client";

import { useEffect, useState } from "react";
import { configure } from "mobx";
import { gstate } from "./global";
import Home from "./views/home";
import { Loading } from "./components/Loading";
import type { SupportedLocale } from "./locale-config";
import type { LocaleData } from "./type";
import type { SupportedTool } from "./tools-data";

type ClientAppProps = {
  lang: SupportedLocale;
  locale: LocaleData;
  rememberLocale: boolean;
  tool?: SupportedTool;
};

export default function ClientApp({
  lang,
  locale,
  rememberLocale,
  tool,
}: ClientAppProps) {
  useState(() => {
    gstate.lang = lang;
    gstate.locale = locale;
  });

  useEffect(() => {
    configure({
      enforceActions: "never",
      useProxies: "ifavailable",
    });

    document.documentElement.lang = lang;
    if (rememberLocale) {
      try {
        window.localStorage.setItem("Pic-Smaller-Locale", lang);
      } catch {
        // Navigation still works when browser storage is unavailable.
      }
    }
  }, [lang, rememberLocale]);

  return (
    <>
      <Home tool={tool} />
      {gstate.loading && <Loading />}
    </>
  );
}
