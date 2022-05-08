import PostPage, { Post } from "components/PostPage";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "helpers/getAppStaticProps";

interface Props extends AppStaticProps {
  post: Post;
}

export default function Home(props: Props): JSX.Element {
  const { post, langui, languages, currencies } = props;
  return (
    <PostPage
      currencies={currencies}
      languages={languages}
      langui={langui}
      post={post}
      prependBody={
        <div className="grid place-items-center place-content-center w-full gap-5 text-center">
          <div className="[mask:url('/icons/accords.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] w-32 aspect-square mobile:w-[50vw] bg-black" />
          <h1 className="text-5xl mb-0">Accord&rsquo;s Library</h1>
          <h2 className="text-xl -mt-5">
            Discover • Analyze • Translate • Archive
          </h2>
        </div>
      }
      displayTitle={false}
      displayLanguageSwitcher
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const slug = "home";
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
