import type { SupportedLocale } from "./locale-config";

export type SeoSpecs = {
  specsNav: string;
  comparisonNav: string;
  faqNav: string;
  specsTitle: string;
  specsIntro: string;
  specsHeaders: [string, string, string, string, string, string];
  specs: Array<[format: string, input: string, output: string, engine: string, pipeline: string, alpha: string]>;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonHeaders: [string, string, string, string];
  comparison: Array<[dimension: string, liteframe: string, cloud: string, single: string]>;
};

export const seoSpecs: Record<SupportedLocale, SeoSpecs> = {
  "en-US": {
    "specsNav": "Specs",
    "comparisonNav": "Comparison",
    "faqNav": "FAQ",
    "specsTitle": "Format & Engine Specifications",
    "specsIntro": "Detailed technical specifications for supported image formats, client-side WebAssembly codecs, and processing pipelines.",
    "specsHeaders": [
      "Format",
      "Input",
      "Output",
      "Engine",
      "Local Pipeline",
      "Alpha Channel"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "Yes",
        "Yes",
        "MozJPEG (Wasm)",
        "Progressive scan, Trellis quantization, Extreme mode",
        "Fill background color"
      ],
      [
        "PNG",
        "Yes",
        "Yes",
        "OxiPNG & ImageQuant (Wasm)",
        "Palette reduction (2-256 colors), Floyd-Steinberg dithering",
        "Preserved"
      ],
      [
        "WebP",
        "Yes",
        "Yes",
        "Native & Web Worker",
        "Lossless and lossy encoding, quality control",
        "Preserved"
      ],
      [
        "AVIF",
        "Yes",
        "Yes",
        "Libavif (Wasm)",
        "Next-gen high-efficiency compression, speed/quality sliders",
        "Preserved"
      ],
      [
        "HEIC / HEIF",
        "Yes",
        "Convert to WebP/JPG/PNG/AVIF",
        "Canvas & heic-to (Wasm)",
        "Direct client decoding; no server upload",
        "Preserved on conversion"
      ],
      [
        "GIF",
        "Yes",
        "Yes",
        "GifWasmModule (Wasm)",
        "Multi-frame palette quantization, color reduction",
        "Indexed transparency"
      ],
      [
        "SVG",
        "Yes",
        "Yes",
        "SVGO",
        "Lossless vector minification and redundant XML cleanup",
        "Vector transparency"
      ]
    ],
    "comparisonTitle": "LiteFrame vs. Conventional Alternatives",
    "comparisonIntro": "How 100% on-device image processing compares to traditional cloud compressors and single-image tools.",
    "comparisonHeaders": [
      "Dimension",
      "LiteFrame (Local)",
      "Cloud Tools (e.g. TinyPNG)",
      "Single-Image Tools (e.g. Squoosh)"
    ],
    "comparison": [
      [
        "Data Privacy",
        "100% on-device; zero files uploaded",
        "Files uploaded to remote cloud servers",
        "On-device in a single tab"
      ],
      [
        "Batch Capacity",
        "Unlimited images & full folder structure",
        "Capped at 20 images per batch",
        "Single image only"
      ],
      [
        "File Size Limit",
        "Bounded only by device memory (100MB+)",
        "Capped at 5MB (Requires paid subscription)",
        "Large files may crash tab"
      ],
      [
        "Format Conversion",
        "7 formats (JPEG, PNG, WebP, AVIF, HEIC, GIF, SVG)",
        "Limited to 2-3 standard raster formats",
        "Broad formats, manual per-file adjustment"
      ],
      [
        "Pricing & License",
        "100% Free & Open Source (MIT)",
        "Freemium with recurring subscriptions",
        "Free & Open Source (Apache 2.0)"
      ],
      [
        "Visual Quality Check",
        "Interactive side-by-side split comparison",
        "Must download results to inspect quality",
        "Interactive split comparison"
      ]
    ]
  },
  "zh-CN": {
    "specsNav": "规格",
    "comparisonNav": "对比",
    "faqNav": "问答",
    "specsTitle": "格式与处理技术规格",
    "specsIntro": "透明公开支持的图片格式、底层 WebAssembly 算法引擎与本地处理管道。",
    "specsHeaders": [
      "格式",
      "输入支持",
      "输出转换",
      "算法引擎",
      "本地处理机制",
      "透明通道"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "支持",
        "支持",
        "MozJPEG (Wasm)",
        "渐进式扫描、网格量化与极限模式",
        "填充底色（不支持透明）"
      ],
      [
        "PNG",
        "支持",
        "支持",
        "OxiPNG 与 ImageQuant (Wasm)",
        "调色板颜色缩减（2-256色）、抖动优化",
        "完整保留透明通道"
      ],
      [
        "WebP",
        "支持",
        "支持",
        "浏览器原生与 Web Worker",
        "有损与无损高效压缩，质量可调",
        "完整保留透明通道"
      ],
      [
        "AVIF",
        "支持",
        "支持",
        "Libavif (Wasm)",
        "新一代超高压缩比编码器，速度与质量可调",
        "完整保留透明通道"
      ],
      [
        "HEIC / HEIF",
        "支持",
        "可转为 WebP/JPG/PNG/AVIF",
        "Canvas 与 heic-to (Wasm)",
        "浏览器本地直接解码转换，无需上传",
        "转换后保留透明度"
      ],
      [
        "GIF",
        "支持",
        "支持",
        "GifWasmModule (Wasm)",
        "多帧动图量化与调色板调优",
        "支持透明色彩索引"
      ],
      [
        "SVG",
        "支持",
        "支持",
        "SVGO",
        "矢量路径与 XML 冗余无损精简",
        "原生矢量透明"
      ]
    ],
    "comparisonTitle": "轻帧与传统图片压缩工具对比",
    "comparisonIntro": "了解端侧纯本地计算与传统云端压缩服务在隐私、限制与效率上的根本差异。",
    "comparisonHeaders": [
      "对比维度",
      "轻帧 LiteFrame (纯本地)",
      "传统云端工具 (如 TinyPNG)",
      "基础单图工具 (如 Squoosh)"
    ],
    "comparison": [
      [
        "数据与隐私",
        "100% 设备本地处理，零文件上传",
        "图片上传至远程第三方服务器",
        "浏览器本地处理"
      ],
      [
        "批量处理能力",
        "不限文件张数，支持拖拽与整个文件夹",
        "单批次通常限制 20 张以内",
        "仅支持单张手动处理"
      ],
      [
        "单图体积限制",
        "仅取决于设备可用内存（可达数百 MB）",
        "限制 5MB（超额需购买付费订阅）",
        "大图容易导致标签页崩溃"
      ],
      [
        "格式互转支持",
        "覆盖 7 种主流格式（含 HEIC、AVIF、SVG）",
        "通常仅支持 JPG/PNG/WebP 互转",
        "支持多种格式，但需逐张调参"
      ],
      [
        "费用与开源许可",
        "100% 免费且开源（MIT 协议）",
        "超出额度按月/年订阅收费",
        "免费且开源（Apache 2.0 协议）"
      ],
      [
        "处理效果预览",
        "双图拖拽分割线实时原图对比",
        "必须下载到本地后才能查看效果",
        "双图拖拽分割线对比"
      ]
    ]
  },
  "zh-TW": {
    "specsNav": "規格",
    "comparisonNav": "比較",
    "faqNav": "問答",
    "specsTitle": "格式與處理技術規格",
    "specsIntro": "透明公開支援的圖片格式、底層 WebAssembly 演算法引擎與本機處理管道。",
    "specsHeaders": [
      "格式",
      "輸入支援",
      "輸出轉換",
      "演算法引擎",
      "本機處理機制",
      "透明通道"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "支援",
        "支援",
        "MozJPEG (Wasm)",
        "漸進式掃描、網格量化與極限模式",
        "填補底色（不支援透明）"
      ],
      [
        "PNG",
        "支援",
        "支援",
        "OxiPNG 與 ImageQuant (Wasm)",
        "調色盤顏色縮減（2-256色）、抖動最佳化",
        "完整保留透明通道"
      ],
      [
        "WebP",
        "支援",
        "支援",
        "瀏覽器原生與 Web Worker",
        "有損與無損高效壓縮，品質可調",
        "完整保留透明通道"
      ],
      [
        "AVIF",
        "支援",
        "支援",
        "Libavif (Wasm)",
        "新一代超高壓縮比編碼器，速度與品質可調",
        "完整保留透明通道"
      ],
      [
        "HEIC / HEIF",
        "支援",
        "可轉為 WebP/JPG/PNG/AVIF",
        "Canvas 與 heic-to (Wasm)",
        "瀏覽器本機直接解碼轉換，無需上傳",
        "轉換後保留透明度"
      ],
      [
        "GIF",
        "支援",
        "支援",
        "GifWasmModule (Wasm)",
        "多幀動圖量化與調色盤調優",
        "支援透明色彩索引"
      ],
      [
        "SVG",
        "支援",
        "支援",
        "SVGO",
        "向量路徑與 XML 冗餘無損精簡",
        "原生向量透明"
      ]
    ],
    "comparisonTitle": "輕幀與傳統圖片壓縮工具比較",
    "comparisonIntro": "瞭解裝置端純本機運算與傳統雲端壓縮服務在隱私、限制與效率上的根本差異。",
    "comparisonHeaders": [
      "比較維度",
      "輕幀 LiteFrame (純本機)",
      "傳統雲端工具 (如 TinyPNG)",
      "基礎單圖工具 (如 Squoosh)"
    ],
    "comparison": [
      [
        "資料與隱私",
        "100% 裝置本機處理，零檔案上傳",
        "圖片上傳至遠端第三方伺服器",
        "瀏覽器本機處理"
      ],
      [
        "批次處理能力",
        "不限檔案張數，支援拖曳與整個資料夾",
        "單批次通常限制 20 張以內",
        "僅支援單張手動處理"
      ],
      [
        "單圖體積限制",
        "僅取決於裝置可用記憶體（可達數百 MB）",
        "限制 5MB（超額需購買付費訂閱）",
        "大圖容易導致標籤頁崩潰"
      ],
      [
        "格式互轉支援",
        "涵蓋 7 種主流格式（含 HEIC、AVIF、SVG）",
        "通常僅支援 JPG/PNG/WebP 互轉",
        "支援多種格式，但需逐張調參"
      ],
      [
        "費用與開源授權",
        "100% 免費且開源（MIT 授權）",
        "超出額度按月/年訂閱收費",
        "免費且開源（Apache 2.0 授權）"
      ],
      [
        "處理效果預覽",
        "雙圖拖曳分割線即時原圖比較",
        "必須下載到本機後才能檢視效果",
        "雙圖拖曳分割線比較"
      ]
    ]
  },
  "fr-FR": {
    "specsNav": "Spécifications",
    "comparisonNav": "Comparatif",
    "faqNav": "FAQ",
    "specsTitle": "Spécifications des formats et moteurs",
    "specsIntro": "Détails techniques sur les formats pris en charge, les encodeurs WebAssembly et le traitement local côté client.",
    "specsHeaders": [
      "Format",
      "Import",
      "Export",
      "Moteur",
      "Traitement local",
      "Canal alpha"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "Oui",
        "Oui",
        "MozJPEG (Wasm)",
        "Balayage progressif, quantification Trellis, mode extrême",
        "Remplissage couleur du fond"
      ],
      [
        "PNG",
        "Oui",
        "Oui",
        "OxiPNG & ImageQuant (Wasm)",
        "Réduction de palette (2-256 couleurs), tramage Floyd-Steinberg",
        "Conservé"
      ],
      [
        "WebP",
        "Oui",
        "Oui",
        "Natif & Web Worker",
        "Compression avec ou sans perte, contrôle de qualité",
        "Conservé"
      ],
      [
        "AVIF",
        "Oui",
        "Oui",
        "Libavif (Wasm)",
        "Compression nouvelle génération ultra-efficace",
        "Conservé"
      ],
      [
        "HEIC / HEIF",
        "Oui",
        "Convertir en WebP/JPG/PNG/AVIF",
        "Canvas & heic-to (Wasm)",
        "Décodage local direct sans envoi",
        "Conservé si converti"
      ],
      [
        "GIF",
        "Oui",
        "Oui",
        "GifWasmModule (Wasm)",
        "Quantification multi-images, réglage de palette",
        "Transparence indexée"
      ],
      [
        "SVG",
        "Oui",
        "Oui",
        "SVGO",
        "Nettoyage vectoriel sans perte et minification XML",
        "Transparence vectorielle"
      ]
    ],
    "comparisonTitle": "LiteFrame comparé aux alternatives courantes",
    "comparisonIntro": "Pourquoi le traitement d'images local sur l'appareil change la donne en matière de confidentialité et de limites.",
    "comparisonHeaders": [
      "Critère",
      "LiteFrame (Local)",
      "Outils cloud (ex. TinyPNG)",
      "Outils mono-image (ex. Squoosh)"
    ],
    "comparison": [
      [
        "Confidentialité",
        "100 % sur l'appareil ; aucun fichier envoyé",
        "Fichiers envoyés à des serveurs tiers",
        "Sur l'appareil dans un seul onglet"
      ],
      [
        "Traitement par lot",
        "Images et dossiers illimités",
        "Limité à 20 images par lot",
        "Une seule image à la fois"
      ],
      [
        "Taille de fichier",
        "Limitée uniquement par la RAM de l'appareil",
        "Limitée à 5 Mo (Abonnement payant requis)",
        "Les gros fichiers peuvent faire planter l'onglet"
      ],
      [
        "Conversion de format",
        "7 formats (JPEG, PNG, WebP, AVIF, HEIC, GIF, SVG)",
        "Limité à 2 ou 3 formats matriciels",
        "Large choix mais réglage manuel par image"
      ],
      [
        "Tarif et licence",
        "100 % gratuit et open source (MIT)",
        "Freemium avec abonnement récurrent",
        "Gratuit et open source (Apache 2.0)"
      ],
      [
        "Aperçu comparatif",
        "Curseur interactif de comparaison avant/après",
        "Téléchargement requis pour vérifier le résultat",
        "Curseur de comparaison avant/après"
      ]
    ]
  },
  "es-ES": {
    "specsNav": "Especificaciones",
    "comparisonNav": "Comparativa",
    "faqNav": "FAQ",
    "specsTitle": "Especificaciones de formatos y motores",
    "specsIntro": "Detalles técnicos de los formatos admitidos, códecs WebAssembly y procesamiento en el navegador.",
    "specsHeaders": [
      "Formato",
      "Entrada",
      "Salida",
      "Motor",
      "Procesamiento local",
      "Canal alfa"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "Sí",
        "Sí",
        "MozJPEG (Wasm)",
        "Escaneo progresivo, cuantificación Trellis, modo extremo",
        "Relleno de color de fondo"
      ],
      [
        "PNG",
        "Sí",
        "Sí",
        "OxiPNG e ImageQuant (Wasm)",
        "Reducción de paleta (2-256 colores), tramado Floyd-Steinberg",
        "Conservado"
      ],
      [
        "WebP",
        "Sí",
        "Sí",
        "Nativo y Web Worker",
        "Compresión con o sin pérdidas, control de calidad",
        "Conservado"
      ],
      [
        "AVIF",
        "Sí",
        "Sí",
        "Libavif (Wasm)",
        "Compresión de última generación de alta eficiencia",
        "Conservado"
      ],
      [
        "HEIC / HEIF",
        "Sí",
        "Convertir a WebP/JPG/PNG/AVIF",
        "Canvas y heic-to (Wasm)",
        "Descodificación local directa sin subida",
        "Conservado al convertir"
      ],
      [
        "GIF",
        "Sí",
        "Sí",
        "GifWasmModule (Wasm)",
        "Cuantificación de fotogramas y ajuste de paleta",
        "Transparencia indexada"
      ],
      [
        "SVG",
        "Sí",
        "Sí",
        "SVGO",
        "Minificación vectorial sin pérdidas y limpieza XML",
        "Transparencia vectorial"
      ]
    ],
    "comparisonTitle": "LiteFrame frente a alternativas convencionales",
    "comparisonIntro": "Descubre por qué el procesamiento local en el dispositivo marca la diferencia en privacidad y límites.",
    "comparisonHeaders": [
      "Dimensión",
      "LiteFrame (Local)",
      "Herramientas en la nube (ej. TinyPNG)",
      "Herramientas mono-imagen (ej. Squoosh)"
    ],
    "comparison": [
      [
        "Privacidad de datos",
        "100 % en el dispositivo; cero subidas",
        "Archivos subidos a servidores remotos",
        "En el dispositivo en una pestaña"
      ],
      [
        "Capacidad por lotes",
        "Sin límite de imágenes y carpetas completas",
        "Máximo 20 imágenes por lote",
        "Solo una imagen a la vez"
      ],
      [
        "Límite de tamaño",
        "Limitado únicamente por la memoria RAM local",
        "Máximo 5 MB (Requiere suscripción)",
        "Archivos grandes pueden cerrar la pestaña"
      ],
      [
        "Conversión de formato",
        "7 formatos (JPEG, PNG, WebP, AVIF, HEIC, GIF, SVG)",
        "Limitado a 2 o 3 formatos estándar",
        "Amplio soporte pero ajuste manual por archivo"
      ],
      [
        "Precio y licencia",
        "100 % gratuito y código abierto (MIT)",
        "Freemium con suscripciones de pago",
        "Gratuito y código abierto (Apache 2.0)"
      ],
      [
        "Comparación visual",
        "Deslizador interactivo de comparación lado a lado",
        "Descarga obligatoria para comprobar calidad",
        "Deslizador de comparación interactivo"
      ]
    ]
  },
  "tr-TR": {
    "specsNav": "Özellikler",
    "comparisonNav": "Karşılaştırma",
    "faqNav": "SSS",
    "specsTitle": "Biçim ve Motor Özellikleri",
    "specsIntro": "Desteklenen görsel biçimleri, WebAssembly kodlayıcıları ve tarayıcı içi işleme yeteneklerinin ayrıntıları.",
    "specsHeaders": [
      "Biçim",
      "Giriş",
      "Çıkış",
      "Motor",
      "Yerel İşleme",
      "Alfa Kanalı"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "Evet",
        "Evet",
        "MozJPEG (Wasm)",
        "Kademeli tarama, Trellis niceleme, aşırı mod",
        "Arka plan dolgusu"
      ],
      [
        "PNG",
        "Evet",
        "Evet",
        "OxiPNG & ImageQuant (Wasm)",
        "Palet daraltma (2-256 renk), Floyd-Steinberg renk taklidi",
        "Korunur"
      ],
      [
        "WebP",
        "Evet",
        "Evet",
        "Yerel & Web Worker",
        "Kayıplı ve kayıpsız sıkıştırma, kalite kontrolü",
        "Korunur"
      ],
      [
        "AVIF",
        "Evet",
        "Evet",
        "Libavif (Wasm)",
        "Yeni nesil yüksek verimli sıkıştırma",
        "Korunur"
      ],
      [
        "HEIC / HEIF",
        "Evet",
        "WebP/JPG/PNG/AVIF dönüştürme",
        "Canvas & heic-to (Wasm)",
        "Yükleme olmadan doğrudan yerel kod çözme",
        "Dönüştürmede korunur"
      ],
      [
        "GIF",
        "Evet",
        "Evet",
        "GifWasmModule (Wasm)",
        "Çok kareli palet optimizasyonu",
        "İndeksli şeffaflık"
      ],
      [
        "SVG",
        "Evet",
        "Evet",
        "SVGO",
        "Kayıpsız vektör temizliği ve XML küçültme",
        "Vektörel şeffaflık"
      ]
    ],
    "comparisonTitle": "LiteFrame ve Geleneksel Araç Karşılaştırması",
    "comparisonIntro": "Cihaz üzerinde yerel işlemenin gizlilik, sınırlar ve hız açısından neden üstün olduğunu görün.",
    "comparisonHeaders": [
      "Ölçüt",
      "LiteFrame (Yerel)",
      "Bulut Araçları (örn. TinyPNG)",
      "Tek Görsel Araçları (örn. Squoosh)"
    ],
    "comparison": [
      [
        "Veri Gizliliği",
        "%100 cihaz üzerinde; sıfır yükleme",
        "Dosyalar uzak sunuculara yüklenir",
        "Tek bir sekmede cihaz üzerinde"
      ],
      [
        "Toplu İşlem",
        "Sınırsız görsel ve klasör yükleme",
        "Grup başına 20 görsel sınırı",
        "Yalnızca tek görsel"
      ],
      [
        "Boyut Sınırı",
        "Yalnızca cihaz RAM'i ile sınırlı (100MB+)",
        "Dosya başına 5MB sınırı (Ücretli plan gerekir)",
        "Büyük dosyalar sekmeyi çökertebilir"
      ],
      [
        "Biçim Dönüşümü",
        "7 biçim (JPEG, PNG, WebP, AVIF, HEIC, GIF, SVG)",
        "2-3 standart biçimle sınırlı",
        "Geniş destek ancak tek tek ayar gerektirir"
      ],
      [
        "Fiyat ve Lisans",
        "%100 Ücretsiz ve Açık Kaynak (MIT)",
        "Abonelikli ücretli model",
        "Ücretsiz ve Açık Kaynak (Apache 2.0)"
      ],
      [
        "Görsel Karşılaştırma",
        "Etkileşimli bölünmüş karşılaştırma kaydırıcısı",
        "Sonucu görmek için önce indirmek gerekir",
        "Bölünmüş karşılaştırma kaydırıcısı"
      ]
    ]
  },
  "ja-JP": {
    "specsNav": "仕様",
    "comparisonNav": "比較",
    "faqNav": "FAQ",
    "specsTitle": "対応フォーマットと技術仕様",
    "specsIntro": "対応画像形式、WebAssembly エンジン、ブラウザ内ローカル処理パイプラインの詳細仕様。",
    "specsHeaders": [
      "形式",
      "入力",
      "出力",
      "エンジン",
      "ローカル処理パイプライン",
      "アルファ透過"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "対応",
        "対応",
        "MozJPEG (Wasm)",
        "プログレッシブスキャン、トレリス量子化、極限モード",
        "背景色塗りつぶし"
      ],
      [
        "PNG",
        "対応",
        "対応",
        "OxiPNG & ImageQuant (Wasm)",
        "パレット減色（2-256色）、フロイド・スタインバーグ誤差拡散",
        "透過保持"
      ],
      [
        "WebP",
        "対応",
        "対応",
        "ネイティブ & Web Worker",
        "可逆・非可逆圧縮、画質設定",
        "透過保持"
      ],
      [
        "AVIF",
        "対応",
        "対応",
        "Libavif (Wasm)",
        "次世代高効率圧縮、速度・品質調整",
        "透過保持"
      ],
      [
        "HEIC / HEIF",
        "対応",
        "WebP/JPG/PNG/AVIFへ変換",
        "Canvas & heic-to (Wasm)",
        "サーバー送信なしで直接ブラウザ内デコード",
        "変換時透過保持"
      ],
      [
        "GIF",
        "対応",
        "対応",
        "GifWasmModule (Wasm)",
        "マルチフレーム量子化、パレット最適化",
        "インデックス透過"
      ],
      [
        "SVG",
        "対応",
        "対応",
        "SVGO",
        "無劣化ベクター最適化、不要XMLコード削除",
        "ベクター透過"
      ]
    ],
    "comparisonTitle": "LiteFrame と従来の画像圧縮ツールの比較",
    "comparisonIntro": "完全端末内ローカル処理がもたらすプライバシー、枚数制限、スピードの違いをご確認ください。",
    "comparisonHeaders": [
      "比較項目",
      "LiteFrame (ローカル)",
      "クラウド型ツール (例: TinyPNG)",
      "単一画像ツール (例: Squoosh)"
    ],
    "comparison": [
      [
        "プライバシー",
        "100% 端末内処理・外部アップロードなし",
        "外部サーバーへファイルをアップロード",
        "ブラウザ内（1タブのみ）"
      ],
      [
        "一括処理能力",
        "枚数制限なし・フォルダ丸ごとドラッグ対応",
        "1回あたり20枚までの制限",
        "1枚ずつの手動処理のみ"
      ],
      [
        "ファイル容量制限",
        "端末の空きメモリにのみ依存（100MB超も可能）",
        "1枚あたり5MB制限（有料プランが必要）",
        "巨大ファイルはタブがクラッシュしやすい"
      ],
      [
        "フォーマット変換",
        "7形式対応（JPEG/PNG/WebP/AVIF/HEIC/GIF/SVG）",
        "2〜3種類の標準形式に限定",
        "多彩な形式に対応も1枚ずつ設定が必要"
      ],
      [
        "料金とライセンス",
        "完全無料・オープンソース（MITライセンス）",
        "一定枚数以上は月額・年額課金",
        "無料・オープンソース（Apache 2.0）"
      ],
      [
        "圧縮効果の比較",
        "左右スプリットスライダーで元画像と直接比較",
        "ダウンロードしないと画質確認不可",
        "左右スプリットスライダーで比較"
      ]
    ]
  },
  "ko-KR": {
    "specsNav": "사양",
    "comparisonNav": "비교",
    "faqNav": "FAQ",
    "specsTitle": "형식 및 엔진 기술 사양",
    "specsIntro": "지원 이미지 형식, WebAssembly 코덱 엔진 및 브라우저 로컬 처리 파이프라인의 상세 사양.",
    "specsHeaders": [
      "형식",
      "입력",
      "출력",
      "엔진",
      "로컬 파이프라인",
      "알파 채널(투명도)"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "지원",
        "지원",
        "MozJPEG (Wasm)",
        "프로그레시브 스캔, 트렐리스 양자화, 극한 모드",
        "배경색 채우기"
      ],
      [
        "PNG",
        "지원",
        "지원",
        "OxiPNG & ImageQuant (Wasm)",
        "팔레트 색상 감소 (2-256색), 디더링 최적화",
        "투명도 유지"
      ],
      [
        "WebP",
        "지원",
        "지원",
        "브라우저 네이티브 & Web Worker",
        "손실 및 무손실 압축, 품질 조절",
        "투명도 유지"
      ],
      [
        "AVIF",
        "지원",
        "지원",
        "Libavif (Wasm)",
        "차세대 초고효율 압축 엔진",
        "투명도 유지"
      ],
      [
        "HEIC / HEIF",
        "지원",
        "WebP/JPG/PNG/AVIF로 변환",
        "Canvas & heic-to (Wasm)",
        "업로드 없이 브라우저에서 직접 디코딩",
        "변환 시 투명도 유지"
      ],
      [
        "GIF",
        "지원",
        "지원",
        "GifWasmModule (Wasm)",
        "다중 프레임 양자화 및 팔레트 최적화",
        "색상 색인 투명도"
      ],
      [
        "SVG",
        "지원",
        "지원",
        "SVGO",
        "무손실 벡터 코드 정리 및 메타데이터 제거",
        "벡터 투명도"
      ]
    ],
    "comparisonTitle": "LiteFrame과 기존 도구 비교",
    "comparisonIntro": "브라우저 로컬 직접 처리가 개인정보 보호, 작업 제한, 속도 면에서 제공하는 차별성을 확인하세요.",
    "comparisonHeaders": [
      "비교 항목",
      "LiteFrame (로컬)",
      "클라우드 도구 (예: TinyPNG)",
      "단일 이미지 도구 (예: Squoosh)"
    ],
    "comparison": [
      [
        "데이터 개인정보",
        "100% 기기 로컬 처리, 파일 업로드 없음",
        "외부 원격 서버로 파일 업로드",
        "단일 탭 로컬 처리"
      ],
      [
        "일괄 처리 용량",
        "파일 수 무제한 및 폴더 드래그 지원",
        "1회당 20장 제한",
        "한 번에 1장만 처리"
      ],
      [
        "파일 크기 제한",
        "기기 여유 메모리에만 제한됨 (100MB+ 가능)",
        "파일당 5MB 제한 (유료 구독 필요)",
        "대용량 파일 처리 시 탭 다운 가능"
      ],
      [
        "포맷 변환 지원",
        "7가지 주요 형식 지원 (HEIC/AVIF/SVG 포함)",
        "2~3가지 기본 래스터 형식에 국한",
        "다양한 형식 지원하나 장당 수동 조작"
      ],
      [
        "가격 및 라이선스",
        "100% 완전 무료 오픈소스 (MIT)",
        "초과 사용 시 유료 정기 구독",
        "무료 오픈소스 (Apache 2.0)"
      ],
      [
        "시각적 비교 확인",
        "분할 비교 슬라이더로 원본과 실시간 비교",
        "다운로드 후 직접 열어봐야 확인 가능",
        "분할 비교 슬라이더 제공"
      ]
    ]
  },
  "fa-IR": {
    "specsNav": "مشخصات",
    "comparisonNav": "مقایسه",
    "faqNav": "سوالات",
    "specsTitle": "مشخصات فنی فرمت‌ها و موتورهای پردازش",
    "specsIntro": "جزئیات فنی فرمت‌های پشتیبانی‌شده، موتورهای کدک WebAssembly و پردازش محلی مرورگر.",
    "specsHeaders": [
      "فرمت",
      "ورودی",
      "خروجی",
      "موتور پردازش",
      "فرایند پردازش محلی",
      "کانال آلفا (شفافیت)"
    ],
    "specs": [
      [
        "JPEG / JPG",
        "بله",
        "بله",
        "MozJPEG (Wasm)",
        "پویش تدریجی، کوانتیزاسیون ترلیس، حالت حداکثری",
        "پر کردن رنگ پس‌زمینه"
      ],
      [
        "PNG",
        "بله",
        "بله",
        "OxiPNG & ImageQuant (Wasm)",
        "کاهش پالت رنگ (۲-۲۵۶ رنگ)، دیترینگ فلوید-اشتاینبرگ",
        "حفظ می‌شود"
      ],
      [
        "WebP",
        "بله",
        "بله",
        "Native & Web Worker",
        "فشرده‌سازی با اتلاف و بدون اتلاف، کنترل کیفیت",
        "حفظ می‌شود"
      ],
      [
        "AVIF",
        "بله",
        "بله",
        "Libavif (Wasm)",
        "فشرده‌سازی نسل جدید فوق‌العاده بهینه",
        "حفظ می‌شود"
      ],
      [
        "HEIC / HEIF",
        "بله",
        "تبدیل به WebP/JPG/PNG/AVIF",
        "Canvas & heic-to (Wasm)",
        "رمزگشایی مستقیم در مرورگر بدون بارگذاری",
        "در صورت تبدیل حفظ می‌شود"
      ],
      [
        "GIF",
        "بله",
        "بله",
        "GifWasmModule (Wasm)",
        "کوانتیزاسیون چندفریمی و بهینه‌سازی پالت",
        "شفافیت ایندکس‌شده"
      ],
      [
        "SVG",
        "بله",
        "بله",
        "SVGO",
        "بهینه‌سازی برداری بدون افت و پاک‌سازی کدهای زائد",
        "شفافیت برداری"
      ]
    ],
    "comparisonTitle": "مقایسه LiteFrame با جایگزین‌های سنتی",
    "comparisonIntro": "تفاوت‌های بنیادین پردازش کاملاً محلی در دستگاه با سرویس‌های ابری از نظر حریم خصوصی و محدودیت‌ها.",
    "comparisonHeaders": [
      "معیار",
      "LiteFrame (محلی)",
      "ابزارهای ابری (مانند TinyPNG)",
      "ابزارهای تک‌تصویر (مانند Squoosh)"
    ],
    "comparison": [
      [
        "حریم خصوصی داده‌ها",
        "۱۰۰٪ روی دستگاه؛ بدون ارسال فایل",
        "فایل‌ها به سرورهای راه دور ارسال می‌شوند",
        "روی دستگاه در یک زبانه"
      ],
      [
        "ظرفیت پردازش گروهی",
        "بدون محدودیت تعداد و امکان کشیدن پوشه",
        "محدود به حداکثر ۲۰ تصویر در هر بار",
        "فقط یک تصویر در هر بار"
      ],
      [
        "محدودیت حجم فایل",
        "فقط وابسته به حافظه دستگاه (۱۰۰MB+)",
        "محدود به ۵MB (نیازمند اشتراک پولی)",
        "فایل‌های بزرگ ممکن است باعث بسته شدن زبانه شوند"
      ],
      [
        "پشتیبانی از تبدیل فرمت",
        "۷ فرمت اصلی (شامل HEIC، AVIF و SVG)",
        "محدود به ۲ تا ۳ فرمت متداول",
        "پشتیبانی وسیع اما نیازمند تنظیم دستی هر فایل"
      ],
      [
        "قیمت و مجوز",
        "۱۰۰٪ رایگان و متن‌باز (MIT)",
        "رایگان محدود با اشتراک پولی دوره‌ای",
        "رایگان و متن‌باز (Apache 2.0)"
      ],
      [
        "پیش‌نمایش مقایسه‌ای",
        "اسلایدر مقایسه دونیمه زنده با تصویر اصلی",
        "نیازمند دانلود برای بررسی کیفیت نتیجه",
        "اسلایدر مقایسه دونیمه زنده"
      ]
    ]
  }
};
