import { PostPage } from "components/PostPage";
import { getPostStaticProps, PostStaticProps } from "graphql/getPostStaticProps";
import { useFormat } from "hooks/useFormat";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const SharingPolicy = (props: PostStaticProps): JSX.Element => {
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
export default SharingPolicy;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("sharing-policy");
