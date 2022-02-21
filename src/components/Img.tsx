import { GetLibraryItemsPreviewQuery } from "graphql/operations-types";
import { ImageProps } from "next/image";
import Image from "next/image";

export enum ImageQuality {
  Small = "small",
  Medium = "medium",
  Large = "large",
  Og = "og",
}

export function getAssetURL(url: string, quality?: ImageQuality): string {
  if (!quality) quality = ImageQuality.Small;
  url = url.replace(/^\/uploads/, "/" + quality);
  url = url.replace(/.jpg$/, ".webp");
  url = url.replace(/.png$/, ".webp");
  return process.env.NEXT_PUBLIC_URL_IMG + url;
}

export function getImgSizesByMaxSize(
  width: number,
  height: number,
  maxSize: number
): { width: number; height: number } {
  if (width > height) {
    if (width < maxSize) return { width: width, height: height };
    return { width: maxSize, height: (height / width) * maxSize };
  } else {
    if (height < maxSize) return { width: width, height: height };
    return { width: (width / height) * maxSize, height: maxSize };
  }
}

export function getImgSizesByQuality(
  width: number,
  height: number,
  quality: ImageQuality
): { width: number; height: number } {
  switch (quality) {
    case ImageQuality.Og:
      return getImgSizesByMaxSize(width, height, 512);
    case ImageQuality.Small:
      return getImgSizesByMaxSize(width, height, 512);
    case ImageQuality.Medium:
      return getImgSizesByMaxSize(width, height, 1024);
    case ImageQuality.Large:
      return getImgSizesByMaxSize(width, height, 2048);
  }
}

type ImgProps = {
  className?: string;
  image: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["thumbnail"]["data"]["attributes"];
  quality?: ImageQuality;
  alt?: ImageProps["alt"];
  layout?: ImageProps["layout"];
  objectFit?: ImageProps["objectFit"];
  priority?: ImageProps["priority"];
};

export default function Img(props: ImgProps): JSX.Element {
  if (props.layout == "fill") {
    return (
      <Image
        src={getAssetURL(props.image.url, props.quality)}
        alt={props.alt ? props.alt : props.image.alternativeText}
        layout={props.layout}
        objectFit={props.objectFit}
        priority={props.priority}
      />
    );
  } else {
    return (
      <Image
        src={getAssetURL(props.image.url, props.quality)}
        alt={props.alt ? props.alt : props.image.alternativeText}
        {...getImgSizesByQuality(
          props.image.width,
          props.image.height,
          props.quality ? props.quality : ImageQuality.Small
        )}
        layout={props.layout}
        objectFit={props.objectFit}
        priority={props.priority}
      />
    );
  }
}
