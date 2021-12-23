import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel from "components/Panels/ContentPanel";
import { LibraryItem, getLibraryItems } from "queries/library/index";
import { getAssetURL } from "queries/helpers";
import Image from "next/image";
import Link from "next/link";

type Props = {
  libraryItems: LibraryItem[];
};

export default function Library(props: Props): JSX.Element {
  return (
    <>
      <SubPanel>
        <h2>Library</h2>
        <p>
          A comprehensive list of all Yokoverse’s side materials (books,
          novellas, artbooks, stage plays, manga, drama CDs, and comics). For
          each, we provide photos and/or scans of the content, information about
          what it is, when and how it was released, size, initial price…
        </p>
        <hr />
      </SubPanel>

      <ContentPanel>
        {props.libraryItems.map((item: LibraryItem) => (
          <Link href={"/library/" + item.slug} key={item.id} passHref>
            <div>
              <p>
                {item.subitem_of.length > 0
                  ? prettyTitleSubtitle(
                      item.subitem_of[0].item_id.title,
                      item.subitem_of[0].item_id.subtitle
                    ) + " • "
                  : ""}
                {prettyTitleSubtitle(item.title, item.subtitle)}
              </p>
              <p>{item.release_date}</p>

              {item.thumbnail ? (
                <Image
                  src={getAssetURL(item.thumbnail.id)}
                  alt={item.thumbnail.title}
                  width={item.thumbnail.width}
                  height={item.thumbnail.height}
                />
              ) : (
                ""
              )}
            </div>
          </Link>
        ))}
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      libraryItems: await getLibraryItems(),
    },
  };
};

function prettyTitleSubtitle(title: string, subtitle: string): string {
  let result = title;
  if (subtitle !== null) result += " - " + subtitle;
  return result;
}
