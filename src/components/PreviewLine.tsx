import { useCallback } from "react";
import { Chip } from "./Chip";
import { Img } from "./Img";
import { Link } from "./Inputs/Link";
import { UploadImageFragment } from "graphql/generated";
import { ImageQuality } from "helpers/img";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  thumbnailAspectRatio?: string;
  href: string;
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  topChips?: string[];
  bottomChips?: string[];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const PreviewLine = ({
  href,
  thumbnail,
  pre_title,
  title,
  subtitle,
  topChips,
  bottomChips,
  thumbnailAspectRatio,
}: Props): JSX.Element => (
  <Link
    href={href}
    className="flex h-36 w-full cursor-pointer flex-row place-items-center gap-4 overflow-hidden
    rounded-md bg-light pr-4 transition-transform drop-shadow-shade-xl hover:scale-[1.02]"
  >
    {thumbnail ? (
      <div className="aspect-[3/2] h-full">
        <Img
          className="h-full object-cover"
          src={thumbnail}
          quality={ImageQuality.Medium}
        />
      </div>
    ) : (
      <div style={{ aspectRatio: thumbnailAspectRatio }}></div>
    )}
    <div className="grid gap-2">
      {topChips && topChips.length > 0 && (
        <div className="grid grid-flow-col place-content-start gap-1 overflow-hidden">
          {topChips.map((text, index) => (
            <Chip key={index} text={text} />
          ))}
        </div>
      )}
      <div className="my-1 flex flex-col">
        {pre_title && <p className="mb-1 leading-none">{pre_title}</p>}
        {title && (
          <p className="font-headers text-lg font-bold leading-none">{title}</p>
        )}
        {subtitle && <p className="leading-none">{subtitle}</p>}
      </div>
      {bottomChips && bottomChips.length > 0 && (
        <div className="grid grid-flow-col place-content-start gap-1 overflow-hidden">
          {bottomChips.map((text, index) => (
            <Chip key={index} className="text-sm" text={text} />
          ))}
        </div>
      )}
    </div>
  </Link>
);

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedPreviewLine = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Props, "pre_title" | "subtitle" | "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback(
      (item: { language: string }): string => item.language,
      []
    ),
  });
  return (
    <PreviewLine
      pre_title={selectedTranslation?.pre_title ?? fallback.pre_title}
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      {...otherProps}
    />
  );
};
