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
import { siteUrl } from "@/locale-config";
import { getHomeCopy } from "./copy";

const featureIcons = [Minimize2, Layers, ArrowLeftRight, Crop, ScanEye, Zap];

const Home = observer(() => {
  useWorkerHandler();
  const [menuOpen, setMenuOpen] = useState(false);
  const text = getHomeCopy(gstate.lang);
  const brandName = getBrandName(gstate.lang);
  const hasImages = homeState.list.size > 0;

  useEffect(() => {
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
  }, []);

  return (
    <div className={style.page}>
      <header className={style.header}>
        <a href="#top" className={style.brand} aria-label={brandName}>
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
            <a href="#privacy" onClick={() => setMenuOpen(false)}>
              {text.nav[1]}
            </a>
          </nav>
          <div className={style.language}>
            <Languages size={18} aria-hidden="true" />
            <Select
              compact
              value={gstate.lang}
              ariaLabel={text.language}
              options={langList.map((lang) => ({
                value: lang.key,
                label: lang.label,
              }))}
              onChange={changeLang}
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
          <div className={style.heroCopy}>
            <span className={style.eyebrow}>LITEFRAME / IMAGE TOOLS</span>
            <h1>{text.title}</h1>
            <p>{text.summary}</p>
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
            </div>
            <div className={style.workbench}>
              {hasImages ? <LeftContent /> : <UploadCard />}
              <RightOption />
            </div>
          </div>
          <ul className={style.heroProof}>
            {text.proof.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className={style.features} id="features">
          <div className={style.sectionHeading}>
            <span>LESS FRICTION, MORE CREATION</span>
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
        <section className={style.how}>
          <div className={style.sectionHeading}>
            <span>A SIMPLE WORKFLOW</span>
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
        <section className={style.privacy} id="privacy">
          <div className={style.privacyIcon}>
            <ShieldCheck size={40} aria-hidden="true" />
          </div>
          <div>
            <span className={style.eyebrow}>PRIVATE BY DEFAULT</span>
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
      </main>
      <footer className={style.footer}>
        <div>
          <Logo title={brandName} iconSize={32} />
          <p>{text.tagline}</p>
        </div>
        <div className={style.footerLinks}>
          <a href={brand.sourceUrl} target="_blank" rel="noreferrer">
            {text.source}
          </a>
          <small>{text.attribution}</small>
          <span>{new URL(siteUrl).host}</span>
        </div>
      </footer>
      {homeState.compareId !== null && <Compare />}
    </div>
  );
});

export default Home;
