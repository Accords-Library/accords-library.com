import AppLayout from "components/AppLayout";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { getPost } from "graphql/operations";
import { GetPostQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettySlug } from "queries/helpers";

interface SharingPolicyProps extends AppStaticProps {
  post: GetPostQuery["posts"]["data"][number]["attributes"];
}

export default function SharingPolicy(props: SharingPolicyProps): JSX.Element {
  const { langui, post } = props;
  const router = useRouter();

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.Desktop}
        langui={langui}
        title={langui.about_us}
        horizontalLine
      />
      {post.translations.length > 0 && post.translations[0].body && (
        <TOC
          text={post.translations[0].body}
          router={router}
          title={post.translations[0].title}
        />
      )}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.Mobile}
        langui={langui}
        title={langui.about_us}
        className="mb-10"
      />
      {post.translations.length > 0 && (
        <Markdawn router={router} text={post.translations[0].body} />
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
      subPanel={subPanel}
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: SharingPolicyProps = {
    ...(await getAppStaticProps(context)),
    post: (
      await getPost({
        slug: "sharing-policy",
        language_code: context.locale || "en",
      })
    ).posts.data[0].attributes,
  };
  return {
    props: props,
  };
};
