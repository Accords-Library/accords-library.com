import Chip from "components/Chip";
import Img, { ImageQuality } from "components/Img";
import InsetBox from "components/InsetBox";
import { GetContentQuery, UploadImageFragment } from "graphql/generated";
import { AppStaticProps } from "queries/getAppStaticProps";
import { prettyinlineTitle, prettySlug, slugify } from "queries/helpers";

interface Props {
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  description?: string | null | undefined;
  type?: Exclude<
    Exclude<
      GetContentQuery["contents"],
      null | undefined
    >["data"][number]["attributes"],
    null | undefined
  >["type"];
  categories?: Exclude<
    Exclude<
      GetContentQuery["contents"],
      null | undefined
    >["data"][number]["attributes"],
    null | undefined
  >["categories"];
  thumbnail?: UploadImageFragment | null | undefined;
  langui: AppStaticProps["langui"];
}

export default function ThumbnailHeader(props: Props): JSX.Element {
  const {
    langui,
    pre_title,
    title,
    subtitle,
    thumbnail,
    type,
    categories,
    description,
  } = props;

  return (
    <>
      <div className="grid place-items-center gap-12 mb-12">
        <div className="drop-shadow-shade-lg">
          {thumbnail ? (
            <Img
              className=" rounded-xl"
              image={thumbnail}
              quality={ImageQuality.Medium}
              priority
            />
          ) : (
            <div className="w-96 aspect-[4/3] bg-light rounded-xl"></div>
          )}
        </div>
        <div
          id={slugify(
            prettyinlineTitle(pre_title ?? "", title, subtitle ?? "")
          )}
          className="grid place-items-center text-center"
        >
          <p className="text-2xl">{pre_title}</p>
          <h1 className="text-3xl">{title}</h1>
          <h2 className="text-2xl">{subtitle}</h2>
        </div>
      </div>

      <div className="grid grid-flow-col gap-8">
        {type?.data?.attributes && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{langui.type}</h3>
            <div className="flex flex-row flex-wrap">
              <Chip>
                {type.data.attributes.titles &&
                type.data.attributes.titles.length > 0
                  ? type.data.attributes.titles[0]?.title
                  : prettySlug(type.data.attributes.slug)}
              </Chip>
            </div>
          </div>
        )}

        {categories && categories.data.length > 0 && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{langui.categories}</h3>
            <div className="flex flex-row flex-wrap place-content-center gap-2">
              {categories.data.map((category) => (
                <Chip key={category.id}>{category.attributes?.name}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>
      {description && <InsetBox className="mt-8">{description}</InsetBox>}
    </>
  );
}
