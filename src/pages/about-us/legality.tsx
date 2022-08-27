import { PostPage } from "components/PostPage";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";
import { useAppLayout } from "contexts/AppLayoutContext";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const Legality = (props: PostStaticProps): JSX.Element => {
  const { langui } = useAppLayout();
  return (
    <PostPage
      {...props}
      returnHref="/about-us/"
      returnTitle={langui.about_us}
      displayToc
      displayLanguageSwitcher
    />
  );
};
export default Legality;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("legality");
