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
