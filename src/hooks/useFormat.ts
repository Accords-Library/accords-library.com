import { IntlMessageFormat } from "intl-messageformat";
import { useCallback } from "react";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { LibraryItemMetadataDynamicZone } from "graphql/generated";
import { ICUParams } from "graphql/icuParams";
import { isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getLogger } from "helpers/logger";

const logger = getLogger("🗺️ [I18n]");

type WordingKey = keyof ICUParams;
type LibraryItemType = Exclude<LibraryItemMetadataDynamicZone["__typename"], undefined>;
export type ContentStatus = "Done" | "Draft" | "Incomplete" | "Review";

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

export const useFormat = (): {
  format: <K extends WordingKey>(
    key: K,
    ...values: ICUParams[K] extends never ? [undefined?] : [ICUParams[K]]
  ) => string;
  formatLibraryItemType: (metadata: { __typename: LibraryItemType }) => string;
  formatStatusLabel: (status: ContentStatus) => string;
  formatStatusDescription: (status: ContentStatus) => string;
} => {
  const langui = useAtomGetter(atoms.localData.langui);
  const fallbackLangui = useAtomGetter(atoms.localData.fallbackLangui);

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

  const formatLibraryItemType = useCallback(
    (metadata: { __typename: LibraryItemType }): string =>
      format(componentMetadataToWording[metadata.__typename]),
    [format]
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

  return {
    format,
    formatLibraryItemType,
    formatStatusLabel,
    formatStatusDescription,
  };
};
