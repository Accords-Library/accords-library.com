import { useRouter } from "next/router";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import Image from "next/image";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";
import { getLibraryItem, getLibraryItemsSlugs } from "graphql/operations";
import { GetLibraryItemQuery } from "graphql/operations-types";
import { getAssetURL } from "queries/helpers";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
import NavOption from "components/PanelComponents/NavOption";

type Props = {
  libraryItem: GetLibraryItemQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const router = useRouter();
  const libraryItem = props.libraryItem.libraryItems.data[0];

  return (
    <>
      <SubPanel>
        <ReturnButton title="Library" url="/library" />
        <hr />

        <div className="grid place-items-center">
          <div className="cursor-pointer grid items-end relative hover:rounded-3xl w-[80%] max-w-full mb-8">
            <div className="bg-light absolute inset-1 rounded-lg shadow-dark shadow-lg"></div>
            {libraryItem.attributes.thumbnail.data ? (
              <Image
                src={getAssetURL(
                  libraryItem.attributes.thumbnail.data.attributes.url
                )}
                alt={
                  libraryItem.attributes.thumbnail.data.attributes
                    .alternativeText
                }
                width={libraryItem.attributes.thumbnail.data.attributes.width}
                height={libraryItem.attributes.thumbnail.data.attributes.height}
              />
            ) : (
              <div className="w-full aspect-[21/29.7]"></div>
            )}
          </div>

          <h1 className="text-2xl">{libraryItem.attributes.title}</h1>
          {libraryItem.attributes.subtitle ? (
            <h2 className="text-1xl">{libraryItem.attributes.subtitle}</h2>
          ) : (
            ""
          )}
        </div>

        <hr />

        <NavOption title="Summary" url="#summary" border={true} />
        <NavOption title="Gallery" url="#gallery" border={true} />
        <NavOption title="Details" url="#details" border={true} />
        <NavOption title="Subitems" url="#subitems" border={true} />
        <NavOption title="Content" url="#content" border={true} />
      </SubPanel>
      <ContentPanel width={ContentPanelWidthSizes.large}>
        <div className="grid place-items-center gap-8">
          <div className="cursor-pointer grid items-end relative hover:rounded-3xl w-96 max-w-full mb-16">
            <div className="bg-light absolute inset-1 rounded-lg shadow-dark shadow-xl"></div>
            {libraryItem.attributes.thumbnail.data ? (
              <Image
                src={getAssetURL(
                  libraryItem.attributes.thumbnail.data.attributes.url
                )}
                alt={
                  libraryItem.attributes.thumbnail.data.attributes
                    .alternativeText
                }
                width={libraryItem.attributes.thumbnail.data.attributes.width}
                height={libraryItem.attributes.thumbnail.data.attributes.height}
              />
            ) : (
              <div className="w-full aspect-[21/29.7]"></div>
            )}
          </div>

          <div
            id="summary"
            className="bg-mid w-full grid place-items-center p-8 rounded-2xl"
          >
            <div className="max-w-2xl grid place-items-center gap-8">
              {libraryItem.attributes.subitem_of.data.length > 0 ? (
                <div className="grid place-items-center">
                  <p>Subitem of</p>
                  <Link
                    href={`/library/${libraryItem.attributes.subitem_of.data[0].attributes.slug}`}
                    passHref
                  >
                    <button>
                      {
                        libraryItem.attributes.subitem_of.data[0].attributes
                          .title
                      }
                      {libraryItem.attributes.subitem_of.data[0].attributes
                        .subtitle
                        ? ` - ${libraryItem.attributes.subitem_of.data[0].attributes.subtitle}`
                        : ""}
                    </button>
                  </Link>
                </div>
              ) : (
                ""
              )}
              <div>
                <h1 className="text-3xl">{libraryItem.attributes.title}</h1>
                {libraryItem.attributes.subtitle ? (
                  <h2 className="text-2xl">
                    {libraryItem.attributes.subtitle}
                  </h2>
                ) : (
                  ""
                )}
              </div>
              {libraryItem.attributes.descriptions.length > 0 ? (
                <p>{libraryItem.attributes.descriptions[0].description}</p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div id="gallery"></div>

          <div
            id="details"
            className="bg-mid w-full grid place-items-center p-8 rounded-2xl"
          >
            <div className="max-w-2xl grid place-items-center gap-8">
              <h2 className="text-2xl">Details</h2>
              <div className="grid grid-cols-3 place-items-center">
                <p>Type</p>
                <p>Release date</p>
                <p>Price</p>
              </div>
            </div>
          </div>

          <div id="subitems">
            {libraryItem.attributes.subitems.data.map((subitem) => (
              <Link
                href={`/library/${subitem.attributes.slug}`}
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
                      height={
                        subitem.attributes.thumbnail.data.attributes.height
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            ))}

            <div id="content">
              {libraryItem.attributes.contents.data.map((content) => (
                <div
                  key={content.id}
                  className="grid grid-flow-col gap-4 w-full"
                >
                  <h3>{content.attributes.title[0].title}</h3>
                  <p>
                    {content.attributes.range[0].__typename ===
                    "ComponentRangePageRange"
                      ? content.attributes.range[0].starting_page
                      : ""}
                  </p>
                  <p>{content.attributes.type.data.attributes.slug}</p>
                </div>
              ))}
            </div>
          </div>
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
          libraryItem: await getLibraryItem({
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

  const data = await getLibraryItemsSlugs({});
  const paths: Path[] = [];
  data.libraryItems.data.map((item) => {
    console.log(item.attributes.slug);
    paths.push({ params: { slug: item.attributes.slug } });
  });
  return {
    paths,
    fallback: false,
  };
};
