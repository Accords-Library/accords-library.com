import { sJoin } from "./formatters";

export enum ImageQuality {
  Small = "small",
  Medium = "medium",
  Large = "large",
  Og = "og",
}

interface ImageProperties {
  maxSize: number;
  extension: "jpg" | "webp";
}

export interface OgImage {
  image: string;
  width: number;
  height: number;
  alt: string;
}

const imageQualityProperties: Record<ImageQuality, ImageProperties> = {
  small: { maxSize: 512, extension: "webp" },
  medium: { maxSize: 1024, extension: "webp" },
  large: { maxSize: 2048, extension: "webp" },
  og: { maxSize: 512, extension: "jpg" },
};

export const getAssetFilename = (path: string): string => {
  let result = path.split("/");
  result = result[result.length - 1].split(".");
  result = result
    .splice(0, result.length - 1)
    .join(".")
    .split("_");
  return result[0];
};

export const getAssetURL = (url: string, quality: ImageQuality): string => {
  const indexEndPath = url.indexOf("/uploads/") + "/uploads/".length;
  const indexStartExtension = url.lastIndexOf(".");
  const assetPathWithoutExtension = url.slice(indexEndPath, indexStartExtension);
  return sJoin(
    process.env.NEXT_PUBLIC_URL_IMG,
    "/",
    quality,
    "/",
    assetPathWithoutExtension,
    ".",
    imageQualityProperties[quality].extension
  );
};

const getImgSizesByMaxSize = (
  width: number,
  height: number,
  maxSize: number
): { width: number; height: number } => {
  if (width > height) {
    if (width < maxSize) return { width: width, height: height };
    return { width: maxSize, height: Math.ceil((height / width) * maxSize) };
  }
  if (height < maxSize) return { width: width, height: height };
  return { width: Math.ceil((width / height) * maxSize), height: maxSize };
};

export const getImgSizesByQuality = (
  width: number,
  height: number,
  quality: ImageQuality
): { width: number; height: number } =>
  getImgSizesByMaxSize(width, height, imageQualityProperties[quality].maxSize);
