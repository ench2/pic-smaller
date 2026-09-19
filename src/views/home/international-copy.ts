import type { HomeCopy } from "./copy";

// Complete landing-page translations; tool-specific strings remain in src/locales.
export const internationalCopy = {
  "fr-FR": {
    nav: ["Fonctionnalités", "Confidentialité"],
    tagline: "Des images plus légères, votre vision intacte.",
    proof: ["Sans inscription", "Traitement local", "Gratuit et open source"],
    workspace: "Espace images",
    settings: "Réglages",
    closeSettings: "Fermer les réglages",
    menu: "Afficher la navigation",
    language: "Langue",
    choose: "Choisir des images",
    drop: "Déposez vos images ici",
    folder: "Choisir un dossier",
    compareHelp: "Aide à la comparaison",
    compareClose: "Fermer la comparaison",
    folderError:
      "Impossible de lire ce dossier. Essayez de sélectionner les images.",
    status: {
      processing: "Traitement en cours",
      success: "Prêt",
      error: "Échec",
      preserved: "Original conservé",
    },
    featuresTitle: "Tout pour vos images. Rien de superflu.",
    featuresIntro:
      "Un espace léger, du premier fichier au téléchargement final.",
    features: [
      [
        "Des fichiers plus légers",
        "Compression adaptée aux formats JPEG, PNG, WebP, GIF, SVG et AVIF.",
      ],
      [
        "Un lot, un seul flux de travail",
        "Ajoutez des fichiers, des dossiers ou des images collées. Appliquez les réglages à tout le lot.",
      ],
      [
        "Le bon format",
        "Exportez en JPG, PNG, WebP ou AVIF et choisissez le fond des images transparentes.",
      ],
      [
        "La bonne taille",
        "Redimensionnez selon les dimensions ou les proportions, puis recadrez selon vos besoins.",
      ],
      [
        "Chaque détail compte",
        "Comparez l’original et le résultat côte à côte avant de télécharger.",
      ],
      [
        "Une interface réactive",
        "Les tâches en arrière-plan traitent vos images sans bloquer l’interface.",
      ],
    ],
    howTitle: "Trois étapes avant le partage.",
    steps: [
      [
        "Ajoutez vos images",
        "Choisissez des fichiers ou des dossiers, déposez ou collez.",
      ],
      [
        "Personnalisez le résultat",
        "Réglez la qualité, le format, les dimensions et le recadrage.",
      ],
      [
        "Vérifiez et enregistrez",
        "Comparez le résultat. Téléchargez séparément ou en ZIP.",
      ],
    ],
    privacyTitle: "Vos images restent les vôtres.",
    privacyText:
      "Le traitement utilise Web Workers et WebAssembly sur votre appareil. Aucun envoi d’images ni copie côté serveur. Vos réglages restent dans ce navigateur ; les images de la session sont libérées à la fermeture de la page.",
    privacyPoints: [
      "Traitement sur l’appareil",
      "Aucun envoi d’images",
      "Code ouvert",
    ],
    source: "Code source",
    attribution: "Basé sur Pic Smaller · Licence MIT",
  },
  "es-ES": {
    nav: ["Funciones", "Privacidad"],
    tagline: "Imágenes más ligeras. Tu visión, intacta.",
    proof: [
      "Sin registro",
      "Procesamiento local",
      "Gratis y de código abierto",
    ],
    workspace: "Espacio de imágenes",
    settings: "Ajustes",
    closeSettings: "Cerrar ajustes",
    menu: "Mostrar navegación",
    language: "Idioma",
    choose: "Elegir imágenes",
    drop: "Suelta tus imágenes aquí",
    folder: "Elegir carpeta",
    compareHelp: "Ayuda de comparación",
    compareClose: "Cerrar comparación",
    folderError: "No se pudo leer esta carpeta. Prueba a elegir las imágenes.",
    status: {
      processing: "Procesando",
      success: "Listo",
      error: "Error",
      preserved: "Original conservado",
    },
    featuresTitle: "Todo lo que tus imágenes necesitan. Nada más.",
    featuresIntro:
      "Un espacio ligero, desde el primer archivo hasta la descarga final.",
    features: [
      [
        "Archivos más pequeños",
        "Compresión adaptada a JPEG, PNG, WebP, GIF, SVG y AVIF.",
      ],
      [
        "Un lote, un solo proceso",
        "Añade archivos, carpetas o pega imágenes. Aplica los ajustes a todo el lote.",
      ],
      [
        "El formato adecuado",
        "Exporta JPG, PNG, WebP o AVIF y controla el fondo de las imágenes transparentes.",
      ],
      [
        "El tamaño justo",
        "Cambia las dimensiones o proporciones y recorta para tu próximo destino.",
      ],
      [
        "Revisa cada detalle",
        "Compara el original y el resultado lado a lado antes de descargar.",
      ],
      [
        "Sin interrupciones",
        "Las tareas en segundo plano procesan tus imágenes sin bloquear la interfaz.",
      ],
    ],
    howTitle: "Tres pasos para compartir.",
    steps: [
      ["Añade tus imágenes", "Elige archivos o carpetas, arrastra o pega."],
      [
        "Personaliza el resultado",
        "Ajusta calidad, formato, dimensiones y recorte.",
      ],
      [
        "Revisa y guarda",
        "Compara el resultado. Descarga por separado o en ZIP.",
      ],
    ],
    privacyTitle: "Tus imágenes siguen siendo tuyas.",
    privacyText:
      "El procesamiento se realiza en tu dispositivo con Web Workers y WebAssembly. No se suben imágenes ni se guardan copias en el servidor. Los ajustes quedan en este navegador; las imágenes de trabajo se liberan al cerrar la página.",
    privacyPoints: [
      "Procesamiento en tu dispositivo",
      "Sin subir imágenes",
      "Código abierto",
    ],
    source: "Código fuente",
    attribution: "Basado en Pic Smaller · Licencia MIT",
  },
  "tr-TR": {
    nav: ["Özellikler", "Gizlilik"],
    tagline: "Daha hafif görseller. Aynı bakış açısı.",
    proof: ["Kayıt gerektirmez", "Yerel işleme", "Ücretsiz ve açık kaynaklı"],
    workspace: "Görsel çalışma alanı",
    settings: "Ayarlar",
    closeSettings: "Ayarları kapat",
    menu: "Gezinmeyi aç/kapat",
    language: "Dil",
    choose: "Görsel seç",
    drop: "Görsellerinizi buraya bırakın",
    folder: "Klasör seç",
    compareHelp: "Karşılaştırma yardımı",
    compareClose: "Karşılaştırmayı kapat",
    folderError: "Bu klasör okunamadı. Görselleri seçmeyi deneyin.",
    status: {
      processing: "İşleniyor",
      success: "Hazır",
      error: "Başarısız",
      preserved: "Özgün dosya korundu",
    },
    featuresTitle: "Görselleriniz için gereken her şey. Fazlası yok.",
    featuresIntro: "İlk dosyadan son indirmeye kadar hafif bir çalışma alanı.",
    features: [
      [
        "Daha küçük dosyalar",
        "JPEG, PNG, WebP, GIF, SVG ve AVIF için biçime uygun sıkıştırma.",
      ],
      [
        "Tek grup, tek iş akışı",
        "Dosya veya klasör ekleyin ya da görsel yapıştırın. Ayarları tüm gruba uygulayın.",
      ],
      [
        "Doğru biçim",
        "JPG, PNG, WebP veya AVIF dışa aktarın; saydam arka planın dolgusunu seçin.",
      ],
      [
        "Tam gereken boyut",
        "Ölçülere veya oranlara göre boyutlandırın ve istediğiniz alana göre kırpın.",
      ],
      [
        "Her ayrıntıyı görün",
        "İndirmeden önce özgün görseli ve sonucu yan yana karşılaştırın.",
      ],
      [
        "Kesintisiz çalışma",
        "Arka plan görevleri görselleri işlerken arayüz yanıt vermeye devam eder.",
      ],
    ],
    howTitle: "Üç adımda paylaşıma hazır.",
    steps: [
      [
        "Görsellerinizi ekleyin",
        "Dosya veya klasör seçin, sürükleyin ya da yapıştırın.",
      ],
      ["Ayarları belirleyin", "Kalite, biçim, boyut ve kırpmayı ayarlayın."],
      [
        "Kontrol edin ve kaydedin",
        "Sonucu karşılaştırın. Tek tek veya ZIP olarak indirin.",
      ],
    ],
    privacyTitle: "Görselleriniz sizde kalır.",
    privacyText:
      "Görseller Web Workers ve WebAssembly ile cihazınızda işlenir. Görsel yüklenmez, sunucuda kopya tutulmaz. Ayarlar bu tarayıcıda saklanır; çalışma görselleri sayfa kapatılınca serbest bırakılır.",
    privacyPoints: [
      "Cihazda işleme",
      "Görsel yüklemesi yok",
      "Açık kaynak kod",
    ],
    source: "Kaynak kod",
    attribution: "Pic Smaller tabanlı · MIT Lisansı",
  },
  "ja-JP": {
    nav: ["機能", "プライバシー"],
    tagline: "画像は軽く、表現はそのまま。",
    proof: ["登録不要", "ローカル処理", "無料・オープンソース"],
    workspace: "画像ワークスペース",
    settings: "設定",
    closeSettings: "設定を閉じる",
    menu: "ナビゲーションの切り替え",
    language: "言語",
    choose: "画像を選択",
    drop: "ここに画像をドロップ",
    folder: "フォルダーを選択",
    compareHelp: "比較のヘルプ",
    compareClose: "比較を閉じる",
    folderError:
      "フォルダーを読み込めませんでした。画像を直接選択してください。",
    status: {
      processing: "処理中",
      success: "完了",
      error: "失敗",
      preserved: "元のファイルを保持",
    },
    featuresTitle: "画像に必要な機能を、過不足なく。",
    featuresIntro:
      "最初のファイルから最後のダウンロードまで、軽快なワークスペースで。",
    features: [
      [
        "ファイルを小さく",
        "JPEG、PNG、WebP、GIF、SVG、AVIF に適した圧縮処理。",
      ],
      [
        "まとめて効率よく",
        "ファイルやフォルダーの追加、画像の貼り付けに対応。設定を一括適用できます。",
      ],
      [
        "用途に合う形式",
        "JPG、PNG、WebP、AVIF へ変換。透明な背景の塗りつぶしも設定できます。",
      ],
      [
        "ちょうどよいサイズ",
        "寸法や比率を指定してサイズを変更し、用途に合わせて切り抜き。",
      ],
      ["細部まで確認", "ダウンロード前に、元画像と処理結果を並べて比較。"],
      [
        "操作を止めない",
        "バックグラウンド処理で、画像の処理中もスムーズに操作できます。",
      ],
    ],
    howTitle: "3 ステップで共有の準備。",
    steps: [
      ["画像を追加", "ファイルやフォルダーを選択、ドロップ、または貼り付け。"],
      ["設定を調整", "品質、形式、寸法、切り抜きを設定。"],
      ["確認して保存", "結果を比較し、個別または ZIP でダウンロード。"],
    ],
    privacyTitle: "あなたの画像は、あなたの手元に。",
    privacyText:
      "Web Workers と WebAssembly を使って端末上で画像を処理します。画像のアップロードやサーバーへのコピーはありません。設定はこのブラウザーに保存され、作業中の画像はページを閉じると解放されます。",
    privacyPoints: [
      "端末内で処理",
      "画像のアップロード不要",
      "公開されたソースコード",
    ],
    source: "ソースコード",
    attribution: "Pic Smaller ベース · MIT ライセンス",
  },
  "ko-KR": {
    nav: ["기능", "개인정보 보호"],
    tagline: "이미지는 더 가볍게, 표현은 그대로.",
    proof: ["가입 불필요", "로컬 처리", "무료 오픈 소스"],
    workspace: "이미지 작업 공간",
    settings: "설정",
    closeSettings: "설정 닫기",
    menu: "탐색 메뉴 전환",
    language: "언어",
    choose: "이미지 선택",
    drop: "이미지를 여기에 놓으세요",
    folder: "폴더 선택",
    compareHelp: "비교 도움말",
    compareClose: "비교 닫기",
    folderError: "폴더를 읽을 수 없습니다. 이미지를 직접 선택해 보세요.",
    status: {
      processing: "처리 중",
      success: "완료",
      error: "실패",
      preserved: "원본 유지",
    },
    featuresTitle: "이미지에 필요한 기능만 담았습니다.",
    featuresIntro: "첫 파일부터 마지막 다운로드까지 가벼운 작업 공간에서.",
    features: [
      ["더 작은 파일", "JPEG, PNG, WebP, GIF, SVG, AVIF에 맞는 압축 처리."],
      [
        "한 번에 일괄 처리",
        "파일, 폴더를 추가하거나 이미지를 붙여 넣으세요. 설정을 전체에 적용합니다.",
      ],
      [
        "알맞은 형식",
        "JPG, PNG, WebP, AVIF로 내보내고 투명 배경의 채우기 색상을 조절하세요.",
      ],
      ["원하는 크기", "치수나 비율에 따라 크기를 바꾸고 용도에 맞게 자르세요."],
      ["세부 사항까지 확인", "다운로드 전에 원본과 결과를 나란히 비교하세요."],
      [
        "끊김 없는 작업",
        "백그라운드에서 이미지를 처리하므로 화면을 계속 조작할 수 있습니다.",
      ],
    ],
    howTitle: "세 단계로 공유 준비 완료.",
    steps: [
      ["이미지 추가", "파일이나 폴더를 선택하거나 끌어 놓고 붙여 넣으세요."],
      ["설정 조절", "품질, 형식, 크기, 자르기를 설정하세요."],
      [
        "확인하고 저장",
        "결과를 비교하고 개별 파일이나 ZIP으로 다운로드하세요.",
      ],
    ],
    privacyTitle: "내 이미지는 내 기기에.",
    privacyText:
      "Web Workers와 WebAssembly로 기기에서 이미지를 처리합니다. 이미지 업로드나 서버 복사본이 없습니다. 설정은 이 브라우저에 저장되며, 작업 이미지는 페이지를 닫으면 해제됩니다.",
    privacyPoints: ["기기 내 처리", "이미지 업로드 없음", "공개된 소스 코드"],
    source: "소스 코드",
    attribution: "Pic Smaller 기반 · MIT 라이선스",
  },
  "fa-IR": {
    nav: ["امکانات", "حریم خصوصی"],
    tagline: "تصاویر سبک‌تر، نگاه شما دست‌نخورده.",
    proof: ["بدون ثبت‌نام", "پردازش محلی", "رایگان و متن‌باز"],
    workspace: "فضای کار تصاویر",
    settings: "تنظیمات",
    closeSettings: "بستن تنظیمات",
    menu: "باز و بسته کردن منو",
    language: "زبان",
    choose: "انتخاب تصاویر",
    drop: "تصاویر را اینجا رها کنید",
    folder: "انتخاب پوشه",
    compareHelp: "راهنمای مقایسه",
    compareClose: "بستن مقایسه",
    folderError: "خواندن این پوشه ممکن نیست. تصاویر را مستقیماً انتخاب کنید.",
    status: {
      processing: "در حال پردازش",
      success: "آماده",
      error: "ناموفق",
      preserved: "فایل اصلی حفظ شد",
    },
    featuresTitle: "هر آنچه تصاویر شما نیاز دارند، نه بیشتر.",
    featuresIntro: "یک فضای کار سبک، از اولین فایل تا آخرین دریافت.",
    features: [
      [
        "فایل‌های کوچک‌تر",
        "فشرده‌سازی متناسب با قالب‌های JPEG، PNG، WebP، GIF، SVG و AVIF.",
      ],
      [
        "یک گروه، یک روند",
        "فایل یا پوشه اضافه کنید یا تصاویر را بچسبانید. تنظیمات را به همه اعمال کنید.",
      ],
      [
        "قالب مناسب",
        "خروجی JPG، PNG، WebP یا AVIF بگیرید و رنگ پس‌زمینهٔ شفاف را تعیین کنید.",
      ],
      [
        "اندازهٔ دلخواه",
        "اندازه را بر اساس ابعاد یا نسبت تغییر دهید و تصویر را متناسب با نیاز برش دهید.",
      ],
      [
        "دیدن همهٔ جزئیات",
        "پیش از دریافت، تصویر اصلی و نتیجه را کنار هم مقایسه کنید.",
      ],
      [
        "کار بدون وقفه",
        "پردازش پس‌زمینه، تصاویر را آماده می‌کند و رابط کاربری پاسخ‌گو می‌ماند.",
      ],
    ],
    howTitle: "سه گام تا آماده‌سازی برای اشتراک.",
    steps: [
      ["افزودن تصاویر", "فایل یا پوشه انتخاب کنید، بکشید یا بچسبانید."],
      ["تنظیم نتیجه", "کیفیت، قالب، ابعاد و برش را تنظیم کنید."],
      [
        "بررسی و ذخیره",
        "نتیجه را مقایسه و جداگانه یا به‌صورت ZIP دریافت کنید.",
      ],
    ],
    privacyTitle: "تصاویر شما نزد خودتان می‌مانند.",
    privacyText:
      "تصاویر با Web Workers و WebAssembly روی دستگاه شما پردازش می‌شوند. هیچ تصویری بارگذاری نمی‌شود و نسخه‌ای در سرور ذخیره نمی‌شود. تنظیمات در همین مرورگر می‌مانند و تصاویر کاری با بستن صفحه آزاد می‌شوند.",
    privacyPoints: ["پردازش روی دستگاه", "بدون بارگذاری تصویر", "کد متن‌باز"],
    source: "کد منبع",
    attribution: "بر پایهٔ Pic Smaller · مجوز MIT",
  },
} satisfies Record<
  "fr-FR" | "es-ES" | "tr-TR" | "ja-JP" | "ko-KR" | "fa-IR",
  HomeCopy
>;
