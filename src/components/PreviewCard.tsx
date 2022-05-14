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
      <div className="flex flex-row flex-wrap gap-x-3 w-full">
        {metadata.release_date && (
          <p className="mobile:text-xs text-sm">
            <span className="material-icons !text-base translate-y-[.15em] mr-1">
              event
            </span>
            {prettyDate(metadata.release_date)}
          </p>
        )}
        {metadata.price && metadata.currencies && (
          <p className="mobile:text-xs text-sm justify-self-end">
            <span className="material-icons !text-base translate-y-[.15em] mr-1">
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
          <p className="mobile:text-xs text-sm">
            <span className="material-icons !text-base translate-y-[.15em] mr-1">
              visibility
            </span>
            {prettyShortenNumber(metadata.views)}
          </p>
        )}
        {metadata.author && (
          <p className="mobile:text-xs text-sm">
            <span className="material-icons !text-base translate-y-[.15em] mr-1">
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
        className="drop-shadow-shade-xl cursor-pointer grid items-end
        fine:[--cover-opacity:0] hover:[--cover-opacity:1] hover:scale-[1.02]
        [--bg-opacity:0] hover:[--bg-opacity:0.5] [--play-opacity:0]
        hover:[--play-opacity:100] transition-transform
        [--stacked-top:0] hover:[--stacked-top:1]"
      >
        {thumbnail && stackNumber > 0 && (
          <>
            <Img
              className="opacity-30 rounded-t-md overflow-hidden absolute transition-[top_transform]
                -top-[var(--stacked-top)*1.5rem]
                scale-[calc(1-0.15*var(--stacked-top))]"
              image={thumbnail}
              quality={ImageQuality.Medium}
            />

            <div
              className="bg-light rounded-t-md overflow-hidden absolute transition-[top_transform]
              -top-[var(--stacked-top)*0.7rem]
              scale-[calc(1-0.06*var(--stacked-top))]"
            >
              <Img
                className="opacity-70"
                image={thumbnail}
                quality={ImageQuality.Medium}
              />
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
                className="absolute right-2 top-2 text-light bg-black
                  bg-opacity-60 px-2 rounded-full"
              >
                {stackNumber}
              </div>
            )}
            {hoverlay && hoverlay.__typename === "Video" && (
              <>
                <div
                  className="absolute inset-0 text-light grid
                  place-content-center drop-shadow-shade-lg bg-shade
                  bg-opacity-[var(--bg-opacity)] transition-colors"
                >
                  <span
                    className="material-icons text-6xl
                    opacity-[var(--play-opacity)] transition-opacity"
                  >
                    play_circle_outline
                  </span>
                </div>
                <div
                  className="absolute right-2 bottom-2 text-light bg-black
                  bg-opacity-60 px-2 rounded-full"
                >
                  {prettyDuration(hoverlay.duration)}
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            style={{ aspectRatio: thumbnailAspectRatio }}
            className={`w-full bg-light ${
              keepInfoVisible
                ? "rounded-t-md"
                : "rounded-md coarse:rounded-b-none"
            }`}
          ></div>
        )}
        <div
          className={`linearbg-obi ${
            !keepInfoVisible &&
            `fine:drop-shadow-shade-lg fine:absolute coarse:rounded-b-md
              bottom-2 -inset-x-0.5 opacity-[var(--cover-opacity)]`
          } transition-opacity z-20 grid p-4 gap-2`}
        >
          {metadata?.position === "Top" && metadataJSX}
          {topChips && topChips.length > 0 && (
            <div className="grid grid-flow-col gap-1 overflow-hidden place-content-start">
              {topChips.map((text, index) => (
                <Chip key={index}>{text}</Chip>
              ))}
            </div>
          )}
          <div className="my-1">
            {pre_title && (
              <p className="leading-none mb-1 break-words">{pre_title}</p>
            )}
            {title && (
              <p className="font-headers text-lg leading-none break-words">
                {title}
              </p>
            )}
            {subtitle && <p className="leading-none break-words">{subtitle}</p>}
          </div>
          {description && <p>{description}</p>}
          {bottomChips && bottomChips.length > 0 && (
            <div className="grid grid-flow-col gap-1 overflow-hidden place-content-start">
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
