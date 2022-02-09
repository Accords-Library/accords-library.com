import { GetContentQuery } from "graphql/operations-types";
import { getAssetURL, prettySlug } from "queries/helpers";
import Image from "next/image";
import Button from "components/Button";

export type ThumbnailHeaderProps = {
  content: {
    thumbnail: GetContentQuery["contents"]["data"][number]["attributes"]["thumbnail"];
    titles: GetContentQuery["contents"]["data"][number]["attributes"]["titles"];
    type: GetContentQuery["contents"]["data"][number]["attributes"]["type"];
    categories: GetContentQuery["contents"]["data"][number]["attributes"]["categories"];
  };
};

export default function ThumbnailHeader(
  props: ThumbnailHeaderProps
): JSX.Element {
  const content = props.content;

  return (
    <>
      <div className="grid place-items-center gap-12  mb-12">
        <div className="drop-shadow-dark-lg">
          <Image
            className=" rounded-xl"
            src={getAssetURL(content.thumbnail.data.attributes.url)}
            alt={content.thumbnail.data.attributes.alternativeText}
            width={content.thumbnail.data.attributes.width}
            height={content.thumbnail.data.attributes.height}
          />
        </div>
        <div className="grid place-items-center">
          <p className="text-2xl">{content.titles[0].pre_title}</p>
          <h1 className="text-3xl">{content.titles[0].title}</h1>
          <h2 className="text-2xl">{content.titles[0].subtitle}</h2>
        </div>
      </div>

      <div className="grid grid-flow-col gap-8">
        {content.type ? (
          <div className="grid place-items-center place-content-start gap-2">
            <h3 className="text-xl">Type</h3>
            <Button>{prettySlug(content.type.data.attributes.slug)}</Button>
          </div>
        ) : (
          ""
        )}

        {content.categories.data.length > 0 ? (
          <div className="grid place-items-center place-content-start gap-2">
            <h3 className="text-xl">Categories</h3>
            {content.categories.data.map((category) => (
              <Button key={category.id}>{category.attributes.name}</Button>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
