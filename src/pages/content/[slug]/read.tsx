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
          <div className="grid place-items-center gap-12 mb-12">
            <div>
              <Image
                className="rounded-lg"
                src={getAssetURL(content.thumbnail.data.attributes.url)}
                alt={content.thumbnail.data.attributes.alternativeText}
                width={content.thumbnail.data.attributes.width}
                height={content.thumbnail.data.attributes.height}
              />
            </div>
            <div className="grid place-items-center">
              <p className="text-2xl">{content.titles[0].pre_title}</p>
              <h1 className="text-3xl">{content.titles[0].title}</h1>
              <h2 className="text-2xl">{content.titles[0].subtitle}</h2>
            </div>
          </div>

          <div className="grid grid-flow-col gap-8">
            {content.type ? (
              <div className="grid place-items-center">
                <h3 className="text-xl">Type</h3>
                <Button>{prettySlug(content.type.data.attributes.slug)}</Button>
              </div>
            ) : (
              ""
            )}

            {content.categories.data.length > 0 ? (
              <div className="grid place-items-center">
                <h3 className="text-xl">Categories</h3>
                {content.categories.data.map((category) => (
                  <Button key={category.id}>{category.attributes.name}</Button>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>

          <HorizontalLine />

          {content.text_set.length > 0 ? (
            <div className="prose prose-lg text-black">
              <Markdown>{content.text_set[0].text}</Markdown>
            </div>
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
