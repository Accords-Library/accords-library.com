import { GetStaticProps } from "next";
import { useState, useMemo, useCallback } from "react";
import { AppLayout } from "components/AppLayout";
import { Select } from "components/Inputs/Select";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyinlineTitle, prettySlug } from "helpers/formatters";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { Button } from "components/Inputs/Button";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { Icon } from "components/Ico";
import { filterDefined, filterHasAttributes } from "helpers/others";
import { GetContentsQuery } from "graphql/generated";
import { SmartList } from "components/SmartList";
import { SelectiveRequiredNonNullable } from "helpers/types";
import { ContentPlaceholder } from "components/PanelComponents/ContentPlaceholder";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  groupingMethod: -1,
  keepInfoVisible: false,
  combineRelatedContent: true,
  searchName: "",
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {
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
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    DEFAULT_FILTERS_STATE.keepInfoVisible
  );
  const [combineRelatedContent, setCombineRelatedContent] = useState(
    DEFAULT_FILTERS_STATE.combineRelatedContent
  );
  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );

  const effectiveCombineRelatedContent = useMemo(
    () => (searchName.length > 1 ? false : combineRelatedContent),
    [combineRelatedContent, searchName.length]
  );

  const groupingFunction = useCallback(
    (
      item: SelectiveRequiredNonNullable<
        NonNullable<GetContentsQuery["contents"]>["data"][number],
        "attributes" | "id"
      >
    ): string[] => {
      switch (groupingMethod) {
        case 0: {
          const categories = filterHasAttributes(
            item.attributes.categories?.data
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
      item: SelectiveRequiredNonNullable<
        Props["contents"][number],
        "attributes" | "id"
      >
    ) => {
      if (
        effectiveCombineRelatedContent &&
        item.attributes.group?.data?.attributes?.combine === true &&
        item.attributes.group.data.attributes.contents?.data[0].id !== item.id
      ) {
        return false;
      }
      if (searchName.length > 1) {
        if (
          filterDefined(item.attributes.translations).find((translation) =>
            prettyinlineTitle(
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
    [effectiveCombineRelatedContent, searchName]
  );

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.Workspaces}
          title={langui.contents}
          description={langui.contents_description}
        />

        <TextInput
          className="mb-6 w-full"
          placeholder={langui.search_title ?? undefined}
          state={searchName}
          setState={setSearchName}
        />

        <WithLabel
          label={langui.group_by}
          input={
            <Select
              className="w-full"
              options={[langui.category ?? "", langui.type ?? ""]}
              state={groupingMethod}
              setState={setGroupingMethod}
              allowEmpty
            />
          }
        />

        <WithLabel
          label={langui.combine_related_contents}
          disabled={searchName.length > 1}
          input={
            <Switch
              setState={setCombineRelatedContent}
              state={effectiveCombineRelatedContent}
            />
          }
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
            }
          />
        )}

        <Button
          className="mt-8"
          text={langui.reset_all_filters}
          icon={Icon.Replay}
          onClick={() => {
            setSearchName(DEFAULT_FILTERS_STATE.searchName);
            setGroupingMethod(DEFAULT_FILTERS_STATE.groupingMethod);
            setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
            setCombineRelatedContent(
              DEFAULT_FILTERS_STATE.combineRelatedContent
            );
          }}
        />
      </SubPanel>
    ),
    [
      effectiveCombineRelatedContent,
      groupingMethod,
      hoverable,
      keepInfoVisible,
      langui,
      searchName,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <SmartList
          items={filterHasAttributes(contents)}
          getItemId={(item) => item.id}
          renderItem={({ item }) => (
            <>
              {item.attributes.translations && (
                <TranslatedPreviewCard
                  href={`/contents/${item.attributes.slug}`}
                  translations={item.attributes.translations.map(
                    (translation) => ({
                      pre_title: translation?.pre_title,
                      title: translation?.title,
                      subtitle: translation?.subtitle,
                      language: translation?.language?.data?.attributes?.code,
                    })
                  )}
                  slug={item.attributes.slug}
                  languages={languages}
                  thumbnail={item.attributes.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="3/2"
                  thumbnailForceAspectRatio
                  stackNumber={
                    effectiveCombineRelatedContent &&
                    item.attributes.group?.data?.attributes?.combine === true
                      ? item.attributes.group.data.attributes.contents?.data
                          .length
                      : 0
                  }
                  topChips={
                    item.attributes.type?.data?.attributes
                      ? [
                          item.attributes.type.data.attributes.titles?.[0]
                            ? item.attributes.type.data.attributes.titles[0]
                                ?.title
                            : prettySlug(
                                item.attributes.type.data.attributes.slug
                              ),
                        ]
                      : undefined
                  }
                  bottomChips={item.attributes.categories?.data.map(
                    (category) => category.attributes?.short ?? ""
                  )}
                  keepInfoVisible={keepInfoVisible}
                />
              )}
            </>
          )}
          renderWhenEmpty={() => (
            <ContentPlaceholder
              message={langui.no_results_message ?? "No results"}
              icon={Icon.ChevronLeft}
            />
          )}
          className="grid-cols-2 items-end desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]"
          groupingFunction={groupingFunction}
          filteringFunction={filteringFunction}
          searchingTerm={searchName}
          searchingBy={(item) =>
            `
            ${item.attributes.slug}
            ${filterDefined(item.attributes.translations)
              .map((translation) =>
                prettyinlineTitle(
                  translation.pre_title,
                  translation.title,
                  translation.subtitle
                )
              )
              .join(" ")}`
          }
          langui={langui}
        />
      </ContentPanel>
    ),
    [
      contents,
      effectiveCombineRelatedContent,
      filteringFunction,
      groupingFunction,
      keepInfoVisible,
      languages,
      langui,
      searchName,
    ]
  );

  return (
    <AppLayout
      navTitle={langui.contents}
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

  const props: Props = {
    ...(await getAppStaticProps(context)),
    contents: contents.contents.data,
  };
  return {
    props: props,
  };
};
