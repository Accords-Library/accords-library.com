import Link from "next/link";
import { GetContentsQuery } from "graphql/operations-types";
import { getAssetURL, prettySlug } from "queries/helpers";
import Image from "next/image";

export type LibraryContentPreviewProps = {
  item: {
    slug: GetContentsQuery["contents"]["data"][number]["attributes"]["slug"];
    thumbnail: GetContentsQuery["contents"]["data"][number]["attributes"]["thumbnail"];
    titles: GetContentsQuery["contents"]["data"][number]["attributes"]["titles"];
  };
};

export default function LibraryContentPreview(
  props: LibraryContentPreviewProps
): JSX.Element {
  const item = props.item;

  return (
    <Link href={"/library/content/" + item.slug} passHref>
      <div className="drop-shadow-dark-xl cursor-pointer grid items-end hover:rounded-3xl [--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02] transition-transform">
        {item.thumbnail.data ? (
          <Image
            src={getAssetURL(item.thumbnail.data.attributes.url)}
            alt={item.thumbnail.data.attributes.alternativeText}
            height={item.thumbnail.data.attributes.height}
            width={item.thumbnail.data.attributes.width}
          />
        ) : (
          <div className="w-full aspect-[3/2] bg-light rounded-lg"></div>
        )}
        <div className="linearbg-1 drop-shadow-dark-lg absolute bottom-2 inset-x-[-0.15rem] opacity-[var(--cover-opacity)] transition-opacity z-20 grid p-4 gap-4 text-left">
          <div>
          {item.titles.length > 0 ? (
            <>
              <p>{item.titles[0].pre_title}</p>
              <h1 className="text-lg">{item.titles[0].title}</h1>
              <h2>{item.titles[0].subtitle}</h2>
            </>
          ) : (
            <h1 className="text-3xl">{prettySlug(item.slug)}</h1>
          )}
          </div>
        </div>
      </div>
    </Link>
  );
}
