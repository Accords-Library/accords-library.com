import { StrapiImage } from "graphql/operations-types";
import Image, { ImageProps } from "next/image";

export enum ImageQuality {
  Small = "small",
  Medium = "medium",
  Large = "large",
  Og = "og",
}

export function getAssetURL(url: string, quality: ImageQuality): string {
  let newUrl = url;
  newUrl = newUrl.replace(/^\/uploads/u, `/${quality}`);
  newUrl = newUrl.replace(/.jpg$/u, ".webp");
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

type ImgProps = {
  className?: string;
  image?: StrapiImage;
  quality?: ImageQuality;
  alt?: ImageProps["alt"];
  layout?: ImageProps["layout"];
  objectFit?: ImageProps["objectFit"];
  priority?: ImageProps["priority"];
  rawImg?: boolean;
};

export default function Img(props: ImgProps): JSX.Element {
  if (props.image) {
    const imgSize = getImgSizesByQuality(
      props.image.width,
      props.image.height,
      props.quality ? props.quality : ImageQuality.Small
    );

    if (props.rawImg) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={props.className}
          src={getAssetURL(
            props.image.url,
            props.quality ? props.quality : ImageQuality.Small
          )}
          alt={props.alt ? props.alt : props.image.alternativeText}
          width={imgSize.width}
          height={imgSize.height}
        />
      );
    }
    return (
      <Image
        className={props.className}
        src={getAssetURL(
          props.image.url,
          props.quality ? props.quality : ImageQuality.Small
        )}
        alt={props.alt ? props.alt : props.image.alternativeText}
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
