import Link from "next/link";
import { GetLibraryItemsPreviewQuery } from "graphql/operations-types";
import { getAssetURL, prettyDate, prettyPrice } from "queries/helpers";
import Image from "next/image";

export type LibraryContentPreviewProps = {
  item: {
    slug: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["slug"];
    thumbnail: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["thumbnail"];
    title: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["title"];
    subtitle: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["subtitle"];
    price?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["price"];
    release_date?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["release_date"];
  };
};

export default function LibraryContentPreview(
  props: LibraryContentPreviewProps
): JSX.Element {
  const item = props.item;

  return (
    <Link href={"/library/media/" + item.slug} passHref>
      <div className="drop-shadow-dark-xl cursor-pointer grid items-end hover:rounded-3xl [--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02] transition-transform">
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
        <div className="linearbg-1 drop-shadow-dark-lg absolute bottom-2 inset-x-[-0.15rem] opacity-[var(--cover-opacity)] transition-opacity z-20 grid p-4 gap-4 text-left">
          <div>
            <h2 className="text-lg leading-7">{item.title}</h2>
            <h3 className="leading-3">{item.subtitle}</h3>
          </div>
          <div className="grid grid-flow-col">
            {item.release_date ? (
              <p className="text-sm">
                <span className="material-icons !text-base translate-y-[.15em] mr-1">
                  event
                </span>
                {prettyDate(item.release_date)}
              </p>
            ) : (
              ""
            )}
            {item.price ? (
              <p className="text-sm justify-self-end">
                <span className="material-icons !text-base translate-y-[.15em] mr-1">
                  shopping_cart
                </span>
                {prettyPrice(item.price)}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

