import { convertPrice } from "./numbers";
import { isDefinedAndNotEmpty, isUndefined } from "./others";
import { datePickerToDate } from "./date";
import { Currencies, Languages, Langui } from "./localData";
import { DatePickerFragment, PricePickerFragment } from "graphql/generated";

export const prettyDate = (
  datePicker: DatePickerFragment,
  locale = "en",
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "medium"
): string => datePickerToDate(datePicker).toLocaleString(locale, { dateStyle });

export const prettyPrice = (
  pricePicker: PricePickerFragment,
  currencies: Currencies,
  targetCurrencyCode?: string
): string => {
  if (!targetCurrencyCode) return "";
  if (isUndefined(pricePicker.amount)) return "";

  const targetCurrency = currencies.find(
    (currency) => currency.attributes?.code === targetCurrencyCode
  );

  if (targetCurrency?.attributes) {
    const amountInTargetCurrency = convertPrice(pricePicker, targetCurrency);
    return amountInTargetCurrency.toLocaleString("en", {
      style: "currency",
      currency: targetCurrency.attributes.code,
    });
  }
  return pricePicker.amount.toLocaleString("en", {
    style: "currency",
    currency: pricePicker.currency?.data?.attributes?.code,
  });
};

export const prettySlug = (slug?: string, parentSlug?: string): string => {
  let newSlug = slug;
  if (newSlug) {
    if (isDefinedAndNotEmpty(parentSlug) && newSlug.startsWith(parentSlug))
      newSlug = newSlug.substring(parentSlug.length + 1);
    newSlug = newSlug.replaceAll("-", " ");
    return capitalizeString(newSlug);
  }
  return "";
};

export const prettyInlineTitle = (
  pretitle: string | null | undefined,
  title: string | null | undefined,
  subtitle: string | null | undefined
): string => {
  let result = "";
  if (pretitle) result += `${pretitle}: `;
  result += title;
  if (subtitle) result += ` - ${subtitle}`;
  return result;
};

export const prettyItemType = (metadata: any, langui: Langui): string => {
  switch (metadata.__typename) {
    case "ComponentMetadataAudio":
      return langui.audio ?? "Audio";
    case "ComponentMetadataBooks":
      return langui.textual ?? "Textual";
    case "ComponentMetadataGame":
      return langui.game ?? "Game";
    case "ComponentMetadataVideo":
      return langui.video ?? "Video";
    case "ComponentMetadataGroup":
      return langui.group ?? "Group";
    case "ComponentMetadataOther":
      return langui.other ?? "Other";
    default:
      return "";
  }
};

/* eslint-disable id-denylist */
export const prettyItemSubType = (
  metadata:
    | {
        __typename: "ComponentMetadataAudio";
        subtype?: {
          data?: {
            attributes?: {
              slug: string;
              titles?:
                | ({
                    title: string;
                  } | null)[]
                | null;
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
              titles?:
                | ({
                    title: string;
                  } | null)[]
                | null;
            } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataGame";
        platforms?: {
          data: {
            id?: string | null;
            attributes?: {
              short: string;
            } | null;
          }[];
        } | null;
      }
    | {
        __typename: "ComponentMetadataGroup";
        subtype?: {
          data?: {
            attributes?: {
              slug: string;
              titles?:
                | ({
                    title: string;
                  } | null)[]
                | null;
            } | null;
          } | null;
        } | null;
        subitems_type?: {
          data?: {
            attributes?: {
              slug: string;
              titles?:
                | ({
                    title: string;
                  } | null)[]
                | null;
            } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataVideo";
        subtype?: {
          data?: {
            attributes?: {
              slug: string;
              titles?:
                | ({
                    title: string;
                  } | null)[]
                | null;
            } | null;
          } | null;
        } | null;
      }
    | { __typename: "ComponentMetadataOther" }
    | { __typename: "Error" }
    | null
): string => {
  if (metadata) {
    switch (metadata.__typename) {
      case "ComponentMetadataAudio":
      case "ComponentMetadataBooks":
      case "ComponentMetadataVideo":
        return metadata.subtype?.data?.attributes?.titles &&
          metadata.subtype.data.attributes.titles.length > 0 &&
          metadata.subtype.data.attributes.titles[0]
          ? metadata.subtype.data.attributes.titles[0].title
          : prettySlug(metadata.subtype?.data?.attributes?.slug);
      case "ComponentMetadataGame":
        return metadata.platforms?.data &&
          metadata.platforms.data.length > 0 &&
          metadata.platforms.data[0].attributes
          ? metadata.platforms.data[0].attributes.short
          : "";
      case "ComponentMetadataGroup": {
        const firstPart =
          metadata.subtype?.data?.attributes?.titles &&
          metadata.subtype.data.attributes.titles.length > 0 &&
          metadata.subtype.data.attributes.titles[0]
            ? metadata.subtype.data.attributes.titles[0].title
            : prettySlug(metadata.subtype?.data?.attributes?.slug);

        const secondPart =
          metadata.subitems_type?.data?.attributes?.titles &&
          metadata.subitems_type.data.attributes.titles.length > 0 &&
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
};
/* eslint-enable id-denylist */

export const prettyShortenNumber = (number: number): string => {
  if (number > 1000000) {
    return number.toLocaleString(undefined, {
      maximumSignificantDigits: 3,
    });
  } else if (number > 1000) {
    return `${(number / 1000).toLocaleString(undefined, {
      maximumSignificantDigits: 2,
    })}K`;
  }
  return number.toLocaleString();
};

export const prettyDuration = (seconds: number): string => {
  let hours = 0;
  let minutes = 0;
  let remainingSeconds = seconds;
  while (remainingSeconds > 60) {
    minutes++;
    remainingSeconds -= 60;
  }
  while (minutes > 60) {
    hours++;
    minutes -= 60;
  }
  let result = "";
  if (hours) result += `${hours.toString().padStart(2, "0")}:`;
  result += `${minutes.toString().padStart(2, "0")}:`;
  result += remainingSeconds.toString().padStart(2, "0");
  return result;
};

export const prettyLanguage = (code: string, languages: Languages): string => {
  let result = code;
  languages.forEach((language) => {
    if (language.attributes?.code === code)
      result = language.attributes.localized_name;
  });
  return result;
};

export const prettyURL = (url: string): string => {
  const domain = new URL(url);
  return domain.hostname.replace("www.", "");
};

const capitalizeString = (string: string): string => {
  const capitalizeWord = (word: string): string =>
    word.charAt(0).toUpperCase() + word.substring(1);

  let words = string.split(" ");
  words = words.map((word) => capitalizeWord(word));
  return words.join(" ");
};

export const slugify = (string: string | undefined): string => {
  if (!string) {
    return "";
  }
  return string
    .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/gu, "a")
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
};
