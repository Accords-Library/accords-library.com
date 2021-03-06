import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { InsetBox } from "components/InsetBox";
import { Markdawn } from "components/Markdown/Markdawn";
import { GetContentTextQuery, UploadImageFragment } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettyInlineTitle, prettySlug, slugify } from "helpers/formatters";
import { getAssetURL, ImageQuality } from "helpers/img";
import { filterHasAttributes } from "helpers/others";
import { useLightBox } from "hooks/useLightBox";

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
  langui: AppStaticProps["langui"];
  languageSwitcher?: JSX.Element;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ThumbnailHeader = ({
  langui,
  pre_title,
  title,
  subtitle,
  thumbnail,
  type,
  categories,
  description,
  languageSwitcher,
}: Props): JSX.Element => {
  const [openLightBox, LightBox] = useLightBox();

  return (
    <>
      <LightBox />
      <div className="mb-12 grid place-items-center gap-12">
        <div className="drop-shadow-shade-lg">
          {thumbnail ? (
            <Img
              className="cursor-pointer rounded-xl"
              image={thumbnail}
              quality={ImageQuality.Medium}
              onClick={() => {
                openLightBox([getAssetURL(thumbnail.url, ImageQuality.Large)]);
              }}
            />
          ) : (
            <div className="aspect-[4/3] w-96 rounded-xl bg-light"></div>
          )}
        </div>
        <div
          id={slugify(
            prettyInlineTitle(pre_title ?? "", title, subtitle ?? "")
          )}
          className="grid place-items-center text-center"
        >
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
                  type.data.attributes.titles?.[0]?.title ??
                  prettySlug(type.data.attributes.slug)
                }
              />
            </div>
          </div>
        )}

        {categories && categories.data.length > 0 && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{langui.categories}</h3>
            <div className="flex flex-row flex-wrap place-content-center gap-2">
              {filterHasAttributes(categories.data, [
                "attributes",
                "id",
              ] as const).map((category) => (
                <Chip key={category.id} text={category.attributes.name} />
              ))}
            </div>
          </div>
        )}
        {languageSwitcher}
      </div>
      {description && (
        <InsetBox className="mt-8">
          {<Markdawn text={description} langui={langui} />}
        </InsetBox>
      )}
    </>
  );
};
