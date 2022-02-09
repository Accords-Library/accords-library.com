import { GetStaticPaths, GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";
import { getContentsSlugs, getContentText } from "graphql/operations";
import { GetContentTextQuery } from "graphql/operations-types";
import ContentPanel from "components/Panels/ContentPanel";
import Image from "next/image";
import { getAssetURL, prettySlug } from "queries/helpers";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import Markdown from "markdown-to-jsx";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
import SceneBreak from "components/Markdown/SceneBreak";
import ThumbnailHeader from "components/Content/ThumbnailHeader";

type Props = {
  content: GetContentTextQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const content = props.content.contents.data[0].attributes;

  return (
    <>
      <SubPanel>
        <ReturnButton href={`/content/${content.slug}`} title="Content" />
      </SubPanel>
      <ContentPanel>
        <div className="grid place-items-center">
          <ThumbnailHeader content={content} />

          <HorizontalLine />

          {content.text_set.length > 0 ? (
            <Markdown
              className="prose prose-lg text-black pt-12"
              options={{ overrides: { hr: { component: SceneBreak } } }}
            >
              {content.text_set[0].text}
            </Markdown>
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
    if (context.params.slug instanceof Array)
      context.params.slug = context.params.slug.join("");
    if (context.params.slug && context.locale) {
      return {
        props: {
          content: await getContentText({
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
