import Link from "next/link";
import { GetLibraryItemsPreviewQuery } from "graphql/operations-types";
import { getAssetURL, prettyDate, prettyPrice } from "queries/helpers";
import Image from "next/image";

export type LibraryItemComponentProps = {
  item: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number];
};

export default function LibraryItemComponent(
  props: LibraryItemComponentProps
): JSX.Element {
  const item = props.item.attributes;

  return (
    <Link href={"/library/" + item.slug} passHref>
      <div className="cursor-pointer grid items-end relative hover:rounded-3xl [--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02] transition-transform">
        <div className="bg-light absolute inset-1 rounded-lg shadow-dark shadow-xl"></div>
        {item.thumbnail.data ? (
          <Image
            src={getAssetURL(item.thumbnail.data.attributes.url)}
            alt={item.thumbnail.data.attributes.alternativeText}
            height={item.thumbnail.data.attributes.height}
            width={item.thumbnail.data.attributes.width}
          />
        ) : (
          <div className="w-full aspect-[21/29.7]"></div>
        )}
        <div className="linearbg-1 shadow-[0_0_1em_rgb(0,0,0,0.2)] absolute bottom-0 left-0 right-0 h-auto opacity-[var(--cover-opacity)] transition-opacity z-20 grid p-4 gap-4 text-left">
          <div>
            <h2 className="text-lg leading-7">{item.title}</h2>
            <h3 className="leading-3">{item.subtitle}</h3>
          </div>
          <div className="grid grid-flow-col">
            {item.price ? (
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
