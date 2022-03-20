import AppLayout from "components/AppLayout";
import LanguageSwitcher from "components/LanguageSwitcher";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { getPost, getPostLanguages } from "graphql/operations";
import { GetPostQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettySlug } from "queries/helpers";

interface AccordsHandbookProps extends AppStaticProps {
  post: GetPostQuery["posts"]["data"][number]["attributes"];
  locales: string[];
}

export default function AccordsHandbook(
  props: AccordsHandbookProps
): JSX.Element {
  const { langui, post, locales } = props;
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
      {locales.includes(router.locale || "en") ? (
        <Markdawn router={router} text={post.translations[0].body} />
      ) : (
        <LanguageSwitcher
          locales={locales}
          router={router}
          languages={props.languages}
          langui={props.langui}
        />
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
  const slug = "accords-handbook";
  const props: AccordsHandbookProps = {
    ...(await getAppStaticProps(context)),
    post: (
      await getPost({
        slug: slug,
        language_code: context.locale || "en",
      })
    ).posts.data[0].attributes,
    locales: (
      await getPostLanguages({ slug: slug })
    ).posts.data[0].attributes.translations.map((translation) => {
      return translation.language.data.attributes.code;
    }),
  };
  return {
    props: props,
  };
};
