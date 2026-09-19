"use client";

import { useEffect, useState } from "react";
import { configure } from "mobx";
import { gstate } from "./global";
import Home from "./views/home";
import { Loading } from "./components/Loading";
import type { SupportedLocale } from "./locale-config";
import type { LocaleData } from "./type";

type ClientAppProps = {
  lang: SupportedLocale;
  locale: LocaleData;
  rememberLocale: boolean;
};

export default function ClientApp({
  lang,
  locale,
  rememberLocale,
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
      <Home />
      {gstate.loading && <Loading />}
    </>
  );
}
