import AppLayout from "components/AppLayout";
import LanguageSwitcher from "components/LanguageSwitcher";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { GetPostQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { getLocalesFromLanguages, prettySlug } from "queries/helpers";

interface Props extends AppStaticProps {
  post: Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["attributes"];
}
export default function SharingPolicy(props: Props): JSX.Element {
  const { langui, post } = props;
  const locales = getLocalesFromLanguages(post?.translations_languages);
  const router = useRouter();

  const body = post?.translations?.[0]?.body ?? "";
  const title = post?.translations?.[0]?.title ?? prettySlug(post?.slug);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.desktop}
        langui={langui}
        title={langui.about_us}
        horizontalLine
      />
      <TOC text={body} title={title} />
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
        <Markdawn text={body} />
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
      navTitle={title}
      subPanel={subPanel}
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const slug = "sharing-policy";
  const post = await sdk.getPost({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!post.posts) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    post: post.posts.data[0].attributes,
  };
  return {
    props: props,
  };
}
