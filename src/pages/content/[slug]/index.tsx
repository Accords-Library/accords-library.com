import { GetStaticPaths, GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";
import { getContent, getContentsSlugs } from "graphql/operations";
import { GetContentQuery } from "graphql/operations-types";
import ContentPanel from "components/Panels/ContentPanel";
import Image from "next/image";
import { getAssetURL, prettySlug } from "queries/helpers";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import ThumbnailHeader from "components/Content/ThumbnailHeader";

type Props = {
  content: GetContentQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: false,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const content = props.content.contents.data[0].attributes;

  return (
    <>
      <ContentPanel>
        <div className="grid place-items-center">
          <ThumbnailHeader content={content} />

          <HorizontalLine />

          {content.text_set.length > 0 ? (
            <Button href={`/content/${content.slug}/read/`}>
              Read content
            </Button>
          ) : (
            ""
          )}

          {content.audio_set.length > 0 ? (
            <Button href={`/content/${content.slug}/listen/`}>
              Listen content
            </Button>
          ) : (
            ""
          )}

          {content.video_set.length > 0 ? (
            <Button href={`/content/${content.slug}/watch/`}>
              View content
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
      return {
        props: {
          content: await getContent({
            slug: context.params.slug,
            language_code: context.locale,
          }),
        },
      };
    }
  }
  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => {
  type Path = {
    params: {
      slug: string;
    };
  };

  const data = await getContentsSlugs({});
  const paths: Path[] = [];
  data.contents.data.map((item) => {
    paths.push({ params: { slug: item.attributes.slug } });
  });
  return {
    paths,
    fallback: false,
  };
};
