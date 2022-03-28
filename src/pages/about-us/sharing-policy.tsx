import AppLayout from "components/AppLayout";
import LanguageSwitcher from "components/LanguageSwitcher";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { getPost } from "graphql/operations";
import { GetPostQuery } from "graphql/operations-types";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { getLocalesFromLanguages, prettySlug } from "queries/helpers";

interface SharingPolicyProps extends AppStaticProps {
  post: GetPostQuery["posts"]["data"][number]["attributes"];
}

export default function SharingPolicy(props: SharingPolicyProps): JSX.Element {
  const { langui, post } = props;
  const locales = getLocalesFromLanguages(post.translations_languages);
  const router = useRouter();

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.desktop}
        langui={langui}
        title={langui.about_us}
        horizontalLine
      />
      {post.translations.length > 0 && post.translations[0].body && (
        <TOC
          text={post.translations[0].body}
          title={post.translations[0].title}
        />
      )}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.mobile}
        langui={langui}
        title={langui.about_us}
        className="mb-10"
      />
      {locales.includes(router.locale ?? "en") ? (
        <Markdawn text={post.translations[0].body} />
      ) : (
        <LanguageSwitcher
          locales={locales}
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

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: SharingPolicyProps }> {
  const slug = "sharing-policy";
  const props: SharingPolicyProps = {
    ...(await getAppStaticProps(context)),
    post: (
      await getPost({
        slug: slug,
        language_code: context.locale ?? "en",
      })
    ).posts.data[0].attributes,
  };
  return {
    props: props,
  };
}
