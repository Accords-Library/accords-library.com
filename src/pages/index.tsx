import AppLayout from "components/AppLayout";
import Markdawn from "components/Markdown/Markdawn";
import ContentPanel from "components/Panels/ContentPanel";
import { getPost } from "graphql/operations";
import { GetPostQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettySlug } from "queries/helpers";

interface HomeProps extends AppStaticProps {
  post: GetPostQuery["posts"]["data"][number]["attributes"];
}

export default function Home(props: HomeProps): JSX.Element {
  const { post } = props;
  const contentPanel = (
    <ContentPanel>
      <div className="grid place-items-center place-content-center w-full gap-5 text-center">
        <div className="[mask:url('/icons/accords.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] w-32 aspect-square mobile:w-[50vw] bg-black" />
        <h1 className="text-5xl mb-0">Accord&rsquo;s Library</h1>
        <h2 className="text-xl -mt-5">Discover • Analyse • Translate • Archive</h2>
      </div>
      {post.translations.length > 0 && (
        <Markdawn text={post.translations[0].body} />
      )}
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={
        post.translations.length > 0
          ? post.translations[0].title
          : prettySlug(post.slug)
      }
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: HomeProps = {
    ...(await getAppStaticProps(context)),
    post: (
      await getPost({
        slug: "home",
        language_code: context.locale || "en",
      })
    ).posts.data[0].attributes,
  };
  return {
    props: props,
  };
};
