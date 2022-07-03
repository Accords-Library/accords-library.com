import {
  Enum_Componentsetstextset_Status,
  GetLibraryItemQuery,
  GetLibraryItemScansQuery,
} from "graphql/generated";
import { AppStaticProps } from "../graphql/getAppStaticProps";
import { SelectiveRequiredNonNullable } from "./types";

type SortContentProps =
  | NonNullable<
      NonNullable<
        GetLibraryItemQuery["libraryItems"]
      >["data"][number]["attributes"]
    >["contents"]
  | NonNullable<
      NonNullable<
        GetLibraryItemScansQuery["libraryItems"]
      >["data"][number]["attributes"]
    >["contents"];

export const sortContent = (contents: SortContentProps) => {
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
};

export const getStatusDescription = (
  status: string,
  langui: AppStaticProps["langui"]
): string | null | undefined => {
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
};

export const isDefined = <T>(t: T): t is NonNullable<T> =>
  t !== null && t !== undefined;

export const isUndefined = <T>(
  t: T | undefined | null
): t is undefined | null => t === null || t === undefined;

export const isDefinedAndNotEmpty = (
  string: string | undefined | null
): string is string => isDefined(string) && string.length > 0;

export const filterDefined = <T>(t: T[] | undefined | null): NonNullable<T>[] =>
  isUndefined(t)
    ? []
    : (t.filter((item) => isDefined(item)) as NonNullable<T>[]);

export const filterHasAttributes = <T, P extends keyof NonNullable<T>>(
  t: T[] | undefined | null,
  attributes?: P[]
): SelectiveRequiredNonNullable<NonNullable<T>, P>[] =>
  isUndefined(t)
    ? []
    : (t.filter((item) => {
        if (isDefined(item)) {
          const attributesToCheck = attributes ?? (Object.keys(item) as P[]);
          return attributesToCheck.every((attribute) =>
            isDefined(item[attribute])
          );
        }
        return false;
      }) as unknown as SelectiveRequiredNonNullable<NonNullable<T>, P>[]);

export const iterateMap = <K, V, U>(
  map: Map<K, V>,
  callbackfn: (key: K, value: V, index: number) => U
): U[] => {
  const result: U[] = [];
  let index = 0;
  for (const [key, value] of map.entries()) {
    result.push(callbackfn(key, value, index));
    index += 1;
  }
  return result;
};

export const mapMoveEntry = <K, V>(
  map: Map<K, V>,
  sourceIndex: number,
  targetIndex: number
) => new Map(arrayMove([...map], sourceIndex, targetIndex));

const arrayMove = <T>(arr: T[], sourceIndex: number, targetIndex: number) => {
  arr.splice(targetIndex, 0, arr.splice(sourceIndex, 1)[0]);
  return arr;
};

export const mapRemoveEmptyValues = <K, V>(groups: Map<K, V[]>): Map<K, V[]> =>
  new Map([...groups].filter(([_, items]) => items.length > 0));
