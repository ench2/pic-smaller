import { PDFDocument } from "pdf-lib";

async function blobToBytes(blob: Blob): Promise<Uint8Array> {
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
}

async function ensureRasterImage(blob: Blob): Promise<{ bytes: Uint8Array; type: "jpeg" | "png" }> {
  if (blob.type === "image/jpeg" || blob.type === "image/jpg") {
    return { bytes: await blobToBytes(blob), type: "jpeg" };
  }
  if (blob.type === "image/png") {
    return { bytes: await blobToBytes(blob), type: "png" };
  }
  // Convert WebP, AVIF, SVG or other browser-supported images to PNG via Canvas
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (pngBlob) => {
        if (!pngBlob) {
          reject(new Error("Failed to export raster image for PDF"));
          return;
        }
        resolve({ bytes: await blobToBytes(pngBlob), type: "png" });
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to decode image for PDF embedding"));
    };
    img.src = url;
  });
}

/**
 * Combine multiple image files into a single multi-page PDF document
 */
export async function imagesToPdf(
  images: Array<{ name: string; blob: Blob }>,
): Promise<Blob> {
  if (images.length === 0) {
    throw new Error("No images provided for PDF conversion");
  }

  const pdfDoc = await PDFDocument.create();

  for (const item of images) {
    const { bytes, type } = await ensureRasterImage(item.blob);
    const embedded =
      type === "jpeg"
        ? await pdfDoc.embedJpg(bytes)
        : await pdfDoc.embedPng(bytes);

    const { width, height } = embedded.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(embedded, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

/**
 * Merge multiple PDF files into one combined PDF document
 */
export async function mergePdfs(
  pdfFiles: Array<{ name: string; blob: Blob }>,
): Promise<Blob> {
  if (pdfFiles.length === 0) {
    throw new Error("No PDF files provided to merge");
  }

  const mergedPdf = await PDFDocument.create();

  for (const fileItem of pdfFiles) {
    const bytes = await blobToBytes(fileItem.blob);
    const srcDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pageIndices = srcDoc.getPageIndices();
    const copiedPages = await mergedPdf.copyPages(srcDoc, pageIndices);
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  return new Blob([mergedBytes], { type: "application/pdf" });
}

/**
 * Recompress and compact PDF document objects locally
 */
export async function compressPdfDocument(
  pdfBlob: Blob,
): Promise<Blob> {
  const bytes = await blobToBytes(pdfBlob);
  const srcDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  // Compact and optimize object streams
  const savedBytes = await srcDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });
  return new Blob([savedBytes], { type: "application/pdf" });
}
