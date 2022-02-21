import Link from "next/link";
import { GetContentsQuery } from "graphql/operations-types";
import { prettySlug } from "queries/helpers";
import Chip from "components/Chip";
import Img, { ImageQuality } from "components/Img";

export type LibraryContentPreviewProps = {
  item: {
    slug: GetContentsQuery["contents"]["data"][number]["attributes"]["slug"];
    thumbnail: GetContentsQuery["contents"]["data"][number]["attributes"]["thumbnail"];
    titles: GetContentsQuery["contents"]["data"][number]["attributes"]["titles"];
    categories: GetContentsQuery["contents"]["data"][number]["attributes"]["categories"];
    type: GetContentsQuery["contents"]["data"][number]["attributes"]["type"];
  };
};

export default function LibraryContentPreview(
  props: LibraryContentPreviewProps
): JSX.Element {
  const item = props.item;

  return (
    <Link href={"/contents/" + item.slug} passHref>
      <div className="drop-shadow-dark-xl cursor-pointer grid items-end fine:[--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02] transition-transform">
        {item.thumbnail.data ? (
          <Img
            className="rounded-md coarse:rounded-b-none"
            image={item.thumbnail.data.attributes}
            quality={ImageQuality.Medium}
          />
        ) : (
          <div className="w-full aspect-[3/2] bg-light rounded-lg"></div>
        )}
        <div className="linearbg-1 fine:drop-shadow-dark-lg fine:absolute coarse:rounded-b-md bottom-2 -inset-x-0.5 opacity-[var(--cover-opacity)] transition-opacity z-20 grid p-4 gap-2">
          <div className="grid grid-flow-col gap-1 overflow-hidden place-content-start">
            {item.type ? (
              <Chip>
                {item.type.data.attributes.titles.length > 0
                  ? item.type.data.attributes.titles[0].title
                  : prettySlug(item.type.data.attributes.slug)}
              </Chip>
            ) : (
              ""
            )}
          </div>
          <div>
            {item.titles.length > 0 ? (
              <>
                <p>{item.titles[0].pre_title}</p>
                <h1 className="text-lg">{item.titles[0].title}</h1>
                <h2>{item.titles[0].subtitle}</h2>
              </>
            ) : (
              <h1 className="text-lg">{prettySlug(item.slug)}</h1>
            )}
          </div>
          <div className="grid grid-flow-col gap-1 overflow-x-scroll webkit-scrollbar:w-0 [scrollbar-width:none] place-content-start">
            {item.categories.data.map((category) => (
              <Chip key={category.id} className="text-sm">
                {category.attributes.short}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
