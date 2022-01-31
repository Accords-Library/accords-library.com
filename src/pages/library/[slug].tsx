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
  const libraryItem = props.libraryItem.libraryItems.data[0];

  libraryItem.attributes.contents.data.sort((a, b) => {
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
                  <Button
                    href={`/library/${libraryItem.attributes.subitem_of.data[0].attributes.slug}`}
                  >
                    {libraryItem.attributes.subitem_of.data[0].attributes.title}
                    {libraryItem.attributes.subitem_of.data[0].attributes
                      .subtitle
                      ? ` - ${libraryItem.attributes.subitem_of.data[0].attributes.subtitle}`
                      : ""}
                  </Button>
                </div>
              ) : (
                ""
              )}
              <div className="grid place-items-center">
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
            <div id="gallery" className="grid place-items-center gap-8  w-full">
              <h2 className="text-2xl">Gallery</h2>
              <div className="grid w-full gap-8 items-end grid-cols-[repeat(auto-fit,_minmax(15rem,1fr))]">
                {libraryItem.attributes.gallery.data.map((galleryItem) => (
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
                    id={content.attributes.slug}
                    key={content.id}
                    className=" grid gap-2 h-6 overflow-hidden px-4 rounded-lg target:bg-mid target:h-auto target:py-3 target:my-2"
                  >
                    <div className="grid gap-4 place-items-center grid-cols-[auto_auto_1fr_auto_9em] ">
                      <a href={`#${content.attributes.slug}`}>
                        <h3>{content.attributes.title[0].title}</h3>
                      </a>
                      <div className="grid grid-flow-col gap-1">
                        {content.attributes.categories.data.map((category) => (
                          <Chip key={category.id}>
                            {category.attributes.short}
                          </Chip>
                        ))}
                      </div>
                      <p className="border-b-2 h-4 w-full border-black border-dotted opacity-30"></p>
                      <p>
                        {content.attributes.range[0].__typename ===
                        "ComponentRangePageRange"
                          ? content.attributes.range[0].starting_page
                          : ""}
                      </p>
                      <Chip className="place-self-end">
                        {content.attributes.type.data.attributes.slug}
                      </Chip>
                    </div>
                    <div className="grid grid-flow-col place-content-start place-items-center gap-2">
                      <span className="material-icons text-dark">
                        subdirectory_arrow_right
                      </span>

                      {content.attributes.scan_set.data ? (
                        <Button
                          href={`/scans/${content.attributes.scan_set.data.attributes.slug}`}
                        >
                          View scan
                        </Button>
                      ) : (
                        ""
                      )}

                      {content.attributes.text_set.data ? (
                        <Button
                          href={`/read/${content.attributes.text_set.data.attributes.slug}`}
                        >
                          Read content
                        </Button>
                      ) : (
                        ""
                      )}

                      {content.attributes.audio_set.data ? (
                        <Button
                          href={`/listen/${content.attributes.audio_set.data.attributes.slug}`}
                        >
                          Listen content
                        </Button>
                      ) : (
                        ""
                      )}

                      {content.attributes.video_set.data ? (
                        <Button
                          href={`/watch/${content.attributes.video_set.data.attributes.slug}`}
                        >
                          View content
                        </Button>
                      ) : (
                        ""
                      )}

                      {!content.attributes.scan_set.data &&
                      !content.attributes.text_set.data &&
                      !content.attributes.audio_set.data &&
                      !content.attributes.video_set.data
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
    paths.push({ params: { slug: item.attributes.slug } });
  });
  return {
    paths,
    fallback: false,
  };
};
