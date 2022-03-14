import {
  GetContentQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { prettyinlineTitle, prettySlug, slugify } from "queries/helpers";
import Button from "components/Button";
import Img, { ImageQuality } from "components/Img";
import InsetBox from "components/InsetBox";
import Chip from "components/Chip";

export type ThumbnailHeaderProps = {
  content: {
    slug: GetContentQuery["contents"]["data"][number]["attributes"]["slug"];
    thumbnail: GetContentQuery["contents"]["data"][number]["attributes"]["thumbnail"];
    titles: GetContentQuery["contents"]["data"][number]["attributes"]["titles"];
    type: GetContentQuery["contents"]["data"][number]["attributes"]["type"];
    categories: GetContentQuery["contents"]["data"][number]["attributes"]["categories"];
  };
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function ThumbnailHeader(
  props: ThumbnailHeaderProps
): JSX.Element {
  const content = props.content;
  const langui = props.langui;

  return (
    <>
      <div className="grid place-items-center gap-12 mb-12">
        <div className="drop-shadow-shade-lg">
          {content.thumbnail.data ? (
            <Img
              className=" rounded-xl"
              image={content.thumbnail.data.attributes}
              quality={ImageQuality.Medium}
              priority
            />
          ) : (
            <div className="w-full aspect-[4/3] bg-light rounded-xl"></div>
          )}
        </div>
        <div
          id={slugify(
            content.titles.length > 0
              ? prettyinlineTitle(
                  content.titles[0].pre_title,
                  content.titles[0].title,
                  content.titles[0].subtitle
                )
              : prettySlug(content.slug)
          )}
          className="grid place-items-center text-center"
        >
          {content.titles.length > 0 ? (
            <>
              <p className="text-2xl">{content.titles[0].pre_title}</p>
              <h1 className="text-3xl">{content.titles[0].title}</h1>
              <h2 className="text-2xl">{content.titles[0].subtitle}</h2>
            </>
          ) : (
            <h1 className="text-3xl">{prettySlug(content.slug)}</h1>
          )}
        </div>
      </div>

      <div className="grid grid-flow-col gap-8">
        {content.type.data && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{langui.type}</h3>
            <div className="flex flex-row flex-wrap">
              <Chip>
                {content.type.data.attributes.titles.length > 0
                  ? content.type.data.attributes.titles[0].title
                  : prettySlug(content.type.data.attributes.slug)}
              </Chip>
            </div>
          </div>
        )}

        {content.categories.data.length > 0 && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{langui.categories}</h3>
            <div className="flex flex-row flex-wrap place-content-center gap-2">
              {content.categories.data.map((category) => (
                <Chip key={category.id}>{category.attributes.name}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>
      {content.titles.length > 0 && content.titles[0].description && (
        <InsetBox className="mt-8">{content.titles[0].description}</InsetBox>
      )}
    </>
  );
}
