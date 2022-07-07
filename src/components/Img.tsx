import { ImageProps } from "next/image";
import { MouseEventHandler } from "react";
import { UploadImageFragment } from "graphql/generated";
import { getAssetURL, getImgSizesByQuality, ImageQuality } from "helpers/img";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

interface Props {
  className?: string;
  image?: UploadImageFragment | string;
  quality?: ImageQuality;
  alt?: ImageProps["alt"];
  onClick?: MouseEventHandler<HTMLImageElement>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Img = ({
  className,
  image,
  quality = ImageQuality.Small,
  alt,
  onClick,
}: Props): JSX.Element => {
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
};
