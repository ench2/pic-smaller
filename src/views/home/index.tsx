import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Check,
  Languages,
  Menu,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Minimize2,
  Layers,
  ArrowLeftRight,
  Crop,
  ScanEye,
  Zap,
} from "lucide-react";
import style from "./index.module.scss";
import { Logo } from "@/components/Logo";
import { UploadCard } from "@/components/UploadCard";
import { Compare } from "@/components/Compare";
import { gstate } from "@/global";
import { changeLang, langList } from "@/locale";
import { homeState } from "@/states/home";
import { createImageList, useWorkerHandler } from "@/engines/transform";
import { getFilesFromClipboard, hasImageInClipboard } from "@/functions";
import { LeftContent } from "./LeftContent";
import { RightOption } from "./RightOption";
import { Select } from "@/components/Select";
import { brand, getBrandName } from "@/brand";
import {
  siteUrl,
  localeOptions,
  getLocalePath,
  isSupportedLocale,
  defaultLocale,
} from "@/locale-config";
import { getHomeCopy } from "./copy";
import {
  getToolConfig,
  getToolPath,
  getToolSeoCopy,
  getCategoryLabels,
  type SupportedTool,
} from "@/tools-data";
import { MediaToolkit } from "@/components/MediaToolkit";
import { ToolsNav } from "@/components/ToolsNav";
import { AdSlot } from "@/components/AdSlot";

const featureIcons = [Minimize2, Layers, ArrowLeftRight, Crop, ScanEye, Zap];

type HomeProps = {
  tool?: SupportedTool;
};

const Home = observer(({ tool }: HomeProps) => {
  useWorkerHandler();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageReady, setLanguageReady] = useState(false);
  const currentLocale = isSupportedLocale(gstate.lang)
    ? gstate.lang
    : defaultLocale;
  const text = getHomeCopy(gstate.lang);
  const toolCopy = tool ? getToolSeoCopy(currentLocale, tool) : null;
  const toolConfig = tool ? getToolConfig(tool) : null;
  const categoryLabels = getCategoryLabels(currentLocale);
  const brandName = getBrandName(gstate.lang);
  const hasImages = homeState.list.size > 0;
  const contentDirection = gstate.lang === "fa-IR" ? "rtl" : "ltr";
  const activeCategory = toolConfig?.category ?? "image";
  const faqList = toolCopy ? toolCopy.faq : text.faq;

  useEffect(() => {
    // Do not accept a language click before client event handlers are ready.
    // The footer language anchors work even without JavaScript.
    setLanguageReady(true);
    if (toolConfig && toolConfig.category === "image") {
      if ("outputFormat" in toolConfig && toolConfig.outputFormat) {
        homeState.tempOption.format.target = toolConfig.outputFormat;
        homeState.option.format.target = toolConfig.outputFormat;
      }
      if ("targetSizeKb" in toolConfig && toolConfig.targetSizeKb) {
        homeState.tempOption.targetSizeKb = toolConfig.targetSizeKb;
        homeState.option.targetSizeKb = toolConfig.targetSizeKb;
      }
      if ("openResizePanel" in toolConfig && toolConfig.openResizePanel) {
        homeState.showOption = true;
        if (!homeState.tempOption.resize.method) {
          homeState.tempOption.resize.method = "fitWidth";
        }
      }
    }
    const handlePaste = async (event: ClipboardEvent) => {
      if (!hasImageInClipboard(event)) return;
      const target = event.target as HTMLElement | null;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable
      )
        return;
      event.preventDefault();
      const files = await getFilesFromClipboard(event);
      if (files.length > 0) createImageList(files);
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [toolConfig]);

  return (
    <div className={style.page}>
      <header className={style.header}>
        <a
          href={getLocalePath(currentLocale)}
          className={style.brand}
          aria-label={brandName}
        >
          <Logo title={brandName} />
        </a>
        <div className={style.headerTools}>
          <nav
            id="main-navigation"
            className={menuOpen ? style.navOpen : ""}
            aria-label={text.menu}
          >
            <a href="#features" onClick={() => setMenuOpen(false)}>
              {text.nav[0]}
            </a>
            <a href="#specs" onClick={() => setMenuOpen(false)}>
              {text.specsNav}
            </a>
            <a href="#comparison" onClick={() => setMenuOpen(false)}>
              {text.comparisonNav}
            </a>
            <a href="#privacy" onClick={() => setMenuOpen(false)}>
              {text.nav[1]}
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              {text.faqNav}
            </a>
          </nav>
          <div className={style.language}>
            <Languages size={18} aria-hidden="true" />
            <Select
              compact
              disabled={!languageReady}
              value={gstate.lang}
              ariaLabel={text.language}
              options={langList.map((lang) => ({
                value: lang.key,
                label: lang.label,
              }))}
              onChange={(val) => changeLang(val, tool)}
            />
          </div>
          <button
            type="button"
            className={style.menuButton}
            aria-label={text.menu}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setMenuOpen(false);
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="top">
        <section
          className={`${style.hero} ${hasImages ? style.activeHero : ""}`}
          id="compressor"
        >
          <div className={style.heroCopy} dir={contentDirection}>
            <span className={style.eyebrow}>
              {toolCopy ? toolCopy.badge : brandName}
            </span>
            <h1>{toolCopy ? toolCopy.title : text.title}</h1>
            <p className={style.subtitle}>
              {toolCopy ? toolCopy.subtitle : text.subtitle}
            </p>
            <p>{toolCopy ? toolCopy.summary : text.summary}</p>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "0.75rem",
              }}
            >
              <a
                href={getLocalePath(currentLocale)}
                className={`button ${activeCategory === "image" ? "buttonPrimary" : ""}`}
              >
                {categoryLabels.image}
              </a>
              <a
                href={getToolPath(currentLocale, "image-to-pdf")}
                className={`button ${activeCategory === "pdf" ? "buttonPrimary" : ""}`}
              >
                {categoryLabels.pdf}
              </a>
              <a
                href={getToolPath(currentLocale, "video-compressor")}
                className={`button ${activeCategory === "video" ? "buttonPrimary" : ""}`}
              >
                {categoryLabels.video}
              </a>
            </div>
          </div>
          <div className={style.workspace}>
            <div className={style.workspaceTop}>
              <strong>
                <Layers size={18} aria-hidden="true" />
                {text.workspace}
              </strong>
              <span>
                <ShieldCheck size={16} aria-hidden="true" />
                {text.proof[1]}
              </span>
              {activeCategory === "image" && (
                <button
                  type="button"
                  className="button"
                  aria-expanded={homeState.showOption}
                  aria-controls="image-settings"
                  onClick={() => {
                    homeState.showOption = true;
                  }}
                >
                  <SlidersHorizontal size={16} />
                  {text.settings}
                </button>
              )}
            </div>
            {activeCategory === "image" ? (
              <div className={style.workbench}>
                {hasImages ? <LeftContent /> : <UploadCard />}
                <RightOption />
              </div>
            ) : (
              <MediaToolkit
                tool={tool!}
                category={activeCategory}
                lang={currentLocale}
                defaultVideoMaxMb={
                  toolConfig && "videoMaxMb" in toolConfig
                    ? toolConfig.videoMaxMb
                    : undefined
                }
              />
            )}
          </div>
          <ul className={style.heroProof} dir={contentDirection}>
            {text.proof.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <AdSlot position="workspace-bottom" slotId="workspace-bottom" />
        </section>
        <section
          className={style.features}
          id="features"
          dir={contentDirection}
        >
          <div className={style.sectionHeading}>
            <h2>{text.featuresTitle}</h2>
            <p>{text.featuresIntro}</p>
          </div>
          <div className={style.featureGrid}>
            {text.features.map(([title, description], index) => {
              const Icon = featureIcons[index];
              return (
                <article key={title}>
                  <div className={style.featureIcon}>
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className={style.how} dir={contentDirection}>
          <div className={style.sectionHeading}>
            <h2>{text.howTitle}</h2>
          </div>
          <ol>
            {text.steps.map(([title, description], index) => (
              <li key={title}>
                <b>0{index + 1}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className={style.privacy} id="privacy" dir={contentDirection}>
          <div className={style.privacyIcon}>
            <ShieldCheck size={40} aria-hidden="true" />
          </div>
          <div>
            <h2>{text.privacyTitle}</h2>
            <p>{text.privacyText}</p>
            <ul>
              {text.privacyPoints.map((point) => (
                <li key={point}>
                  <Check size={16} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          className={style.specs}
          id="specs"
          dir={contentDirection}
          aria-labelledby="specs-title"
        >
          <div className={style.sectionHeading}>
            <h2 id="specs-title">{text.specsTitle}</h2>
            <p>{text.specsIntro}</p>
          </div>
          <div className={style.tableWrapper}>
            <table className={style.specsTable}>
              <thead>
                <tr>
                  {text.specsHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {text.specs.map(
                  ([format, input, output, engine, pipeline, alpha]) => (
                    <tr key={format}>
                      <td>
                        <strong>{format}</strong>
                      </td>
                      <td>{input}</td>
                      <td>{output}</td>
                      <td>
                        <code>{engine}</code>
                      </td>
                      <td>{pipeline}</td>
                      <td>{alpha}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>
        <section
          className={style.comparison}
          id="comparison"
          dir={contentDirection}
          aria-labelledby="comparison-title"
        >
          <div className={style.sectionHeading}>
            <h2 id="comparison-title">{text.comparisonTitle}</h2>
            <p>{text.comparisonIntro}</p>
          </div>
          <div className={style.tableWrapper}>
            <table className={style.comparisonTable}>
              <thead>
                <tr>
                  {text.comparisonHeaders.map((header, idx) => (
                    <th
                      key={header}
                      className={idx === 1 ? style.highlightHeader : undefined}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {text.comparison.map(([dimension, liteframe, cloud, single]) => (
                  <tr key={dimension}>
                    <td>
                      <strong>{dimension}</strong>
                    </td>
                    <td className={style.highlightCell}>
                      <b>{liteframe}</b>
                    </td>
                    <td>{cloud}</td>
                    <td>{single}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <AdSlot position="content-middle" slotId="content-middle" />
        <section
          className={style.faq}
          id="faq"
          dir={contentDirection}
          aria-labelledby="faq-title"
        >
          <h2 id="faq-title">{text.faqTitle}</h2>
          {faqList.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </section>
        <ToolsNav lang={currentLocale} currentTool={tool} />
      </main>
      <footer className={style.footer}>
        <div>
          <Logo title={brandName} iconSize={32} />
          <p>{text.tagline}</p>
        </div>
        <div className={style.footerLinks}>
          <a href="/privacy.html">{text.privacyLink}</a>
          <a href={brand.sourceUrl} target="_blank" rel="noreferrer">
            {text.source}
          </a>
          <small>{text.attribution}</small>
          <span>{new URL(siteUrl).host}</span>
        </div>
      </footer>
      <nav className={style.localeLinks} aria-label={text.language}>
        {localeOptions.map(({ key, label }) => (
          <a
            key={key}
            href={tool ? getToolPath(key, tool) : getLocalePath(key)}
            hrefLang={key}
            lang={key}
            dir={key === "fa-IR" ? "rtl" : "ltr"}
            aria-current={gstate.lang === key ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      {homeState.compareId !== null && <Compare />}
    </div>
  );
});

export default Home;
