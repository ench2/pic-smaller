"use client";

import { useRef, useState } from "react";
import { FileText, Film, Upload, Download, Trash2, Play } from "lucide-react";
import { filesize } from "filesize";
import { createDownload } from "@/functions";
import {
  imagesToPdf,
  mergePdfs,
  compressPdfDocument,
} from "@/engines/pdf";
import { compressVideo } from "@/engines/video";
import type { SupportedTool, ToolCategory } from "@/tools-data";
import style from "./index.module.scss";

type MediaToolkitProps = {
  tool: SupportedTool;
  category: ToolCategory;
  lang: string;
  defaultVideoMaxMb?: number;
};

export function MediaToolkit({
  tool,
  category,
  lang,
  defaultVideoMaxMb,
}: MediaToolkitProps) {
  const isZh = lang.startsWith("zh");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<{
    blob: Blob;
    name: string;
    originalSize: number;
  } | null>(null);

  const [videoMaxMb, setVideoMaxMb] = useState<number>(defaultVideoMaxMb ?? 25);
  const [videoQuality, setVideoQuality] = useState<"high" | "medium" | "low">(
    "medium",
  );
  const [videoWidth, setVideoWidth] = useState<number>(1280);

  const accept =
    tool === "image-to-pdf"
      ? ".jpg,.jpeg,.png,.webp"
      : category === "pdf"
        ? ".pdf,application/pdf"
        : ".mp4,.webm,.mov,video/*";

  const handleSelectFiles = (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;
    setError(null);
    setOutput(null);
    setFiles((prev) => [...prev, ...Array.from(selected)]);
  };

  const handleRun = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(5);
    setError(null);
    setOutput(null);

    const totalOriginal = files.reduce((acc, f) => acc + f.size, 0);

    try {
      if (tool === "image-to-pdf") {
        const pdfBlob = await imagesToPdf(
          files.map((f) => ({ name: f.name, blob: f })),
        );
        setOutput({
          blob: pdfBlob,
          name: "liteframe-merged-images.pdf",
          originalSize: totalOriginal,
        });
      } else if (tool === "merge-pdf") {
        const pdfBlob = await mergePdfs(
          files.map((f) => ({ name: f.name, blob: f })),
        );
        setOutput({
          blob: pdfBlob,
          name: "liteframe-merged.pdf",
          originalSize: totalOriginal,
        });
      } else if (tool === "compress-pdf" || tool === "pdf-to-jpg") {
        const pdfBlob = await compressPdfDocument(files[0]);
        setOutput({
          blob: pdfBlob,
          name: files[0].name.replace(/\.pdf$/i, "") + ".optimized.pdf",
          originalSize: files[0].size,
        });
      } else if (category === "video") {
        const result = await compressVideo(files[0], {
          targetSizeMb: videoMaxMb > 0 ? videoMaxMb : undefined,
          qualityLevel: videoQuality,
          maxWidth: videoWidth > 0 ? videoWidth : undefined,
          onProgress: (pct) => setProgress(pct),
        });
        setOutput({
          blob: result.blob,
          name: result.name,
          originalSize: result.originalSize,
        });
      }
      setProgress(100);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Local processing failed",
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={style.toolkit} data-testid="media-toolkit">
      <div
        className={style.dropzone}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleSelectFiles(e.dataTransfer?.files);
        }}
      >
        {category === "pdf" ? (
          <FileText size={32} color="#2563eb" />
        ) : (
          <Film size={32} color="#2563eb" />
        )}
        <strong>
          {category === "pdf"
            ? isZh
              ? "拖入 PDF 或图片文件到这里（100% 浏览器本地处理）"
              : "Drop your PDF or image files here (100% Local in Browser)"
            : isZh
              ? "拖入 MP4 / MOV / WebM 视频文件（WebCodecs 本地硬件加速）"
              : "Drop MP4 / MOV / WebM video here (Local WebCodecs GPU Accelerated)"}
        </strong>
        <button
          type="button"
          className="button buttonPrimary buttonLarge"
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={18} />
          {isZh ? "选择本地文件" : "Choose Local Files"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={tool === "image-to-pdf" || tool === "merge-pdf"}
          style={{ display: "none" }}
          onChange={(e) => handleSelectFiles(e.target.files)}
        />
      </div>

      {category === "video" && (
        <div className={style.controls}>
          <div className={style.controlGroup}>
            <label>
              {isZh ? "目标体积上限" : "Target Size Limit"}
              <select
                value={videoMaxMb}
                onChange={(e) => setVideoMaxMb(Number(e.target.value))}
              >
                <option value={10}>10 MB (Discord / Email)</option>
                <option value={25}>25 MB (Discord / WeChat)</option>
                <option value={50}>50 MB (HD Share)</option>
                <option value={0}>{isZh ? "按画质档位" : "By Quality Level"}</option>
              </select>
            </label>
            <label>
              {isZh ? "输出分辨率" : "Max Resolution"}
              <select
                value={videoWidth}
                onChange={(e) => setVideoWidth(Number(e.target.value))}
              >
                <option value={0}>{isZh ? "保持原分辨率" : "Original Size"}</option>
                <option value={1920}>1080p (1920px)</option>
                <option value={1280}>720p (1280px)</option>
                <option value={854}>480p (854px)</option>
              </select>
            </label>
            <label>
              {isZh ? "编码档位" : "Encoding Quality"}
              <select
                value={videoQuality}
                onChange={(e) =>
                  setVideoQuality(e.target.value as "high" | "medium" | "low")
                }
              >
                <option value="high">{isZh ? "高画质" : "High Quality"}</option>
                <option value="medium">{isZh ? "均衡压缩" : "Balanced"}</option>
                <option value="low">{isZh ? "极限最小体积" : "Max Compression"}</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className={style.fileList}>
          {files.map((file, idx) => (
            <div key={`${file.name}-${idx}`} className={style.fileRow}>
              <div className={style.fileMeta}>
                <strong>{file.name}</strong>
                <span>{String(filesize(file.size))}</span>
              </div>
              <button
                type="button"
                className="button"
                onClick={() =>
                  setFiles((prev) => prev.filter((_, i) => i !== idx))
                }
              >
                <Trash2 size={16} />
                {isZh ? "移除" : "Remove"}
              </button>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              className="button buttonPrimary"
              disabled={processing}
              onClick={handleRun}
            >
              <Play size={16} />
              {processing
                ? `${isZh ? "正在本地处理" : "Processing Locally"} (${progress}%)`
                : isZh
                  ? "开始本地处理"
                  : "Start Local Processing"}
            </button>
            <button
              type="button"
              className="button"
              disabled={processing}
              onClick={() => {
                setFiles([]);
                setOutput(null);
                setError(null);
              }}
            >
              {isZh ? "清空列表" : "Clear All"}
            </button>
          </div>
        </div>
      )}

      {error && <div className={style.errorBox}>{error}</div>}

      {output && (
        <div className={style.resultCard} data-testid="toolkit-result">
          <div className={style.fileMeta}>
            <strong>{output.name}</strong>
            <span>
              {String(filesize(output.originalSize))} →{" "}
              <b>{String(filesize(output.blob.size))}</b>
            </span>
          </div>
          <button
            type="button"
            className="button buttonPrimary"
            onClick={() => createDownload(output.name, output.blob)}
          >
            <Download size={16} />
            {isZh ? "保存文件" : "Save Output"}
          </button>
        </div>
      )}
    </div>
  );
}
