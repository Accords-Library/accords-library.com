import { AppStaticProps } from "../graphql/getAppStaticProps";
import { PathDot, SelectiveNonNullable } from "./types/SelectiveNonNullable";
import {
  Enum_Componentsetstextset_Status,
  GetLibraryItemQuery,
  GetLibraryItemScansQuery,
} from "graphql/generated";

type SortRangedContentProps =
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

export const sortRangedContent = (contents: SortRangedContentProps): void => {
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
  t: T | null | undefined
): t is null | undefined => t === null || t === undefined;

export const isDefinedAndNotEmpty = (
  string: string | null | undefined
): string is string => isDefined(string) && string.length > 0;

export const filterDefined = <T>(t: T[] | null | undefined): NonNullable<T>[] =>
  isUndefined(t)
    ? []
    : (t.filter((item) => isDefined(item)) as NonNullable<T>[]);

export const filterHasAttributes = <T, P extends PathDot<T>>(
  t: T[] | null | undefined,
  paths: readonly P[]
): SelectiveNonNullable<T, typeof paths[number]>[] =>
  isDefined(t)
    ? (t.filter((item) =>
        hasAttributes(item, paths)
      ) as unknown as SelectiveNonNullable<T, typeof paths[number]>[])
    : [];

const hasAttributes = <T>(item: T, paths: readonly PathDot<T>[]): boolean =>
  isDefined(item) && paths.every((path) => hasAttribute(item, path));

const hasAttribute = <T>(item: T, path: string): boolean => {
  if (isDefined(item)) {
    const [head, ...rest] = path.split(".");
    if (Object.keys(item).includes(head)) {
      const attribute = head as keyof T;
      if (isDefined(item[attribute])) {
        if (rest.length > 0) {
          return hasAttribute(item[attribute], rest.join("."));
        }
        return true;
      }
    }
  }
  return false;
};

export const iterateMap = <K, V, U>(
  map: Map<K, V>,
  callbackfn: (key: K, value: V, index: number) => U,
  sortingFunction?: (a: [K, V], b: [K, V]) => number
): U[] => {
  const toList = [...map];
  if (isDefined(sortingFunction)) {
    toList.sort(sortingFunction);
  }
  return toList.map(([key, value], index) => callbackfn(key, value, index));
};

export const mapMoveEntry = <K, V>(
  map: Map<K, V>,
  sourceIndex: number,
  targetIndex: number
): Map<K, V> => new Map(arrayMove([...map], sourceIndex, targetIndex));

const arrayMove = <T>(arr: T[], sourceIndex: number, targetIndex: number) => {
  arr.splice(targetIndex, 0, arr.splice(sourceIndex, 1)[0]);
  return arr;
};
