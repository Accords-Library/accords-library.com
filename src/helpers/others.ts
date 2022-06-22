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

export function sortContent(contents: SortContentProps) {
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

export function isDefined<T>(t: T): t is NonNullable<T> {
  return t !== null && t !== undefined;
}

export function isUndefined<T>(t: T | undefined | null): t is undefined | null {
  return t === null || t === undefined;
}

export function isDefinedAndNotEmpty(
  string: string | undefined | null
): string is string {
  return isDefined(string) && string.length > 0;
}

export function filterDefined<T>(t: T[] | undefined | null): NonNullable<T>[] {
  if (isUndefined(t)) return [];
  return t.filter((item) => isDefined(item)) as NonNullable<T>[];
}

export function filterHasAttributes<T, P extends keyof NonNullable<T>>(
  t: T[] | undefined | null,
  attributes?: P[]
): SelectiveRequiredNonNullable<NonNullable<T>, P>[] {
  if (isUndefined(t)) return [];
  return t.filter((item) => {
    if (isDefined(item)) {
      const attributesToCheck = attributes ?? (Object.keys(item) as P[]);
      return attributesToCheck.every((attribute) => isDefined(item[attribute]));
    }
    return false;
  }) as unknown as SelectiveRequiredNonNullable<NonNullable<T>, P>[];
}

export function iterateMap<K, V, U>(
  map: Map<K, V>,
  callbackfn: (key: K, value: V, index: number) => U
): U[] {
  const result: U[] = [];
  let index = 0;
  for (const [key, value] of map.entries()) {
    result.push(callbackfn(key, value, index));
    index += 1;
  }
  return result;
}

export function mapMoveEntry<K, V>(
  map: Map<K, V>,
  sourceIndex: number,
  targetIndex: number
) {
  return new Map(arrayMove([...map], sourceIndex, targetIndex));
}

function arrayMove<T>(arr: T[], sourceIndex: number, targetIndex: number) {
  arr.splice(targetIndex, 0, arr.splice(sourceIndex, 1)[0]);
  return arr;
}

export function mapRemoveEmptyValues<K, V>(groups: Map<K, V[]>): Map<K, V[]> {
  return new Map([...groups].filter(([_, items]) => items.length > 0));
}
