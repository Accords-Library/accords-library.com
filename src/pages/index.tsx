import { PostPage } from "components/PostPage";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const Home = ({
  post,
  langui,
  languages,
  currencies,
}: PostStaticProps): JSX.Element => (
  <PostPage
    currencies={currencies}
    languages={languages}
    langui={langui}
    post={post}
    prependBody={
      <div className="grid w-full place-content-center place-items-center gap-5 text-center">
        <div
          className="aspect-square w-32 bg-black [mask:url('/icons/accords.svg')]
            [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] mobile:w-[50vw]"
        />
        <h1 className="mb-0 text-5xl">Accord&rsquo;s Library</h1>
        <h2 className="-mt-5 text-xl">
          Discover • Analyze • Translate • Archive
        </h2>
      </div>
    }
    displayTitle={false}
    displayLanguageSwitcher
  />
);

export default Home;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("home");
