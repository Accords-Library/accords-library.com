import AppLayout from "components/AppLayout";
import Button from "components/Button";
import Chip from "components/Chip";
import Img, { getAssetURL, ImageQuality } from "components/Img";
import InsetBox from "components/InsetBox";
import ContentTOCLine from "components/Library/ContentTOCLine";
import LibraryItemsPreview from "components/Library/LibraryItemsPreview";
import LightBox from "components/LightBox";
import NavOption from "components/PanelComponents/NavOption";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { useAppLayout } from "contexts/AppLayoutContext";
import {
  Enum_Componentmetadatabooks_Binding_Type,
  Enum_Componentmetadatabooks_Page_Order,
  GetLibraryItemQuery,
} from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import {
  convertMmToInch,
  prettyDate,
  prettyinlineTitle,
  prettyItemSubType,
  prettyItemType,
  prettyPrice,
  prettyTestError,
  prettyTestWarning,
  prettyURL,
  sortContent,
} from "queries/helpers";
import { useState } from "react";

interface Props extends AppStaticProps {
  item: Exclude<
    GetLibraryItemQuery["libraryItems"],
    null | undefined
  >["data"][number]["attributes"];
  itemId: Exclude<
    GetLibraryItemQuery["libraryItems"],
    null | undefined
  >["data"][number]["id"];
}

export default function LibrarySlug(props: Props): JSX.Element {
  useTesting(props);
  const { item, langui, currencies } = props;
  const appLayout = useAppLayout();

  const isVariantSet =
    item?.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
    item.metadata[0].subtype?.data?.attributes?.slug === "variant-set";

  sortContent(item?.contents);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([""]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  let displayOpenScans = false;
  if (item?.contents?.data)
    for (const content of item.contents.data) {
      if (
        content.attributes?.scan_set &&
        content.attributes.scan_set.length > 0
      )
        displayOpenScans = true;
    }

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/library/"
        title={langui.library}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        horizontalLine
      />

      <div className="grid gap-4">
        <NavOption
          title={langui.summary}
          url="#summary"
          border
          onClick={() => appLayout.setSubPanelOpen(false)}
        />

        {item?.gallery && item.gallery.data.length > 0 && (
          <NavOption
            title={langui.gallery}
            url="#gallery"
            border
            onClick={() => appLayout.setSubPanelOpen(false)}
          />
        )}

        <NavOption
          title={langui.details}
          url="#details"
          border
          onClick={() => appLayout.setSubPanelOpen(false)}
        />

        {item?.subitems && item.subitems.data.length > 0 && (
          <NavOption
            title={isVariantSet ? langui.variants : langui.subitems}
            url={isVariantSet ? "#variants" : "#subitems"}
            border
            onClick={() => appLayout.setSubPanelOpen(false)}
          />
        )}

        {item?.contents && item.contents.data.length > 0 && (
          <NavOption
            title={langui.contents}
            url="#contents"
            border
            onClick={() => appLayout.setSubPanelOpen(false)}
          />
        )}
      </div>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <LightBox
        state={lightboxOpen}
        setState={setLightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
      />

      <ReturnButton
        href="/library/"
        title={langui.library}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />
      <div className="grid place-items-center gap-12">
        <div
          className="drop-shadow-shade-xl w-full h-[50vh] mobile:h-[60vh] desktop:mb-16 relative cursor-pointer"
          onClick={() => {
            if (item?.thumbnail?.data?.attributes) {
              setLightboxOpen(true);
              setLightboxImages([
                getAssetURL(
                  item.thumbnail.data.attributes.url,
                  ImageQuality.Large
                ),
              ]);
              setLightboxIndex(0);
            }
          }}
        >
          {item?.thumbnail?.data?.attributes ? (
            <Img
              image={item.thumbnail.data.attributes}
              quality={ImageQuality.Large}
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
            {item?.subitem_of?.data[0]?.attributes && (
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
            )}
            <div className="grid place-items-center">
              <h1 className="text-3xl">{item?.title}</h1>
              {item?.subtitle && <h2 className="text-2xl">{item.subtitle}</h2>}
            </div>
            {item?.descriptions?.[0] && (
              <p className="text-justify">{item.descriptions[0].description}</p>
            )}
            {!(
              item?.metadata &&
              item.metadata[0]?.__typename === "ComponentMetadataGroup" &&
              (item.metadata[0].subtype?.data?.attributes?.slug ===
                "variant-set" ||
                item.metadata[0].subtype?.data?.attributes?.slug ===
                  "relation-set")
            ) && (
              <>
                {item?.urls && item.urls.length ? (
                  <div className="flex flex-row place-items-center gap-3">
                    <p>Available at</p>
                    {item.urls.map((url) => (
                      <>
                        {url?.url && (
                          <Button
                            href={url.url}
                            key={url.url}
                            target={"_blank"}
                          >
                            {prettyURL(url.url)}
                          </Button>
                        )}
                      </>
                    ))}
                  </div>
                ) : (
                  <p>This item is not for sale or is no longer available</p>
                )}
              </>
            )}
          </div>
        </InsetBox>

        {item?.gallery && item.gallery.data.length > 0 && (
          <div id="gallery" className="grid place-items-center gap-8  w-full">
            <h2 className="text-2xl">{langui.gallery}</h2>
            <div className="grid w-full gap-8 items-end grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]">
              {item.gallery.data.map((galleryItem, index) => (
                <>
                  {galleryItem.attributes && (
                    <div
                      key={galleryItem.id}
                      className="relative aspect-square hover:scale-[1.02] transition-transform cursor-pointer"
                      onClick={() => {
                        if (item.gallery?.data) {
                          const images: string[] = [];
                          item.gallery.data.map((image) => {
                            if (image.attributes)
                              images.push(
                                getAssetURL(
                                  image.attributes.url,
                                  ImageQuality.Large
                                )
                              );
                          });
                          setLightboxOpen(true);
                          setLightboxImages(images);
                          setLightboxIndex(index);
                        }
                      }}
                    >
                      <div className="bg-light absolute inset-0 rounded-lg drop-shadow-shade-md"></div>
                      <Img
                        className="rounded-lg"
                        image={galleryItem.attributes}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        )}

        <InsetBox id="details" className="grid place-items-center">
          <div className="w-[clamp(0px,100%,42rem)] grid place-items gap-8">
            <h2 className="text-2xl text-center">{langui.details}</h2>
            <div className="grid grid-flow-col w-full place-content-between">
              {item?.metadata?.[0] && (
                <div className="grid place-items-center place-content-start">
                  <h3 className="text-xl">{langui.type}</h3>
                  <div className="grid grid-flow-col gap-1">
                    <Chip>{prettyItemType(item.metadata[0], langui)}</Chip>
                    {"›"}
                    <Chip>{prettyItemSubType(item.metadata[0])}</Chip>
                  </div>
                </div>
              )}

              {item?.release_date && (
                <div className="grid place-items-center place-content-start">
                  <h3 className="text-xl">{langui.release_date}</h3>
                  <p>{prettyDate(item.release_date)}</p>
                </div>
              )}

              {item?.price && (
                <div className="grid place-items-center text-center place-content-start">
                  <h3 className="text-xl">{langui.price}</h3>
                  <p>
                    {prettyPrice(
                      item.price,
                      currencies,
                      item.price.currency?.data?.attributes?.code
                    )}
                  </p>
                  {item.price.currency?.data?.attributes?.code !==
                    appLayout.currency && (
                    <p>
                      {prettyPrice(item.price, currencies, appLayout.currency)}{" "}
                      <br />({langui.calculated?.toLowerCase()})
                    </p>
                  )}
                </div>
              )}
            </div>

            {item?.categories && item.categories.data.length > 0 && (
              <div className="flex flex-col place-items-center gap-2">
                <h3 className="text-xl">{langui.categories}</h3>
                <div className="flex flex-row flex-wrap place-content-center gap-2">
                  {item.categories.data.map((category) => (
                    <Chip key={category.id}>{category.attributes?.name}</Chip>
                  ))}
                </div>
              </div>
            )}

            {item?.size && (
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
                  {item.size.thickness && (
                    <div className="flex flex-row flex-wrap place-items-start gap-4">
                      <p className="font-bold">{langui.thickness}:</p>
                      <div>
                        <p>{item.size.thickness} mm</p>
                        <p>{convertMmToInch(item.size.thickness)} in</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {item?.metadata?.[0]?.__typename !== "ComponentMetadataGroup" &&
              item?.metadata?.[0]?.__typename !== "ComponentMetadataOther" && (
                <>
                  <h3 className="text-xl">{langui.type_information}</h3>
                  <div className="grid grid-cols-2 w-full place-content-between">
                    {item?.metadata?.[0]?.__typename ===
                      "ComponentMetadataBooks" && (
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
                              : langui.right_to_left}
                          </p>
                        </div>

                        <div className="flex flex-row place-content-start gap-4">
                          <p className="font-bold">{langui.languages}:</p>
                          {item.metadata[0]?.languages?.data.map((lang) => (
                            <p key={lang.attributes?.code}>
                              {lang.attributes?.name}
                            </p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
          </div>
        </InsetBox>

        {item?.subitems && item.subitems.data.length > 0 && (
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
                  currencies={props.currencies}
                />
              ))}
            </div>
          </div>
        )}

        {item?.contents && item.contents.data.length > 0 && (
          <div id="contents" className="w-full grid place-items-center gap-8">
            <h2 className="text-2xl -mb-6">{langui.contents}</h2>
            {displayOpenScans && (
              <Button href={`/library/${item.slug}/scans`}>
                {langui.view_scans}
              </Button>
            )}
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
        )}
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={prettyinlineTitle("", item?.title, item?.subtitle)}
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={item?.thumbnail?.data?.attributes ?? undefined}
      description={item?.descriptions?.[0]?.description ?? undefined}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const item = await sdk.getLibraryItem({
    slug: context.params?.slug ? context.params.slug.toString() : "",
    language_code: context.locale ?? "en",
  });
  if (!item.libraryItems?.data[0]?.attributes) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    item: item.libraryItems.data[0].attributes,
    itemId: item.libraryItems.data[0].id,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const libraryItems = await sdk.getLibraryItemsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  if (libraryItems.libraryItems) {
    libraryItems.libraryItems.data.map((item) => {
      context.locales?.map((local) => {
        paths.push({ params: { slug: item.attributes?.slug }, locale: local });
      });
    });
  }
  return {
    paths,
    fallback: "blocking",
  };
}

function useTesting(props: Props) {
  const { item, itemId } = props;
  const router = useRouter();

  const libraryItemURL = `/admin/content-manager/collectionType/api::library-item.library-item/${itemId}`;

  sortContent(item?.contents);

  if (router.locale === "en") {
    if (!item?.thumbnail?.data) {
      prettyTestError(
        router,
        "Missing thumbnail",
        ["libraryItem"],
        libraryItemURL
      );
    }
    if (item?.metadata?.length === 0) {
      prettyTestError(
        router,
        "Missing metadata",
        ["libraryItem"],
        libraryItemURL
      );
    } else if (
      item?.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
      (item.metadata[0].subtype?.data?.attributes?.slug === "relation-set" ||
        item.metadata[0].subtype?.data?.attributes?.slug === "variant-set")
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
      if (item.contents && item.contents.data.length > 0) {
        prettyTestError(
          router,
          "Group-type items shouldn't have contents",
          ["libraryItem"],
          libraryItemURL
        );
      }
      if (item.subitems && item.subitems.data.length === 0) {
        prettyTestError(
          router,
          "Group-type items should have subitems",
          ["libraryItem"],
          libraryItemURL
        );
      }
    } else {
      // This is a normal item

      if (item?.metadata?.[0]?.__typename === "ComponentMetadataGroup") {
        if (item.subitems?.data.length === 0) {
          prettyTestError(
            router,
            "Group-type item should have subitems",
            ["libraryItem"],
            libraryItemURL
          );
        }
      }

      if (item?.price) {
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
      } else {
        prettyTestWarning(
          router,
          "Missing price",
          ["libraryItem"],
          libraryItemURL
        );
      }

      if (!item?.digital) {
        if (item?.size) {
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
        } else {
          prettyTestWarning(
            router,
            "Missing size",
            ["libraryItem"],
            libraryItemURL
          );
        }
      }

      if (item?.release_date) {
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
      } else {
        prettyTestWarning(
          router,
          "Missing release_date",
          ["libraryItem"],
          libraryItemURL
        );
      }

      if (item?.contents?.data.length === 0) {
        prettyTestWarning(
          router,
          "Missing contents",
          ["libraryItem"],
          libraryItemURL
        );
      } else {
        let currentRangePage = 0;
        item?.contents?.data.map((content) => {
          const contentURL = `/admin/content-manager/collectionType/api::content.content/${content.id}`;

          if (content.attributes?.scan_set?.length === 0) {
            prettyTestWarning(
              router,
              "Missing scan_set",
              ["libraryItem", "content", content.id ?? ""],
              contentURL
            );
          }
          if (content.attributes?.range.length === 0) {
            prettyTestWarning(
              router,
              "Missing range",
              ["libraryItem", "content", content.id ?? ""],
              contentURL
            );
          } else if (
            content.attributes?.range[0]?.__typename ===
            "ComponentRangePageRange"
          ) {
            if (
              content.attributes.range[0].starting_page <
              currentRangePage + 1
            ) {
              prettyTestError(
                router,
                `Overlapping pages ${content.attributes.range[0].starting_page} to ${currentRangePage}`,
                ["libraryItem", "content", content.id ?? "", "range"],
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
                ["libraryItem", "content", content.id ?? "", "range"],
                libraryItemURL
              );
            }

            if (!content.attributes.content?.data) {
              prettyTestWarning(
                router,
                "Missing content",
                ["libraryItem", "content", content.id ?? "", "range"],
                libraryItemURL
              );
            }

            currentRangePage = content.attributes.range[0].ending_page;
          }
        });

        if (item?.metadata?.[0]?.__typename === "ComponentMetadataBooks") {
          if (item.metadata[0].languages?.data.length === 0) {
            prettyTestWarning(
              router,
              "Missing language",
              ["libraryItem", "metadata"],
              libraryItemURL
            );
          }

          if (item.metadata[0].page_count) {
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
          } else {
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

    if (!item?.root_item && item?.subitem_of?.data.length === 0) {
      prettyTestError(
        router,
        "This item is inaccessible (not root item and not subitem of another item)",
        ["libraryItem"],
        libraryItemURL
      );
    }

    if (item?.gallery?.data.length === 0) {
      prettyTestWarning(
        router,
        "Missing gallery",
        ["libraryItem"],
        libraryItemURL
      );
    }
  }

  if (item?.descriptions?.length === 0) {
    prettyTestWarning(
      router,
      "Missing description",
      ["libraryItem"],
      libraryItemURL
    );
  }
}
