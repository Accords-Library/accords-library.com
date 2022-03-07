import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { GetContentsQuery } from "graphql/operations-types";
import { getContents } from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";
import AppLayout from "components/AppLayout";
import LibraryContentPreview from "components/Library/LibraryContentPreview";
import { prettyinlineTitle } from "queries/helpers";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface LibraryProps extends AppStaticProps {
  contents: GetContentsQuery["contents"]["data"];
}

export default function Library(props: LibraryProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="workspaces"
        title={langui.contents}
        description={langui.contents_description}
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <div className="grid gap-8 items-end grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]">
        {props.contents.map((item) => (
          <LibraryContentPreview key={item.id} item={item.attributes} />
        ))}
      </div>
    </ContentPanel>
  );
  return (
    <AppLayout
      navTitle={langui.contents}
      subPanel={subPanel}
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const contents = (
    await getContents({
      language_code: context.locale || "en",
    })
  ).contents.data;

  contents.sort((a, b) => {
    const titleA =
      a.attributes.titles.length > 0
        ? prettyinlineTitle(
            a.attributes.titles[0].pre_title,
            a.attributes.titles[0].title,
            a.attributes.titles[0].subtitle
          )
        : a.attributes.slug;
    const titleB =
      b.attributes.titles.length > 0
        ? prettyinlineTitle(
            b.attributes.titles[0].pre_title,
            b.attributes.titles[0].title,
            b.attributes.titles[0].subtitle
          )
        : b.attributes.slug;
    return titleA.localeCompare(titleB);
  });

  const props: LibraryProps = {
    ...(await getAppStaticProps(context)),
    contents: contents,
  };
  return {
    props: props,
  };
};
