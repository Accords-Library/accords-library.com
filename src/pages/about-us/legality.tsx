import { PostPage } from "components/PostPage";
import { getPostStaticProps, PostStaticProps } from "graphql/getPostStaticProps";
import { useFormat } from "hooks/useFormat";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const Legality = (props: PostStaticProps): JSX.Element => {
  const { format } = useFormat();
  return (
    <PostPage
      {...props}
      returnHref="/about-us/"
      returnTitle={format("about_us")}
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
