import { PostPage } from "components/PostPage";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";

export default function Legality(props: PostStaticProps): JSX.Element {
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

export const getStaticProps = getPostStaticProps("legality");
