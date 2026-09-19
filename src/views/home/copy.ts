import { brand } from "@/brand";
import { getSeoCopy } from "@/seo-copy";
import { internationalCopy } from "./international-copy";

const en = {
  nav: ["Features", "Privacy"],
  tagline: "Lighter images. Your vision, intact.",
  proof: ["No sign-up", "Local processing", "Free & open source"],
  workspace: "Image workspace",
  settings: "Settings",
  closeSettings: "Close settings",
  menu: "Toggle navigation",
  language: "Language",
  choose: "Choose images",
  drop: "Drop your images here",
  folder: "Choose folder",
  compareHelp: "Comparison help",
  compareClose: "Close comparison",
  folderError: "Could not read this folder. Try choosing the images instead.",
  status: {
    processing: "Processing",
    success: "Ready",
    error: "Failed",
    preserved: "Original preserved",
  },
  featuresTitle: "Everything your images need. Nothing extra.",
  featuresIntro:
    "One lightweight workspace, from the first file to the final download.",
  features: [
    [
      "Smaller files",
      "Format-aware compression for JPEG, PNG, WebP, GIF, SVG, and AVIF.",
    ],
    [
      "One batch, one workflow",
      "Add files and folders, or paste images. Apply settings to the whole batch.",
    ],
    [
      "The right format",
      "Export JPG, PNG, WebP, or AVIF, with control over transparent backgrounds.",
    ],
    [
      "Just the right size",
      "Resize by dimensions or proportions, and crop to fit your next destination.",
    ],
    [
      "See every detail",
      "Compare the original and output side by side before you download.",
    ],
    [
      "Keep things moving",
      "Background workers process your images while the interface stays responsive.",
    ],
  ],
  howTitle: "Three steps. Ready to share.",
  steps: [
    ["Add your images", "Choose files or folders, drop, or paste."],
    ["Make them yours", "Set quality, format, dimensions, and cropping."],
    [
      "Review and save",
      "Compare the result. Download individually or as a ZIP.",
    ],
  ],
  privacyTitle: "Your images stay yours.",
  privacyText:
    "Image processing happens on your device with Web Workers and WebAssembly. No image uploads and no server-side copies. Your saved settings stay in this browser; the working images are released when you close the page.",
  privacyPoints: [
    "On-device processing",
    "No image uploads",
    "Open-source code",
  ],
  source: "Source code",
  attribution: "Based on Pic Smaller · MIT License",
};

const zh: typeof en = {
  nav: ["功能", "隐私"],
  tagline: brand.tagline,
  proof: ["无需注册", "本地处理", "免费开源"],
  workspace: "图片工作台",
  settings: "处理设置",
  closeSettings: "关闭设置",
  menu: "切换导航",
  language: "语言",
  choose: "选择图片",
  drop: "把图片拖到这里",
  folder: "选择文件夹",
  folderError: "无法读取文件夹，请尝试直接选择图片。",
  compareHelp: "对比帮助",
  compareClose: "关闭对比",
  status: {
    processing: "处理中",
    success: "已完成",
    error: "处理失败",
    preserved: "已保留原文件",
  },
  featuresTitle: "处理图片需要的，刚刚好。",
  featuresIntro: "从第一张原图到最后一次下载，在一个轻量工作台里完成。",
  features: [
    ["体积更轻", "为 JPEG、PNG、WebP、GIF、SVG 和 AVIF 选择适合的压缩引擎。"],
    ["批量更省心", "添加文件、文件夹或粘贴图片，一次设置应用到整批图片。"],
    [
      "格式随你选",
      "转换为 JPG、PNG、WebP 或 AVIF，自由设置透明背景的填充方式。",
    ],
    ["尺寸刚刚好", "按宽高、比例或长短边缩放，裁剪出适合发布的画面。"],
    ["细节看得见", "拖动分割线对比原图与结果，确认效果后再下载。"],
    ["操作不中断", "后台并行处理图片，前台保持流畅，不必等待上传。"],
  ],
  howTitle: "三步，准备好下一次分享。",
  steps: [
    ["添加图片", "选择文件或文件夹，也可以拖入、粘贴。"],
    ["调整设置", "统一设置质量、格式、尺寸与裁剪方式。"],
    ["检查并保存", "对比处理效果，单独下载或打包保存。"],
  ],
  privacyTitle: "你的图片，只留在你这里。",
  privacyText:
    "图片通过 Web Worker 与 WebAssembly 在设备上处理，无需上传，也不会在服务器上留下副本。设置保存在当前浏览器，关闭页面后释放本次处理的图片。",
  privacyPoints: ["设备本地处理", "图片无需上传", "代码开源可查"],
  source: "查看源代码",
  attribution: "基于 Pic Smaller · MIT 许可证",
};

const tw: typeof en = {
  nav: ["功能", "隱私"],
  tagline: "讓圖片輕一點，讓表達完整一點。",
  proof: ["無需註冊", "本機處理", "免費開源"],
  workspace: "圖片工作台",
  settings: "處理設定",
  closeSettings: "關閉設定",
  menu: "切換導覽",
  language: "語言",
  choose: "選擇圖片",
  drop: "將圖片拖曳到這裡",
  folder: "選擇資料夾",
  folderError: "無法讀取資料夾，請嘗試直接選擇圖片。",
  compareHelp: "比較說明",
  compareClose: "關閉比較",
  status: {
    processing: "處理中",
    success: "已完成",
    error: "處理失敗",
    preserved: "已保留原檔",
  },
  featuresTitle: "處理圖片需要的，剛剛好。",
  featuresIntro: "從第一張原圖到最後一次下載，在一個輕量工作台裡完成。",
  features: [
    ["體積更輕", "為 JPEG、PNG、WebP、GIF、SVG 和 AVIF 選擇適合的壓縮引擎。"],
    ["批次更省心", "新增檔案、資料夾或貼上圖片，一次設定套用至整批圖片。"],
    ["格式隨你選", "轉換為 JPG、PNG、WebP 或 AVIF，自由設定透明背景填色。"],
    ["尺寸剛剛好", "依寬高、比例或長短邊縮放，裁剪適合發布的畫面。"],
    ["細節看得見", "拖曳分割線比較原圖與結果，確認效果後再下載。"],
    ["操作不中斷", "背景平行處理圖片，介面保持流暢，不必等待上傳。"],
  ],
  howTitle: "三步，準備好下一次分享。",
  steps: [
    ["新增圖片", "選擇檔案或資料夾，也可以拖曳、貼上。"],
    ["調整設定", "統一設定品質、格式、尺寸與裁剪方式。"],
    ["檢查並儲存", "比較處理效果，個別下載或打包儲存。"],
  ],
  privacyTitle: "你的圖片，只留在你這裡。",
  privacyText:
    "圖片透過 Web Worker 與 WebAssembly 在裝置上處理，無需上傳，也不會在伺服器上留下副本。設定儲存在目前的瀏覽器，關閉頁面後釋放本次處理的圖片。",
  privacyPoints: ["裝置本機處理", "圖片無需上傳", "程式碼開源可查"],
  source: "查看原始碼",
  attribution: "基於 Pic Smaller · MIT 授權",
};

export type HomeCopy = typeof en;

export function getHomeCopy(locale?: string) {
  const base =
    locale === "zh-CN"
      ? zh
      : locale === "zh-TW"
        ? tw
        : locale &&
            Object.prototype.hasOwnProperty.call(internationalCopy, locale)
          ? internationalCopy[locale as keyof typeof internationalCopy]
          : en;
  return { ...base, ...getSeoCopy(locale) };
}
