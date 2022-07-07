import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { PostPage } from "components/PostPage";
import { AppStaticProps } from "graphql/getAppStaticProps";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes, isDefined } from "helpers/others";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, PostStaticProps {}

const LibrarySlug = (props: Props): JSX.Element => (
  <PostPage
    returnHref="/news"
    returnTitle={props.langui.news}
    displayCredits
    displayThumbnailHeader
    displayToc
    {...props}
  />
);
export default LibrarySlug;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const slug =
    context.params && isDefined(context.params.slug)
      ? context.params.slug.toString()
      : "";
  return await getPostStaticProps(slug)(context);
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const posts = await sdk.getPostsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];

  filterHasAttributes(posts.posts?.data).map((item) => {
    context.locales?.map((local) =>
      paths.push({ params: { slug: item.attributes.slug }, locale: local })
    );
  });
  return {
    paths,
    fallback: "blocking",
  };
};
