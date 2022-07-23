import { PostPage } from "components/PostPage";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const AccordsHandbook = (props: PostStaticProps): JSX.Element => (
  <PostPage
    {...props}
    returnHref="/about-us/"
    returnTitle={props.langui.about_us}
    displayToc
    displayLanguageSwitcher
  />
);
export default AccordsHandbook;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("accords-handbook");
