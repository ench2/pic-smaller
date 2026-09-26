import { ImageIcon, FileText, Film } from "lucide-react";
import {
  toolConfigs,
  getToolSeoCopy,
  getCategoryLabels,
  getToolPath,
} from "@/tools-data";
import type { SupportedLocale } from "@/locale-config";
import style from "./index.module.scss";

type ToolsNavProps = {
  lang: SupportedLocale;
  currentTool?: string;
};

export function ToolsNav({ lang, currentTool }: ToolsNavProps) {
  const labels = getCategoryLabels(lang);

  const imageTools = toolConfigs.filter((t) => t.category === "image");
  const pdfTools = toolConfigs.filter((t) => t.category === "pdf");
  const videoTools = toolConfigs.filter((t) => t.category === "video");

  return (
    <nav className={style.toolsNav} aria-label={labels.allToolsTitle}>
      <div className={style.header}>
        <h3>{labels.allToolsTitle}</h3>
        <p>{labels.allToolsSub}</p>
      </div>

      <div className={style.grid}>
        <div className={style.categoryCard}>
          <h4>
            <ImageIcon size={18} color="#2563eb" />
            {labels.image}
          </h4>
          <div className={style.linksList}>
            {imageTools.map((t) => {
              const copy = getToolSeoCopy(lang, t.slug);
              return (
                <a
                  key={t.slug}
                  href={getToolPath(lang, t.slug)}
                  aria-current={currentTool === t.slug ? "page" : undefined}
                >
                  {copy.navLabel}
                </a>
              );
            })}
          </div>
        </div>

        <div className={style.categoryCard}>
          <h4>
            <FileText size={18} color="#2563eb" />
            {labels.pdf}
          </h4>
          <div className={style.linksList}>
            {pdfTools.map((t) => {
              const copy = getToolSeoCopy(lang, t.slug);
              return (
                <a
                  key={t.slug}
                  href={getToolPath(lang, t.slug)}
                  aria-current={currentTool === t.slug ? "page" : undefined}
                >
                  {copy.navLabel}
                </a>
              );
            })}
          </div>
        </div>

        <div className={style.categoryCard}>
          <h4>
            <Film size={18} color="#2563eb" />
            {labels.video}
          </h4>
          <div className={style.linksList}>
            {videoTools.map((t) => {
              const copy = getToolSeoCopy(lang, t.slug);
              return (
                <a
                  key={t.slug}
                  href={getToolPath(lang, t.slug)}
                  aria-current={currentTool === t.slug ? "page" : undefined}
                >
                  {copy.navLabel}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
