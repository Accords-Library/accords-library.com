import { PostPage } from "components/PostPage";
import {
  getPostStaticProps,
  PostStaticProps,
} from "graphql/getPostStaticProps";
import { Immutable } from "helpers/types";

export default function Home(props: Immutable<PostStaticProps>): JSX.Element {
  const { post, langui, languages, currencies } = props;
  return (
    <PostPage
      currencies={currencies}
      languages={languages}
      langui={langui}
      post={post}
      prependBody={
        <div className="grid place-items-center place-content-center w-full gap-5 text-center">
          <div
            className="[mask:url('/icons/accords.svg')] [mask-size:contain]
            [mask-repeat:no-repeat] [mask-position:center] w-32 aspect-square
            mobile:w-[50vw] bg-black"
          />
          <h1 className="text-5xl mb-0">Accord&rsquo;s Library</h1>
          <h2 className="text-xl -mt-5">
            Discover • Analyze • Translate • Archive
          </h2>
        </div>
      }
      displayTitle={false}
      displayLanguageSwitcher
    />
  );
}

export const getStaticProps = getPostStaticProps("home");
