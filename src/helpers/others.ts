import {
  Enum_Componentsetstextset_Status,
  GetLibraryItemQuery,
  GetLibraryItemScansQuery,
} from "graphql/generated";
import { AppStaticProps } from "./getAppStaticProps";

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

export function arrayMove<T>(arr: T[], old_index: number, new_index: number) {
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}
