import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { UploadImageFragment } from "graphql/generated";
import { getAssetURL, ImageQuality } from "helpers/img";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

interface Props
  extends Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    "src"
  > {
  src: UploadImageFragment | string;
  quality?: ImageQuality;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Img = ({
  className,
  src: rawSrc,
  quality = ImageQuality.Small,
  alt,
  loading = "lazy",
  ...otherProps
}: Props): JSX.Element => {
  const src =
    typeof rawSrc === "string" ? rawSrc : getAssetURL(rawSrc.url, quality);
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      {...otherProps}
    />
  );
};
