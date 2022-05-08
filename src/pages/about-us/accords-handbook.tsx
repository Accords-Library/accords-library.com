import PostPage from "components/PostPage";
import { getReadySdk } from "graphql/sdk";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Post } from "helpers/types";
import { GetStaticPropsContext } from "next";

interface Props extends AppStaticProps {
  post: Post;
}

export default function AccordsHandbook(props: Props): JSX.Element {
  const { post, langui, languages, currencies } = props;
  return (
    <PostPage
      currencies={currencies}
      languages={languages}
      langui={langui}
      post={post}
      returnHref="/about-us/"
      returnTitle={langui.about_us}
      displayToc
      displayLanguageSwitcher
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const slug = "accords-handbook";
  const post = await sdk.getPost({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!post.posts?.data[0].attributes) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    post: post.posts.data[0].attributes,
  };
  return {
    props: props,
  };
}
