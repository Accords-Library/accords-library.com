import { useRouter } from "next/router";
import ContentPanel from "components/Panels/ContentPanel";
import { getAssetURL } from "queries/helpers";
import {
  getLibraryItem,
  getBreadcrumbs,
  getLibraryItemsSkeleton,
  LibraryItem,
  LibrarySubItem,
} from "queries/library/[...slug]";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";

type Props = {
  libraryItem: LibraryItem;
};

applyCustomAppProps(Library, {
  useSubPanel: false,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const router = useRouter();
  return (
    <>
      <ContentPanel>
        <h1>{props.libraryItem.attributes.title}</h1>
        <h2>{props.libraryItem.attributes.subtitle}</h2>
        <Image
          src={getAssetURL(
            props.libraryItem.attributes.thumbnail.data.attributes.url
          )}
          alt={
            props.libraryItem.attributes.thumbnail.data.attributes
              .alternativeText
          }
          width={props.libraryItem.attributes.thumbnail.data.attributes.width}
          height={props.libraryItem.attributes.thumbnail.data.attributes.height}
        />

        {props.libraryItem.attributes.subitems.data.map(
          (subitem: LibrarySubItem) => (
            <Link
              href={router.asPath + "/" + subitem.attributes.slug}
              key={subitem.id}
              passHref
            >
              <div>
                {subitem.attributes.thumbnail.data ? (
                  <Image
                    src={getAssetURL(
                      subitem.attributes.thumbnail.data.attributes.url
                    )}
                    alt={
                      subitem.attributes.thumbnail.data.attributes
                        .alternativeText
                    }
                    width={subitem.attributes.thumbnail.data.attributes.width}
                    height={subitem.attributes.thumbnail.data.attributes.height}
                  />
                ) : (
                  ""
                )}
              </div>
            </Link>
          )
        )}
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params && Array.isArray(context.params.slug) && context.locale) {
    return {
      props: {
        libraryItem: await getLibraryItem(context.params.slug, context.locale),
      },
    };
  }
  return { props: {} };
};

export async function getStaticPaths() {
  const paths = await getAllSlugs();
  return {
    paths,
    fallback: false,
  };
}

async function getAllSlugs() {
  type Path = {
    params: {
      slug: string[];
    };
  };

  const data = await getLibraryItemsSkeleton();
  const paths: Path[] = [];
  data.map((item) => {
    const breadcrumbs = getBreadcrumbs([], item);
    breadcrumbs.map((breadcrumb) => {
      paths.push({ params: { slug: breadcrumb } });
    });
  });
  return paths;
}
