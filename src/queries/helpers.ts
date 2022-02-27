import {
  getAssetURL,
  getImgSizesByQuality,
  ImageQuality,
} from "components/Img";
import {
  GetLibraryItemsPreviewQuery,
  GetWebsiteInterfaceQuery,
  StrapiImage,
} from "graphql/operations-types";
import { NextRouter } from "next/router";

export function prettyDate(
  datePicker: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["release_date"]
): string {
  return (
    datePicker.year +
    "/" +
    datePicker.month.toString().padStart(2, "0") +
    "/" +
    datePicker.day.toString().padStart(2, "0")
  );
}

export function prettyPrice(
  pricePicker: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["price"]
): string {
  return (
    pricePicker.currency.data.attributes.symbol +
    pricePicker.amount.toLocaleString()
  );
}

export function prettySlug(slug?: string, parentSlug?: string): string {
  if (slug) {
    if (parentSlug && slug.startsWith(parentSlug))
      slug = slug.substring(parentSlug.length + 1);
    slug = slug.replace(new RegExp("-", "g"), " ");
    slug = slug.replace(new RegExp("_", "g"), " ");
    return capitalizeString(slug);
  }
  return "";
}

export function prettyinlineTitle(
  pretitle: string,
  title: string,
  subtitle: string
): string {
  let result = "";
  if (pretitle) result += pretitle + ": ";
  result += title;
  if (subtitle) result += " - " + subtitle;
  return result;
}

export function prettyItemType(
  metadata: {
    __typename: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["metadata"][number]["__typename"];
  },
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"]
): string {
  const type = metadata.__typename;
  switch (metadata.__typename) {
    case "ComponentMetadataAudio":
      return langui.library_item_type_audio;
    case "ComponentMetadataBooks":
      return langui.library_item_type_textual;
    case "ComponentMetadataGame":
      return langui.library_item_type_game;
    case "ComponentMetadataVideo":
      return langui.library_item_type_video;
    case "ComponentMetadataOther":
      return langui.library_item_type_other;
    default:
      return "";
  }
}

export function prettyItemSubType(metadata: {
  __typename: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["metadata"][number]["__typename"];
  subtype?: any;
  platform?: any;
}): string {
  switch (metadata.__typename) {
    case "ComponentMetadataAudio":
    case "ComponentMetadataBooks":
    case "ComponentMetadataVideo":
    case "ComponentMetadataOther": {
      return metadata.subtype.data.attributes.titles.length > 0
        ? metadata.subtype.data.attributes.titles[0].title
        : prettySlug(metadata.subtype.data.attributes.slug);
    }
    case "ComponentMetadataGame":
      return metadata.platform.data.attributes.short;

    default:
      return "";
  }
}

export function prettyLanguage(code: string): string {
  switch (code) {
    case "en":
      return "English";
    case "es":
      return "Español";
    case "fr":
      return "Français";
    case "ja":
      return "日本語";
    case "en":
      return "English";
    case "xx":
      return "██";
    default:
      return code;
  }
}

export function prettyTestWarning(
  router: NextRouter,
  message: string,
  subCategory?: string[]
): void {
  prettyTestWritter(TestingLevel.Warning, router, message, subCategory);
}

export function prettyTestError(
  router: NextRouter,
  message: string,
  subCategory?: string[]
): void {
  prettyTestWritter(TestingLevel.Error, router, message, subCategory);
}

enum TestingLevel {
  Warning = "warn",
  Error = "error",
}

function prettyTestWritter(
  level: TestingLevel,
  { asPath, locale }: NextRouter,
  message: string,
  subCategory?: string[]
): void {
  subCategory?.push("");
  console.warn(
    `${level}  - ${asPath} | ${locale} | ${subCategory?.join(" | ")}${message}`
  );
}

export function capitalizeString(string: string): string {
  function capitalizeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  let words = string.split(" ");
  words = words.map((word) => (word = capitalizeWord(word)));
  return words.join(" ");
}

export function convertMmToInch(mm: number): string {
  return (mm * 0.03937008).toPrecision(3);
}

export type OgImage = {
  image: string;
  width: number;
  height: number;
  alt: string;
};

export function getOgImage(quality: ImageQuality, image: StrapiImage): OgImage {
  const imgSize = getImgSizesByQuality(
    image.width,
    image.height,
    quality ? quality : ImageQuality.Small
  );
  return {
    image: getAssetURL(image.url, quality),
    width: imgSize.width,
    height: imgSize.height,
    alt: image.alternativeText,
  };
}
