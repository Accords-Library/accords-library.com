import { useRouter } from "next/router";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel from "components/Panels/ContentPanel";
import { getAssetURL } from "queries/helpers";
import {
  getLibraryItem,
  getRecursiveSlugs,
  LibraryItem,
  Subitem,
} from "queries/library/[...slug]";
import Image from "next/image";
import Link from "next/link";

type Props = {
  libraryItem: LibraryItem;
};

export default function Library(props: Props): JSX.Element {
  const router = useRouter();
  return (
    <>
      <ContentPanel>
        <h1>{props.libraryItem.title}</h1>
        <h2>{props.libraryItem.subtitle}</h2>
        <Image
          src={getAssetURL(props.libraryItem.thumbnail.id)}
          alt={props.libraryItem.thumbnail.title}
          width={props.libraryItem.thumbnail.width}
          height={props.libraryItem.thumbnail.height}
        />

        {props.libraryItem.subitems.map((subitem: Subitem) => (
          <Link
            href={router.asPath + "/" + subitem.subitem_id.slug}
            key={subitem.subitem_id.id}
            passHref
          >
            <div>
              {subitem.subitem_id.thumbnail ? (
                <Image
                  src={getAssetURL(subitem.subitem_id.thumbnail.id)}
                  alt={subitem.subitem_id.thumbnail.title}
                  width={subitem.subitem_id.thumbnail.width}
                  height={subitem.subitem_id.thumbnail.height}
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

export async function getStaticProps({ params }) {
  return {
    props: {
      libraryItem: await getLibraryItem(params.slug),
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllSlugs();

  /*
  paths.map((item) => {
    console.log(item.params.slug);
  });
  */

  return {
    paths,
    fallback: false,
  };
}

async function getAllSlugs() {
  return (await getRecursiveSlugs()).map((item) => {
    return {
      params: {
        slug: item,
      },
    };
  });
}
