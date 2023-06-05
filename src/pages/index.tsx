import { GetStaticProps } from "next";
import { PostPage } from "components/PostPage";
import { PostStaticProps } from "graphql/getPostStaticProps";
import { Terminal } from "components/Cli/Terminal";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { getOpenGraph } from "helpers/openGraph";
import { getFormat } from "helpers/i18n";
import { getReadySdk } from "graphql/sdk";
import { PostWithTranslations } from "types/types";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const Home = (props: PostStaticProps): JSX.Element => {
  const isTerminalMode = useAtomGetter(atoms.layout.terminalMode);

  if (isTerminalMode) {
    return (
      <Terminal
        parentPath="/"
        childrenPaths={[
          "library",
          "contents",
          "wiki",
          "chronicles",
          "news",
          "gallery",
          "archives",
          "about-us",
        ]}
      />
    );
  }

  return (
    <PostPage
      {...props}
      prependBody={
        <div className="grid w-full place-content-center place-items-center gap-5 text-center">
          <div
            className="aspect-square w-32 bg-black ![mask-size:contain]
            [mask:url('/icons/accords.svg')]"
          />
          <h1 className="mb-0 text-5xl">Accord&rsquo;s Library</h1>
          <h2 className="-mt-5 font-angelic text-lg">Discover • Analyze • Translate • Archive</h2>
        </div>
      }
      displayTitle={false}
      displayLanguageSwitcher
    />
  );
};

export default Home;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format } = getFormat(context.locale);
  const post = await sdk.getPost({ slug: "home" });
  if (post.posts?.data && post.posts.data.length > 0) {
    const props: PostStaticProps = {
      post: post.posts.data[0]?.attributes as PostWithTranslations,
      openGraph: getOpenGraph(format),
    };
    return {
      props: props,
    };
  }
  return { notFound: true };
};
