import {
  Input,
  Output,
  Conversion,
  ALL_FORMATS,
  BlobSource,
  BufferTarget,
  Mp4OutputFormat,
  Quality,
  type QualityLevel,
} from "mediabunny";

export type VideoCompressOptions = {
  targetSizeMb?: number;
  qualityLevel?: QualityLevel;
  maxWidth?: number;
  onProgress?: (percent: number) => void;
};

export type VideoCompressResult = {
  blob: Blob;
  name: string;
  originalSize: number;
  compressedSize: number;
};

export async function compressVideo(
  file: File,
  options: VideoCompressOptions = {},
): Promise<VideoCompressResult> {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
  });

  const target = new BufferTarget();
  const output = new Output({
    format: new Mp4OutputFormat(),
    target,
  });

  let quality: Quality | undefined;

  if (options.targetSizeMb && options.targetSizeMb > 0) {
    const duration = await input.computeDuration();
    // Budget 85% of total bytes for video track to leave headroom for audio & container
    const targetBytes = options.targetSizeMb * 1024 * 1024 * 0.85;
    const calculatedBitrate = Math.max(
      150_000,
      Math.floor((targetBytes * 8) / Math.max(1, duration || 5)),
    );
    quality = new Quality({ bitrate: calculatedBitrate });
  } else if (options.qualityLevel) {
    quality = new Quality(options.qualityLevel);
  } else {
    quality = new Quality("medium");
  }

  const conversion = await Conversion.init({
    input,
    output,
    video: {
      quality,
      width: options.maxWidth,
      fit: options.maxWidth ? "contain" : undefined,
    },
  });

  if (!conversion.isValid) {
    throw new Error(
      `Cannot transcode video: ${conversion.discardedTracks.map((d) => d.reason).join(", ")}`,
    );
  }

  if (options.onProgress) {
    conversion.onProgress = (progress) => {
      options.onProgress?.(Math.min(99, Math.round(progress * 100)));
    };
  }

  await conversion.execute();
  options.onProgress?.(100);

  if (!target.buffer) {
    throw new Error("Video compression failed: output buffer is empty");
  }

  const outputBlob = new Blob([target.buffer], { type: "video/mp4" });
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const newName = `${baseName}.compressed.mp4`;

  return {
    blob: outputBlob,
    name: newName,
    originalSize: file.size,
    compressedSize: outputBlob.size,
  };
}
