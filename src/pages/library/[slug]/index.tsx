import { AppLayout } from "components/AppLayout";
import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { InsetBox } from "components/InsetBox";
import { ContentLine } from "components/Library/ContentLine";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { NavOption } from "components/PanelComponents/NavOption";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { useAppLayout } from "contexts/AppLayoutContext";
import {
  Enum_Componentmetadatabooks_Binding_Type,
  Enum_Componentmetadatabooks_Page_Order,
  GetLibraryItemQuery,
} from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import {
  prettyDate,
  prettyinlineTitle,
  prettyItemSubType,
  prettyItemType,
  prettyPrice,
  prettyURL,
} from "helpers/formatters";
import { getAssetURL, ImageQuality } from "helpers/img";
import { convertMmToInch } from "helpers/numbers";
import { sortContent } from "helpers/others";
import { Immutable } from "helpers/types";
import { useLightBox } from "hooks/useLightBox";
import { AnchorIds, useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { Fragment, useState } from "react";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { WithLabel } from "components/Inputs/WithLabel";

interface Props extends AppStaticProps {
  item: NonNullable<
    GetLibraryItemQuery["libraryItems"]
  >["data"][number]["attributes"];
  itemId: NonNullable<
    GetLibraryItemQuery["libraryItems"]
  >["data"][number]["id"];
}

export default function LibrarySlug(props: Immutable<Props>): JSX.Element {
  const { item, itemId, langui, currencies } = props;
  const appLayout = useAppLayout();
  const hoverable = useMediaHoverable();

  useScrollTopOnChange(AnchorIds.ContentPanel, [item]);

  const isVariantSet =
    item?.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
    item.metadata[0].subtype?.data?.attributes?.slug === "variant-set";

  sortContent(item?.contents);

  const [openLightBox, LightBox] = useLightBox();
  const [keepInfoVisible, setKeepInfoVisible] = useState(false);

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
        displayOn={ReturnButtonType.Desktop}
        horizontalLine
      />

      <div className="grid gap-4">
        <NavOption title={langui.summary} url="#summary" border />

        {item?.gallery && item.gallery.data.length > 0 && (
          <NavOption title={langui.gallery} url="#gallery" border />
        )}

        <NavOption title={langui.details} url="#details" border />

        {item?.subitems && item.subitems.data.length > 0 && (
          <NavOption
            title={isVariantSet ? langui.variants : langui.subitems}
            url={isVariantSet ? "#variants" : "#subitems"}
            border
          />
        )}

        {item?.contents && item.contents.data.length > 0 && (
          <NavOption title={langui.contents} url="#contents" border />
        )}
      </div>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <LightBox />

      <ReturnButton
        href="/library/"
        title={langui.library}
        langui={langui}
        displayOn={ReturnButtonType.Mobile}
        className="mb-10"
      />
      <div className="grid place-items-center gap-12">
        <div
          className="relative h-[50vh] w-full
          cursor-pointer drop-shadow-shade-xl desktop:mb-16 mobile:h-[60vh]"
          onClick={() => {
            if (item?.thumbnail?.data?.attributes) {
              openLightBox([
                getAssetURL(
                  item.thumbnail.data.attributes.url,
                  ImageQuality.Large
                ),
              ]);
            }
          }}
        >
          {item?.thumbnail?.data?.attributes ? (
            <Img
              image={item.thumbnail.data.attributes}
              quality={ImageQuality.Large}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="aspect-[21/29.7] w-full rounded-xl bg-light"></div>
          )}
        </div>

        <InsetBox id="summary" className="grid place-items-center">
          <div className="grid w-[clamp(0px,100%,42rem)] place-items-center gap-8">
            {item?.subitem_of?.data[0]?.attributes && (
              <div className="grid place-items-center">
                <p>{langui.subitem_of}</p>
                <Button
                  href={`/library/${item.subitem_of.data[0].attributes.slug}`}
                  text={prettyinlineTitle(
                    "",
                    item.subitem_of.data[0].attributes.title,
                    item.subitem_of.data[0].attributes.subtitle
                  )}
                />
              </div>
            )}
            <div className="grid place-items-center text-center">
              <h1 className="text-3xl">{item?.title}</h1>
              {item?.subtitle && <h2 className="text-2xl">{item.subtitle}</h2>}
            </div>

            <PreviewCardCTAs
              id={itemId}
              displayCTAs={!isUntangibleGroupItem(item?.metadata?.[0])}
              langui={langui}
              expand
            />
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
                    <p>{langui.available_at}</p>
                    {item.urls.map((url, index) => (
                      <Fragment key={index}>
                        {url?.url && (
                          <Button
                            href={url.url}
                            target={"_blank"}
                            text={prettyURL(url.url)}
                          />
                        )}
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <p>{langui.item_not_available}</p>
                )}
              </>
            )}
          </div>
        </InsetBox>

        {item?.gallery && item.gallery.data.length > 0 && (
          <div id="gallery" className="grid w-full place-items-center  gap-8">
            <h2 className="text-2xl">{langui.gallery}</h2>
            <div
              className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] items-end
              gap-8"
            >
              {item.gallery.data.map((galleryItem, index) => (
                <Fragment key={galleryItem.id}>
                  {galleryItem.attributes && (
                    <div
                      className="relative aspect-square cursor-pointer
                      transition-transform hover:scale-[1.02]"
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
                          openLightBox(images, index);
                        }
                      }}
                    >
                      <Img
                        className="h-full w-full rounded-lg
                        bg-light object-cover drop-shadow-shade-md"
                        image={galleryItem.attributes}
                      />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )}

        <InsetBox id="details" className="grid place-items-center">
          <div className="place-items grid w-[clamp(0px,100%,42rem)] gap-8">
            <h2 className="text-center text-2xl">{langui.details}</h2>
            <div
              className="grid place-items-center gap-y-8
              desktop:grid-flow-col desktop:place-content-between"
            >
              {item?.metadata?.[0] && (
                <div className="grid place-content-start place-items-center">
                  <h3 className="text-xl">{langui.type}</h3>
                  <div className="grid grid-flow-col gap-1">
                    <Chip>{prettyItemType(item.metadata[0], langui)}</Chip>
                    {"›"}
                    <Chip>{prettyItemSubType(item.metadata[0])}</Chip>
                  </div>
                </div>
              )}

              {item?.release_date && (
                <div className="grid place-content-start place-items-center">
                  <h3 className="text-xl">{langui.release_date}</h3>
                  <p>{prettyDate(item.release_date)}</p>
                </div>
              )}

              {item?.price && (
                <div className="grid place-content-start place-items-center text-center">
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
              <div className="grid gap-8 mobile:place-items-center">
                <h3 className="text-xl">{langui.size}</h3>
                <div
                  className="grid w-full grid-flow-col place-content-between thin:grid-flow-row
                  thin:place-content-center thin:gap-8"
                >
                  <div
                    className="grid place-items-center gap-x-4 desktop:grid-flow-col 
                    desktop:place-items-start"
                  >
                    <p className="font-bold">{langui.width}:</p>
                    <div>
                      <p>{item.size.width} mm</p>
                      <p>{convertMmToInch(item.size.width)} in</p>
                    </div>
                  </div>
                  <div
                    className="grid place-items-center gap-x-4 desktop:grid-flow-col
                    desktop:place-items-start"
                  >
                    <p className="font-bold">{langui.height}:</p>
                    <div>
                      <p>{item.size.height} mm</p>
                      <p>{convertMmToInch(item.size.height)} in</p>
                    </div>
                  </div>
                  {item.size.thickness && (
                    <div
                      className="grid place-items-center gap-x-4 desktop:grid-flow-col
                      desktop:place-items-start"
                    >
                      <p className="font-bold">{langui.thickness}:</p>
                      <div>
                        <p>{item.size.thickness} mm</p>
                        <p>{convertMmToInch(item.size.thickness)} in</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {item?.metadata?.[0]?.__typename !== "ComponentMetadataGroup" &&
              item?.metadata?.[0]?.__typename !== "ComponentMetadataOther" && (
                <>
                  <h3 className="text-xl">{langui.type_information}</h3>
                  <div className="grid w-full grid-cols-2 place-content-between">
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
            className="grid w-full place-items-center gap-8"
          >
            <h2 className="text-2xl">
              {isVariantSet ? langui.variants : langui.subitems}
            </h2>

            {hoverable && (
              <WithLabel
                label={langui.always_show_info}
                input={
                  <Switch
                    setState={setKeepInfoVisible}
                    state={keepInfoVisible}
                  />
                }
              />
            )}

            <div
              className="grid w-full grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]
              items-end gap-8 mobile:grid-cols-2 thin:grid-cols-1"
            >
              {item.subitems.data.map((subitem) => (
                <Fragment key={subitem.id}>
                  {subitem.attributes && subitem.id && (
                    <PreviewCard
                      href={`/library/${subitem.attributes.slug}`}
                      title={subitem.attributes.title}
                      subtitle={subitem.attributes.subtitle}
                      thumbnail={subitem.attributes.thumbnail?.data?.attributes}
                      thumbnailAspectRatio="21/29.7"
                      thumbnailRounded={false}
                      keepInfoVisible={keepInfoVisible}
                      topChips={
                        subitem.attributes.metadata &&
                        subitem.attributes.metadata.length > 0 &&
                        subitem.attributes.metadata[0]
                          ? [prettyItemSubType(subitem.attributes.metadata[0])]
                          : []
                      }
                      bottomChips={subitem.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )}
                      metadata={{
                        currencies: currencies,
                        release_date: subitem.attributes.release_date,
                        price: subitem.attributes.price,
                        position: "Bottom",
                      }}
                      infoAppend={
                        <PreviewCardCTAs
                          id={subitem.id}
                          langui={langui}
                          displayCTAs={
                            !isUntangibleGroupItem(
                              subitem.attributes.metadata?.[0]
                            )
                          }
                        />
                      }
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )}

        {item?.contents && item.contents.data.length > 0 && (
          <div id="contents" className="grid w-full place-items-center gap-8">
            <h2 className="-mb-6 text-2xl">{langui.contents}</h2>
            {displayOpenScans && (
              <Button
                href={`/library/${item.slug}/scans`}
                text={langui.view_scans}
              />
            )}
            <div className="grid w-full gap-4">
              {item.contents.data.map((content) => (
                <ContentLine
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
