import { IntlMessageFormat } from "intl-messageformat";
import { LibraryItemMetadataDynamicZone } from "graphql/generated";
import { ICUParams } from "graphql/icuParams";
import { isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getLangui } from "graphql/fetchLocalData";

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
  locale: string | undefined
): {
  format: <K extends WordingKey>(
    key: K,
    ...values: ICUParams[K] extends never ? [undefined?] : [ICUParams[K]]
  ) => string;
  formatLibraryItemType: (metadata: { __typename: LibraryItemType }) => string;
  formatStatusLabel: (status: ContentStatus) => string;
  formatStatusDescription: (status: ContentStatus) => string;
} => {
  const langui = getLangui(locale);
  const fallbackLangui = getLangui("en");

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
    return new IntlMessageFormat(fallbackLangui[key] ?? "").format(processedValues).toString();
  };

  const formatLibraryItemType = (metadata: { __typename: LibraryItemType }): string =>
    format(componentMetadataToWording[metadata.__typename]);

  const formatStatusLabel = (status: ContentStatus): string =>
    format(componentSetsTextsetStatusToWording[status].label);

  const formatStatusDescription = (status: ContentStatus): string =>
    format(componentSetsTextsetStatusToWording[status].description);

  return {
    format,
    formatLibraryItemType,
    formatStatusLabel,
    formatStatusDescription,
  };
};
