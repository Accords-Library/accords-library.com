import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import LibraryItemComponent from "components/Library/LibraryItemComponent";
import { applyCustomAppProps } from "pages/_app";
import { GetLibraryItemsPreviewQuery } from "graphql/operations-types";
import { getLibraryItemsPreview } from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";

type Props = {
  libraryItems: GetLibraryItemsPreviewQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  return (
    <>
      <SubPanel>
        <PanelHeader
          icon="library_books"
          title="Library"
          description="A comprehensive list of all Yokoverse&rsquo;s side materials (books, novellas, artbooks, stage plays, manga, drama CDs, and comics). For each, we provide photos and/or scans of the content, information about what it is, when and how it was released, size, initial price…"
        />
      </SubPanel>

      <ContentPanel width={ContentPanelWidthSizes.large}>
        <div className="grid gap-8 items-end grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]">
          {props.libraryItems.libraryItems.data.map((item) => (
            <LibraryItemComponent key={item.id} item={item} />
          ))}
        </div>
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale)
    return {
      props: {
        libraryItems: await getLibraryItemsPreview({
          language_code: context.locale,
        }),
      },
    };
  else {
    return { props: {} };
  }
};
