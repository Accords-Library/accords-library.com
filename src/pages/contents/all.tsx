import { GetStaticProps } from "next";
import { useState, useMemo, useCallback } from "react";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Select } from "components/Inputs/Select";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyInlineTitle, prettySlug } from "helpers/formatters";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { Button } from "components/Inputs/Button";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { Icon } from "components/Ico";
import { filterDefined, filterHasAttributes } from "helpers/others";
import { GetContentsQuery } from "graphql/generated";
import { SmartList } from "components/SmartList";
import { SelectiveNonNullable } from "helpers/types/SelectiveNonNullable";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { TranslatedPreviewCard } from "components/PreviewCard";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  groupingMethod: -1,
  keepInfoVisible: false,
  searchName: "",
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {
  contents: NonNullable<GetContentsQuery["contents"]>["data"];
}

const Contents = ({
  langui,
  contents,
  languages,
  ...otherProps
}: Props): JSX.Element => {
  const hoverable = useMediaHoverable();

  const [groupingMethod, setGroupingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.groupingMethod
  );
  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );

  const groupingFunction = useCallback(
    (
      item: SelectiveNonNullable<
        NonNullable<GetContentsQuery["contents"]>["data"][number],
        "attributes" | "id"
      >
    ): string[] => {
      switch (groupingMethod) {
        case 0: {
          const categories = filterHasAttributes(
            item.attributes.categories?.data,
            ["attributes"] as const
          );
          if (categories.length > 0) {
            return categories.map((category) => category.attributes.name);
          }
          return [langui.no_category ?? "No category"];
        }
        case 1: {
          return [
            item.attributes.type?.data?.attributes?.titles?.[0]?.title ??
            item.attributes.type?.data?.attributes?.slug
              ? prettySlug(item.attributes.type.data.attributes.slug)
              : langui.no_type ?? "No type",
          ];
        }
        default: {
          return [""];
        }
      }
    },
    [groupingMethod, langui]
  );

  const filteringFunction = useCallback(
    (
      item: SelectiveNonNullable<Props["contents"][number], "attributes" | "id">
    ) => {
      if (searchName.length > 1) {
        if (
          filterDefined(item.attributes.translations).find((translation) =>
            prettyInlineTitle(
              translation.pre_title,
              translation.title,
              translation.subtitle
            )
              .toLowerCase()
              .includes(searchName.toLowerCase())
          )
        ) {
          return true;
        }
        return false;
      }
      return true;
    },
    [searchName]
  );

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.Workspaces}
          title={langui.contents}
          description={langui.contents_description}
        />

        <Button
          href="/contents"
          text={"Switch to folder view"}
          icon={Icon.Folder}
        />

        <HorizontalLine />

        <TextInput
          className="mb-6 w-full"
          placeholder={langui.search_title ?? "Search..."}
          value={searchName}
          onChange={setSearchName}
        />

        <WithLabel label={langui.group_by}>
          <Select
            className="w-full"
            options={[langui.category ?? "Category", langui.type ?? "Type"]}
            value={groupingMethod}
            onChange={setGroupingMethod}
            allowEmpty
          />
        </WithLabel>

        {hoverable && (
          <WithLabel label={langui.always_show_info}>
            <Switch onClick={toggleKeepInfoVisible} value={keepInfoVisible} />
          </WithLabel>
        )}

        <Button
          className="mt-8"
          text={langui.reset_all_filters}
          icon={Icon.Replay}
          onClick={() => {
            setSearchName(DEFAULT_FILTERS_STATE.searchName);
            setGroupingMethod(DEFAULT_FILTERS_STATE.groupingMethod);
            setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          }}
        />
      </SubPanel>
    ),
    [
      groupingMethod,
      hoverable,
      keepInfoVisible,
      langui.always_show_info,
      langui.category,
      langui.contents,
      langui.contents_description,
      langui.group_by,
      langui.reset_all_filters,
      langui.search_title,
      langui.type,
      searchName,
      setKeepInfoVisible,
      toggleKeepInfoVisible,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <SmartList
          items={filterHasAttributes(contents, ["attributes", "id"] as const)}
          getItemId={(item) => item.id}
          renderItem={({ item }) => (
            <TranslatedPreviewCard
              href={`/contents/${item.attributes.slug}`}
              translations={filterHasAttributes(item.attributes.translations, [
                "language.data.attributes.code",
              ] as const).map((translation) => ({
                pre_title: translation.pre_title,
                title: translation.title,
                subtitle: translation.subtitle,
                language: translation.language.data.attributes.code,
              }))}
              fallback={{ title: prettySlug(item.attributes.slug) }}
              thumbnail={item.attributes.thumbnail?.data?.attributes}
              thumbnailAspectRatio="3/2"
              thumbnailForceAspectRatio
              topChips={
                item.attributes.type?.data?.attributes
                  ? [
                      item.attributes.type.data.attributes.titles?.[0]
                        ? item.attributes.type.data.attributes.titles[0]?.title
                        : prettySlug(item.attributes.type.data.attributes.slug),
                    ]
                  : undefined
              }
              bottomChips={item.attributes.categories?.data.map(
                (category) => category.attributes?.short ?? ""
              )}
              keepInfoVisible={keepInfoVisible}
            />
          )}
          className="grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]"
          groupingFunction={groupingFunction}
          filteringFunction={filteringFunction}
          searchingTerm={searchName}
          searchingBy={(item) =>
            `
            ${item.attributes.slug}
            ${filterDefined(item.attributes.translations)
              .map((translation) =>
                prettyInlineTitle(
                  translation.pre_title,
                  translation.title,
                  translation.subtitle
                )
              )
              .join(" ")}`
          }
          paginationItemPerPage={50}
          langui={langui}
        />
      </ContentPanel>
    ),
    [
      contents,
      filteringFunction,
      groupingFunction,
      keepInfoVisible,
      langui,
      searchName,
    ]
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      languages={languages}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Contents;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getContents({
    language_code: context.locale ?? "en",
  });
  if (!contents.contents) return { notFound: true };
  contents.contents.data.sort((a, b) => {
    const titleA = a.attributes?.slug ?? "";
    const titleB = b.attributes?.slug ?? "";
    return titleA.localeCompare(titleB);
  });

  const appStaticProps = await getAppStaticProps(context);
  const props: Props = {
    ...appStaticProps,
    contents: contents.contents.data,
    openGraph: getOpenGraph(
      appStaticProps.langui,
      appStaticProps.langui.contents ?? "Contents"
    ),
  };
  return {
    props: props,
  };
};
