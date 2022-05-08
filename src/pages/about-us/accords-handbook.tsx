import PostPage, { Post } from "components/PostPage";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "helpers/getAppStaticProps";

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
