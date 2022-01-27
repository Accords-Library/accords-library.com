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
import {
  convertMmToInch,
  getAssetURL,
  prettyDate,
  prettyPrice,
} from "queries/helpers";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
import NavOption from "components/PanelComponents/NavOption";
import LibraryItemComponent from "components/Library/LibraryItemComponent";

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

        {libraryItem.attributes.gallery.data.length > 0 ? (
          <NavOption title="Gallery" url="#gallery" border={true} />
        ) : (
          ""
        )}

        <NavOption title="Details" url="#details" border={true} />

        {libraryItem.attributes.subitems.data.length > 0 ? (
          <NavOption title="Subitems" url="#subitems" border={true} />
        ) : (
          ""
        )}

        {libraryItem.attributes.contents.data.length > 0 ? (
          <NavOption title="Content" url="#content" border={true} />
        ) : (
          ""
        )}
      </SubPanel>
      <ContentPanel width={ContentPanelWidthSizes.large}>
        <div className="grid place-items-center gap-12">
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

          {libraryItem.attributes.gallery.data.length > 0 ? (
            <div id="gallery" className="grid place-items-center gap-8">
              <h2 className="text-2xl">Gallery</h2>
              <div className="grid grid-flow-col place-items-center gap-4">
                {libraryItem.attributes.gallery.data.map((galleryItem) => (
                  <Image
                    key={galleryItem.id}
                    className="rounded-lg"
                    src={getAssetURL(galleryItem.attributes.url)}
                    alt={galleryItem.attributes.alternativeText}
                    width={galleryItem.attributes.width}
                    height={galleryItem.attributes.height}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            id="details"
            className="bg-mid w-full grid place-items-center p-8 rounded-2xl"
          >
            <div className="max-w-2xl grid place-items-center gap-8">
              <h2 className="text-2xl">Details</h2>
              <div className="grid grid-flow-col place-items-center gap-8">
                <div className="grid place-items-center">
                  <h3>Type</h3>
                </div>

                {libraryItem.attributes.release_date ? (
                  <div className="grid place-items-center">
                    <h3>Release date</h3>
                    <p>{prettyDate(libraryItem.attributes.release_date)}</p>
                  </div>
                ) : (
                  ""
                )}

                {libraryItem.attributes.release_date ? (
                  <div className="grid place-items-center">
                    <h3>Price</h3>
                    <p>{prettyPrice(libraryItem.attributes.price)}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <h3>Physical size</h3>
              <div className="grid grid-flow-col place-items-center gap-8">
                <div className="grid place-items-center">
                  <p className="font-bold">Width</p>
                  <p>{libraryItem.attributes.size.width} mm</p>
                  <p>{convertMmToInch(libraryItem.attributes.size.width)} in</p>
                </div>
                <div className="grid place-items-center">
                  <p className="font-bold">Height</p>
                  <p>{libraryItem.attributes.size.height} mm</p>
                  <p>
                    {convertMmToInch(libraryItem.attributes.size.height)} in
                  </p>
                </div>
                <div className="grid place-items-center">
                  <p className="font-bold">Thickness</p>
                  <p>{libraryItem.attributes.size.thickness} mm</p>
                  <p>
                    {convertMmToInch(libraryItem.attributes.size.thickness)} in
                  </p>
                </div>
              </div>
            </div>
          </div>

          {libraryItem.attributes.subitems.data.length > 0 ? (
            <div id="subitems" className="grid place-items-center gap-8">
              <h2 className="text-2xl">Subitems</h2>
              <div className="grid gap-8 items-end grid-cols-[repeat(auto-fit,_minmax(15rem,1fr))]">
                {libraryItem.attributes.subitems.data.map((subitem) => (
                  <LibraryItemComponent key={subitem.id} item={subitem} />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {libraryItem.attributes.contents.data.length > 0 ? (
            <div id="content" className="w-full grid place-items-center">
              <h2 className="text-2xl">Content</h2>
              <div className="grid gap-4 w-full">
                {libraryItem.attributes.contents.data.map((content) => (
                  <div
                    key={content.id}
                    className="grid grid-flow-col gap-4 place-items-center grid-cols-[auto_auto_1fr_auto_auto]"
                  >
                    <h3>{content.attributes.title[0].title}</h3>
                    <p></p>
                    <p className="border-b-2 h-4 w-full border-dark border-dotted"></p>
                    <p>
                      {content.attributes.range[0].__typename ===
                      "ComponentRangePageRange"
                        ? content.attributes.range[0].starting_page
                        : ""}
                    </p>
                    <button className="text-xs">
                      <p>{content.attributes.type.data.attributes.slug}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
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
