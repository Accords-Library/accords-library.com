import { useCallback } from "react";
import { Chip } from "./Chip";
import { Img } from "./Img";
import { UpPressable } from "./Containers/UpPressable";
import { UploadImageFragment } from "graphql/generated";
import { ImageQuality } from "helpers/img";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { cIf, cJoin } from "helpers/className";
import { isDefined } from "helpers/others";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  href: string;
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  topChips?: string[];
  bottomChips?: string[];
  disabled?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PreviewLine = ({
  href,
  thumbnail,
  pre_title,
  title,
  subtitle,
  topChips,
  disabled,
  bottomChips,
}: Props): JSX.Element => (
  <UpPressable href={href} disabled={disabled}>
    <div
      className={cJoin(
        "grid w-full grid-flow-col place-items-center gap-4",
        cIf(disabled, "pointer-events-none touch-none select-none")
      )}>
      {thumbnail && (
        <div className="h-full w-full">
          <Img className="h-full object-cover" src={thumbnail} quality={ImageQuality.Medium} />
        </div>
      )}

      <div className={cJoin("grid gap-2 py-4", cIf(isDefined(thumbnail), "pr-3", "px-6"))}>
        {topChips && topChips.length > 0 && (
          <div
            className="grid grid-flow-col place-content-start gap-1 overflow-scroll
          scrollbar-none">
            {topChips.map((text, index) => (
              <Chip key={index} text={text} />
            ))}
          </div>
        )}
        <div className="my-1 flex flex-col">
          {pre_title && <p className="mb-1 leading-none">{pre_title}</p>}
          {title && <p className="font-headers text-lg font-bold leading-none">{title}</p>}
          {subtitle && <p className="leading-none">{subtitle}</p>}
        </div>
        {bottomChips && bottomChips.length > 0 && (
          <div
            className="grid grid-flow-col place-content-start gap-1 overflow-scroll
          scrollbar-none">
            {bottomChips.map((text, index) => (
              <Chip key={index} className="text-sm" text={text} />
            ))}
          </div>
        )}
      </div>
    </div>
  </UpPressable>
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
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
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
