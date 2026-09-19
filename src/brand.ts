/** Display identity only. Storage keys and deployment identifiers stay unchanged. */
export const brand = {
  en: "LiteFrame",
  zhCN: "轻帧",
  zhTW: "輕幀",
  tagline: "让图片轻一点，让表达完整一点。",
  archiveName: "liteframe.zip",
  sourceUrl: "https://github.com/joye61/pic-smaller",
} as const;

export function getBrandName(locale?: string) {
  if (locale === "zh-CN") return brand.zhCN;
  if (locale === "zh-TW") return brand.zhTW;
  return brand.en;
}
