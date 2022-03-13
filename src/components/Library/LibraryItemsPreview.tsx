import Link from "next/link";
import {
  GetCurrenciesQuery,
  GetLibraryItemsPreviewQuery,
} from "graphql/operations-types";
import { prettyDate, prettyPrice, prettyItemSubType } from "queries/helpers";
import Chip from "components/Chip";
import Img, { ImageQuality } from "components/Img";
import { useAppLayout } from "contexts/AppLayoutContext";

export type LibraryItemsPreviewProps = {
  className?: string;
  item: {
    slug: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["slug"];
    thumbnail: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["thumbnail"];
    title: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["title"];
    subtitle: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["subtitle"];
    price?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["price"];
    categories: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["categories"];
    release_date?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["release_date"];
    metadata?: GetLibraryItemsPreviewQuery["libraryItems"]["data"][number]["attributes"]["metadata"];
  };
  currencies?: GetCurrenciesQuery["currencies"]["data"];
};

export default function LibraryItemsPreview(
  props: LibraryItemsPreviewProps
): JSX.Element {
  const item = props.item;
  const appLayout = useAppLayout();

  return (
    <Link href={"/library/" + item.slug} passHref>
      <div
        className={`drop-shadow-shade-xl cursor-pointer grid items-end hover:rounded-3xl fine:[--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02] transition-transform ${props.className}`}
      >
        {item.thumbnail.data ? (
          <Img
            image={item.thumbnail.data.attributes}
            quality={ImageQuality.Small}
          />
        ) : (
          <div className="w-full aspect-[21/29.7] bg-light rounded-lg"></div>
        )}

        <div className="linearbg-obi fine:drop-shadow-shade-lg fine:absolute place-items-start bottom-2 -inset-x-0.5 opacity-[var(--cover-opacity)] transition-opacity z-20 grid p-4 gap-2">
          {item.metadata && item.metadata.length > 0 && (
            <div className="flex flex-row gap-1">
              <Chip>{prettyItemSubType(item.metadata[0])}</Chip>
            </div>
          )}

          <div>
            <h2 className="mobile:text-sm text-lg leading-5">{item.title}</h2>
            <h3 className="mobile:text-xs leading-3">{item.subtitle}</h3>
          </div>

          <div className="w-full grid grid-flow-col gap-1 overflow-x-scroll webkit-scrollbar:h-0 [scrollbar-width:none] place-content-start">
            {item.categories.data.map((category) => (
              <Chip key={category.id} className="text-sm">
                {category.attributes.short}
              </Chip>
            ))}
          </div>

          {(item.release_date || item.price) && (
            <div className="grid grid-flow-col w-full">
              {item.release_date && (
                <p className="mobile:text-xs text-sm">
                  <span className="material-icons !text-base translate-y-[.15em] mr-1">
                    event
                  </span>
                  {prettyDate(item.release_date)}
                </p>
              )}
              {item.price && props.currencies && (
                <p className="mobile:text-xs text-sm justify-self-end">
                  <span className="material-icons !text-base translate-y-[.15em] mr-1">
                    shopping_cart
                  </span>
                  {prettyPrice(
                    item.price,
                    props.currencies,
                    appLayout.currency
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
