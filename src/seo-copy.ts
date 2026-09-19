import {
  defaultLocale,
  isSupportedLocale,
  type SupportedLocale,
} from "./locale-config";
import { seoSpecs, type SeoSpecs } from "./seo-specs";

export type SeoCopy = {
  title: string;
  subtitle: string;
  pageTitle: string;
  summary: string;
  faqTitle: string;
  privacyLink: string;
  faq: Array<[question: string, answer: string]>;
} & SeoSpecs;

export const seoBaseCopy: Record<SupportedLocale, Omit<SeoCopy, keyof SeoSpecs>> = {
  "en-US": {
    title: "Free Online Image Compressor & Converter",
    subtitle: "Image work. Made lighter.",
    pageTitle:
      "Free Online Image Compressor - Compress JPG, PNG, WebP & AVIF | LiteFrame",
    summary:
      "Batch compress, convert, resize and crop JPEG, PNG, WebP, AVIF and more locally in your browser. Free and open source, with no image uploads.",
    faqTitle: "Frequently Asked Questions",
    privacyLink: "Privacy policy",
    faq: [
      [
        "Are images uploaded to a server?",
        "No. Images are processed locally in your browser and are not uploaded for processing. The website loads application resources over the network; optional analytics only loads with your consent and does not receive your images.",
      ],
      [
        "Is LiteFrame free?",
        "Yes. LiteFrame is free and open source. You can process images without signing up.",
      ],
      [
        "Which input and output formats are supported?",
        "You can import JPEG, PNG, WebP, AVIF, GIF, SVG and HEIC/HEIF. Format conversion exports JPEG, PNG, WebP or AVIF. SVG stays in SVG format and is not converted to raster images. Import support does not mean every format supports same-format compression; unsupported animated AVIF/WebP processing preserves the original.",
      ],
      [
        "Can I compress multiple images at once?",
        "Yes. Add multiple images or a folder, apply batch settings, then download individual results or a ZIP archive.",
      ],
      [
        "How do I convert HEIC or HEIF images?",
        "Import your HEIC/HEIF images and explicitly select JPEG, PNG, WebP or AVIF as the output format. Without an output format, LiteFrame preserves the original HEIC/HEIF file. Your browser may not show a preview of the original.",
      ],
    ],
  },
  "zh-CN": {
    title: "免费在线图片压缩与格式转换工具",
    subtitle: "图片处理，轻一点。",
    pageTitle: "免费在线图片压缩与转换 - JPG、PNG、WebP、AVIF | 轻帧 LiteFrame",
    summary:
      "在浏览器本地批量压缩、转换、缩放和裁剪 JPEG、PNG、WebP、AVIF 等图片。免费开源，图片无需上传。",
    faqTitle: "常见问题",
    privacyLink: "隐私政策",
    faq: [
      [
        "图片会上传到服务器吗？",
        "不会。图片在浏览器本地处理，无需上传到服务器。网站会通过网络加载应用资源；可选的访问统计仅在你同意后加载，不会接收你的图片。",
      ],
      ["轻帧是免费的吗？", "是的。轻帧免费且开源，无需注册即可处理图片。"],
      [
        "支持哪些输入和输出格式？",
        "可以导入 JPEG、PNG、WebP、AVIF、GIF、SVG 和 HEIC/HEIF；格式转换可导出 JPEG、PNG、WebP 或 AVIF。SVG 保持矢量格式，不转换为位图。支持导入不代表每种格式都支持原格式压缩；不支持处理的动态 AVIF/WebP 会保留原文件。",
      ],
      [
        "可以同时压缩多张图片吗？",
        "可以。添加多张图片或整个文件夹，统一应用处理设置，再单独下载结果或打包为 ZIP 下载。",
      ],
      [
        "如何转换 HEIC 或 HEIF 图片？",
        "导入 HEIC/HEIF 图片后，请明确选择 JPEG、PNG、WebP 或 AVIF 作为输出格式。未选择输出格式时会保留原始 HEIC/HEIF 文件。浏览器可能无法预览原图。",
      ],
    ],
  },
  "zh-TW": {
    title: "免費線上圖片壓縮與格式轉換工具",
    subtitle: "圖片處理，輕一點。",
    pageTitle: "免費線上圖片壓縮與轉換 - JPG、PNG、WebP、AVIF | 輕幀 LiteFrame",
    summary:
      "在瀏覽器本機批次壓縮、轉換、縮放及裁剪 JPEG、PNG、WebP、AVIF 等圖片。免費開源，圖片無需上傳。",
    faqTitle: "常見問題",
    privacyLink: "隱私權政策",
    faq: [
      [
        "圖片會上傳至伺服器嗎？",
        "不會。圖片在瀏覽器本機處理，無需上傳至伺服器。網站會透過網路載入應用程式資源；選用的流量統計只會在你同意後載入，不會接收你的圖片。",
      ],
      ["輕幀是免費的嗎？", "是的。輕幀免費且開源，無需註冊即可處理圖片。"],
      [
        "支援哪些輸入和輸出格式？",
        "可以匯入 JPEG、PNG、WebP、AVIF、GIF、SVG 和 HEIC/HEIF；格式轉換可匯出 JPEG、PNG、WebP 或 AVIF。SVG 保持向量格式，不轉換為點陣圖。支援匯入不代表每種格式都支援原格式壓縮；不支援處理的動態 AVIF/WebP 會保留原始檔案。",
      ],
      [
        "可以同時壓縮多張圖片嗎？",
        "可以。新增多張圖片或整個資料夾，統一套用處理設定，再個別下載結果或打包為 ZIP 下載。",
      ],
      [
        "如何轉換 HEIC 或 HEIF 圖片？",
        "匯入 HEIC/HEIF 圖片後，請明確選擇 JPEG、PNG、WebP 或 AVIF 作為輸出格式。未選擇輸出格式時會保留原始 HEIC/HEIF 檔案。瀏覽器可能無法預覽原圖。",
      ],
    ],
  },
  "fr-FR": {
    title: "Compression et conversion d’images gratuites en ligne",
    subtitle: "Vos images, en plus léger.",
    pageTitle:
      "Compresser et convertir des images gratuitement - JPG, PNG, WebP, AVIF | LiteFrame",
    summary:
      "Compressez, convertissez, redimensionnez et recadrez vos images JPEG, PNG, WebP et AVIF par lots dans votre navigateur. Gratuit et open source, sans envoi d’images.",
    faqTitle: "Questions fréquentes",
    privacyLink: "Politique de confidentialité",
    faq: [
      [
        "Les images sont-elles envoyées à un serveur ?",
        "Non. Les images sont traitées localement dans votre navigateur, sans envoi pour traitement. Le site charge ses ressources via le réseau ; les statistiques facultatives ne sont activées qu’avec votre consentement et ne reçoivent pas vos images.",
      ],
      [
        "LiteFrame est-il gratuit ?",
        "Oui. LiteFrame est gratuit et open source. Aucune inscription n’est nécessaire.",
      ],
      [
        "Quels formats peut-on importer et exporter ?",
        "Importez des fichiers JPEG, PNG, WebP, AVIF, GIF, SVG et HEIC/HEIF. La conversion exporte en JPEG, PNG, WebP ou AVIF. Les SVG restent au format SVG, sans conversion en image matricielle. Un format importable n’est pas forcément compressible dans son format d’origine ; les AVIF/WebP animés non pris en charge sont conservés tels quels.",
      ],
      [
        "Peut-on compresser plusieurs images à la fois ?",
        "Oui. Ajoutez plusieurs images ou un dossier, appliquez les réglages au lot, puis téléchargez les résultats séparément ou dans une archive ZIP.",
      ],
      [
        "Comment convertir des images HEIC ou HEIF ?",
        "Importez vos images HEIC/HEIF et choisissez explicitement JPEG, PNG, WebP ou AVIF en sortie. Sans format de sortie, le fichier HEIC/HEIF original est conservé. Votre navigateur peut ne pas afficher l’aperçu de l’original.",
      ],
    ],
  },
  "es-ES": {
    title: "Compresor y conversor de imágenes gratis en línea",
    subtitle: "Tus imágenes, más ligeras.",
    pageTitle:
      "Comprimir y convertir imágenes gratis - JPG, PNG, WebP y AVIF | LiteFrame",
    summary:
      "Comprime, convierte, redimensiona y recorta imágenes JPEG, PNG, WebP y AVIF por lotes en tu navegador. Gratis y de código abierto, sin subir imágenes.",
    faqTitle: "Preguntas frecuentes",
    privacyLink: "Política de privacidad",
    faq: [
      [
        "¿Se suben las imágenes a un servidor?",
        "No. Las imágenes se procesan localmente en tu navegador y no se suben para su procesamiento. El sitio carga recursos a través de la red; las estadísticas opcionales solo se activan con tu consentimiento y no reciben tus imágenes.",
      ],
      [
        "¿LiteFrame es gratis?",
        "Sí. LiteFrame es gratis y de código abierto. No necesitas registrarte para procesar imágenes.",
      ],
      [
        "¿Qué formatos de entrada y salida se admiten?",
        "Puedes importar JPEG, PNG, WebP, AVIF, GIF, SVG y HEIC/HEIF. La conversión permite exportar JPEG, PNG, WebP o AVIF. Los SVG conservan su formato y no se convierten en imágenes de mapa de bits. Poder importar un formato no implica poder comprimirlo sin cambiarlo; los AVIF/WebP animados no compatibles se conservan intactos.",
      ],
      [
        "¿Puedo comprimir varias imágenes a la vez?",
        "Sí. Añade varias imágenes o una carpeta, aplica ajustes al lote y descarga los resultados por separado o en un archivo ZIP.",
      ],
      [
        "¿Cómo convierto imágenes HEIC o HEIF?",
        "Importa tus imágenes HEIC/HEIF y selecciona expresamente JPEG, PNG, WebP o AVIF como formato de salida. Sin formato de salida, se conserva el archivo HEIC/HEIF original. Es posible que tu navegador no muestre una vista previa del original.",
      ],
    ],
  },
  "tr-TR": {
    title: "Ücretsiz Çevrimiçi Görsel Sıkıştırıcı ve Dönüştürücü",
    subtitle: "Görselleriniz, daha hafif.",
    pageTitle:
      "Ücretsiz Görsel Sıkıştırma ve Dönüştürme - JPG, PNG, WebP, AVIF | LiteFrame",
    summary:
      "JPEG, PNG, WebP ve AVIF görsellerini tarayıcınızda topluca sıkıştırın, dönüştürün, boyutlandırın ve kırpın. Ücretsiz, açık kaynaklı; görseller yüklenmez.",
    faqTitle: "Sıkça Sorulan Sorular",
    privacyLink: "Gizlilik politikası",
    faq: [
      [
        "Görseller bir sunucuya yüklenir mi?",
        "Hayır. Görseller tarayıcınızda yerel olarak işlenir, işlem için sunucuya yüklenmez. Site, uygulama kaynaklarını ağ üzerinden yükler; isteğe bağlı analiz yalnızca onayınızla etkinleşir ve görsellerinizi almaz.",
      ],
      [
        "LiteFrame ücretsiz mi?",
        "Evet. LiteFrame ücretsiz ve açık kaynaklıdır. Görselleri işlemek için kayıt gerekmez.",
      ],
      [
        "Hangi giriş ve çıkış biçimleri destekleniyor?",
        "JPEG, PNG, WebP, AVIF, GIF, SVG ve HEIC/HEIF içe aktarılabilir. Dönüştürme çıktıları JPEG, PNG, WebP veya AVIF olabilir. SVG, SVG biçiminde kalır; raster görsele dönüştürülmez. İçe aktarma desteği, her biçimin aynı biçimde sıkıştırılabileceği anlamına gelmez; desteklenmeyen animasyonlu AVIF/WebP dosyalarının aslı korunur.",
      ],
      [
        "Birden fazla görseli aynı anda sıkıştırabilir miyim?",
        "Evet. Birden fazla görsel veya klasör ekleyin, toplu ayarları uygulayın, sonuçları tek tek ya da ZIP arşivi olarak indirin.",
      ],
      [
        "HEIC veya HEIF görsellerini nasıl dönüştürürüm?",
        "HEIC/HEIF görsellerini içe aktarın ve çıkış biçimi olarak JPEG, PNG, WebP veya AVIF seçin. Çıkış biçimi seçilmezse özgün HEIC/HEIF dosyası korunur. Tarayıcınız özgün görselin önizlemesini gösteremeyebilir.",
      ],
    ],
  },
  "ja-JP": {
    title: "無料オンライン画像圧縮・変換ツール",
    subtitle: "画像処理を、もっと軽やかに。",
    pageTitle:
      "無料オンライン画像圧縮・変換 - JPG・PNG・WebP・AVIF | LiteFrame",
    summary:
      "JPEG・PNG・WebP・AVIF などの画像をブラウザー内で一括圧縮・変換・サイズ変更・切り抜き。無料のオープンソースで、画像のアップロードは不要です。",
    faqTitle: "よくある質問",
    privacyLink: "プライバシーポリシー",
    faq: [
      [
        "画像はサーバーにアップロードされますか？",
        "いいえ。画像はブラウザー内で処理され、処理のためにアップロードされません。サイトの動作に必要なリソースはネットワークから読み込みます。任意のアクセス解析は同意した場合にのみ読み込まれ、画像は送信されません。",
      ],
      [
        "LiteFrame は無料ですか？",
        "はい。LiteFrame は無料のオープンソースです。登録せずに画像を処理できます。",
      ],
      [
        "どの入力・出力形式に対応していますか？",
        "JPEG、PNG、WebP、AVIF、GIF、SVG、HEIC/HEIF を読み込めます。形式変換の出力は JPEG、PNG、WebP、AVIF に対応しています。SVG は SVG のまま処理し、ラスター画像には変換しません。読み込み可能でも同じ形式で圧縮できるとは限りません。未対応のアニメーション AVIF/WebP は元のファイルを保持します。",
      ],
      [
        "複数の画像を一度に圧縮できますか？",
        "はい。複数の画像やフォルダーを追加し、一括で設定を適用できます。結果は個別または ZIP ファイルでダウンロードできます。",
      ],
      [
        "HEIC・HEIF 画像を変換するには？",
        "HEIC/HEIF 画像を読み込んで、出力形式に JPEG、PNG、WebP、AVIF のいずれかを選んでください。出力形式が未選択の場合、元の HEIC/HEIF ファイルを保持します。ブラウザーによっては元画像をプレビューできません。",
      ],
    ],
  },
  "ko-KR": {
    title: "무료 온라인 이미지 압축 및 변환 도구",
    subtitle: "이미지 작업을 더 가볍게.",
    pageTitle:
      "무료 온라인 이미지 압축 및 변환 - JPG, PNG, WebP, AVIF | LiteFrame",
    summary:
      "JPEG, PNG, WebP, AVIF 등의 이미지를 브라우저에서 일괄 압축, 변환, 크기 조절 및 자르기 하세요. 무료 오픈 소스이며 이미지 업로드가 필요 없습니다.",
    faqTitle: "자주 묻는 질문",
    privacyLink: "개인정보 처리방침",
    faq: [
      [
        "이미지가 서버에 업로드되나요?",
        "아니요. 이미지는 브라우저에서 로컬로 처리되며 처리를 위해 업로드되지 않습니다. 사이트는 네트워크로 앱 리소스를 불러옵니다. 선택적 방문 통계는 동의한 경우에만 로드되며 이미지를 수신하지 않습니다.",
      ],
      [
        "LiteFrame은 무료인가요?",
        "네. LiteFrame은 무료 오픈 소스입니다. 가입 없이 이미지를 처리할 수 있습니다.",
      ],
      [
        "어떤 입력 및 출력 형식을 지원하나요?",
        "JPEG, PNG, WebP, AVIF, GIF, SVG, HEIC/HEIF를 가져올 수 있습니다. 형식 변환 시 JPEG, PNG, WebP, AVIF로 내보낼 수 있습니다. SVG는 SVG 형식을 유지하며 래스터 이미지로 변환되지 않습니다. 가져오기 지원이 모든 형식의 원래 형식 압축을 뜻하지는 않습니다. 지원하지 않는 애니메이션 AVIF/WebP는 원본을 유지합니다.",
      ],
      [
        "여러 이미지를 한 번에 압축할 수 있나요?",
        "네. 이미지 여러 개나 폴더를 추가하고 일괄 설정을 적용한 뒤, 결과를 개별 파일이나 ZIP으로 다운로드할 수 있습니다.",
      ],
      [
        "HEIC 또는 HEIF 이미지는 어떻게 변환하나요?",
        "HEIC/HEIF 이미지를 가져온 뒤 출력 형식으로 JPEG, PNG, WebP, AVIF 중 하나를 선택하세요. 출력 형식을 선택하지 않으면 원본 HEIC/HEIF 파일이 유지됩니다. 브라우저에서 원본 미리보기를 표시하지 못할 수도 있습니다.",
      ],
    ],
  },
  "fa-IR": {
    title: "فشرده‌سازی و تبدیل رایگان تصویر آنلاین",
    subtitle: "کار با تصویر، سبک‌تر از همیشه.",
    pageTitle:
      "فشرده‌سازی و تبدیل رایگان تصویر - JPG، PNG، WebP و AVIF | LiteFrame",
    summary:
      "تصاویر JPEG، PNG، WebP و AVIF را به‌صورت گروهی در مرورگر فشرده، تبدیل، تغییر اندازه و برش دهید. رایگان و متن‌باز، بدون بارگذاری تصاویر.",
    faqTitle: "پرسش‌های متداول",
    privacyLink: "سیاست حفظ حریم خصوصی",
    faq: [
      [
        "آیا تصاویر به سرور فرستاده می‌شوند؟",
        "خیر. تصاویر در مرورگر شما پردازش می‌شوند و برای پردازش به سرور ارسال نمی‌شوند. سایت منابع برنامه را از شبکه دریافت می‌کند؛ آمارگیری اختیاری فقط با رضایت شما فعال می‌شود و تصاویر شما را دریافت نمی‌کند.",
      ],
      [
        "آیا LiteFrame رایگان است؟",
        "بله. LiteFrame رایگان و متن‌باز است. برای پردازش تصاویر نیازی به ثبت‌نام نیست.",
      ],
      [
        "چه قالب‌هایی برای ورودی و خروجی پشتیبانی می‌شوند؟",
        "می‌توانید JPEG، PNG، WebP، AVIF، GIF، SVG و HEIC/HEIF را وارد کنید. خروجی تبدیل قالب می‌تواند JPEG، PNG، WebP یا AVIF باشد. SVG در قالب SVG باقی می‌ماند و به تصویر پیکسلی تبدیل نمی‌شود. پشتیبانی از ورود یک قالب به معنی امکان فشرده‌سازی با همان قالب نیست؛ فایل‌های متحرک AVIF/WebP پشتیبانی‌نشده بدون تغییر حفظ می‌شوند.",
      ],
      [
        "آیا می‌توان چند تصویر را هم‌زمان فشرده کرد؟",
        "بله. چند تصویر یا یک پوشه اضافه کنید، تنظیمات گروهی را اعمال کنید و نتایج را جداگانه یا به‌صورت فایل ZIP دریافت کنید.",
      ],
      [
        "چگونه تصاویر HEIC یا HEIF را تبدیل کنم؟",
        "تصاویر HEIC/HEIF را وارد کنید و JPEG، PNG، WebP یا AVIF را به‌عنوان قالب خروجی انتخاب کنید. بدون انتخاب قالب خروجی، فایل اصلی HEIC/HEIF حفظ می‌شود. ممکن است مرورگر شما پیش‌نمایش تصویر اصلی را نمایش ندهد.",
      ],
    ],
  },
};

export const seoCopy: Record<SupportedLocale, SeoCopy> = Object.fromEntries(
  (Object.keys(seoBaseCopy) as SupportedLocale[]).map((locale) => [
    locale,
    { ...seoBaseCopy[locale], ...seoSpecs[locale] },
  ]),
) as Record<SupportedLocale, SeoCopy>;

export function getSeoCopy(locale?: string): SeoCopy {
  return seoCopy[locale && isSupportedLocale(locale) ? locale : defaultLocale];
}
