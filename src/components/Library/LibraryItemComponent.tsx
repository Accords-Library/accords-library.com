import styles from "styles/Library/LibraryItemComponent.module.css";
import Link from "next/link";
import Image from "next/image";
import { GetLibraryItemsPreviewQuery } from "graphql/operations-types";
import { getAssetURL } from "queries/helpers";

export type LibraryItemComponentProps = {
  item: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number];
};

export default function LibraryItemComponent(
  props: LibraryItemComponentProps
): JSX.Element {
  function prettyTitleSubtitle(title: string, subtitle: string): string {
    let result = title;
    if (subtitle !== null) result += " - " + subtitle;
    return result;
  }

  function prettyDate(
    date: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["release_date"]
  ): string {
    return (
      date.year +
      "/" +
      date.month.toString().padStart(2, "0") +
      "/" +
      date.day.toString().padStart(2, "0")
    );
  }

  return (
    <Link href={"/library/" + props.item.attributes.slug} passHref>
      <div className={styles.libraryItem}>
        <h2>
          {prettyTitleSubtitle(
            props.item.attributes.title,
            props.item.attributes.subtitle
          )}
        </h2>
        <p>{prettyDate(props.item.attributes.release_date)}</p>

        {props.item.attributes.thumbnail.data ? (
          <Image
            src={getAssetURL(
              props.item.attributes.thumbnail.data.attributes.url
            )}
            alt={
              props.item.attributes.thumbnail.data.attributes.alternativeText
            }
            width={props.item.attributes.thumbnail.data.attributes.width}
            height={props.item.attributes.thumbnail.data.attributes.height}
          />
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
