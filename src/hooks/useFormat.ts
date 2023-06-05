import { IntlMessageFormat } from "intl-messageformat";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { LibraryItemMetadataDynamicZone } from "graphql/generated";
import { ICUParams } from "graphql/icuParams";
import { isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getLogger } from "helpers/logger";
import { prettySlug } from "helpers/formatters";
import { LibraryItemMetadata } from "types/types";

const logger = getLogger("🗺️ [I18n]");

type WordingKey = keyof ICUParams;
type LibraryItemType = Exclude<LibraryItemMetadataDynamicZone["__typename"], undefined>;
export type ContentStatus = "Done" | "Draft" | "Incomplete" | "Review";

/*
 * Whitelisting wording keys from being detected as unused
 *  - format("audio")
 *  - format("textual")
 *  - format("game")
 *  - format("group")
 *  - format("video")
 *  - format("other")
 */
const componentMetadataToWording: Record<LibraryItemType, WordingKey> = {
  ComponentMetadataAudio: "audio",
  ComponentMetadataBooks: "textual",
  ComponentMetadataGame: "game",
  ComponentMetadataGroup: "group",
  ComponentMetadataVideo: "video",
  ComponentMetadataOther: "other",
  Error: "item",
};

/*
 * Whitelisting wording keys from being detected as unused
 *  - format("draft")
 *  - format("incomplete")
 *  - format("review")
 *  - format("done")
 *  - format("status_draft")
 *  - format("status_incomplete")
 *  - format("status_review")
 *  - format("status_done")
 */
const componentSetsTextsetStatusToWording: Record<
  ContentStatus,
  { label: WordingKey; description: WordingKey }
> = {
  Draft: { label: "draft", description: "status_draft" },
  Incomplete: { label: "incomplete", description: "status_incomplete" },
  Review: { label: "review", description: "status_review" },
  Done: { label: "done", description: "status_done" },
};

export const useFormat = (): {
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
} => {
  const langui = useAtomGetter(atoms.localData.langui);
  const fallbackLangui = useAtomGetter(atoms.localData.fallbackLangui);
  const typesTranslations = useAtomGetter(atoms.localData.typesTranslations);
  const { locale = "en" } = useRouter();

  const format = useCallback(
    (
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
      logger.warn(
        `Missing ${langui.ui_language?.data?.attributes?.code} translation for ${key}. \
Falling back to en translation.`
      );
      const fallback = new IntlMessageFormat(fallbackLangui[key] ?? "")
        .format(processedValues)
        .toString();
      if (isDefinedAndNotEmpty(fallback)) {
        return fallback;
      }
      logger.warn(`Missing fallback translation for ${key}. The key seems unvalid`);
      return key;
    },
    [langui, fallbackLangui]
  );

  const formatStatusLabel = useCallback(
    (status: ContentStatus): string => format(componentSetsTextsetStatusToWording[status].label),
    [format]
  );

  const formatStatusDescription = useCallback(
    (status: ContentStatus): string =>
      format(componentSetsTextsetStatusToWording[status].description),
    [format]
  );

  const formatLibraryItemType = useCallback(
    (metadata: LibraryItemMetadata): string =>
      metadata ? format(componentMetadataToWording[metadata.__typename]) : format("other"),
    [format]
  );

  const formatLibraryItemSubType = useCallback(
    (metadata: LibraryItemMetadata): string => {
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
    },
    [
      format,
      locale,
      typesTranslations.audioSubtypes,
      typesTranslations.gamePlatforms,
      typesTranslations.groupSubtypes,
      typesTranslations.metadataTypes,
      typesTranslations.textualSubtypes,
      typesTranslations.videoSubtypes,
    ]
  );

  const formatCategory = useCallback(
    (slug: string, type: "default" | "full" = "default"): string => {
      const category = typesTranslations.categories.find((cat) => cat.attributes?.slug === slug);
      if (!category) return prettySlug(slug);
      const findTranslation = (givenLocale: string): string | null | undefined => {
        const localeTranslation = category.attributes?.titles?.find(
          (translation) => translation?.language?.data?.attributes?.code === givenLocale
        );
        return type === "full" ? localeTranslation?.title : localeTranslation?.short;
      };
      return findTranslation(locale) ?? findTranslation("en") ?? prettySlug(slug);
    },
    [locale, typesTranslations.categories]
  );

  const formatContentType = useCallback(
    (slug: string): string => {
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
    },
    [locale, typesTranslations.contentTypes]
  );

  const formatWikiTag = useCallback(
    (slug: string): string => {
      const wikiTag = typesTranslations.wikiPagesTags.find((cat) => cat.attributes?.slug === slug);
      if (!wikiTag) return prettySlug(slug);
      const findTranslation = (givenLocale: string): string | null | undefined => {
        const localeTranslation = wikiTag.attributes?.titles?.find(
          (translation) => translation?.language?.data?.attributes?.code === givenLocale
        );
        return localeTranslation?.title;
      };
      return findTranslation(locale) ?? findTranslation("en") ?? prettySlug(slug);
    },
    [locale, typesTranslations.wikiPagesTags]
  );

  const formatWeaponType = useCallback(
    (slug: string): string => {
      const weaponType = typesTranslations.weaponTypes.find(
        (type) => type.attributes?.slug === slug
      );
      if (!weaponType) return prettySlug(slug);
      const findTranslation = (givenLocale: string): string | null | undefined => {
        const localeTranslation = weaponType.attributes?.translations?.find(
          (translation) => translation?.language?.data?.attributes?.code === givenLocale
        );
        return localeTranslation?.name;
      };
      return findTranslation(locale) ?? findTranslation("en") ?? prettySlug(slug);
    },
    [locale, typesTranslations.weaponTypes]
  );

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
  };
};
