import {
  OgImage,
  getImgSizesByQuality,
  ImageQuality,
  getAssetURL,
} from "./img";
import { isDefinedAndNotEmpty } from "./others";
import { UploadImageFragment } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";

const DEFAULT_OG_THUMBNAIL = {
  image: `${process.env.NEXT_PUBLIC_URL_SELF}/default_og.jpg`,
  width: 1200,
  height: 630,
  alt: "Accord's Library Logo",
};

const TITLE_PREFIX = "Accord’s Library";

export interface OpenGraph {
  title: string;
  description: string;
  thumbnail: OgImage;
}

export const getOpenGraph = (
  langui: AppStaticProps["langui"],
  title: string,
  description?: string | null | undefined,
  thumbnail?: UploadImageFragment | null | undefined
): OpenGraph => ({
  title: `${TITLE_PREFIX}${isDefinedAndNotEmpty(title) && ` - ${title}`}`,
  description: isDefinedAndNotEmpty(description)
    ? description
    : langui.default_description ?? "",
  thumbnail: thumbnail ? getOgImage(thumbnail) : DEFAULT_OG_THUMBNAIL,
});

const getOgImage = (image: UploadImageFragment): OgImage => {
  const imgSize = getImgSizesByQuality(
    image.width ?? 0,
    image.height ?? 0,
    ImageQuality.Og
  );
  return {
    image: getAssetURL(image.url, ImageQuality.Og),
    width: imgSize.width,
    height: imgSize.height,
    alt: image.alternativeText ?? "",
  };
};
