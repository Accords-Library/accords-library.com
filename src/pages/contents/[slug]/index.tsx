import AppLayout from "components/AppLayout";
import Button from "components/Button";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import HorizontalLine from "components/HorizontalLine";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { getContent, getContentsSlugs } from "graphql/operations";
import { GetContentQuery } from "graphql/operations-types";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettyinlineTitle, prettySlug } from "queries/helpers";

interface ContentIndexProps extends AppStaticProps {
  content: GetContentQuery["contents"]["data"][number]["attributes"];
}

export default function ContentIndex(props: ContentIndexProps): JSX.Element {
  const { content, langui } = props;
  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/contents"
        title={"Contents"}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        horizontalLine
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/contents"
        title={"Contents"}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />
      <div className="grid place-items-center">
        <ThumbnailHeader
          thumbnail={content.thumbnail.data?.attributes}
          pre_title={
            content.titles.length > 0 ? content.titles[0].pre_title : undefined
          }
          title={
            content.titles.length > 0
              ? content.titles[0].title
              : prettySlug(content.slug)
          }
          subtitle={
            content.titles.length > 0 ? content.titles[0].subtitle : undefined
          }
          description={
            content.titles.length > 0
              ? content.titles[0].description
              : undefined
          }
          type={content.type}
          categories={content.categories}
          langui={langui}
        />

        <HorizontalLine />

        {content.text_set.length > 0 && (
          <Button href={`/contents/${content.slug}/read/`}>
            {langui.read_content}
          </Button>
        )}

        {content.audio_set.length > 0 && (
          <Button href={`/contents/${content.slug}/listen/`}>
            {langui.listen_content}
          </Button>
        )}

        {content.video_set.length > 0 && (
          <Button href={`/contents/${content.slug}/watch/`}>
            {langui.watch_content}
          </Button>
        )}
      </div>
    </ContentPanel>
  );

  let description = "";
  if (content.type.data) {
    description += `${langui.type}: `;
    if (content.type.data.attributes.titles.length > 0) {
      description += content.type.data.attributes.titles[0].title;
    } else {
      description += prettySlug(content.type.data.attributes.slug);
    }
    description += "\n";
  }
  if (content.categories.data.length > 0) {
    description += `${langui.categories}: `;
    description += content.categories.data
      .map((category) => category.attributes.short)
      .join(" | ");
    description += "\n";
  }

  if (content.titles.length > 0 && content.titles[0].description) {
    description += "\n";
    description += content.titles[0].description;
  }

  return (
    <AppLayout
      navTitle="Contents"
      title={
        content.titles.length > 0
          ? prettyinlineTitle(
              content.titles[0].pre_title,
              content.titles[0].title,
              content.titles[0].subtitle
            )
          : prettySlug(content.slug)
      }
      thumbnail={content.thumbnail.data?.attributes}
      contentPanel={contentPanel}
      subPanel={subPanel}
      description={description}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: ContentIndexProps }> {
  const content = (
    await getContent({
      slug: context.params?.slug?.toString() ?? "",
      language_code: context.locale ?? "en",
    })
  ).contents.data[0].attributes;
  if (!content) return { notFound: true };
  const props: ContentIndexProps = {
    ...(await getAppStaticProps(context)),
    content: content,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const contents = await getContentsSlugs({});
  const paths: GetStaticPathsResult["paths"] = [];
  contents.contents.data.map((item) => {
    context.locales?.map((local) => {
      paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: "blocking",
  };
}
