import { GetStaticProps } from "next";
import { useState, useCallback } from "react";
import { useBoolean } from "usehooks-ts";
import naturalCompare from "string-natural-compare";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Select } from "components/Inputs/Select";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { getReadySdk } from "graphql/sdk";
import { prettyInlineTitle, prettySlug } from "helpers/formatters";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { Button } from "components/Inputs/Button";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { Icon } from "components/Ico";
import {
  filterDefined,
  filterHasAttributes,
  isDefinedAndNotEmpty,
  SelectiveNonNullable,
} from "helpers/asserts";
import { GetContentsQuery } from "graphql/generated";
import { SmartList } from "components/SmartList";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { cJoin, cIf } from "helpers/className";
import { getLangui } from "graphql/fetchLocalData";
import { sendAnalytics } from "helpers/analytics";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

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

interface Props extends AppLayoutRequired {
  contents: NonNullable<GetContentsQuery["contents"]>["data"];
}

const Contents = ({ contents, ...otherProps }: Props): JSX.Element => {
  const hoverable = useDeviceSupportsHover();
  const langui = useAtomGetter(atoms.localData.langui);
  const isContentPanelAtLeast4xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast4xl);

  const [groupingMethod, setGroupingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.groupingMethod
  );
  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [searchName, setSearchName] = useState(DEFAULT_FILTERS_STATE.searchName);

  const groupingFunction = useCallback(
    (
      item: SelectiveNonNullable<
        NonNullable<GetContentsQuery["contents"]>["data"][number],
        "attributes" | "id"
      >
    ): string[] => {
      switch (groupingMethod) {
        case 0: {
          const categories = filterHasAttributes(item.attributes.categories?.data, [
            "attributes",
          ] as const);
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
    (item: SelectiveNonNullable<Props["contents"][number], "attributes" | "id">) => {
      if (searchName.length > 1) {
        if (
          filterDefined(item.attributes.translations).find((translation) =>
            prettyInlineTitle(translation.pre_title, translation.title, translation.subtitle)
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

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon={Icon.Workspaces}
        title={langui.contents}
        description={langui.contents_description}
      />

      <HorizontalLine />

      <Button href="/contents" text={langui.switch_to_folder_view} icon={Icon.Folder} />

      <HorizontalLine />

      <TextInput
        className="mb-6 w-full"
        placeholder={langui.search_title ?? "Search..."}
        value={searchName}
        onChange={(name) => {
          setSearchName(name);
          if (isDefinedAndNotEmpty(name)) {
            sendAnalytics("Contents/All", "Change search term");
          } else {
            sendAnalytics("Contents/All", "Clear search term");
          }
        }}
      />

      <WithLabel label={langui.group_by}>
        <Select
          className="w-full"
          options={[langui.category ?? "Category", langui.type ?? "Type"]}
          value={groupingMethod}
          onChange={(value) => {
            setGroupingMethod(value);
            sendAnalytics(
              "Contents/All",
              `Change grouping method (${["none", "category", "type"][value + 1]})`
            );
          }}
          allowEmpty
        />
      </WithLabel>

      {hoverable && (
        <WithLabel label={langui.always_show_info}>
          <Switch
            value={keepInfoVisible}
            onClick={() => {
              toggleKeepInfoVisible();
              sendAnalytics("Contents/All", `Always ${keepInfoVisible ? "hide" : "show"} info`);
            }}
          />
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
          sendAnalytics("Contents/All", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
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
        className={cJoin(
          "items-end",
          cIf(
            isContentPanelAtLeast4xl,
            "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
            "grid-cols-2 gap-x-3 gap-y-5"
          )
        )}
        groupingFunction={groupingFunction}
        filteringFunction={filteringFunction}
        searchingTerm={searchName}
        searchingBy={(item) =>
          `
            ${item.attributes.slug}
            ${filterDefined(item.attributes.translations)
              .map((translation) =>
                prettyInlineTitle(translation.pre_title, translation.title, translation.subtitle)
              )
              .join(" ")}`
        }
        paginationItemPerPage={50}
      />
    </ContentPanel>
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
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
  const langui = getLangui(context.locale);
  const contents = await sdk.getContents({
    language_code: context.locale ?? "en",
  });
  if (!contents.contents) return { notFound: true };

  contents.contents.data.sort((a, b) => {
    const titleA = a.attributes?.slug ?? "";
    const titleB = b.attributes?.slug ?? "";
    return naturalCompare(titleA, titleB);
  });

  const props: Props = {
    contents: contents.contents.data,
    openGraph: getOpenGraph(langui, langui.contents ?? "Contents"),
  };
  return {
    props: props,
  };
};
