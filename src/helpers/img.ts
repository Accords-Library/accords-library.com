import { UploadImageFragment } from "graphql/generated";

export enum ImageQuality {
  Small = "small",
  Medium = "medium",
  Large = "large",
  Og = "og",
}

interface OgImage {
  image: string;
  width: number;
  height: number;
  alt: string;
}

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
  let newUrl = url;
  newUrl = newUrl.replace(/^\/uploads/u, `/${quality}`);
  newUrl = newUrl.replace(/.jpg$/u, ".webp");
  newUrl = newUrl.replace(/.jpeg$/u, ".webp");
  newUrl = newUrl.replace(/.png$/u, ".webp");
  if (quality === ImageQuality.Og) newUrl = newUrl.replace(/.webp$/u, ".jpg");
  return process.env.NEXT_PUBLIC_URL_IMG + newUrl;
};

const getImgSizesByMaxSize = (
  width: number,
  height: number,
  maxSize: number
): { width: number; height: number } => {
  if (width > height) {
    if (width < maxSize) return { width: width, height: height };
    return { width: maxSize, height: (height / width) * maxSize };
  }
  if (height < maxSize) return { width: width, height: height };
  return { width: (width / height) * maxSize, height: maxSize };
};

export const getImgSizesByQuality = (
  width: number,
  height: number,
  quality: ImageQuality
): { width: number; height: number } => {
  switch (quality) {
    case ImageQuality.Og:
      return getImgSizesByMaxSize(width, height, 512);
    case ImageQuality.Small:
      return getImgSizesByMaxSize(width, height, 512);
    case ImageQuality.Medium:
      return getImgSizesByMaxSize(width, height, 1024);
    case ImageQuality.Large:
      return getImgSizesByMaxSize(width, height, 2048);
    default:
      return { width: 0, height: 0 };
  }
};

export const getOgImage = (
  quality: ImageQuality,
  image: UploadImageFragment
): OgImage => {
  const imgSize = getImgSizesByQuality(
    image.width ?? 0,
    image.height ?? 0,
    quality
  );
  return {
    image: getAssetURL(image.url, quality),
    width: imgSize.width,
    height: imgSize.height,
    alt: image.alternativeText ?? "",
  };
};
