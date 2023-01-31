import { PostPage } from "components/PostPage";
import { getPostStaticProps, PostStaticProps } from "graphql/getPostStaticProps";
import { useFormat } from "hooks/useFormat";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const AccordsHandbook = (props: PostStaticProps): JSX.Element => {
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
export default AccordsHandbook;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("accords-handbook");
