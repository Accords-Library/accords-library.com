import { AppLayout } from "components/AppLayout";
import { ContentPanel } from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { GetWikiPageQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { Immutable } from "helpers/types";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";

interface Props extends AppStaticProps {
  page: NonNullable<
    NonNullable<GetWikiPageQuery["wikiPages"]>["data"][number]["attributes"]
  >;
}

export default function WikiPage(props: Immutable<Props>): JSX.Element {
  const { page, langui } = props;

  const subPanel = <SubPanel>Hello</SubPanel>;
  const contentPanel = <ContentPanel>{page.slug}</ContentPanel>;

  return (
    <AppLayout
      navTitle={langui.news}
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
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const page = await sdk.getWikiPage({
    language_code: context.locale ?? "en",
    slug: slug,
  });
  if (!page.wikiPages?.data[0].attributes) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    page: page.wikiPages.data[0].attributes,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const contents = await sdk.getWikiPagesSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  contents.wikiPages?.data.map((wikiPage) => {
    context.locales?.map((local) => {
      if (wikiPage.attributes)
        paths.push({
          params: { slug: wikiPage.attributes.slug },
          locale: local,
        });
    });
  });
  return {
    paths,
    fallback: "blocking",
  };
}
