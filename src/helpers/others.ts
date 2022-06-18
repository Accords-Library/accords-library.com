import {
  Enum_Componentsetstextset_Status,
  GetLibraryItemQuery,
  GetLibraryItemScansQuery,
} from "graphql/generated";
import { AppStaticProps } from "../graphql/getAppStaticProps";
import { Immutable } from "./types";

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

export function sortContent(contents: Immutable<SortContentProps>) {
  if (contents) {
    const newContent = { ...contents } as SortContentProps;
    newContent?.data.sort((a, b) => {
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
    return newContent as Immutable<SortContentProps>;
  }
  return contents;
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

export function arrayMove<T>(arr: T[], old_index: number, new_index: number) {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
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

export function filterDefined<T>(t: T[]): NonNullable<T>[] {
  return t.filter((item) => isDefined(item)) as NonNullable<T>[];
}
