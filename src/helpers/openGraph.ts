import { OgImage, getImgSizesByQuality, ImageQuality, getAssetURL } from "./img";
import { isDefinedAndNotEmpty } from "./asserts";
import { getFormat } from "./i18n";
import { UploadImageFragment } from "graphql/generated";
import { useFormat } from "hooks/useFormat";

const DEFAULT_OG_THUMBNAIL: OgImage = {
  image: `${process.env.NEXT_PUBLIC_URL_SELF}/default_og.jpg`,
  width: 1200,
  height: 630,
  alt: "Accord's Library Logo",
};

export const TITLE_PREFIX = "Accord’s Library";
export const TITLE_SEPARATOR = " - ";

export interface OpenGraph {
  title: string;
  description: string;
  thumbnail: OgImage;
}

export const getOpenGraph = (
  format: ReturnType<typeof getFormat>["format"] | ReturnType<typeof useFormat>["format"],
  title?: string | null | undefined,
  description?: string | null | undefined,
  thumbnail?: UploadImageFragment | string | null | undefined
): OpenGraph => ({
  title: `${TITLE_PREFIX}${isDefinedAndNotEmpty(title) ? `${TITLE_SEPARATOR}${title}` : ""}`,
  description: isDefinedAndNotEmpty(description)
    ? description.length > 350
      ? `${description.slice(0, 349)}…`
      : description
    : format("default_description"),
  thumbnail: thumbnail ? getOgImage(thumbnail) : DEFAULT_OG_THUMBNAIL,
});

const getOgImage = (image: UploadImageFragment | string): OgImage => {
  if (typeof image === "string") {
    return {
      image,
      width: 0,
      height: 0,
      alt: "",
    };
  }
  const imgSize = getImgSizesByQuality(image.width ?? 0, image.height ?? 0, ImageQuality.Og);
  return {
    image: getAssetURL(image.url, ImageQuality.Og),
    width: imgSize.width,
    height: imgSize.height,
    alt: image.alternativeText ?? "",
  };
};
