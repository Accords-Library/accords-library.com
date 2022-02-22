import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  getLibraryItem,
  getLibraryItemsSlugs,
  getWebsiteInterface,
} from "graphql/operations";
import {
  Enum_Componentmetadatabooks_Binding_Type,
  Enum_Componentmetadatabooks_Page_Order,
  GetLibraryItemQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import {
  convertMmToInch,
  prettyDate,
  prettyinlineTitle,
  prettyItemType,
  prettyItemSubType,
  prettyPrice,
  prettySlug,
} from "queries/helpers";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
import NavOption from "components/PanelComponents/NavOption";
import Chip from "components/Chip";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import AppLayout from "components/AppLayout";
import LibraryItemsPreview from "components/Library/LibraryItemsPreview";
import InsetBox from "components/InsetBox";
import { setSubPanelOpen } from "redux/appLayoutSlice";
import { useDispatch } from "react-redux";
import Img, { ImageQuality } from "components/Img";

type LibrarySlugProps = {
  libraryItem: GetLibraryItemQuery;
  langui: GetWebsiteInterfaceQuery;
};

export default function LibrarySlug(props: LibrarySlugProps): JSX.Element {
  const item = props.libraryItem.libraryItems.data[0].attributes;
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const dispatch = useDispatch();

  const isVariantSet =
    item.metadata.length > 0 &&
    item.metadata[0].__typename === "ComponentMetadataOther" &&
    item.metadata[0].subtype.data.attributes.slug === "variant-set";

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/library/"
        title={langui.main_library}
        langui={langui}
      />
      <HorizontalLine />

      <div className="grid gap-4">
        <NavOption
          title={langui.library_item_summary}
          url="#summary"
          border
          onClick={() => dispatch(setSubPanelOpen(false))}
        />

        {item.gallery.data.length > 0 ? (
          <NavOption
            title={langui.library_item_gallery}
            url="#gallery"
            border
            onClick={() => dispatch(setSubPanelOpen(false))}
          />
        ) : (
          ""
        )}

        <NavOption
          title={langui.library_item_details}
          url="#details"
          border
          onClick={() => dispatch(setSubPanelOpen(false))}
        />

        {item.subitems.data.length > 0 ? (
          <NavOption
            title={
              isVariantSet
                ? langui.library_item_variants
                : langui.library_item_subitems
            }
            url={isVariantSet ? "#variants" : "#subitems"}
            border
            onClick={() => dispatch(setSubPanelOpen(false))}
          />
        ) : (
          ""
        )}

        {item.contents.data.length > 0 ? (
          <NavOption
            title={langui.library_item_content}
            url="#content"
            border
          />
        ) : (
          ""
        )}
      </div>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <div className="grid place-items-center gap-12">
        <div className="drop-shadow-shade-xl w-full h-[50vh] mobile:h-[80vh] mb-16 relative cursor-pointer">
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
                <p>{langui.global_subitem_of}</p>
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
            <h2 className="text-2xl">{langui.library_item_gallery}</h2>
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
            <h2 className="text-2xl text-center">
              {langui.library_item_details}
            </h2>
            <div className="grid grid-flow-col w-full place-content-between">
              {item.metadata.length > 0 ? (
                <div className="grid place-items-center">
                  <h3 className="text-xl">{langui.global_type}</h3>
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
                <div className="grid place-items-center">
                  <h3 className="text-xl">{langui.global_release_date}</h3>
                  <p>{prettyDate(item.release_date)}</p>
                </div>
              ) : (
                ""
              )}

              {item.price ? (
                <div className="grid place-items-center">
                  <h3 className="text-xl">{langui.global_price}</h3>
                  <p>{prettyPrice(item.price)}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {item.size ? (
              <>
                <h3 className="text-xl">{langui.library_item_physical_size}</h3>
                <div className="grid grid-flow-col w-full place-content-between">
                  <div className="flex flex-row flex-wrap place-items-start gap-4">
                    <p className="font-bold">{langui.global_width}:</p>
                    <div>
                      <p>{item.size.width} mm</p>
                      <p>{convertMmToInch(item.size.width)} in</p>
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap place-items-start gap-4">
                    <p className="font-bold">{langui.global_height}:</p>
                    <div>
                      <p>{item.size.height} mm</p>
                      <p>{convertMmToInch(item.size.height)} in</p>
                    </div>
                  </div>
                  {item.size.thickness ? (
                    <div className="flex flex-row flex-wrap place-items-start gap-4">
                      <p className="font-bold">{langui.global_thickness}:</p>
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
                <h3 className="text-xl">
                  {langui.library_item_type_information}
                </h3>
                <div className="grid grid-cols-2 w-full place-content-between">
                  {item.metadata[0].__typename === "ComponentMetadataBooks" ? (
                    <>
                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.global_pages}:</p>
                        <p>{item.metadata[0].page_count}</p>
                      </div>

                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.global_binding}:</p>
                        <p>
                          {item.metadata[0].binding_type ===
                          Enum_Componentmetadatabooks_Binding_Type.Paperback
                            ? langui.global_paperback
                            : item.metadata[0].binding_type ===
                              Enum_Componentmetadatabooks_Binding_Type.Hardcover
                            ? langui.global_hardcover
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.global_page_order}:</p>
                        <p>
                          {item.metadata[0].page_order ===
                          Enum_Componentmetadatabooks_Page_Order.LeftToRight
                            ? langui.global_left_to_right
                            : item.metadata[0].page_order ===
                              Enum_Componentmetadatabooks_Page_Order.RightToLeft
                            ? langui.global_right_to_left
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.global_languages}:</p>
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
                    "ComponentMetadataOther" ? (
                    <>
                      <div className="flex flex-row place-content-start gap-4">
                        <p className="font-bold">{langui.global_type}:</p>
                        <Chip>
                          {item.metadata[0].subtype.data.attributes.titles
                            .length > 0
                            ? item.metadata[0].subtype.data.attributes.titles[0]
                                .title
                            : prettySlug(
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
        </InsetBox>

        {item.subitems.data.length > 0 ? (
          <div
            id={isVariantSet ? "variants" : "subitems"}
            className="grid place-items-center gap-8 w-full"
          >
            <h2 className="text-2xl">
              {isVariantSet
                ? langui.library_item_variants
                : langui.library_item_subitems}
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
          <div id="content" className="w-full grid place-items-center gap-8">
            <h2 className="text-2xl">{langui.library_item_content}</h2>
            <div className="grid gap-4 w-full">
              {item.contents.data.map((content) => (
                <div
                  id={content.attributes.slug}
                  key={content.id}
                  className="grid gap-2 px-4 rounded-lg target:bg-mid target:shadow-inner-sm target:shadow-shade target:h-auto target:py-3 target:my-2 target:[--displaySubContentMenu:grid] [--displaySubContentMenu:none]"
                >
                  <div className="grid gap-4 place-items-center grid-cols-[auto_auto_1fr_auto_12ch] thin:grid-cols-[auto_auto_1fr_auto]">
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
                    <div className="flex flex-row flex-wrap gap-1">
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
                      <Chip className="justify-self-end thin:hidden">
                        {content.attributes.content.data.attributes.type.data
                          .attributes.titles.length > 0
                          ? content.attributes.content.data.attributes.type.data
                              .attributes.titles[0].title
                          : prettySlug(
                              content.attributes.content.data.attributes.type
                                .data.attributes.slug
                            )}
                      </Chip>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="grid-flow-col place-content-start place-items-center gap-2 [display:var(--displaySubContentMenu)]">
                    <span className="material-icons text-dark">
                      subdirectory_arrow_right
                    </span>

                    {content.attributes.scan_set.length > 0 ? (
                      <Button
                        href={`/contents/${content.attributes.content.data.attributes.slug}/scans/`}
                      >
                        {langui.library_item_view_scans}
                      </Button>
                    ) : (
                      ""
                    )}

                    {content.attributes.content.data ? (
                      <Button
                        href={`/contents/${content.attributes.content.data.attributes.slug}`}
                      >
                        {langui.library_item_open_content}
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
  );

  // Sort content by range
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
    <AppLayout
      title={langui.library_items}
      langui={langui}
      contentPanel={contentPanel}
      subPanel={subPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params) {
    if (context.params.slug && context.locale) {
      if (context.params.slug instanceof Array)
        context.params.slug = context.params.slug.join("");

      const props: LibrarySlugProps = {
        libraryItem: await getLibraryItem({
          slug: context.params.slug,
          language_code: context.locale,
        }),
        langui: await getWebsiteInterface({
          language_code: context.locale,
        }),
      };
      return {
        props: props,
      };
    }
  }
  return { props: {} };
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
