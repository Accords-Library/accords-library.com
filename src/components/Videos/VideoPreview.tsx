import Chip from "components/Chip";
import { GetVideosPreviewQuery } from "graphql/generated";
import Link from "next/link";
import {
  getVideoThumbnailURL,
  prettyDate,
  prettyDuration,
  prettyShortenNumber,
} from "queries/helpers";

export type Props = {
  video: Exclude<
    Exclude<
      GetVideosPreviewQuery["videos"],
      null | undefined
    >["data"][number]["attributes"],
    null | undefined
  >;
};

export default function PostPreview(props: Props): JSX.Element {
  const { video } = props;

  return (
    <Link href={`/archives/videos/v/${video.uid}`} passHref>
      <div className="drop-shadow-shade-xl cursor-pointer grid items-end hover:scale-[1.02] [--bg-opacity:0] hover:[--bg-opacity:0.5] [--play-opacity:0] hover:[--play-opacity:100] transition-transform">
        <div className="relative">
          <img
            className="aspect-video rounded-t-lg"
            src={getVideoThumbnailURL(video.uid)}
            alt={video.title}
          />
          <div className="absolute inset-0 text-light grid place-content-center drop-shadow-shade-lg bg-shade bg-opacity-[var(--bg-opacity)] transition-colors">
            <span className="material-icons text-6xl opacity-[var(--play-opacity)] transition-opacity">
              play_circle_outline
            </span>
          </div>
          <div className="absolute right-2 bottom-2 text-light bg-black bg-opacity-60 px-2 rounded-full">
            {prettyDuration(video.duration)}
          </div>
        </div>
        <div className="linearbg-obi fine:drop-shadow-shade-lg rounded-b-md top-full transition-opacity z-20 grid p-4 gap-2">
          <div className="flex flex-row flex-wrap gap-x-3 w-full">
            <p className="mobile:text-xs text-sm">
              <span className="material-icons !text-base translate-y-[.15em] mr-1">
                event
              </span>
              {prettyDate(video.published_date)}
            </p>
            <p className="mobile:text-xs text-sm">
              <span className="material-icons !text-base translate-y-[.15em] mr-1">
                visibility
              </span>
              {prettyShortenNumber(video.views)}
            </p>
            {video.channel?.data?.attributes && (
              <p className="mobile:text-xs text-sm">
                <span className="material-icons !text-base translate-y-[.15em] mr-1">
                  person
                </span>
                {video.channel.data.attributes.title}
              </p>
            )}
          </div>

          <div>
            <h1 className="text-xl">{video.title}</h1>
          </div>
          <div className="grid grid-flow-col gap-1 overflow-x-scroll webkit-scrollbar:w-0 [scrollbar-width:none] place-content-start">
            {video.categories?.data.map((category) => (
              <Chip key={category.id} className="text-sm">
                {category.attributes?.short}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
