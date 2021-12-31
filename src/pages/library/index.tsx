import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel from "components/Panels/ContentPanel";
import { LibraryItem, getLibraryItems } from "queries/library/index";
import { BasicDate, getAssetURL } from "queries/helpers";
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
          <Link href={"/library/" + item.attributes.slug} key={item.id} passHref>
            <div>
              <p>
                {prettyTitleSubtitle(item.attributes.title, item.attributes.subtitle)}
              </p>
              <p>{prettyDate(item.attributes.release_date)}</p>

              {item.attributes.thumbnail.data ? (
                <Image
                  src={getAssetURL(item.attributes.thumbnail.data.attributes.url)}
                  alt={item.attributes.thumbnail.data.attributes.alternativeText}
                  width={item.attributes.thumbnail.data.attributes.width}
                  height={item.attributes.thumbnail.data.attributes.height}
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
      libraryItems: await getLibraryItems(context.locale),
    },
  };
};

function prettyTitleSubtitle(title: string, subtitle: string): string {
  let result = title;
  if (subtitle !== null) result += " - " + subtitle;
  return result;
}

function prettyDate(date: BasicDate): string {
  return date.year + "/" + date.month + "/" + date.day;
}