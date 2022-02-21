import { GetStaticPaths, GetStaticProps } from "next";
import {
  getContentsSlugs,
  getContentText,
  getWebsiteInterface,
} from "graphql/operations";
import {
  GetContentTextQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import ContentPanel from "components/Panels/ContentPanel";
import HorizontalLine from "components/HorizontalLine";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import AppLayout from "components/AppLayout";
import Markdawn from "components/Markdown/Markdawn";

type ContentReadProps = {
  content: GetContentTextQuery;
  langui: GetWebsiteInterfaceQuery;
};

export default function ContentRead(props: ContentReadProps): JSX.Element {
  const content = props.content.contents.data[0].attributes;
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <ReturnButton
        href={`/library/content/${content.slug}`}
        title={"Content"}
        langui={langui}
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <div className="grid place-items-center">
        <ThumbnailHeader content={content} langui={langui} />

        <HorizontalLine />

        {content.text_set.length > 0 ? (
          <Markdawn text={content.text_set[0].text} />
        ) : (
          ""
        )}
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      title={langui.library_content}
      langui={langui}
      contentPanel={contentPanel}
      subPanel={subPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params) {
    if (context.params.slug && context.locale) {
      if (context.params.slug instanceof Array)
        context.params.slug = context.params.slug.join("");

      const props: ContentReadProps = {
        content: await getContentText({
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
