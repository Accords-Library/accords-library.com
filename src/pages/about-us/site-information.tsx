import AppLayout from "components/AppLayout";
import Markdawn from "components/Markdown/Markdawn";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import { getPost } from "graphql/operations";
import { GetPostQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettySlug } from "queries/helpers";

interface SiteInfoProps extends AppStaticProps {
  post: GetPostQuery["posts"]["data"][number]["attributes"];
}

export default function SiteInformation(props: SiteInfoProps): JSX.Element {
  const { langui, post } = props;
  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.Both}
        langui={langui}
        title={langui.about_us}
        className="mb-10"
      />
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
  const props: SiteInfoProps = {
    ...(await getAppStaticProps(context)),
    post: (
      await getPost({
        slug: "site-information",
        language_code: context.locale || "en",
      })
    ).posts.data[0].attributes,
  };
  return {
    props: props,
  };
};
