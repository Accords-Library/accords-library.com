import { MouseEventHandler, useCallback } from "react";
import { Markdown } from "./Markdown/Markdown";
import { Chip } from "components/Chip";
import { Ico } from "components/Ico";
import { Img } from "components/Img";
import { UpPressable } from "components/Containers/UpPressable";
import { DatePickerFragment, PricePickerFragment, UploadImageFragment } from "graphql/generated";
import { cIf, cJoin } from "helpers/className";
import { prettyDuration, prettyShortenNumber } from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { TranslatedProps } from "types/TranslatedProps";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";
import { isDefined } from "helpers/asserts";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  thumbnailAspectRatio?: string;
  thumbnailForceAspectRatio?: boolean;
  thumbnailFitMethod?: "contain" | "cover";
  thumbnailRounded?: boolean;
  href: string;
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  description?: string | null | undefined;
  topChips?: string[];
  bottomChips?: string[];
  keepInfoVisible?: boolean;
  metadata?: {
    releaseDate?: DatePickerFragment | null;
    releaseDateFormat?: Intl.DateTimeFormatOptions["dateStyle"];
    price?: PricePickerFragment | null;
    views?: number;
    author?: string;
    position: "Bottom" | "Top";
  };
  infoAppend?: React.ReactNode;
  hoverlay?:
    | {
        __typename: "Video";
        duration: number;
      }
    | { __typename: "anotherHoverlayName" };
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PreviewCard = ({
  href,
  thumbnail,
  thumbnailAspectRatio = "4/3",
  thumbnailForceAspectRatio = false,
  thumbnailFitMethod = "cover",
  thumbnailRounded = true,
  pre_title,
  title,
  subtitle,
  description,
  topChips,
  bottomChips,
  keepInfoVisible,
  metadata,
  hoverlay,
  infoAppend,
  className,
  disabled = false,
  onClick,
}: Props): JSX.Element => {
  const { formatPrice, formatDate } = useFormat();
  const isPerfModeEnabled = useAtomGetter(atoms.settings.isPerfModeEnabled);
  const preferredCurrency = useAtomGetter(atoms.settings.currency);
  const isHoverable = useDeviceSupportsHover();

  const metadataJSX = (
    <>
      {metadata && (isDefined(metadata.releaseDate) || isDefined(metadata.price)) && (
        <div className="flex w-full flex-row flex-wrap gap-x-3">
          {metadata.releaseDate && (
            <p className="text-sm">
              <Ico icon="event" className="mr-1 translate-y-[.15em] !text-base" />
              {formatDate(metadata.releaseDate)}
            </p>
          )}
          {metadata.price && (
            <p className="justify-self-end text-sm">
              <Ico icon="shopping_cart" className="mr-1 translate-y-[.15em] !text-base" />
              {formatPrice(metadata.price, preferredCurrency)}
            </p>
          )}
          {metadata.views && (
            <p className="text-sm">
              <Ico icon="visibility" className="mr-1 translate-y-[.15em] !text-base" />
              {prettyShortenNumber(metadata.views)}
            </p>
          )}
          {metadata.author && (
            <p className="text-sm">
              <Ico icon="person" className="mr-1 translate-y-[.15em] !text-base" />
              <Markdown text={metadata.author} className="inline-block" />
            </p>
          )}
        </div>
      )}
    </>
  );

  return (
    <UpPressable
      className={cJoin("relative grid items-end text-left", className)}
      href={href}
      onClick={onClick}
      noBackground
      disabled={disabled}>
      <div className={cJoin("group", cIf(disabled, "pointer-events-none touch-none select-none"))}>
        {thumbnail ? (
          <div
            className="relative"
            style={{
              aspectRatio: thumbnailForceAspectRatio ? thumbnailAspectRatio : "unset",
            }}>
            <Img
              className={cJoin(
                cIf(
                  thumbnailRounded,
                  cIf(keepInfoVisible, "rounded-t-md", "rounded-md notHoverable:rounded-b-none")
                ),
                cIf(thumbnailForceAspectRatio, "h-full w-full"),
                cIf(
                  thumbnailForceAspectRatio && thumbnailFitMethod === "contain",
                  "object-contain",
                  "object-cover"
                )
              )}
              src={thumbnail}
              quality={ImageQuality.Medium}
            />

            {hoverlay && hoverlay.__typename === "Video" && (
              <>
                <div
                  className="absolute inset-0 grid place-content-center rounded-t-md
                   bg-shade/0 text-light transition-colors group-hover:bg-shade/50">
                  <Ico
                    icon="play_circle"
                    className="!text-6xl text-light opacity-0 drop-shadow-lg transition-opacity
                    shadow-shade group-hover:opacity-100 dark:text-black"
                  />
                </div>
                <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 text-light">
                  {prettyDuration(hoverlay.duration)}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            style={{ aspectRatio: thumbnailAspectRatio }}
            className={cJoin(
              "relative w-full bg-highlight",
              cIf(keepInfoVisible, "rounded-t-md", "rounded-md notHoverable:rounded-b-none")
            )}
          />
        )}
        <div
          className={cJoin(
            "z-20 grid gap-2 p-4 transition-opacity linearbg-obi",
            cIf(
              !keepInfoVisible && isHoverable,
              `-inset-x-0.5 bottom-2 opacity-0 !shadow-shade
               [border-radius:10%_10%_10%_10%_/_1%_1%_3%_3%]
               group-hover:opacity-100 hoverable:absolute hoverable:shadow-lg
               notHoverable:rounded-b-md notHoverable:opacity-100`,
              cIf(!isPerfModeEnabled, "[border-radius:0%_0%_10%_10%_/_0%_0%_3%_3%]")
            )
          )}>
          {metadata?.position === "Top" && metadataJSX}
          {topChips && topChips.length > 0 && (
            <div
              className="grid grid-flow-col place-content-start gap-1 overflow-x-scroll
              scrollbar-none">
              {topChips.map((text, index) => (
                <Chip key={index} text={text} />
              ))}
            </div>
          )}
          <div className="my-1">
            {pre_title && <Markdown text={pre_title} className="mb-1 leading-none break-words" />}
            {title && (
              <Markdown
                text={title}
                className="font-headers text-lg font-bold leading-none break-words"
              />
            )}
            {subtitle && <Markdown text={subtitle} className="leading-none break-words" />}
          </div>
          {description && <Markdown text={description} className="overflow-hidden break-words" />}
          {bottomChips && bottomChips.length > 0 && (
            <div
              className="grid grid-flow-col place-content-start gap-1 overflow-x-scroll
              scrollbar-none">
              {bottomChips.map((text, index) => (
                <Chip key={index} className="text-sm" text={text} />
              ))}
            </div>
          )}

          {metadata?.position === "Bottom" && metadataJSX}

          {infoAppend}
        </div>
      </div>
    </UpPressable>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedPreviewCard = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Props, "description" | "pre_title" | "subtitle" | "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });
  return (
    <PreviewCard
      pre_title={selectedTranslation?.pre_title ?? fallback.pre_title}
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      description={selectedTranslation?.description ?? fallback.description}
      {...otherProps}
    />
  );
};
