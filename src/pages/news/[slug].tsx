import PostPage from "components/PostPage";
import { AppStaticProps } from "graphql/getAppStaticProps";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";
import { getReadySdk } from "graphql/sdk";
import { Immutable } from "helpers/types";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";

interface Props extends AppStaticProps, PostStaticProps {}

export default function LibrarySlug(props: Immutable<Props>): JSX.Element {
  const { post, langui, languages, currencies } = props;
  return (
    <PostPage
      currencies={currencies}
      languages={languages}
      langui={langui}
      post={post}
      returnHref="/news"
      returnTitle={langui.news}
      displayCredits
      displayThumbnailHeader
      displayToc
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  return await getPostStaticProps(slug)(context);
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const posts = await sdk.getPostsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  if (posts.posts)
    posts.posts.data.map((item) => {
      context.locales?.map((local) => {
        if (item.attributes)
          paths.push({ params: { slug: item.attributes.slug }, locale: local });
      });
    });
  return {
    paths,
    fallback: "blocking",
  };
}
