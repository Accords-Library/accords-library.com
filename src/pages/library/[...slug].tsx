import { useRouter } from "next/router";
import ContentPanel from "components/Panels/ContentPanel";
import Image from "next/image";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";
import { getLibraryItem, getLibraryItemsSkeleton } from "graphql/operations";
import { GetLibraryItemQuery } from "graphql/operations-types";
import { getAssetURL } from "queries/helpers";

type Props = {
  libraryItem: GetLibraryItemQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: false,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const router = useRouter();
  const libraryItem = props.libraryItem.libraryItems.data[0];
  return (
    <>
      <ContentPanel>
        <h1>{libraryItem.attributes.title}</h1>
        <h2>{libraryItem.attributes.subtitle}</h2>
        {libraryItem.attributes.thumbnail.data ? (
          <Image
            src={getAssetURL(
              libraryItem.attributes.thumbnail.data.attributes.url
            )}
            alt={
              libraryItem.attributes.thumbnail.data.attributes.alternativeText
            }
            width={libraryItem.attributes.thumbnail.data.attributes.width}
            height={libraryItem.attributes.thumbnail.data.attributes.height}
          />
        ) : (
          ""
        )}

        {libraryItem.attributes.subitems.data.map((subitem) => (
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
                    subitem.attributes.thumbnail.data.attributes.alternativeText
                  }
                  width={subitem.attributes.thumbnail.data.attributes.width}
                  height={subitem.attributes.thumbnail.data.attributes.height}
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
  if (context.params && Array.isArray(context.params.slug)) {
    const slug = context.params.slug.pop();
    if (slug && context.locale) {
      return {
        props: {
          libraryItem: await getLibraryItem({
            slug: slug,
            language_code: context.locale,
          }),
        },
      };
    }
  }

  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllSlugs();
  return {
    paths,
    fallback: false,
  };
};

async function getAllSlugs() {
  type Path = {
    params: {
      slug: string[];
    };
  };

  const data = await getLibraryItemsSkeleton({});
  console.log(data);
  const paths: Path[] = [];
  data.libraryItems.data.map((item) => {
    const breadcrumbs = getBreadcrumbs([], item);
    breadcrumbs.map((breadcrumb) => {
      paths.push({ params: { slug: breadcrumb } });
    });
  });
  return paths;
}

export type LibraryItemSkeleton = {
  attributes: {
    slug: string;
    subitems: {
      data: LibraryItemSkeleton[];
    };
  };
};

function getBreadcrumbs(parentBreadcrumb: string[], data: LibraryItemSkeleton) {
  const result: string[][] = [];
  const itemBreadcrumb = [...parentBreadcrumb, data.attributes.slug];
  result.push(itemBreadcrumb);
  data.attributes.subitems.data.map((subitem) => {
    result.push(...getBreadcrumbs(itemBreadcrumb, subitem));
  });
  return result;
}
