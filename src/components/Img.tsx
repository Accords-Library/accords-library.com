import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { UploadImageFragment } from "graphql/generated";
import { getAssetURL, getImgSizesByQuality, ImageQuality } from "helpers/img";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

interface Props
  extends Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "src"> {
  src: UploadImageFragment | string;
  quality?: ImageQuality;
  sizeMultiplicator?: number;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Img = ({
  className,
  src: propsSrc,
  quality = ImageQuality.Small,
  alt,
  loading = "lazy",
  height,
  width,
  ...otherProps
}: Props): JSX.Element => {
  const src = typeof propsSrc === "string" ? propsSrc : getAssetURL(propsSrc.url, quality);
  const size =
    typeof propsSrc === "string"
      ? { width, height }
      : getImgSizesByQuality(propsSrc.width ?? 0, propsSrc.height ?? 0, quality);

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      height={size.height}
      width={size.width}
      {...otherProps}
    />
  );
};
