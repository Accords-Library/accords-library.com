import PostPage from "components/PostPage";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";
import { Immutable } from "helpers/types";

export default function AccordsHandbook(
  props: Immutable<PostStaticProps>
): JSX.Element {
  const { post, langui, languages, currencies } = props;
  return (
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
}

export const getStaticProps = getPostStaticProps("accords-handbook");
