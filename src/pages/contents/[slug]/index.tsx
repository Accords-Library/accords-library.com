import { GetStaticPaths, GetStaticProps } from "next";
import {
  getContent,
  getContentsSlugs,
  getWebsiteInterface,
} from "graphql/operations";
import {
  GetContentQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import ContentPanel from "components/Panels/ContentPanel";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import AppLayout from "components/AppLayout";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
import { prettyinlineTitle, prettySlug } from "queries/helpers";

type ContentIndexProps = {
  content: GetContentQuery;
  langui: GetWebsiteInterfaceQuery;
};

export default function ContentIndex(props: ContentIndexProps): JSX.Element {
  const content = props.content.contents.data[0].attributes;
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <ReturnButton href="/contents" title={"Contents"} langui={langui} />
      <HorizontalLine />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <div className="grid place-items-center">
        <ThumbnailHeader content={content} langui={langui} />

        <HorizontalLine />

        {content.text_set.length > 0 ? (
          <Button href={`/contents/${content.slug}/read/`}>
            {langui.read_content}
          </Button>
        ) : (
          ""
        )}

        {content.audio_set.length > 0 ? (
          <Button href={`/contents/${content.slug}/listen/`}>
            {langui.listen_content}
          </Button>
        ) : (
          ""
        )}

        {content.video_set.length > 0 ? (
          <Button href={`/contents/${content.slug}/watch/`}>
            {langui.watch_content}
          </Button>
        ) : (
          ""
        )}
      </div>
    </ContentPanel>
  );

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
      langui={langui}
      contentPanel={contentPanel}
      subPanel={subPanel}
      description={
        content.titles.length > 0 ? content.titles[0].description : undefined
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params) {
    if (context.params.slug && context.locale) {
      if (context.params.slug instanceof Array)
        context.params.slug = context.params.slug.join("");

      const props: ContentIndexProps = {
        content: await getContent({
          slug: context.params.slug,
          language_code: context.locale,
        }),
        langui: await getWebsiteInterface({
          language_code: context.locale,
        }),
      };
      return {
        props: props,
      };
    }
  }
  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  type Path = {
    params: {
      slug: string;
    };
    locale: string;
  };

  const data = await getContentsSlugs({});
  const paths: Path[] = [];
  data.contents.data.map((item) => {
    context.locales?.map((local) => {
      paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: false,
  };
};
