import { PostPage } from "components/PostPage";
import { getPostStaticProps, PostStaticProps } from "graphql/getPostStaticProps";
import { getOpenGraph } from "helpers/openGraph";
import { Terminal } from "components/Cli/Terminal";
import { useIsTerminalMode } from "hooks/useIsTerminalMode";
import { useLocalData } from "contexts/LocalDataContext";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const Home = ({ ...otherProps }: PostStaticProps): JSX.Element => {
  const { langui } = useLocalData();
  const isTerminalMode = useIsTerminalMode();

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
      {...otherProps}
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
      openGraph={getOpenGraph(langui)}
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
