import Link from "next/link";
import {
  GetLibraryItemsPreviewQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import {
  getAssetURL,
  prettyDate,
  prettyPrice,
  prettyItemSubType,
} from "queries/helpers";
import Image from "next/image";
import Chip from "components/Chip";

export type LibraryItemsPreviewProps = {
  className?: string;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
  item: {
    slug: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["slug"];
    thumbnail: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["thumbnail"];
    title: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["title"];
    subtitle: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["subtitle"];
    price?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["price"];
    release_date?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["release_date"];
    metadata?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["metadata"];
  };
};

export default function LibraryItemsPreview(
  props: LibraryItemsPreviewProps
): JSX.Element {
  const item = props.item;
  const langui = props.langui;

  return (
    <Link href={"/library/items/" + item.slug} passHref>
      <div
        className={`drop-shadow-dark-xl cursor-pointer grid items-end hover:rounded-3xl fine:[--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02] transition-transform ${props.className}`}
      >
        {item.thumbnail.data ? (
          <Image
            src={getAssetURL(item.thumbnail.data.attributes.url)}
            alt={item.thumbnail.data.attributes.alternativeText}
            height={item.thumbnail.data.attributes.height}
            width={item.thumbnail.data.attributes.width}
          />
        ) : (
          <div className="w-full aspect-[21/29.7] bg-light rounded-lg"></div>
        )}

        <div className="linearbg-1 fine:drop-shadow-dark-lg fine:absolute place-items-start bottom-2 -inset-x-0.5 opacity-[var(--cover-opacity)] transition-opacity z-20 grid p-4 gap-2">
          {item.metadata && item.metadata.length > 0 ? (
            <div className="flex flex-row gap-1">
              <Chip>{prettyItemSubType(item.metadata[0])}</Chip>
            </div>
          ) : (
            ""
          )}

          <div>
            <h2 className="mobile:text-sm text-lg leading-5">{item.title}</h2>
            <h3 className="mobile:text-xs leading-3">{item.subtitle}</h3>
          </div>
          {item.release_date || item.price ? (
            <div className="grid grid-flow-col w-full">
              {item.release_date ? (
                <p className="mobile:text-xs text-sm">
                  <span className="material-icons !text-base translate-y-[.15em] mr-1">
                    event
                  </span>
                  {prettyDate(item.release_date)}
                </p>
              ) : (
                ""
              )}
              {item.price ? (
                <p className="mobile:text-xs text-sm justify-self-end">
                  <span className="material-icons !text-base translate-y-[.15em] mr-1">
                    shopping_cart
                  </span>
                  {prettyPrice(item.price)}
                </p>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}