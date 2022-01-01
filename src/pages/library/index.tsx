import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel from "components/Panels/ContentPanel";
import { LibraryItem, getLibraryItems } from "queries/library/index";
import LibraryItemComponent from "components/Library/LibraryItemComponent";
import { applyCustomAppProps } from "pages/_app";

type Props = {
  libraryItems: LibraryItem[];
};

applyCustomAppProps(Library, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  return (
    <>
      <SubPanel>
        <h2>Library</h2>
        <p>
          A comprehensive list of all Yokoverse&rsquo;s side materials (books,
          novellas, artbooks, stage plays, manga, drama CDs, and comics). For
          each, we provide photos and/or scans of the content, information about
          what it is, when and how it was released, size, initial price…
        </p>
        <hr />
      </SubPanel>

      <ContentPanel>
        {props.libraryItems.map((item: LibraryItem) => (
          <LibraryItemComponent key={item.id} item={item} />
        ))}
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      libraryItems: await getLibraryItems(context.locale),
    },
  };
};
