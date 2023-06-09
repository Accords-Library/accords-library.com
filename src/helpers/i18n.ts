import { IntlMessageFormat } from "intl-messageformat";
import {
  DatePickerFragment,
  LibraryItemMetadataDynamicZone,
  PricePickerFragment,
} from "graphql/generated";
import { ICUParams } from "graphql/icuParams";
import { isDefined, isDefinedAndNotEmpty, isUndefined } from "helpers/asserts";
import {
  getCurrencies,
  getLanguages,
  getLangui,
  getTypesTranslations,
} from "graphql/fetchLocalData";
import { prettySlug } from "helpers/formatters";
import { LibraryItemMetadata } from "types/types";
import { datePickerToDate } from "helpers/date";
import { convertPrice } from "helpers/numbers";

type WordingKey = keyof ICUParams;
type LibraryItemType = Exclude<LibraryItemMetadataDynamicZone["__typename"], undefined>;
type ContentStatus = "Done" | "Draft" | "Incomplete" | "Review";

const componentMetadataToWording: Record<LibraryItemType, WordingKey> = {
  ComponentMetadataAudio: "audio",
  ComponentMetadataBooks: "textual",
  ComponentMetadataGame: "game",
  ComponentMetadataGroup: "group",
  ComponentMetadataVideo: "video",
  ComponentMetadataOther: "other",
  Error: "item",
};

const componentSetsTextsetStatusToWording: Record<
  ContentStatus,
  { label: WordingKey; description: WordingKey }
> = {
  Draft: { label: "draft", description: "status_draft" },
  Incomplete: { label: "incomplete", description: "status_incomplete" },
  Review: { label: "review", description: "status_review" },
  Done: { label: "done", description: "status_done" },
};

export const getFormat = (
  locale: string | undefined = "en"
): {
  format: <K extends WordingKey>(
    key: K,
    ...values: ICUParams[K] extends never ? [undefined?] : [ICUParams[K]]
  ) => string;
  formatLibraryItemType: (metadata: LibraryItemMetadata) => string;
  formatLibraryItemSubType: (metadata: LibraryItemMetadata) => string;
  formatStatusLabel: (status: ContentStatus) => string;
  formatStatusDescription: (status: ContentStatus) => string;
  formatCategory: (slug: string, type?: "default" | "full") => string;
  formatContentType: (slug: string) => string;
  formatWikiTag: (slug: string) => string;
  formatWeaponType: (slug: string) => string;
  formatLanguage: (code: string) => string;
  formatPrice: (price: PricePickerFragment, targetCurrencyCode?: string) => string;
  formatDate: (
    datePicker: DatePickerFragment,
    dateStyle?: Intl.DateTimeFormatOptions["dateStyle"]
  ) => string;
} => {
  const langui = getLangui(locale);
  const fallbackLangui = getLangui("en");
  const typesTranslations = getTypesTranslations();
  const currencies = getCurrencies();
  const languages = getLanguages();

  const format = (
    key: WordingKey,
    values?: Record<string, Date | boolean | number | string | null | undefined>
  ): string => {
    const processedValues = Object.fromEntries(
      Object.entries(values ?? {}).map(([oKey, value]) => [
        oKey,
        isDefined(value) ? value : "undefined",
      ])
    );
    const result = new IntlMessageFormat(langui[key] ?? "").format(processedValues).toString();
    if (isDefinedAndNotEmpty(result)) {
      return result;
    }
    const fallback = new IntlMessageFormat(fallbackLangui[key] ?? "")
      .format(processedValues)
      .toString();
    if (isDefinedAndNotEmpty(fallback)) {
      return fallback;
    }
    return key;
  };

  const formatLibraryItemType = (metadata: LibraryItemMetadata): string =>
    metadata ? format(componentMetadataToWording[metadata.__typename]) : format("other");

  const formatLibraryItemSubType = (metadata: LibraryItemMetadata): string => {
    switch (metadata?.__typename) {
      case "ComponentMetadataAudio": {
        const slug = metadata.subtype?.data?.attributes?.slug;
        const subtype = typesTranslations.audioSubtypes.find(
          (type) => type.attributes?.slug === slug
        );
        const findTranslation = (givenLocale: string) =>
          subtype?.attributes?.titles?.find(
            (translation) => translation?.language?.data?.attributes?.code === givenLocale
          )?.title;
        return findTranslation(locale) ?? findTranslation("en") ?? format("other");
      }

      case "ComponentMetadataBooks": {
        const slug = metadata.subtype?.data?.attributes?.slug;
        const subtype = typesTranslations.textualSubtypes.find(
          (type) => type.attributes?.slug === slug
        );
        const findTranslation = (givenLocale: string) =>
          subtype?.attributes?.titles?.find(
            (translation) => translation?.language?.data?.attributes?.code === givenLocale
          )?.title;
        return findTranslation(locale) ?? findTranslation("en") ?? format("other");
      }

      case "ComponentMetadataVideo": {
        const slug = metadata.subtype?.data?.attributes?.slug;
        const subtype = typesTranslations.videoSubtypes.find(
          (type) => type.attributes?.slug === slug
        );
        const findTranslation = (givenLocale: string) =>
          subtype?.attributes?.titles?.find(
            (translation) => translation?.language?.data?.attributes?.code === givenLocale
          )?.title;
        return findTranslation(locale) ?? findTranslation("en") ?? format("other");
      }

      case "ComponentMetadataGame": {
        const slug = metadata.platform?.data?.attributes?.slug;
        const subtype = typesTranslations.gamePlatforms.find(
          (type) => type.attributes?.slug === slug
        );
        console.log(slug);
        const findTranslation = (givenLocale: string) =>
          subtype?.attributes?.titles?.find(
            (translation) => translation?.language?.data?.attributes?.code === givenLocale
          )?.title;
        return findTranslation(locale) ?? findTranslation("en") ?? format("other");
      }

      case "ComponentMetadataGroup": {
        const subItemType = (() => {
          const subitemTypeSlug = metadata.subitems_type?.data?.attributes?.slug;
          const subItemTypeTranslations = typesTranslations.metadataTypes.find(
            (type) => type.attributes?.slug === subitemTypeSlug
          );
          const findTranslation = (givenLocale: string) =>
            subItemTypeTranslations?.attributes?.titles?.find(
              (translation) => translation?.language?.data?.attributes?.code === givenLocale
            )?.title;
          return findTranslation(locale) ?? findTranslation("en") ?? format("other");
        })();
        const groupType = (() => {
          const groupTypeSlug = metadata.subtype?.data?.attributes?.slug;
          const groupTypeTranslations = typesTranslations.groupSubtypes.find(
            (type) => type.attributes?.slug === groupTypeSlug
          );
          const findTranslation = (givenLocale: string) =>
            groupTypeTranslations?.attributes?.titles?.find(
              (translation) => translation?.language?.data?.attributes?.code === givenLocale
            )?.title;
          return findTranslation(locale) ?? findTranslation("en") ?? format("other");
        })();
        return `${groupType} - ${subItemType}`;
      }

      default:
        return format("other");
    }
  };

  const formatStatusLabel = (status: ContentStatus): string =>
    format(componentSetsTextsetStatusToWording[status].label);

  const formatStatusDescription = (status: ContentStatus): string =>
    format(componentSetsTextsetStatusToWording[status].description);

  const formatCategory = (slug: string, type: "default" | "full" = "default"): string => {
    const category = typesTranslations.categories.find((cat) => cat.attributes?.slug === slug);
    if (!category) return prettySlug(slug);
    const findTranslation = (givenLocale: string): string | null | undefined => {
      const localeTranslation = category.attributes?.titles?.find(
        (translation) => translation?.language?.data?.attributes?.code === givenLocale
      );
      return type === "default" ? localeTranslation?.title : localeTranslation?.short;
    };
    return findTranslation(locale) ?? findTranslation("en") ?? prettySlug(slug);
  };

  const formatContentType = (slug: string): string => {
    const contentType = typesTranslations.contentTypes.find(
      (type) => type.attributes?.slug === slug
    );
    if (!contentType) return prettySlug(slug);
    const findTranslation = (givenLocale: string): string | null | undefined => {
      const localeTranslation = contentType.attributes?.titles?.find(
        (translation) => translation?.language?.data?.attributes?.code === givenLocale
      );
      return localeTranslation?.title;
    };
    return findTranslation(locale) ?? findTranslation("en") ?? prettySlug(slug);
  };

  const formatWikiTag = (slug: string): string => {
    const wikiTag = typesTranslations.wikiPagesTags.find((cat) => cat.attributes?.slug === slug);
    if (!wikiTag) return prettySlug(slug);
    const findTranslation = (givenLocale: string): string | null | undefined => {
      const localeTranslation = wikiTag.attributes?.titles?.find(
        (translation) => translation?.language?.data?.attributes?.code === givenLocale
      );
      return localeTranslation?.title;
    };
    return findTranslation(locale) ?? findTranslation("en") ?? prettySlug(slug);
  };

  const formatWeaponType = (slug: string): string => {
    const weaponType = typesTranslations.weaponTypes.find((type) => type.attributes?.slug === slug);
    if (!weaponType) return prettySlug(slug);
    const findTranslation = (givenLocale: string): string | null | undefined => {
      const localeTranslation = weaponType.attributes?.translations?.find(
        (translation) => translation?.language?.data?.attributes?.code === givenLocale
      );
      return localeTranslation?.name;
    };
    return findTranslation(locale) ?? findTranslation("en") ?? prettySlug(slug);
  };

  const formatLanguage = (code: string) =>
    languages.find((language) => language.attributes?.code === code)?.attributes?.localized_name ??
    code.toUpperCase();

  const formatPrice = (price: PricePickerFragment, targetCurrencyCode?: string) => {
    if (isUndefined(price.amount)) return "";

    const targetCurrency = currencies.find(
      (currency) => currency.attributes?.code === targetCurrencyCode
    );

    if (targetCurrency?.attributes) {
      const amountInTargetCurrency = convertPrice(price, targetCurrency);
      return amountInTargetCurrency.toLocaleString(locale, {
        style: "currency",
        currency: targetCurrency.attributes.code,
      });
    }
    return price.amount.toLocaleString(locale, {
      style: "currency",
      currency: price.currency?.data?.attributes?.code,
    });
  };

  const formatDate = (
    datePicker: DatePickerFragment,
    dateStyle: Intl.DateTimeFormatOptions["dateStyle"] = "medium"
  ): string => datePickerToDate(datePicker).toLocaleString(locale, { dateStyle });

  return {
    format,
    formatLibraryItemType,
    formatLibraryItemSubType,
    formatStatusLabel,
    formatStatusDescription,
    formatCategory,
    formatContentType,
    formatWikiTag,
    formatWeaponType,
    formatLanguage,
    formatPrice,
    formatDate,
  };
};
