import { GetStaticPaths, GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";
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
import Image from "next/image";
import { getAssetURL, prettySlug } from "queries/helpers";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import MainPanel from "components/Panels/MainPanel";

type Props = {
  content: GetContentQuery;
  langui: GetWebsiteInterfaceQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: false,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const content = props.content.contents.data[0].attributes;
  const langui = props.langui.websiteInterfaces.data[0].attributes;

  return (
    <>
      <MainPanel langui={langui} />
      <ContentPanel>
        <div className="grid place-items-center">
          <ThumbnailHeader content={content} langui={langui} />

          <HorizontalLine />

          {content.text_set.length > 0 ? (
            <Button href={`/content/${content.slug}/read/`}>
              {langui.content_read_content}
            </Button>
          ) : (
            ""
          )}

          {content.audio_set.length > 0 ? (
            <Button href={`/content/${content.slug}/listen/`}>
              {langui.content_listen_content}
            </Button>
          ) : (
            ""
          )}

          {content.video_set.length > 0 ? (
            <Button href={`/content/${content.slug}/watch/`}>
              {langui.content_watch_content}
            </Button>
          ) : (
            ""
          )}
        </div>
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params) {
    if (context.params.slug && context.locale) {
      if (context.params.slug instanceof Array)
        context.params.slug = context.params.slug.join("");

      const props: Props = {
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
