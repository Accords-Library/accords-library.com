import PostPage from "components/PostPage";
import { GetPostQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Post } from "helpers/types";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";

interface Props extends AppStaticProps {
  post: Post;
  postId: Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["id"];
}

export default function LibrarySlug(props: Props): JSX.Element {
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
  const sdk = getReadySdk();
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const post = await sdk.getPost({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!post.posts?.data[0].attributes) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    post: post.posts.data[0].attributes,
    postId: post.posts.data[0].id,
  };
  return {
    props: props,
  };
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
