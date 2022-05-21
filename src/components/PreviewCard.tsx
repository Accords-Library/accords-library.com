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
} from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { Immutable } from "helpers/types";
import Link from "next/link";
import { Chip } from "./Chip";
import { Img } from "./Img";

interface Props {
  thumbnail?: UploadImageFragment | string | null | undefined;
  thumbnailAspectRatio?: string;
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
    pre_title,
    title,
    subtitle,
    description,
    stackNumber = 0,
    topChips,
    bottomChips,
    keepInfoVisible,
    thumbnailAspectRatio,
    metadata,
    hoverlay,
  } = props;

  const appLayout = useAppLayout();

  const metadataJSX =
    metadata && (metadata.release_date || metadata.price) ? (
      <div className="flex w-full flex-row flex-wrap gap-x-3">
        {metadata.release_date && (
          <p className="text-sm mobile:text-xs">
            <span className="material-icons mr-1 translate-y-[.15em] !text-base">
              event
            </span>
            {prettyDate(metadata.release_date)}
          </p>
        )}
        {metadata.price && metadata.currencies && (
          <p className="justify-self-end text-sm mobile:text-xs">
            <span className="material-icons mr-1 translate-y-[.15em] !text-base">
              shopping_cart
            </span>
            {prettyPrice(
              metadata.price,
              metadata.currencies,
              appLayout.currency
            )}
          </p>
        )}
        {metadata.views && (
          <p className="text-sm mobile:text-xs">
            <span className="material-icons mr-1 translate-y-[.15em] !text-base">
              visibility
            </span>
            {prettyShortenNumber(metadata.views)}
          </p>
        )}
        {metadata.author && (
          <p className="text-sm mobile:text-xs">
            <span className="material-icons mr-1 translate-y-[.15em] !text-base">
              person
            </span>
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
        hover:[--stacked-top:1] fine:[--cover-opacity:0]"
      >
        {stackNumber > 0 && (
          <>
            <div
              className="absolute inset-0 -top-[var(--stacked-top)*2.1rem]
              scale-[calc(1-0.15*var(--stacked-top))] overflow-hidden rounded-md bg-light
              brightness-[0.8] sepia-[0.5] transition-[top_transform]"
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
              className="absolute inset-0 -top-[var(--stacked-top)*1rem]
              scale-[calc(1-0.06*var(--stacked-top))] overflow-hidden rounded-md bg-light
              brightness-[0.9] sepia-[0.2] transition-[top_transform]"
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
                keepInfoVisible
                  ? "rounded-t-md"
                  : "rounded-md coarse:rounded-b-none"
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
                  <span
                    className="material-icons text-6xl
                    opacity-[var(--play-opacity)] transition-opacity"
                  >
                    play_circle_outline
                  </span>
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
                : "rounded-md coarse:rounded-b-none"
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
              coarse:rounded-b-md fine:absolute fine:drop-shadow-shade-lg`
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
        </div>
      </div>
    </Link>
  );
}
