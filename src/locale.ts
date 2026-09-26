import {
  defaultLocale,
  getLocalePath,
  isSupportedLocale,
  localeOptions,
} from "./locale-config";
import { getToolPath, type SupportedTool } from "./tools-data";

export const langList: Array<{ key: string; label: string }> = [
  ...localeOptions,
];

export function changeLang(lang: string, tool?: SupportedTool) {
  const locale = isSupportedLocale(lang) ? lang : defaultLocale;
  try {
    window.localStorage.setItem("Pic-Smaller-Locale", locale);
  } catch {
    // A saved preference is optional; changing language is not.
  }
  window.location.assign(
    tool ? getToolPath(locale, tool) : getLocalePath(locale),
  );
}
