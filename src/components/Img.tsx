import { UploadImageFragment } from "graphql/generated";
import Image, { ImageProps } from "next/image";

interface Props {
  className?: string;
  image?: UploadImageFragment | string;
  quality?: ImageQuality;
  alt?: ImageProps["alt"];
  layout?: ImageProps["layout"];
  objectFit?: ImageProps["objectFit"];
  priority?: ImageProps["priority"];
}

export default function Img(props: Props): JSX.Element {
  if (typeof props.image === "string") {
    return (
      <img
        className={props.className}
        src={props.image}
        alt={props.alt ?? ""}
      />
    );
  } else if (props.image?.width && props.image.height) {
    const imgSize = getImgSizesByQuality(
      props.image.width,
      props.image.height,
      props.quality ?? ImageQuality.Small
    );
    return (
      <Image
        className={props.className}
        src={getAssetURL(
          props.image.url,
          props.quality ? props.quality : ImageQuality.Small
        )}
        alt={props.alt ?? props.image.alternativeText ?? ""}
        width={props.layout === "fill" ? undefined : imgSize.width}
        height={props.layout === "fill" ? undefined : imgSize.height}
        layout={props.layout}
        objectFit={props.objectFit}
        priority={props.priority}
        unoptimized
      />
    );
  }
  return <></>;
}

export enum ImageQuality {
  Small = "small",
  Medium = "medium",
  Large = "large",
  Og = "og",
}

export function getAssetFilename(path: string): string {
  let result = path.split("/");
  result = result[result.length - 1].split(".");
  result = result
    .splice(0, result.length - 1)
    .join(".")
    .split("_");
  return result[0];
}

export function getAssetURL(url: string, quality: ImageQuality): string {
  let newUrl = url;
  newUrl = newUrl.replace(/^\/uploads/u, `/${quality}`);
  newUrl = newUrl.replace(/.jpg$/u, ".webp");
  newUrl = newUrl.replace(/.jpeg$/u, ".webp");
  newUrl = newUrl.replace(/.png$/u, ".webp");
  if (quality === ImageQuality.Og) newUrl = newUrl.replace(/.webp$/u, ".jpg");
  return process.env.NEXT_PUBLIC_URL_IMG + newUrl;
}

export function getImgSizesByMaxSize(
  width: number,
  height: number,
  maxSize: number
): { width: number; height: number } {
  if (width > height) {
    if (width < maxSize) return { width: width, height: height };
    return { width: maxSize, height: (height / width) * maxSize };
  }
  if (height < maxSize) return { width: width, height: height };
  return { width: (width / height) * maxSize, height: maxSize };
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
    default:
      return { width: 0, height: 0 };
  }
}
