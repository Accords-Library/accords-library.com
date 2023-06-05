import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { InsetBox } from "components/Containers/InsetBox";
import { Markdawn } from "components/Markdown/Markdawn";
import { UploadImageFragment } from "graphql/generated";
import { prettyInlineTitle, slugify } from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";
import { useFormat } from "hooks/useFormat";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  description?: string | null | undefined;
  type?: string;
  categories?: string[];
  thumbnail?: UploadImageFragment | null | undefined;
  className?: string;
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
  className,
}: Props): JSX.Element => {
  const { format } = useFormat();
  const { showLightBox } = useAtomGetter(atoms.lightBox);

  return (
    <div className={className}>
      <div className={"mb-12 grid place-items-center gap-12"}>
        <div className="drop-shadow-lg shadow-shade">
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
        {type && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{format("type", { count: 1 })}</h3>
            <div className="flex flex-row flex-wrap">
              <Chip text={type} />
            </div>
          </div>
        )}

        {categories && categories.length > 0 && (
          <div className="flex flex-col place-items-center gap-2">
            <h3 className="text-xl">{format("category", { count: categories.length })}</h3>
            <div className="flex flex-row flex-wrap place-content-center gap-2">
              {categories.map((category) => (
                <Chip key={category} text={category} />
              ))}
            </div>
          </div>
        )}
        {languageSwitcher}
      </div>
      {description && <InsetBox className="mt-8">{<Markdawn text={description} />}</InsetBox>}
    </div>
  );
};
