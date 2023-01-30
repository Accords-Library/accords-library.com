import { PostPage } from "components/PostPage";
import { getPostStaticProps, PostStaticProps } from "graphql/getPostStaticProps";
import { Terminal } from "components/Cli/Terminal";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { TITLE_PREFIX } from "helpers/openGraph";

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
            className="aspect-square w-32 bg-black [mask:url('/icons/accords.svg')]
            [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
          />
          <h1 className="mb-0 text-5xl">Accord&rsquo;s Library</h1>
          <h2 className="-mt-5 text-xl">Discover • Analyze • Translate • Archive</h2>
        </div>
      }
      displayTitle={false}
      openGraph={{ ...props.openGraph, title: TITLE_PREFIX }}
      displayLanguageSwitcher
    />
  );
};

export default Home;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("home");
