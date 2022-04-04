import {
  getAssetURL,
  getImgSizesByQuality,
  ImageQuality,
} from "components/Img";
import {
  DatePickerFragment,
  Enum_Componentsetstextset_Status,
  GetCurrenciesQuery,
  GetLibraryItemQuery,
  GetLibraryItemScansQuery,
  PricePickerFragment,
  UploadImageFragment,
} from "graphql/generated";
import { NextRouter } from "next/router";
import { AppStaticProps } from "./getAppStaticProps";

export function prettyDate(datePicker: DatePickerFragment): string {
  let result = "";
  if (datePicker.year) result += datePicker.year.toString();
  if (datePicker.month)
    result += `/${datePicker.month.toString().padStart(2, "0")}`;
  if (datePicker.day)
    result += `/${datePicker.day.toString().padStart(2, "0")}`;
  return result;
}

export function prettyPrice(
  pricePicker: PricePickerFragment,
  currencies: AppStaticProps["currencies"],
  targetCurrencyCode?: string
): string {
  if (!targetCurrencyCode) return "";
  let result = "";
  currencies.map((currency) => {
    if (currency?.attributes?.code === targetCurrencyCode) {
      const amountInTargetCurrency = convertPrice(pricePicker, currency);
      result =
        currency.attributes.symbol +
        amountInTargetCurrency.toLocaleString(undefined, {
          minimumFractionDigits: currency.attributes.display_decimals ? 2 : 0,
          maximumFractionDigits: currency.attributes.display_decimals ? 2 : 0,
        });
    }
  });
  return result;
}

export function convertPrice(
  pricePicker: PricePickerFragment,
  targetCurrency: Exclude<
    GetCurrenciesQuery["currencies"],
    null | undefined
  >["data"][number]
): number {
  if (
    pricePicker.amount &&
    pricePicker.currency?.data?.attributes &&
    targetCurrency.attributes
  )
    return (
      (pricePicker.amount * pricePicker.currency.data.attributes.rate_to_usd) /
      targetCurrency.attributes.rate_to_usd
    );
  return 0;
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
  pretitle: string | undefined | null,
  title: string | undefined | null,
  subtitle: string | undefined | null
): string {
  let result = "";
  if (pretitle) result += `${pretitle}: `;
  result += title;
  if (subtitle) result += ` - ${subtitle}`;
  return result;
}

export function prettyItemType(
  metadata: any,
  langui: AppStaticProps["langui"]
): string | undefined | null {
  switch (metadata.__typename) {
    case "ComponentMetadataAudio":
      return langui.audio;
    case "ComponentMetadataBooks":
      return langui.textual;
    case "ComponentMetadataGame":
      return langui.game;
    case "ComponentMetadataVideo":
      return langui.video;
    case "ComponentMetadataGroup":
      return langui.group;
    case "ComponentMetadataOther":
      return langui.other;
    default:
      return "";
  }
}

export function prettyItemSubType(
  metadata:
    | {
        __typename: "ComponentMetadataAudio";
        subtype?: {
          data?: {
            attributes?: {
              slug: string;
              titles?: Array<{
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataBooks";
        subtype?: {
          data?: {
            attributes?: {
              slug: string;
              titles?: Array<{
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataGame";
        platforms?: {
          data: Array<{
            id?: string | null;
            attributes?: {
              short: string;
            } | null;
          }>;
        } | null;
      }
    | {
        __typename: "ComponentMetadataGroup";
        subtype?: {
          data?: {
            attributes?: {
              slug: string;
              titles?: Array<{
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
        subitems_type?: {
          data?: {
            attributes?: {
              slug: string;
              titles?: Array<{
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
      }
    | { __typename: "ComponentMetadataOther" }
    | {
        __typename: "ComponentMetadataVideo";
        subtype?: {
          data?: {
            attributes?: {
              slug: string;
              titles?: Array<{
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
      }
    | { __typename: "Error" }
    | null
): string {
  if (metadata) {
    switch (metadata.__typename) {
      case "ComponentMetadataAudio":
      case "ComponentMetadataBooks":
      case "ComponentMetadataVideo":
        return metadata.subtype?.data?.attributes?.titles &&
          metadata.subtype?.data?.attributes?.titles.length > 0 &&
          metadata.subtype.data.attributes.titles[0]
          ? metadata.subtype.data.attributes.titles[0].title
          : prettySlug(metadata.subtype?.data?.attributes?.slug);
      case "ComponentMetadataGame":
        return metadata.platforms?.data &&
          metadata.platforms?.data.length > 0 &&
          metadata.platforms.data[0].attributes
          ? metadata.platforms.data[0].attributes.short
          : "";
      case "ComponentMetadataGroup": {
        const firstPart =
          metadata.subtype?.data?.attributes?.titles &&
          metadata.subtype?.data?.attributes?.titles.length > 0 &&
          metadata.subtype.data.attributes.titles[0]
            ? metadata.subtype.data.attributes.titles[0].title
            : prettySlug(metadata.subtype?.data?.attributes?.slug);

        const secondPart =
          metadata.subitems_type?.data?.attributes?.titles &&
          metadata.subitems_type?.data?.attributes?.titles.length > 0 &&
          metadata.subitems_type.data.attributes.titles[0]
            ? metadata.subitems_type.data.attributes.titles[0].title
            : prettySlug(metadata.subitems_type?.data?.attributes?.slug);
        return `${secondPart} ${firstPart}`;
      }
      default:
        return "";
    }
  }
  return "";
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export function prettyShortenNumber(number: number): string {
  if (number > 1000000) {
    return number.toLocaleString(undefined, {
      maximumSignificantDigits: 3,
    });
  } else if (number > 1000) {
    return (
      (number / 1000).toLocaleString(undefined, {
        maximumSignificantDigits: 2,
      }) + "K"
    );
  }
  return number.toLocaleString();
}

export function prettyDuration(seconds: number): string {
  let hours = 0;
  let minutes = 0;
  while (seconds > 60) {
    minutes += 1;
    seconds -= 60;
  }
  while (minutes > 60) {
    hours += 1;
    minutes -= 60;
  }
  let result = "";
  if (hours) result += hours.toString().padStart(2, "0") + ":";
  result += minutes.toString().padStart(2, "0") + ":";
  result += seconds.toString().padStart(2, "0");
  return result;
}

export function prettyLanguage(
  code: string,
  languages: AppStaticProps["languages"]
): string {
  let result = code;
  languages.forEach((language) => {
    if (language?.attributes?.code === code)
      result = language.attributes.localized_name;
  });
  return result;
}

export function prettyTestWarning(
  router: NextRouter,
  message: string,
  subCategory: string[],
  url: string
): void {
  prettyTestWritter(TestingLevel.Warning, router, message, subCategory, url);
}

export function prettyTestError(
  router: NextRouter,
  message: string,
  subCategory: string[],
  url: string
): void {
  prettyTestWritter(TestingLevel.Error, router, message, subCategory, url);
}

enum TestingLevel {
  Warning = "warn",
  Error = "error",
}

function prettyTestWritter(
  level: TestingLevel,
  { asPath, locale }: NextRouter,
  message: string,
  subCategory: string[],
  url: string
): void {
  const line = [
    level,
    `${process.env.NEXT_PUBLIC_URL_SELF}/${locale}${asPath}`,
    locale,
    subCategory?.join(" -> "),
    message,
    process.env.NEXT_PUBLIC_URL_CMS + url,
  ];

  if (process.env.ENABLE_TESTING_LOG) {
    if (level === TestingLevel.Warning) {
      console.warn(line.join("\t"));
    } else {
      console.error(line.join("\t"));
    }
  }
}

export function prettyURL(url: string): string {
  let domain = new URL(url);
  return domain.hostname.replace("www.", "");
}

export function capitalizeString(string: string): string {
  function capitalizeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  let words = string.split(" ");
  words = words.map((word) => capitalizeWord(word));
  return words.join(" ");
}

export function convertMmToInch(mm: number | null | undefined): string {
  return mm ? (mm * 0.03937008).toPrecision(3) : "";
}

export interface OgImage {
  image: string;
  width: number;
  height: number;
  alt: string;
}

export function getOgImage(
  quality: ImageQuality,
  image: UploadImageFragment
): OgImage {
  const imgSize = getImgSizesByQuality(
    image.width ?? 0,
    image.height ?? 0,
    quality ? quality : ImageQuality.Small
  );
  return {
    image: getAssetURL(image.url, quality),
    width: imgSize.width,
    height: imgSize.height,
    alt: image.alternativeText || "",
  };
}

export function sortContent(
  contents:
    | Exclude<
        Exclude<
          GetLibraryItemQuery["libraryItems"],
          null | undefined
        >["data"][number]["attributes"],
        null | undefined
      >["contents"]
    | Exclude<
        Exclude<
          GetLibraryItemScansQuery["libraryItems"],
          null | undefined
        >["data"][number]["attributes"],
        null | undefined
      >["contents"]
) {
  contents?.data.sort((a, b) => {
    if (
      a.attributes?.range[0]?.__typename === "ComponentRangePageRange" &&
      b.attributes?.range[0]?.__typename === "ComponentRangePageRange"
    ) {
      return (
        a.attributes.range[0].starting_page -
        b.attributes.range[0].starting_page
      );
    }
    return 0;
  });
}

export function getStatusDescription(
  status: string,
  langui: AppStaticProps["langui"]
): string | null | undefined {
  switch (status) {
    case Enum_Componentsetstextset_Status.Incomplete:
      return langui.status_incomplete;

    case Enum_Componentsetstextset_Status.Draft:
      return langui.status_draft;

    case Enum_Componentsetstextset_Status.Review:
      return langui.status_review;

    case Enum_Componentsetstextset_Status.Done:
      return langui.status_done;

    default:
      return "";
  }
}

export function slugify(string: string | undefined): string {
  if (!string) {
    return "";
  }
  return string
    .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a")
    .replace(/[çÇ]/gu, "c")
    .replace(/[ðÐ]/gu, "d")
    .replace(/[ÈÉÊËéèêë]/gu, "e")
    .replace(/[ÏïÎîÍíÌì]/gu, "i")
    .replace(/[Ññ]/gu, "n")
    .replace(/[øØœŒÕõÔôÓóÒò]/gu, "o")
    .replace(/[ÜüÛûÚúÙù]/gu, "u")
    .replace(/[ŸÿÝý]/gu, "y")
    .toLowerCase()
    .replace(/[^a-z0-9- ]/gu, "")
    .trim()
    .replace(/ /gu, "-");
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getLocalesFromLanguages(
  languages?: Array<{
    language?: {
      data?: {
        attributes?: { code: string } | null;
      } | null;
    } | null;
  } | null> | null
) {
  return languages
    ? languages.map((language) => language?.language?.data?.attributes?.code)
    : [];
}

export function getVideoThumbnailURL(uid: string): string {
  return `${process.env.NEXT_PUBLIC_URL_WATCH}/videos/${uid}.webp`;
}

export function getVideoFile(uid: string): string {
  return `${process.env.NEXT_PUBLIC_URL_WATCH}/videos/${uid}.mp4`;
}
