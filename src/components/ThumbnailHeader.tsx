import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { InsetBox } from "components/Containers/InsetBox";
import { Markdawn } from "components/Markdown/Markdawn";
import { GetContentTextQuery, UploadImageFragment } from "graphql/generated";
import { prettyInlineTitle, prettySlug, slugify } from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { filterHasAttributes } from "helpers/others";
import { useLocalData } from "contexts/LocalDataContext";
import { useLightBox } from "contexts/LightBoxContext";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  description?: string | null | undefined;
  type?: NonNullable<
    NonNullable<GetContentTextQuery["contents"]>["data"][number]["attributes"]
  >["type"];
  categories?: NonNullable<
    NonNullable<GetContentTextQuery["contents"]>["data"][number]["attributes"]
  >["categories"];
  thumbnail?: UploadImageFragment | null | undefined;

  languageSwitcher?: JSX.Element;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ThumbnailHeader = ({
  pre_title,
  title,
  subtitle,
  thumbnail,
  type,
  categories,
  description,
  languageSwitcher,
}: Props): JSX.Element => {
  const { langui } = useLocalData();
  const { showLightBox } = useLightBox();

  return (
    <>
      <div className="mb-12 grid place-items-center gap-12">
        <div className="shadow-shade drop-shadow-lg">
          {thumbnail ? (
            <Img
              className="cursor-pointer rounded-xl"
              src={thumbnail}
              quality={ImageQuality.Medium}
              onClick={() => showLightBox([thumbnail])}
            />
          ) : (
            <div className="aspect-[4/3] w-96 rounded-xl bg-light" />
          )}
        </div>
        <div
          id={slugify(prettyInlineTitle(pre_title ?? "", title, subtitle ?? ""))}
          className="grid place-items-center text-center">
          <p className="text-2xl">{pre_title}</p>
          <h1 className="text-3xl">{title}</h1>
          <h2 className="text-2xl">{subtitle}</h2>
        </div>
      </div>

      <div className="flew-wrap flex flex-row place-content-center gap-8">
        {type?.data?.attributes && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{langui.type}</h3>
            <div className="flex flex-row flex-wrap">
              <Chip
                text={
                  type.data.attributes.titles?.[0]?.title ?? prettySlug(type.data.attributes.slug)
                }
              />
            </div>
          </div>
        )}

        {categories && categories.data.length > 0 && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{langui.categories}</h3>
            <div className="flex flex-row flex-wrap place-content-center gap-2">
              {filterHasAttributes(categories.data, ["attributes", "id"] as const).map(
                (category) => (
                  <Chip key={category.id} text={category.attributes.name} />
                )
              )}
            </div>
          </div>
        )}
        {languageSwitcher}
      </div>
      {description && <InsetBox className="mt-8">{<Markdawn text={description} />}</InsetBox>}
    </>
  );
};
