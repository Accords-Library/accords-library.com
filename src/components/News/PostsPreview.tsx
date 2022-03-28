import Chip from "components/Chip";
import Img, { ImageQuality } from "components/Img";
import { GetPostsPreviewQuery } from "graphql/operations-types";
import Link from "next/link";
import { prettyDate, prettySlug } from "queries/helpers";

export type PostPreviewProps = {
  post: {
    slug: GetPostsPreviewQuery["posts"]["data"][number]["attributes"]["slug"];
    thumbnail: GetPostsPreviewQuery["posts"]["data"][number]["attributes"]["thumbnail"];
    translations: GetPostsPreviewQuery["posts"]["data"][number]["attributes"]["translations"];
    categories: GetPostsPreviewQuery["posts"]["data"][number]["attributes"]["categories"];
    date: GetPostsPreviewQuery["posts"]["data"][number]["attributes"]["date"];
  };
};

export default function PostPreview(props: PostPreviewProps): JSX.Element {
  const { post } = props;

  return (
    <Link href={`/news/${post.slug}`} passHref>
      <div className="drop-shadow-shade-xl cursor-pointer grid items-end hover:scale-[1.02] transition-transform">
        {post.thumbnail.data ? (
          <Img
            className="rounded-md rounded-b-none"
            image={post.thumbnail.data.attributes}
            quality={ImageQuality.Medium}
          />
        ) : (
          <div className="w-full aspect-[3/2] bg-light rounded-lg"></div>
        )}
        <div className="linearbg-obi fine:drop-shadow-shade-lg rounded-b-md top-full transition-opacity z-20 grid p-4 gap-2">
          <div className="grid grid-flow-col w-full">
            {post.date && (
              <p className="mobile:text-xs text-sm">
                <span className="material-icons !text-base translate-y-[.15em] mr-1">
                  event
                </span>
                {prettyDate(post.date)}
              </p>
            )}
          </div>
          <div>
            {post.translations.length > 0 ? (
              <>
                <h1 className="text-xl">{post.translations[0].title}</h1>
                <p>{post.translations[0].excerpt}</p>
              </>
            ) : (
              <h1 className="text-lg">{prettySlug(post.slug)}</h1>
            )}
          </div>
          <div className="grid grid-flow-col gap-1 overflow-x-scroll webkit-scrollbar:w-0 [scrollbar-width:none] place-content-start">
            {post.categories.data.map((category) => (
              <Chip key={category.id} className="text-sm">
                {category.attributes.short}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
