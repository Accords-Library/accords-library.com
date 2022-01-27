import Link from "next/link";
import { GetLibraryItemsPreviewQuery } from "graphql/operations-types";
import { getAssetURL } from "queries/helpers";
import Image from "next/image";

export type LibraryItemComponentProps = {
  item: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number];
};

export default function LibraryItemComponent(
  props: LibraryItemComponentProps
): JSX.Element {
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
      <div className="cursor-pointer grid items-end relative hover:rounded-3xl [--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02] transition-transform">
        <div className="bg-light absolute inset-1 rounded-lg shadow-dark shadow-xl"></div>
        {props.item.attributes.thumbnail.data ? (
          <Image
            src={getAssetURL(
              props.item.attributes.thumbnail.data.attributes.url
            )}
            alt={props.item.attributes.thumbnail.data.attributes.alternativeText}
            height={props.item.attributes.thumbnail.data.attributes.height}
            width={props.item.attributes.thumbnail.data.attributes.width}
          />
        ) : (
          <div className="w-full aspect-[21/29.7]"></div>
        )}
        <div className="linearbg-1 shadow-[0_0_1em_rgb(0,0,0,0.2)] absolute bottom-0 left-0 right-0 h-auto opacity-[var(--cover-opacity)] transition-opacity z-20 grid p-4 gap-4 text-left">
          <div>
            <h2 className="text-lg leading-7">{props.item.attributes.title}</h2>
            <h3 className="leading-3">{props.item.attributes.subtitle}</h3>
          </div>
          <div className="grid grid-flow-col">
            <p className="text-sm">
              <span className="material-icons !text-base translate-y-[.15em] mr-1">
                event
              </span>
              {prettyDate(props.item.attributes.release_date)}
            </p>
            {props.item.attributes.price ? (
              <p className="text-sm justify-self-end">
                <span className="material-icons !text-base translate-y-[.15em] mr-1">
                  shopping_cart
                </span>
                {props.item.attributes.price.currency.data.attributes.symbol}
                {props.item.attributes.price.amount}
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
