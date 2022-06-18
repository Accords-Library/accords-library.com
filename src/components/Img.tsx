import { UploadImageFragment } from "graphql/generated";
import { getAssetURL, getImgSizesByQuality, ImageQuality } from "helpers/img";

import { ImageProps } from "next/image";
import { MouseEventHandler } from "react";

interface Props {
  className?: string;
  image?: UploadImageFragment | string;
  quality?: ImageQuality;
  alt?: ImageProps["alt"];
  onClick?: MouseEventHandler<HTMLImageElement>;
}

export function Img(props: Props): JSX.Element {
  const {
    className,
    image,
    quality = ImageQuality.Small,
    alt,
    onClick,
  } = props;

  if (typeof image === "string") {
    return (
      <img className={className} src={image} alt={alt ?? ""} loading="lazy" />
    );
  } else if (image?.width && image.height) {
    const imgSize = getImgSizesByQuality(image.width, image.height, quality);
    return (
      <img
        className={className}
        src={getAssetURL(image.url, quality)}
        alt={alt ?? image.alternativeText ?? ""}
        width={imgSize.width}
        height={imgSize.height}
        loading="lazy"
        onClick={onClick}
      />
    );
  }
  return <></>;
}
