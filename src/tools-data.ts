import {
  defaultLocale,
  isSupportedLocale,
  type SupportedLocale,
} from "./locale-config";

export type ToolCategory = "image" | "pdf" | "video";

export const toolConfigs = [
  {
    slug: "heic-to-jpg",
    category: "image" as ToolCategory,
    outputFormat: "jpeg" as const,
  },
  {
    slug: "webp-to-png",
    category: "image" as ToolCategory,
    outputFormat: "png" as const,
  },
  {
    slug: "webp-to-jpg",
    category: "image" as ToolCategory,
    outputFormat: "jpeg" as const,
  },
  {
    slug: "png-to-webp",
    category: "image" as ToolCategory,
    outputFormat: "webp" as const,
  },
  {
    slug: "compress-to-100kb",
    category: "image" as ToolCategory,
    targetSizeKb: 100,
  },
  {
    slug: "batch-image-resizer",
    category: "image" as ToolCategory,
    openResizePanel: true,
  },
  {
    slug: "image-to-pdf",
    category: "pdf" as ToolCategory,
    pdfMode: "image-to-pdf" as const,
  },
  {
    slug: "pdf-to-jpg",
    category: "pdf" as ToolCategory,
    pdfMode: "pdf-to-jpg" as const,
  },
  {
    slug: "merge-pdf",
    category: "pdf" as ToolCategory,
    pdfMode: "merge-pdf" as const,
  },
  {
    slug: "compress-pdf",
    category: "pdf" as ToolCategory,
    pdfMode: "compress-pdf" as const,
  },
  {
    slug: "video-compressor",
    category: "video" as ToolCategory,
    videoMaxMb: 50,
  },
  {
    slug: "compress-video-for-discord",
    category: "video" as ToolCategory,
    videoMaxMb: 25,
  },
] as const;

export type SupportedTool = (typeof toolConfigs)[number]["slug"];

export const supportedTools: SupportedTool[] = toolConfigs.map(
  (item) => item.slug,
);

export function isSupportedTool(tool: string): tool is SupportedTool {
  return supportedTools.some((supported) => supported === tool);
}

export function getToolConfig(tool: SupportedTool) {
  return toolConfigs.find((item) => item.slug === tool)!;
}

export function getToolPath(locale: SupportedLocale, tool: SupportedTool) {
  return `/${locale}/${tool}/`;
}

export type ToolCopy = {
  slug: SupportedTool;
  category: ToolCategory;
  navLabel: string;
  title: string;
  subtitle: string;
  pageTitle: string;
  summary: string;
  badge: string;
  faq: Array<[question: string, answer: string]>;
};

type ToolTemplate = {
  navLabel: string;
  title: string;
  subtitle: string;
  pageTitle: string;
  summary: string;
  badge: string;
  faq: Array<[question: string, answer: string]>;
};

const enTools: Record<SupportedTool, ToolTemplate> = {
  "heic-to-jpg": {
    navLabel: "HEIC to JPG",
    title: "Convert HEIC to JPG Online (Free & Private)",
    subtitle: "Batch convert iPhone HEIC/HEIF photos to universal JPEG locally.",
    pageTitle: "HEIC to JPG Converter - Free Local Batch Tool | LiteFrame",
    summary:
      "Convert iPhone HEIC and HEIF photos to JPG in bulk right in your browser. Zero server uploads, 100% private WebAssembly decoding.",
    badge: "Preset: Output locked to JPEG",
    faq: [
      [
        "Are my iPhone HEIC photos uploaded to any server?",
        "No. All HEIC decoding and JPEG encoding run 100% inside your browser using WebAssembly. Your personal photos never leave your device.",
      ],
      [
        "Can I convert dozens of HEIC files at once?",
        "Yes. Drag and drop multiple HEIC files or an entire folder, and download all converted JPGs in a single ZIP archive.",
      ],
      [
        "Why is JPEG preselected on this page?",
        "This dedicated tool automatically sets the output format to JPEG so your imported HEIC files immediately convert without extra clicks.",
      ],
    ],
  },
  "webp-to-png": {
    navLabel: "WebP to PNG",
    title: "WebP to PNG Converter (Lossless & Transparent)",
    subtitle: "Turn WebP images into standard lossless PNGs with alpha support.",
    pageTitle: "WebP to PNG Converter - Free Browser-Based Tool | LiteFrame",
    summary:
      "Convert WebP images to lossless PNG format locally in your browser. Preserves transparency, supports batch processing with zero uploads.",
    badge: "Preset: Output locked to PNG",
    faq: [
      [
        "Does converting WebP to PNG keep transparent backgrounds?",
        "Yes. LiteFrame preserves the full alpha channel when decoding WebP and encoding to PNG.",
      ],
      [
        "Is there a file count or size limit?",
        "Because processing happens on your own computer rather than a remote server, there are no arbitrary daily queues or upload limits.",
      ],
      [
        "Can I also compress the resulting PNG?",
        "Yes. OxiPNG and ImageQuant WebAssembly engines optimize your converted PNG automatically.",
      ],
    ],
  },
  "webp-to-jpg": {
    navLabel: "WebP to JPG",
    title: "WebP to JPG Converter Online",
    subtitle: "Convert WebP files from websites into universally compatible JPEGs.",
    pageTitle: "WebP to JPG Converter - Fast Local Batch Conversion | LiteFrame",
    summary:
      "Batch convert WebP images to standard JPG format in your browser. Powered by MozJPEG WebAssembly with no file uploads.",
    badge: "Preset: Output locked to JPEG",
    faq: [
      [
        "What happens to transparent areas when converting WebP to JPG?",
        "Since JPEG does not support transparency, transparent pixels are filled with a clean solid color (white by default, customizable in settings).",
      ],
      [
        "How is image quality controlled?",
        "MozJPEG encodes your JPG with optimal Huffman tables, and you can adjust the quality slider from 0.1 to 1.0.",
      ],
      [
        "Does this work offline?",
        "Once the page is loaded, the entire conversion pipeline runs locally without sending images over the internet.",
      ],
    ],
  },
  "png-to-webp": {
    navLabel: "PNG to WebP",
    title: "PNG to WebP Converter for Faster Websites",
    subtitle: "Shrink PNG assets by up to 70% while keeping transparency.",
    pageTitle: "PNG to WebP Converter - Optimize Web Images Locally | LiteFrame",
    summary:
      "Convert PNG to high-efficiency WebP format in bulk for Core Web Vitals and SEO. 100% client-side processing with transparency support.",
    badge: "Preset: Output locked to WebP",
    faq: [
      [
        "Why convert PNG to WebP for web development?",
        "WebP delivers 25% to 70% smaller file sizes than PNG while still supporting full alpha transparency, improving page load speed and Core Web Vitals.",
      ],
      [
        "Can I batch convert an entire UI icon folder?",
        "Yes. Use the 'Choose folder' button to import all PNGs at once and export them as a ZIP archive.",
      ],
      [
        "Are proprietary design assets kept confidential?",
        "Completely. Zero bytes of your images are ever transmitted to an external server.",
      ],
    ],
  },
  "compress-to-100kb": {
    navLabel: "Compress to 100KB",
    title: "Compress Image to 100KB Online",
    subtitle: "Automatically fit photos under 100KB for portals, visas, and forms.",
    pageTitle: "Compress Image to 100KB - Exact Target Size Tool | LiteFrame",
    summary:
      "Shrink JPEG, PNG, and WebP photos under 100KB (or 50KB/200KB) automatically in your browser. Ideal for visa applications, exams, and ID uploads.",
    badge: "Preset: Target size <= 100 KB",
    faq: [
      [
        "How does LiteFrame reach the 100KB target size?",
        "Our Web Worker runs a fast binary search over encoder quality levels to find the highest visual fidelity that fits strictly under your KB limit.",
      ],
      [
        "Is it safe to compress ID cards, passports, or application photos here?",
        "Yes. Unlike cloud tools that store your ID photos on remote servers, LiteFrame processes everything locally in your browser memory.",
      ],
      [
        "Can I change the target from 100KB to 50KB or 200KB?",
        "Yes. Open the Settings panel on the right to choose 50KB, 100KB, 200KB, or enter any custom KB cap.",
      ],
    ],
  },
  "batch-image-resizer": {
    navLabel: "Batch Image Resizer",
    title: "Batch Image Resizer & Aspect-Ratio Cropper",
    subtitle: "Resize by width, height, or paper presets for dozens of images at once.",
    pageTitle: "Batch Image Resizer - Resize & Crop Photos Locally | LiteFrame",
    summary:
      "Resize and crop multiple images by exact pixel dimensions, aspect ratios, or A4/Letter paper presets locally in your browser.",
    badge: "Preset: Resize & Crop panel active",
    faq: [
      [
        "Can I resize images by width while keeping the original aspect ratio?",
        "Yes. Select 'Fit width' or 'Fit height' and the other dimension scales proportionally without distortion.",
      ],
      [
        "Does it support vector SVG resizing?",
        "Yes. SVG dimensions and viewBox attributes are updated cleanly without rasterizing vector paths.",
      ],
      [
        "Are paper size presets like A4 supported?",
        "Yes. You can crop and fit images to A3, A4, A5, Letter, Legal, B4, and B5 in portrait or landscape orientation.",
      ],
    ],
  },
  "image-to-pdf": {
    navLabel: "Image to PDF",
    title: "Convert Images to PDF Locally (JPG/PNG/HEIC to PDF)",
    subtitle: "Combine receipts, scans, and photos into a single clean PDF without uploading.",
    pageTitle: "Image to PDF Converter - 100% Private Browser Tool | LiteFrame",
    summary:
      "Merge JPG, PNG, WebP, and HEIC images into a single PDF document directly in your browser. Zero server uploads for confidential scans and invoices.",
    badge: "PDF Studio: Local Image-to-PDF Engine",
    faq: [
      [
        "Are my invoices or ID scans uploaded when creating a PDF?",
        "Never. LiteFrame builds the PDF byte stream directly in your browser using pdf-lib. Nothing leaves your computer.",
      ],
      [
        "Which image formats can be combined into a PDF?",
        "You can add JPG, PNG, WebP, and even iPhone HEIC photos. They are normalized and embedded into standard PDF pages automatically.",
      ],
      [
        "Can I reorder images before exporting the PDF?",
        "Yes. You can arrange the imported files and generate a single merged PDF document with one click.",
      ],
    ],
  },
  "pdf-to-jpg": {
    navLabel: "PDF to JPG",
    title: "Convert PDF Pages to High-Res JPG Images",
    subtitle: "Extract every page of a PDF as crisp JPEG images locally.",
    pageTitle: "PDF to JPG Converter - Local Client-Side Extraction | LiteFrame",
    summary:
      "Render and export PDF pages to high-resolution JPG images in your browser. Fast, free, and 100% private with ZIP batch download.",
    badge: "PDF Studio: High-DPI Page Renderer",
    faq: [
      [
        "How does browser-based PDF to JPG conversion work?",
        "LiteFrame renders each PDF page onto an HTML5 Canvas at high DPI and encodes it into a clean JPEG without any server round-trip.",
      ],
      [
        "Can I download all pages as a single ZIP?",
        "Yes. Exported pages can be downloaded individually or packaged into a single ZIP file.",
      ],
      [
        "Are password-free confidential contracts safe to convert here?",
        "Yes, because 100% of the rendering happens inside your local browser tab.",
      ],
    ],
  },
  "merge-pdf": {
    navLabel: "Merge PDF",
    title: "Merge PDF Files Online (100% Local & Private)",
    subtitle: "Combine multiple PDF documents into one file instantaneously in your browser.",
    pageTitle: "Merge PDF - Combine PDFs Locally Without Uploading | LiteFrame",
    summary:
      "Combine multiple PDF files into a single document in seconds using client-side WebAssembly/JavaScript. Zero server uploads, complete privacy.",
    badge: "PDF Studio: Lossless PDF Merger",
    faq: [
      [
        "Why is local PDF merging faster than cloud PDF websites?",
        "Because your files don't need to be uploaded or downloaded over the network. Combining pages in memory takes only milliseconds.",
      ],
      [
        "Does merging reduce the quality of text or vector graphics in my PDF?",
        "No. Pages are copied losslessly at the PDF object tree level.",
      ],
      [
        "Is there any watermark added to the merged PDF?",
        "Never. LiteFrame is free, open-source, and never adds watermarks.",
      ],
    ],
  },
  "compress-pdf": {
    navLabel: "Compress PDF",
    title: "Compress PDF File Size Locally",
    subtitle: "Shrink oversized PDF documents in your browser without risking document privacy.",
    pageTitle: "Compress PDF Online - Private Client-Side PDF Optimizer | LiteFrame",
    summary:
      "Reduce PDF file size locally in your browser by optimizing embedded streams and page bitmaps. Safe for contracts, tax forms, and reports.",
    badge: "PDF Studio: Local Stream & Bitmap Optimizer",
    faq: [
      [
        "How does local PDF compression reduce file size?",
        "LiteFrame strips redundant metadata, compacts object streams, and re-optimizes heavy page content locally in your browser.",
      ],
      [
        "Are confidential legal or financial PDFs safe?",
        "Yes. Your PDF file stays strictly in your device's RAM and is never transmitted over the internet.",
      ],
      [
        "Can I choose the compression intensity?",
        "Yes. You can select balanced quality or maximum size reduction before exporting.",
      ],
    ],
  },
  "video-compressor": {
    navLabel: "Video Compressor",
    title: "Local Video Compressor (WebCodecs Hardware Accelerated)",
    subtitle: "Shrink MP4, WebM, and MOV videos right in your browser with zero uploads.",
    pageTitle: "Free Online Video Compressor - Fast Local WebCodecs Tool | LiteFrame",
    summary:
      "Compress MP4, MOV, and WebM videos locally in your browser using hardware-accelerated WebCodecs and Mediabunny. No 20MB Wasm downloads, no server uploads.",
    badge: "Video Studio: GPU WebCodecs Engine",
    faq: [
      [
        "Do I need to download a huge 25MB FFmpeg Wasm file to compress videos?",
        "No! LiteFrame uses the modern Mediabunny + WebCodecs architecture, leveraging your device's built-in hardware video encoder with only kilobytes of code.",
      ],
      [
        "Are my private videos uploaded to a cloud server?",
        "Never. Video transcoding and bitrate reduction happen 100% on your local device.",
      ],
      [
        "Which video formats and resolutions are supported?",
        "You can import MP4, MOV, and WebM files, scale resolution (1080p, 720p, 480p), and choose target bitrates or file size caps.",
      ],
    ],
  },
  "compress-video-for-discord": {
    navLabel: "Discord Video (<25MB)",
    title: "Compress Video for Discord (Under 10MB / 25MB)",
    subtitle: "Automatically fit gameplay clips and videos under Discord's attachment limit.",
    pageTitle: "Compress Video for Discord - Local 10MB/25MB Video Shrinker | LiteFrame",
    summary:
      "Shrink gaming clips and MP4/MOV videos under 10MB or 25MB for Discord and email attachments locally in your browser using hardware acceleration.",
    badge: "Preset: Target size <= 25 MB for Discord",
    faq: [
      [
        "How does it guarantee the video fits Discord's upload limit?",
        "LiteFrame calculates the exact video duration and dynamically allocates the target bitrate so the final MP4 stays safely below 10MB or 25MB.",
      ],
      [
        "Does it keep audio tracks intact?",
        "Yes, audio is preserved and encoded alongside the compressed video stream.",
      ],
      [
        "Why is this faster than online upload compressors?",
        "Uploading a 200MB gameplay clip to a remote server takes minutes. Local GPU WebCodecs transcoding starts at zero seconds with no upload wait.",
      ],
    ],
  },
};

const zhCNTools: Record<SupportedTool, ToolTemplate> = {
  "heic-to-jpg": {
    navLabel: "HEIC 转 JPG",
    title: "HEIC 转 JPG 在线转换器（免费、纯本地）",
    subtitle: "在浏览器内将苹果 iPhone 拍摄的 HEIC/HEIF 照片批量转为通用 JPG。",
    pageTitle: "HEIC转JPG在线工具 - 苹果图片批量转换无需上传 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地将 iPhone HEIC/HEIF 照片批量转换为 JPG 格式。基于 WebAssembly 本地解码，零服务器上传，100% 保护个人相册隐私。",
    badge: "已预设：自动导出为 JPEG",
    faq: [
      [
        "我的苹果手机照片会上传到服务器吗？",
        "绝不会。所有 HEIC 解码和 JPG 编码均通过 WebAssembly 在您的浏览器本地内存中完成，照片不会离开您的设备。",
      ],
      [
        "支持一次性批量转换几十张 HEIC 照片吗？",
        "支持。您可以直接拖入多张照片或整个文件夹，转换完成后一键打包为 ZIP 下载。",
      ],
      [
        "为什么进入此页面后默认选中了 JPEG？",
        "本专页已为您自动锁定输出格式为 JPEG，拖入 HEIC 图片即可直接开始转换，无需手动二次设置。",
      ],
    ],
  },
  "webp-to-png": {
    navLabel: "WebP 转 PNG",
    title: "WebP 转 PNG 无损转换工具",
    subtitle: "将网页保存的 WebP 图片批量转换为带透明通道的标准 PNG。",
    pageTitle: "WebP转PNG在线转换器 - 保留透明背景本地处理 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地将 WebP 图片批量转换为无损 PNG 格式，完整保留 Alpha 透明通道，无需上传文件，支持打包下载。",
    badge: "已预设：自动导出为 PNG",
    faq: [
      [
        "WebP 转成 PNG 后透明背景会保留吗？",
        "会完整保留。轻帧在解码 WebP 与编码 PNG 时会无损传递 Alpha 透明通道。",
      ],
      [
        "转换后的 PNG 文件太大怎么办？",
        "本站内置了 OxiPNG 与 ImageQuant 量化引擎，可在右侧参数栏调节颜色数量，在保持清晰度的同时大幅减小 PNG 体积。",
      ],
      [
        "是否有每日转换张数或文件大小限制？",
        "没有任何限制。因为计算完全消耗您本机的浏览器算力，无排队、无次数限制。",
      ],
    ],
  },
  "webp-to-jpg": {
    navLabel: "WebP 转 JPG",
    title: "WebP 转 JPG 在线批量转换",
    subtitle: "快速将不兼容的 WebP 素材转为所有软件通用的 JPG 格式。",
    pageTitle: "WebP转JPG在线转换 - 本地极速批量处理 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地批量将 WebP 转换为标准 JPG 图片。搭载 MozJPEG 算法引擎，无需上传服务器，即拖即转。",
    badge: "已预设：自动导出为 JPEG",
    faq: [
      [
        "如果原 WebP 图片有透明背景，转成 JPG 会变成什么颜色？",
        "由于 JPG 不支持透明通道，透明区域默认会自动填充为纯白色（您也可以在右侧设置中自定义填充颜色）。",
      ],
      [
        "如何控制导出 JPG 的清晰度？",
        "右侧面板支持 0.1 至 1.0 的画质滑块调节，默认 0.75 即可在肉眼无损下获得极小体积。",
      ],
      [
        "断网状态下可以使用吗？",
        "页面加载完成后，即使断开网络也可正常完成全部图片转换。",
      ],
    ],
  },
  "png-to-webp": {
    navLabel: "PNG 转 WebP",
    title: "PNG 转 WebP 高效网页图片优化",
    subtitle: "保留透明度的同时将 PNG 体积缩减高达 70%，显著提升网站加载速度。",
    pageTitle: "PNG转WebP在线工具 - 网站前端图片批量瘦身 | 轻帧 LiteFrame",
    summary:
      "将 PNG 批量转换为新一代 WebP 格式，保留透明通道并大幅降低文件体积，助力提升网站 Core Web Vitals 评分。",
    badge: "已预设：自动导出为 WebP",
    faq: [
      [
        "为什么网站开发推荐将 PNG 转为 WebP？",
        "WebP 同样支持透明背景，但体积通常比 PNG 小 25%～70%，能显著加快网页首屏 LCP 加载速度。",
      ],
      [
        "支持直接导入整个图标文件夹吗？",
        "支持。点击“选择文件夹”即可一次性导入全部 PNG 素材并批量转换导出。",
      ],
      [
        "公司内部设计稿在这里转换安全吗？",
        "100% 安全，所有转换均在本地浏览器沙箱内完成，绝不经过任何外部服务器。",
      ],
    ],
  },
  "compress-to-100kb": {
    navLabel: "图片压缩到 100KB",
    title: "在线将图片压缩到 100KB 以内（精准体积控制）",
    subtitle: "专为公考报名、签证申请、证件上传打造，自动搜寻小于 100KB 的最佳画质。",
    pageTitle: "图片压缩到100KB以内 - 证件照与报名照片精准瘦身 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地将 JPG、PNG、WebP 照片精准压缩到 100KB（或 50KB/200KB）以内。无需上传证件照，保护个人隐私。",
    badge: "已预设：目标体积上限 <= 100 KB",
    faq: [
      [
        "系统是如何保证压缩后一定小于 100KB 的？",
        "内置的智能体积控制算法会在后台自动采用二分法多轮测试编码质量，为您找出既严格小于 100KB、画质又最清晰的结果。",
      ],
      [
        "在这里压缩身份证、护照或报名证件照安全吗？",
        "极其安全。传统网站会把您的证件照上传到云端服务器，存在泄露风险；而轻帧 100% 在您本地浏览器内存中处理，绝不上传。",
      ],
      [
        "如果报名系统要求小于 50KB 或 200KB 可以改吗？",
        "可以！在右侧设置面板的“目标体积上限”中，您可以自由切换 50KB、100KB、200KB 或输入任意自定义 KB 数值。",
      ],
    ],
  },
  "batch-image-resizer": {
    navLabel: "批量修改图片尺寸",
    title: "在线批量修改图片尺寸与比例裁剪",
    subtitle: "按固定宽度、高度、长短边或 A4 纸张预设，一次性调整数十张图片分辨率。",
    pageTitle: "在线批量修改图片尺寸 - 像素缩放与比例裁剪工具 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地批量调整图片分辨率大小、按比例裁剪或适配 A4/Letter 纸张尺寸。支持 JPG、PNG、WebP、SVG，无需上传。",
    badge: "已预设：自动展开尺寸与裁剪面板",
    faq: [
      [
        "可以只固定宽度，让高度按原图比例自动缩放吗？",
        "可以。选择“固定宽度，高度自动缩放”模式，输入目标像素宽度即可等比缩放，绝不拉伸变形。",
      ],
      [
        "支持 SVG 矢量图无损改尺寸吗？",
        "支持。修改 SVG 尺寸或裁剪时会直接更新矢量属性与 viewBox，不会将其降级为位图。",
      ],
      [
        "支持按 A4 等打印纸张比例裁剪吗？",
        "支持。内置预设纸张裁剪模式，涵盖 A3、A4、A5、B4、B5 等多种规格及横纵向切换。",
      ],
    ],
  },
  "image-to-pdf": {
    navLabel: "图片转 PDF",
    title: "图片转 PDF 在线合成工具（纯本地零上传）",
    subtitle: "将多张发票、合同扫描件、JPG/PNG/HEIC 照片一键合并生成单份 PDF。",
    pageTitle: "图片转PDF在线工具 - 多图合成PDF不上传服务器 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地将多张 JPG、PNG、WebP、HEIC 图片排版合并为一个 PDF 文档。零服务器上传，最适合处理机密合同、发票与证件扫描件。",
    badge: "PDF 工作台：本地多图合成引擎",
    faq: [
      [
        "合成发票或合同时，文件会上传到云端吗？",
        "绝不上传。本功能基于开源库 pdf-lib 在您的浏览器本地直接组装 PDF 二进制流，完全离线安全。",
      ],
      [
        "支持哪些格式的图片合并为 PDF？",
        "支持 JPG、PNG、WebP 等主流格式，自动按图片比例嵌入生成高清 PDF 页面。",
      ],
      [
        "生成的 PDF 会有水印或页数限制吗？",
        "完全免费且无任何水印，页数仅受您设备内存大小限制。",
      ],
    ],
  },
  "pdf-to-jpg": {
    navLabel: "PDF 转图片",
    title: "PDF 转 JPG 高清图片提取工具",
    subtitle: "在浏览器本地将 PDF 文档的每一页渲染导出为高清 JPG 图片。",
    pageTitle: "PDF转JPG在线工具 - 纯本地提取高清图片 | 轻帧 LiteFrame",
    summary:
      "无需上传文件，在浏览器本地将 PDF 每一页高分辨率渲染为 JPG 图片，支持单张保存或一键打包 ZIP 下载。",
    badge: "PDF 工作台：高分辨率页面渲染器",
    faq: [
      [
        "PDF 转图片是怎么在浏览器本地实现的？",
        "轻帧利用本地 PDF 渲染引擎将每一页绘制到高倍率 HTML5 Canvas 上并导出为 JPG，全程无需服务端参与。",
      ],
      [
        "多页 PDF 转换后可以一次性下载吗？",
        "可以。转换完成后点击“打包下载全部”即可获取包含所有页码图片的 ZIP 压缩包。",
      ],
      [
        "导出的图片清晰度如何？",
        "默认采用 2 倍高清视网膜采样率渲染，文字与图表边缘依然锐利清晰。",
      ],
    ],
  },
  "merge-pdf": {
    navLabel: "PDF 合并",
    title: "在线合并 PDF 文件（毫秒级本地无损拼接）",
    subtitle: "将多份 PDF 文档在本地浏览器内无损合并为一份，机密文档绝不外泄。",
    pageTitle: "PDF合并在线工具 - 纯本地无损拼接多个PDF | 轻帧 LiteFrame",
    summary:
      "在浏览器本地快速将多个 PDF 文件合并为一个文档。无需上传与等待网络传输，无损保留矢量文字与排版。",
    badge: "PDF 工作台：无损文档拼接引擎",
    faq: [
      [
        "为什么本地合并 PDF 比普通在线网站快得多？",
        "因为省去了漫长的文件上传和下载过程，在本地内存中复制拼接 PDF 页面对象只需几十毫秒。",
      ],
      [
        "合并后 PDF 里的文字还可以复制和搜索吗？",
        "完全可以。这是底层页面对象树的无损合并，原有的矢量文字、书签与清晰度 100% 保持不变。",
      ],
      [
        "可以调整多个 PDF 文件的先后顺序吗？",
        "可以。在列表中可随时调整顺序或移除文件后再导出。",
      ],
    ],
  },
  "compress-pdf": {
    navLabel: "PDF 压缩",
    title: "PDF 在线压缩工具（本地瘦身、安全私密）",
    subtitle: "无需上传服务器，在浏览器内清理冗余流并重压缩内嵌大图，大幅缩减 PDF 体积。",
    pageTitle: "PDF压缩在线工具 - 本地减小PDF文件大小 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地压缩过大的 PDF 文件，精简文档对象流与高分辨率位图，安全处理标书、财报、论文与电子合同。",
    badge: "PDF 工作台：本地文档精简引擎",
    faq: [
      [
        "本地 PDF 压缩是如何减小体积的？",
        "通过清除 PDF 内部的冗余元数据、启用紧凑对象流（Object Streams）以及对高体积页面进行智能重采样来显著降低文件字节数。",
      ],
      [
        "公司标书或财务报表在这里压缩会泄密吗？",
        "绝不会。所有处理都在您自己的电脑浏览器内完成，没有任何网络上传行为。",
      ],
      [
        "支持多大的 PDF 文件？",
        "由于不经过服务器上传，只要您的浏览器内存充足，几十兆甚至上百兆的 PDF 均可直接处理。",
      ],
    ],
  },
  "video-compressor": {
    navLabel: "视频压缩",
    title: "在线视频压缩工具（WebCodecs 硬件加速、免上传）",
    subtitle: "基于开源 Mediabunny 与浏览器原生 GPU 硬件编码，秒开即压 MP4/MOV/WebM。",
    pageTitle: "在线视频压缩 - 纯本地WebCodecs极速压缩MP4 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地压缩 MP4、MOV、WebM 视频体积。采用 Mediabunny + WebCodecs 原生硬件加速，无需下载 20MB 插件，无需上传视频。",
    badge: "视频工作台：WebCodecs GPU 硬件加速引擎",
    faq: [
      [
        "为什么不需要像其它网站那样先下载 20 多兆的 FFmpeg 文件？",
        "轻帧采用了现代浏览器原生的 WebCodecs API 与轻量级开源库 Mediabunny（仅几 KB），直接调用您显卡的硬件编码器，秒开即用。",
      ],
      [
        "我的私人视频会上传到服务器吗？",
        "绝不会。从解码、缩放分辨率到重新编码导出 MP4，100% 在您本地设备上完成。",
      ],
      [
        "可以调整视频分辨率和压缩率吗？",
        "可以。支持保持原分辨率或缩放到 1080p / 720p，并提供高画质、均衡、极限瘦身多档码率选择。",
      ],
    ],
  },
  "compress-video-for-discord": {
    navLabel: "视频压至 25MB",
    title: "视频定额压缩（压至 10MB / 25MB 适配微信、Discord 与邮件）",
    subtitle: "根据视频时长自动计算最佳码率，确保导出的 MP4 严格小于目标 MB 限制。",
    pageTitle: "将视频压缩到25MB/10MB以内 - 适配Discord与邮件附件 | 轻帧 LiteFrame",
    summary:
      "在浏览器本地将游戏录屏、手机实拍视频精准压缩到 10MB 或 25MB 以内，轻松发送至 Discord、微信或电子邮箱附件。",
    badge: "已预设：目标体积上限 <= 25 MB",
    faq: [
      [
        "它是如何把视频精准控制在 25MB 或 10MB 以内的？",
        "系统会先读取视频总时长，根据您设定的目标 MB 数反推出视频流与音频流的最大允许比特率，再通过硬件编码器精准输出。",
      ],
      [
        "压缩后的视频还保留声音吗？",
        "保留。音频轨道会与压缩后的视频画面同步封装在导出的标准 MP4 文件中。",
      ],
      [
        "相比上传式网站有什么优势？",
        "几百兆的原视频无需花费几分钟上传和排队等待，本地直接调动显卡极速转码。",
      ],
    ],
  },
};

export function getToolSeoCopy(
  locale: string,
  tool: SupportedTool,
): ToolCopy {
  const resolvedLocale: SupportedLocale = isSupportedLocale(locale)
    ? locale
    : defaultLocale;
  const config = getToolConfig(tool);
  const dict =
    resolvedLocale === "zh-CN" || resolvedLocale === "zh-TW"
      ? zhCNTools
      : enTools;
  const item = dict[tool];
  return {
    slug: tool,
    category: config.category,
    ...item,
  };
}

export function getCategoryLabels(locale: string) {
  if (locale === "zh-CN") {
    return {
      image: "图片工具",
      pdf: "PDF 工具",
      video: "视频工具",
      allToolsTitle: "全能本地媒体工具矩阵",
      allToolsSub: "100% 浏览器本地运行 · 零服务器上传 · 极速隐私安全",
    };
  }
  if (locale === "zh-TW") {
    return {
      image: "圖片工具",
      pdf: "PDF 工具",
      video: "影片工具",
      allToolsTitle: "全能本地媒體工具矩陣",
      allToolsSub: "100% 瀏覽器本地運行 · 零伺服器上傳 · 極速隱私安全",
    };
  }
  return {
    image: "Image Tools",
    pdf: "PDF Tools",
    video: "Video Tools",
    allToolsTitle: "Local Media Toolkit Matrix",
    allToolsSub: "100% In-Browser Processing · Zero Server Uploads · Privacy First",
  };
}
