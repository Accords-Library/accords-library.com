import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { GetStaticPaths, GetStaticProps } from "next";
import { getLibraryItem, getLibraryItemsSlugs } from "graphql/operations";
import {
  Enum_Componentmetadatabooks_Binding_Type,
  Enum_Componentmetadatabooks_Page_Order,
  GetLibraryItemQuery,
} from "graphql/operations-types";
import {
  convertMmToInch,
  prettyDate,
  prettyinlineTitle,
  prettyItemType,
  prettyItemSubType,
  prettyPrice,
  prettyTestError,
  prettyTestWarning,
  sortContent,
} from "queries/helpers";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import NavOption from "components/PanelComponents/NavOption";
import Chip from "components/Chip";
import Button from "components/Button";
import AppLayout from "components/AppLayout";
import LibraryItemsPreview from "components/Library/LibraryItemsPreview";
import InsetBox from "components/InsetBox";
import Img, { ImageQuality } from "components/Img";
import { useAppLayout } from "contexts/AppLayoutContext";
import { useRouter } from "next/router";
import ContentTOCLine from "components/Library/ContentTOCLine";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface LibrarySlugProps extends AppStaticProps {
  item: GetLibraryItemQuery["libraryItems"]["data"][number]["attributes"];
  itemId: GetLibraryItemQuery["libraryItems"]["data"][number]["id"];
}

export default function LibrarySlug(props: LibrarySlugProps): JSX.Element {
  useTesting(props);
  const { item, langui, currencies } = props;
  const appLayout = useAppLayout();

  const isVariantSet =
    item.metadata.length > 0 &&
    item.metadata[0].__typename === "ComponentMetadataGroup" &&
    item.metadata[0].subtype.data.attributes.slug === "variant-set";

  sortContent(item.contents);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/library/"
        title={langui.library}
        langui={langui}
        displayOn={ReturnButtonType.Desktop}
        horizontalLine
      />

      <div className="grid gap-4">
        <NavOption
          title={langui.summary}
          url="#summary"
          border
          onClick={() => appLayout.setSubPanelOpen(false)}
        />

        {item.gallery.data.length > 0 ? (
          <NavOption
            title={langui.gallery}
            url="#gallery"
            border
            onClick={() => appLayout.setSubPanelOpen(false)}
          />
        ) : (
          ""
        )}

        <NavOption
          title={langui.details}
          url="#details"
          border
          onClick={() => appLayout.setSubPanelOpen(false)}
        />

        {item.subitems.data.length > 0 ? (
          <NavOption
            title={isVariantSet ? langui.variants : langui.subitems}
            url={isVariantSet ? "#variants" : "#subitems"}
            border
            onClick={() => appLayout.setSubPanelOpen(false)}
          />
        ) : (
          ""
        )}

        {item.contents.data.length > 0 ? (
          <NavOption title={langui.contents} url="#contents" border />
        ) : (
          ""
        )}
      </div>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <ReturnButton
        href="/library/"
        title={langui.library}
        langui={langui}
        displayOn={ReturnButtonType.Mobile}
        className="mb-10"
      />
      <div className="grid place-items-center gap-12">
        <div className="drop-shadow-shade-xl w-full h-[50vh] mobile:h-[60vh] desktop:mb-16 relative cursor-pointer">
          {item.thumbnail.data ? (
            <Img
              image={item.thumbnail.data.attributes}
              quality={ImageQuality.Medium}
              layout="fill"
              objectFit="contain"
              priority
            />
          ) : (
            <div className="w-full aspect-[21/29.7] bg-light rounded-xl"></div>
          )}
        </div>

        <InsetBox id="summary" className="grid place-items-center">
          <div className="w-[clamp(0px,100%,42rem)] grid place-items-center gap-8">
            {item.subitem_of.data.length > 0 ? (
              <div className="grid place-items-center">
                <p>{langui.subitem_of}</p>
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
              <p className="text-justify">{item.descriptions[0].description}</p>
            ) : (
              ""
            )}
          </div>
        </InsetBox>

        {item.gallery.data.length > 0 ? (
          <div id="gallery" className="grid place-items-center gap-8  w-full">
            <h2 className="text-2xl">{langui.gallery}</h2>
            <div className="grid w-full gap-8 items-end grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]">
              {item.gallery.data.map((galleryItem) => (
                <div
                  key={galleryItem.id}
                  className="relative aspect-square hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="bg-light absolute inset-0 rounded-lg drop-shadow-shade-md"></div>
                  <Img
                    className="rounded-lg"
                    image={galleryItem.attributes}
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

        <InsetBox id="details" className="grid place-items-center">
          <div className="w-[clamp(0px,100%,42rem)] grid place-items gap-8">
            <h2 className="text-2xl text-center">{langui.details}</h2>
            <div className="grid grid-flow-col w-full place-content-between">
              {item.metadata.length > 0 ? (
                <div className="grid place-items-center place-content-start">
                  <h3 className="text-xl">{langui.type}</h3>
                  <div className="grid grid-flow-col gap-1">
                    <Chip>{prettyItemType(item.metadata[0], langui)}</Chip>
                    {"›"}
                    <Chip>{prettyItemSubType(item.metadata[0])}</Chip>
                  </div>
                </div>
              ) : (
                ""
              )}

              {item.release_date ? (
                <div className="grid place-items-center place-content-start">
                  <h3 className="text-xl">{langui.release_date}</h3>
                  <p>{prettyDate(item.release_date)}</p>
                </div>
              ) : (
                ""
              )}

              {item.price ? (
                <div className="grid place-items-center text-center place-content-start">
                  <h3 className="text-xl">{langui.price}</h3>
                  <p>
                    {prettyPrice(
                      item.price,
                      currencies,
                      item.price.currency.data.attributes.code
                    )}
                  </p>
                  {item.price.currency.data.attributes.code !==
                    appLayout.currency && (
                    <p>
                      {prettyPrice(item.price, currencies, appLayout.currency)}{" "}
                      <br />({langui.calculated?.toLowerCase()})
                    </p>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {item.size ? (
              <>
                <h3 className="text-xl">{langui.size}</h3>
                <div className="grid grid-flow-col w-full place-content-between">
                  <div className="flex flex-row flex-wrap place-items-start gap-4">
                    <p className="font-bold">{langui.width}:</p>
                    <div>
                      <p>{item.size.width} mm</p>
                      <p>{convertMmToInch(item.size.width)} in</p>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap place-items-start gap-4">
                    <p className="font-bold">{langui.height}:</p>
                    <div>
                      <p>{item.size.height} mm</p>
                      <p>{convertMmToInch(item.size.height)} in</p>
                    </div>
                  </div>
                  {item.size.thickness ? (
                    <div className="flex flex-row flex-wrap place-items-start gap-4">
                      <p className="font-bold">{langui.thickness}:</p>
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

            {item.metadata.length > 0 &&
            item.metadata[0].__typename !== "ComponentMetadataGroup" &&
            item.metadata[0].__typename !== "ComponentMetadataOther" ? (
              <>
                <h3 className="text-xl">{langui.type_information}</h3>
                <div className="grid grid-cols-2 w-full place-content-between">
                  {item.metadata[0].__typename === "ComponentMetadataBooks" ? (
                    <>
                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.pages}:</p>
                        <p>{item.metadata[0].page_count}</p>
                      </div>

                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.binding}:</p>
                        <p>
                          {item.metadata[0].binding_type ===
                          Enum_Componentmetadatabooks_Binding_Type.Paperback
                            ? langui.paperback
                            : item.metadata[0].binding_type ===
                              Enum_Componentmetadatabooks_Binding_Type.Hardcover
                            ? langui.hardcover
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.page_order}:</p>
                        <p>
                          {item.metadata[0].page_order ===
                          Enum_Componentmetadatabooks_Page_Order.LeftToRight
                            ? langui.left_to_right
                            : item.metadata[0].page_order ===
                              Enum_Componentmetadatabooks_Page_Order.RightToLeft
                            ? langui.right_to_left
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.languages}:</p>
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
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </InsetBox>

        {item.subitems.data.length > 0 ? (
          <div
            id={isVariantSet ? "variants" : "subitems"}
            className="grid place-items-center gap-8 w-full"
          >
            <h2 className="text-2xl">
              {isVariantSet ? langui.variants : langui.subitems}
            </h2>
            <div className="grid gap-8 items-end mobile:grid-cols-2 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] w-full">
              {item.subitems.data.map((subitem) => (
                <LibraryItemsPreview
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
          <div id="contents" className="w-full grid place-items-center gap-8">
            <h2 className="text-2xl">{langui.contents}</h2>
            <div className="grid gap-4 w-full">
              {item.contents.data.map((content) => (
                <ContentTOCLine
                  langui={langui}
                  content={content}
                  parentSlug={item.slug}
                  key={content.id}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={langui.library}
      title={prettyinlineTitle("", item.title, item.subtitle)}
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={item.thumbnail.data?.attributes}
      description={
        item.descriptions.length > 0
          ? item.descriptions[0].description
          : undefined
      }
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const item = (
    await getLibraryItem({
      slug: context.params?.slug?.toString() || "",
      language_code: context.locale || "en",
    })
  ).libraryItems.data[0];
  const props: LibrarySlugProps = {
    ...(await getAppStaticProps(context)),
    item: item.attributes,
    itemId: item.id,
  };
  return {
    props: props,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  type Path = {
    params: {
      slug: string;
    };
    locale: string;
  };

  const data = await getLibraryItemsSlugs({});
  const paths: Path[] = [];
  data.libraryItems.data.map((item) => {
    context.locales?.map((local) => {
      paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: false,
  };
};

function useTesting(props: LibrarySlugProps) {
  const { item, itemId } = props;
  const router = useRouter();

  const libraryItemURL =
    "/admin/content-manager/collectionType/api::library-item.library-item/" +
    itemId;

  sortContent(item.contents);

  if (router.locale === "en") {
    if (!item.thumbnail.data) {
      prettyTestError(
        router,
        "Missing thumbnail",
        ["libraryItem"],
        libraryItemURL
      );
    }
    if (item.metadata.length === 0) {
      prettyTestError(
        router,
        "Missing metadata",
        ["libraryItem"],
        libraryItemURL
      );
    } else {
      if (
        item.metadata[0].__typename === "ComponentMetadataGroup" &&
        (item.metadata[0].subtype.data.attributes.slug === "relation-set" ||
          item.metadata[0].subtype.data.attributes.slug === "variant-set")
      ) {
        // This is a group type item
        if (item.price) {
          prettyTestError(
            router,
            "Group-type items shouldn't have price",
            ["libraryItem"],
            libraryItemURL
          );
        }
        if (item.size) {
          prettyTestError(
            router,
            "Group-type items shouldn't have size",
            ["libraryItem"],
            libraryItemURL
          );
        }
        if (item.release_date) {
          prettyTestError(
            router,
            "Group-type items shouldn't have release_date",
            ["libraryItem"],
            libraryItemURL
          );
        }
        if (item.contents.data.length > 0) {
          prettyTestError(
            router,
            "Group-type items shouldn't have contents",
            ["libraryItem"],
            libraryItemURL
          );
        }
        if (item.subitems.data.length === 0) {
          prettyTestError(
            router,
            "Group-type items should have subitems",
            ["libraryItem"],
            libraryItemURL
          );
        }
      } else {
        // This is a normal item

        if (item.metadata[0].__typename === "ComponentMetadataGroup") {
          if (item.subitems.data.length === 0) {
            prettyTestError(
              router,
              "Group-type item should have subitems",
              ["libraryItem"],
              libraryItemURL
            );
          }
        }

        if (!item.price) {
          prettyTestWarning(
            router,
            "Missing price",
            ["libraryItem"],
            libraryItemURL
          );
        } else {
          if (!item.price.amount) {
            prettyTestError(
              router,
              "Missing amount",
              ["libraryItem", "price"],
              libraryItemURL
            );
          }
          if (!item.price.currency) {
            prettyTestError(
              router,
              "Missing currency",
              ["libraryItem", "price"],
              libraryItemURL
            );
          }
        }

        if (!item.digital) {
          if (!item.size) {
            prettyTestWarning(
              router,
              "Missing size",
              ["libraryItem"],
              libraryItemURL
            );
          } else {
            if (!item.size.width) {
              prettyTestWarning(
                router,
                "Missing width",
                ["libraryItem", "size"],
                libraryItemURL
              );
            }
            if (!item.size.height) {
              prettyTestWarning(
                router,
                "Missing height",
                ["libraryItem", "size"],
                libraryItemURL
              );
            }
            if (!item.size.thickness) {
              prettyTestWarning(
                router,
                "Missing thickness",
                ["libraryItem", "size"],
                libraryItemURL
              );
            }
          }
        }

        if (!item.release_date) {
          prettyTestWarning(
            router,
            "Missing release_date",
            ["libraryItem"],
            libraryItemURL
          );
        } else {
          if (!item.release_date.year) {
            prettyTestError(
              router,
              "Missing year",
              ["libraryItem", "release_date"],
              libraryItemURL
            );
          }
          if (!item.release_date.month) {
            prettyTestError(
              router,
              "Missing month",
              ["libraryItem", "release_date"],
              libraryItemURL
            );
          }
          if (!item.release_date.day) {
            prettyTestError(
              router,
              "Missing day",
              ["libraryItem", "release_date"],
              libraryItemURL
            );
          }
        }

        if (item.contents.data.length === 0) {
          prettyTestWarning(
            router,
            "Missing contents",
            ["libraryItem"],
            libraryItemURL
          );
        } else {
          let currentRangePage = 0;
          item.contents.data.map((content) => {
            const contentURL =
              "/admin/content-manager/collectionType/api::content.content/" +
              content.id;

            if (content.attributes.scan_set.length === 0) {
              prettyTestWarning(
                router,
                "Missing scan_set",
                ["libraryItem", "content", content.id],
                contentURL
              );
            }
            if (content.attributes.range.length === 0) {
              prettyTestWarning(
                router,
                "Missing range",
                ["libraryItem", "content", content.id],
                contentURL
              );
            } else if (
              content.attributes.range[0].__typename ===
              "ComponentRangePageRange"
            ) {
              if (
                content.attributes.range[0].starting_page <
                currentRangePage + 1
              ) {
                prettyTestError(
                  router,
                  `Overlapping pages ${content.attributes.range[0].starting_page} to ${currentRangePage}`,
                  ["libraryItem", "content", content.id, "range"],
                  libraryItemURL
                );
              } else if (
                content.attributes.range[0].starting_page >
                currentRangePage + 1
              ) {
                prettyTestError(
                  router,
                  `Missing pages ${currentRangePage + 1} to ${
                    content.attributes.range[0].starting_page - 1
                  }`,
                  ["libraryItem", "content", content.id, "range"],
                  libraryItemURL
                );
              }

              if (!content.attributes.content.data) {
                prettyTestWarning(
                  router,
                  "Missing content",
                  ["libraryItem", "content", content.id, "range"],
                  libraryItemURL
                );
              }

              currentRangePage = content.attributes.range[0].ending_page;
            }
          });

          if (item.metadata[0].__typename === "ComponentMetadataBooks") {
            if (currentRangePage < item.metadata[0].page_count) {
              prettyTestError(
                router,
                `Missing pages ${currentRangePage + 1} to ${
                  item.metadata[0].page_count
                }`,
                ["libraryItem", "content"],
                libraryItemURL
              );
            } else if (currentRangePage > item.metadata[0].page_count) {
              prettyTestError(
                router,
                `Page overflow, content references pages up to ${currentRangePage} when the highest expected was ${item.metadata[0].page_count}`,
                ["libraryItem", "content"],
                libraryItemURL
              );
            }

            if (item.metadata[0].languages.data.length === 0) {
              prettyTestWarning(
                router,
                "Missing language",
                ["libraryItem", "metadata"],
                libraryItemURL
              );
            }

            if (!item.metadata[0].page_count) {
              prettyTestWarning(
                router,
                "Missing page_count",
                ["libraryItem", "metadata"],
                libraryItemURL
              );
            }
          }
        }
      }
    }

    if (!item.root_item && item.subitem_of.data.length === 0) {
      prettyTestError(
        router,
        "This item is inaccessible (not root item and not subitem of another item)",
        ["libraryItem"],
        libraryItemURL
      );
    }

    if (item.gallery.data.length === 0) {
      prettyTestWarning(
        router,
        "Missing gallery",
        ["libraryItem"],
        libraryItemURL
      );
    }
  }

  if (item.descriptions.length === 0) {
    prettyTestWarning(
      router,
      "Missing description",
      ["libraryItem"],
      libraryItemURL
    );
  }
}
