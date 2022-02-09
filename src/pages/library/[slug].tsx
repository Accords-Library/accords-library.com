import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";
import { getLibraryItem, getLibraryItemsSlugs } from "graphql/operations";
import { GetLibraryItemQuery } from "graphql/operations-types";
import {
  convertMmToInch,
  getAssetURL,
  prettyDate,
  prettyinlineTitle,
  prettyPrice,
  prettySlug,
} from "queries/helpers";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
import NavOption from "components/PanelComponents/NavOption";
import LibraryItemComponent from "components/Library/LibraryItemComponent";
import Chip from "components/Chip";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";

type Props = {
  libraryItem: GetLibraryItemQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const item = props.libraryItem.libraryItems.data[0].attributes;

  item.contents.data.sort((a, b) => {
    if (
      a.attributes.range[0].__typename === "ComponentRangePageRange" &&
      b.attributes.range[0].__typename === "ComponentRangePageRange"
    ) {
      return (
        a.attributes.range[0].starting_page -
        b.attributes.range[0].starting_page
      );
    }
    return 0;
  });

  return (
    <>
      <SubPanel>
        <ReturnButton title="Library" href="/library" />
        <HorizontalLine />

        <NavOption title="Summary" url="#summary" border={true} />

        {item.gallery.data.length > 0 ? (
          <NavOption title="Gallery" url="#gallery" border={true} />
        ) : (
          ""
        )}

        <NavOption title="Details" url="#details" border={true} />

        {item.subitems.data.length > 0 ? (
          <NavOption title="Subitems" url="#subitems" border={true} />
        ) : (
          ""
        )}

        {item.contents.data.length > 0 ? (
          <NavOption title="Content" url="#content" border={true} />
        ) : (
          ""
        )}
      </SubPanel>
      <ContentPanel width={ContentPanelWidthSizes.large}>
        <div className="grid place-items-center gap-12">
          <div className="drop-shadow-dark-xl w-96 max-w-full mb-16">
            {item.thumbnail.data ? (
              <Image
                src={getAssetURL(item.thumbnail.data.attributes.url)}
                alt={item.thumbnail.data.attributes.alternativeText}
                width={item.thumbnail.data.attributes.width}
                height={item.thumbnail.data.attributes.height}
              />
            ) : (
              <div className="w-full aspect-[21/29.7]"></div>
            )}
          </div>

          <div
            id="summary"
            className="bg-mid w-full grid place-items-center p-8 rounded-2xl"
          >
            <div className="w-[clamp(0px,100%,42rem)] grid place-items-center gap-8">
              {item.subitem_of.data.length > 0 ? (
                <div className="grid place-items-center">
                  <p>Subitem of</p>
                  <Button
                    href={`/library/${item.subitem_of.data[0].attributes.slug}`}
                  >
                    {prettyinlineTitle(
                      "",
                      item.subitem_of.data[0].attributes.title,
                      item.subitem_of.data[0].attributes.subtitle
                    )}
                  </Button>
                </div>
              ) : (
                ""
              )}
              <div className="grid place-items-center">
                <h1 className="text-3xl">{item.title}</h1>
                {item.subtitle ? (
                  <h2 className="text-2xl">{item.subtitle}</h2>
                ) : (
                  ""
                )}
              </div>
              {item.descriptions.length > 0 ? (
                <p>{item.descriptions[0].description}</p>
              ) : (
                ""
              )}
            </div>
          </div>

          {item.gallery.data.length > 0 ? (
            <div id="gallery" className="grid place-items-center gap-8  w-full">
              <h2 className="text-2xl">Gallery</h2>
              <div className="grid w-full gap-8 items-end grid-cols-[repeat(auto-fit,_minmax(15rem,1fr))]">
                {item.gallery.data.map((galleryItem) => (
                  <div
                    key={galleryItem.id}
                    className="relative aspect-square hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <div className="bg-light absolute inset-0 rounded-lg shadow-md"></div>
                    <Image
                      className="rounded-lg"
                      src={getAssetURL(galleryItem.attributes.url)}
                      alt={galleryItem.attributes.alternativeText}
                      width={galleryItem.attributes.width}
                      height={galleryItem.attributes.height}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
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
            <div className="w-[clamp(0px,100%,42rem)] grid place-items gap-8">
              <h2 className="text-2xl text-center">Details</h2>
              <div className="grid grid-flow-col w-full place-content-between">
                {item.metadata.length > 0 ? (
                  <div className="grid place-items-center">
                    <h3 className="text-xl">Type</h3>
                    <Button>
                      {item.metadata[0].__typename.substring(
                        "ComponentMetadata".length
                      )}
                    </Button>
                  </div>
                ) : (
                  ""
                )}

                {item.release_date ? (
                  <div className="grid place-items-center">
                    <h3 className="text-xl">Release date</h3>
                    <p>{prettyDate(item.release_date)}</p>
                  </div>
                ) : (
                  ""
                )}

                {item.release_date ? (
                  <div className="grid place-items-center">
                    <h3 className="text-xl">Price</h3>
                    <p>{prettyPrice(item.price)}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {item.size ? (
                <>
                  <h3 className="text-xl">Physical Size</h3>
                  <div className="grid grid-flow-col w-full place-content-between">
                    <div className="grid place-items-start grid-flow-col gap-4">
                      <p className="font-bold">Width:</p>
                      <div>
                        <p>{item.size.width} mm</p>
                        <p>{convertMmToInch(item.size.width)} in</p>
                      </div>
                    </div>
                    <div className="grid place-items-start grid-flow-col gap-4">
                      <p className="font-bold">Height:</p>
                      <div>
                        <p>{item.size.height} mm</p>
                        <p>{convertMmToInch(item.size.height)} in</p>
                      </div>
                    </div>
                    {item.size.thickness ? (
                      <div className="grid place-items-start grid-flow-col gap-4">
                        <p className="font-bold">Thickness:</p>
                        <div>
                          <p>{item.size.thickness} mm</p>
                          <p>{convertMmToInch(item.size.thickness)} in</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                ""
              )}

              {item.metadata.length > 0 ? (
                <>
                  <h3 className="text-xl">Type Information</h3>
                  <div className="grid grid-cols-2 w-full place-content-between">
                    {item.metadata[0].__typename ===
                    "ComponentMetadataBooks" ? (
                      <>
                        <div className="grid place-content-start grid-flow-col gap-4">
                          <p className="font-bold">Type:</p>
                          <Chip>
                            {prettySlug(
                              item.metadata[0].subtype.data.attributes.slug
                            )}
                          </Chip>
                        </div>

                        <div className="grid place-content-start grid-flow-col gap-4">
                          <p className="font-bold">Pages:</p>
                          <p>{item.metadata[0].page_count}</p>
                        </div>

                        <div className="grid place-content-start grid-flow-col gap-4">
                          <p className="font-bold">Binding:</p>
                          <p>{item.metadata[0].binding_type}</p>
                        </div>

                        <div className="grid place-content-start grid-flow-col gap-4">
                          <p className="font-bold">Page order:</p>
                          <p>{prettySlug(item.metadata[0].page_order)}</p>
                        </div>

                        <div className="grid place-content-start grid-flow-col gap-4">
                          <p className="font-bold">Languages:</p>
                          {item.metadata[0].languages.data.map((lang) => (
                            <p key={lang.attributes.code}>
                              {lang.attributes.name}
                            </p>
                          ))}
                        </div>
                      </>
                    ) : item.metadata[0].__typename ===
                      "ComponentMetadataAudio" ? (
                      <></>
                    ) : item.metadata[0].__typename ===
                      "ComponentMetadataVideo" ? (
                      <></>
                    ) : item.metadata[0].__typename ===
                      "ComponentMetadataGame" ? (
                      <></>
                    ) : item.metadata[0].__typename ===
                      "ComponentMetadataMerch" ? (
                      <></>
                    ) : item.metadata[0].__typename ===
                      "ComponentMetadataOther" ? (
                      <>
                        <div className="grid place-content-start grid-flow-col gap-4">
                          <p className="font-bold">Type:</p>
                          <Chip>
                            {prettySlug(
                              item.metadata[0].subtype.data.attributes.slug
                            )}
                          </Chip>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          {item.subitems.data.length > 0 ? (
            <div id="subitems" className="grid place-items-center gap-8 w-full">
              <h2 className="text-2xl">Subitems</h2>
              <div className="grid gap-8 items-end grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] w-full">
                {item.subitems.data.map((subitem) => (
                  <LibraryItemComponent
                    key={subitem.id}
                    item={subitem.attributes}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {item.contents.data.length > 0 ? (
            <div id="content" className="w-full grid place-items-center gap-8">
              <h2 className="text-2xl">Content</h2>
              <div className="grid gap-4 w-full">
                {item.contents.data.map((content) => (
                  <div
                    id={content.attributes.slug}
                    key={content.id}
                    className=" grid gap-2 h-6 overflow-hidden px-4 rounded-lg target:bg-mid target:h-auto target:py-3 target:my-2"
                  >
                    <div className="grid gap-4 place-items-center grid-cols-[auto_auto_1fr_auto_9em] ">
                      <a href={`#${content.attributes.slug}`}>
                        <h3>
                          {content.attributes.content.data &&
                          content.attributes.content.data.attributes.titles
                            .length > 0
                            ? prettyinlineTitle(
                                content.attributes.content.data.attributes
                                  .titles[0].pre_title,
                                content.attributes.content.data.attributes
                                  .titles[0].title,
                                content.attributes.content.data.attributes
                                  .titles[0].subtitle
                              )
                            : prettySlug(content.attributes.slug, item.slug)}
                        </h3>
                      </a>
                      <div className="grid grid-flow-col gap-1">
                        {content.attributes.content.data?.attributes.categories.data.map(
                          (category) => (
                            <Chip key={category.id}>
                              {category.attributes.short}
                            </Chip>
                          )
                        )}
                      </div>
                      <p className="border-b-2 h-4 w-full border-black border-dotted opacity-30"></p>
                      <p>
                        {content.attributes.range[0].__typename ===
                        "ComponentRangePageRange"
                          ? content.attributes.range[0].starting_page
                          : ""}
                      </p>
                      {content.attributes.content.data ? (
                        <Chip className="place-self-end">
                          {prettySlug(
                            content.attributes.content.data.attributes.type.data
                              .attributes.slug
                          )}
                        </Chip>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="grid grid-flow-col place-content-start place-items-center gap-2">
                      <span className="material-icons text-dark">
                        subdirectory_arrow_right
                      </span>

                      {content.attributes.scan_set.length > 0 ? (
                        <Button
                          href={`/content/${content.attributes.content.data.attributes.slug}/scans/`}
                        >
                          View scans
                        </Button>
                      ) : (
                        ""
                      )}

                      {content.attributes.content.data ? (
                        <Button
                          href={`/content/${content.attributes.content.data.attributes.slug}`}
                        >
                          Open content
                        </Button>
                      ) : (
                        ""
                      )}

                      {content.attributes.scan_set.length === 0 &&
                      !content.attributes.content.data
                        ? "The content is not available"
                        : ""}
                    </div>
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
      if (context.params.slug instanceof Array)
        context.params.slug = context.params.slug.join("");
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
