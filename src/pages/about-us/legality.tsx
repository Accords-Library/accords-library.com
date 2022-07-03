import { PostPage } from "components/PostPage";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const Legality = ({
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
    returnHref="/about-us/"
    returnTitle={langui.about_us}
    displayToc
    displayLanguageSwitcher
  />
);
export default Legality;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("legality");
