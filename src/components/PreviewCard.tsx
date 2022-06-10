import { useAppLayout } from "contexts/AppLayoutContext";
import {
  DatePickerFragment,
  PricePickerFragment,
  UploadImageFragment,
} from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import {
  prettyDate,
  prettyDuration,
  prettyPrice,
  prettyShortenNumber,
  prettySlug,
} from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { Immutable } from "helpers/types";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import Link from "next/link";
import { Chip } from "./Chip";
import { Ico, Icon } from "./Ico";
import { Img } from "./Img";

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  thumbnailAspectRatio?: string;
  thumbnailRounded?: boolean;
  href: string;
  pre_title?: string | null | undefined;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  description?: string | null | undefined;
  topChips?: string[];
  bottomChips?: string[];
  keepInfoVisible?: boolean;
  stackNumber?: number;
  metadata?: {
    currencies?: AppStaticProps["currencies"];
    release_date?: DatePickerFragment | null;
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
}

export function PreviewCard(props: Immutable<Props>): JSX.Element {
  const {
    href,
    thumbnail,
    thumbnailAspectRatio = "4/3",
    thumbnailRounded = true,
    pre_title,
    title,
    subtitle,
    description,
    stackNumber = 0,
    topChips,
    bottomChips,
    keepInfoVisible,
    metadata,
    hoverlay,
    infoAppend,
  } = props;

  const appLayout = useAppLayout();

  const metadataJSX =
    metadata && (metadata.release_date || metadata.price) ? (
      <div className="flex w-full flex-row flex-wrap gap-x-3">
        {metadata.release_date && (
          <p className="text-sm mobile:text-xs">
            <Ico
              icon={Icon.Event}
              className="mr-1 translate-y-[.15em] !text-base"
            />
            {prettyDate(metadata.release_date)}
          </p>
        )}
        {metadata.price && metadata.currencies && (
          <p className="justify-self-end text-sm mobile:text-xs">
            <Ico
              icon={Icon.ShoppingCart}
              className="mr-1 translate-y-[.15em] !text-base"
            />
            {prettyPrice(
              metadata.price,
              metadata.currencies,
              appLayout.currency
            )}
          </p>
        )}
        {metadata.views && (
          <p className="text-sm mobile:text-xs">
            <Ico
              icon={Icon.Visibility}
              className="mr-1 translate-y-[.15em] !text-base"
            />
            {prettyShortenNumber(metadata.views)}
          </p>
        )}
        {metadata.author && (
          <p className="text-sm mobile:text-xs">
            <Ico
              icon={Icon.Person}
              className="mr-1 translate-y-[.15em] !text-base"
            />
            {metadata.author}
          </p>
        )}
      </div>
    ) : (
      <></>
    );

  return (
    <Link href={href} passHref>
      <div
        className="grid cursor-pointer items-end transition-transform
        drop-shadow-shade-xl [--bg-opacity:0] [--play-opacity:0]
        [--stacked-top:0] hover:scale-[1.02] hover:[--cover-opacity:1]
        hover:[--bg-opacity:0.5] hover:[--play-opacity:100]
        hover:[--stacked-top:1] hoverable:[--cover-opacity:0]"
      >
        {stackNumber > 0 && (
          <>
            <div
              className={`absolute inset-0 -top-[var(--stacked-top)*2.1rem]
              scale-[calc(1-0.15*var(--stacked-top))] overflow-hidden ${
                thumbnailRounded && "rounded-md"
              } bg-light
              brightness-[0.8] sepia-[0.5] transition-[top_transform]`}
            >
              {thumbnail && (
                <Img
                  className="opacity-30 "
                  image={thumbnail}
                  quality={ImageQuality.Medium}
                />
              )}
            </div>

            <div
              className={`absolute inset-0 -top-[var(--stacked-top)*1rem]
              scale-[calc(1-0.06*var(--stacked-top))] overflow-hidden ${
                thumbnailRounded && "rounded-md"
              } bg-light
              brightness-[0.9] sepia-[0.2] transition-[top_transform]`}
            >
              {thumbnail && (
                <Img
                  className="opacity-70"
                  image={thumbnail}
                  quality={ImageQuality.Medium}
                />
              )}
            </div>
          </>
        )}

        {thumbnail ? (
          <div className="relative">
            <Img
              className={
                thumbnailRounded
                  ? keepInfoVisible
                    ? "rounded-t-md"
                    : "rounded-md notHoverable:rounded-b-none"
                  : undefined
              }
              image={thumbnail}
              quality={ImageQuality.Medium}
            />
            {stackNumber > 0 && (
              <div
                className="absolute right-2 top-2 rounded-full bg-black
                  bg-opacity-60 px-2 text-light"
              >
                {stackNumber}
              </div>
            )}
            {hoverlay && hoverlay.__typename === "Video" && (
              <>
                <div
                  className="absolute inset-0 grid place-content-center
                  bg-shade bg-opacity-[var(--bg-opacity)] text-light
                  transition-colors drop-shadow-shade-lg"
                >
                  <Ico
                    icon={Icon.PlayCircleOutline}
                    className="text-6xl opacity-[var(--play-opacity)] transition-opacity"
                  />
                </div>
                <div
                  className="absolute right-2 bottom-2 rounded-full bg-black
                  bg-opacity-60 px-2 text-light"
                >
                  {prettyDuration(hoverlay.duration)}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            style={{ aspectRatio: thumbnailAspectRatio }}
            className={`relative w-full bg-light ${
              keepInfoVisible
                ? "rounded-t-md"
                : "rounded-md notHoverable:rounded-b-none"
            }`}
          >
            {stackNumber > 0 && (
              <div
                className="absolute right-2 top-2 rounded-full bg-black
                bg-opacity-60 px-2 text-light"
              >
                {stackNumber}
              </div>
            )}
          </div>
        )}
        <div
          className={`linearbg-obi ${
            !keepInfoVisible &&
            `-inset-x-0.5 bottom-2 opacity-[var(--cover-opacity)]
              notHoverable:rounded-b-md hoverable:absolute hoverable:drop-shadow-shade-lg`
          } z-20 grid gap-2 p-4 transition-opacity`}
        >
          {metadata?.position === "Top" && metadataJSX}
          {topChips && topChips.length > 0 && (
            <div className="grid grid-flow-col place-content-start gap-1 overflow-hidden">
              {topChips.map((text, index) => (
                <Chip key={index}>{text}</Chip>
              ))}
            </div>
          )}
          <div className="my-1">
            {pre_title && (
              <p className="mb-1 break-words leading-none">{pre_title}</p>
            )}
            {title && (
              <p className="break-words font-headers text-lg leading-none">
                {title}
              </p>
            )}
            {subtitle && <p className="break-words leading-none">{subtitle}</p>}
          </div>
          {description && <p>{description}</p>}
          {bottomChips && bottomChips.length > 0 && (
            <div className="grid grid-flow-col place-content-start gap-1 overflow-hidden">
              {bottomChips.map((text, index) => (
                <Chip key={index} className="text-sm">
                  {text}
                </Chip>
              ))}
            </div>
          )}

          {metadata?.position === "Bottom" && metadataJSX}

          {infoAppend}
        </div>
      </div>
    </Link>
  );
}

interface TranslatedProps
  extends Omit<Props, "pre_title" | "subtitle" | "title"> {
  translations:
    | {
        pre_title?: string | null | undefined;
        title: string | null | undefined;
        subtitle?: string | null | undefined;
        language: string | undefined;
      }[]
    | undefined;
  slug: string;
  languages: AppStaticProps["languages"];
}

export function TranslatedPreviewCard(
  props: Immutable<TranslatedProps>
): JSX.Element {
  const {
    translations = [{ title: props.slug, language: "default" }],
    slug,
    languages,
  } = props;

  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languages: languages,
    languageExtractor: (item) => item.language,
  });

  return (
    <PreviewCard
      pre_title={selectedTranslation?.pre_title}
      title={selectedTranslation?.title ?? prettySlug(slug)}
      subtitle={selectedTranslation?.subtitle}
      {...props}
    />
  );
}
