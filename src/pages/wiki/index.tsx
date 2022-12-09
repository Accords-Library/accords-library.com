import { GetStaticProps } from "next";
import { useCallback, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { Icon } from "components/Ico";
import { getReadySdk } from "graphql/sdk";
import { GetWikiPageQuery, GetWikiPagesPreviewsQuery } from "graphql/generated";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import {
  filterDefined,
  filterHasAttributes,
  isDefinedAndNotEmpty,
  SelectiveNonNullable,
} from "helpers/asserts";
import { SmartList } from "components/SmartList";
import { Select } from "components/Inputs/Select";
import { prettySlug } from "helpers/formatters";
import { getOpenGraph } from "helpers/openGraph";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { cIf } from "helpers/className";
import { getLangui } from "graphql/fetchLocalData";
import { sendAnalytics } from "helpers/analytics";
import { Terminal } from "components/Cli/Terminal";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  searchName: "",
  keepInfoVisible: true,
  groupingMethod: -1,
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  pages: NonNullable<GetWikiPagesPreviewsQuery["wikiPages"]>["data"];
}

const Wiki = ({ pages, ...otherProps }: Props): JSX.Element => {
  const hoverable = useDeviceSupportsHover();
  const langui = useAtomGetter(atoms.localData.langui);
  const isContentPanelAtLeast4xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast4xl);
  const isTerminalMode = useAtomGetter(atoms.layout.terminalMode);

  const [searchName, setSearchName] = useState(DEFAULT_FILTERS_STATE.searchName);

  const [groupingMethod, setGroupingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.groupingMethod
  );

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon={Icon.TravelExplore}
        title={langui.wiki}
        description={langui.wiki_description}
      />

      <HorizontalLine />

      <TextInput
        className="mb-6 w-full"
        placeholder={langui.search_title ?? "Search..."}
        value={searchName}
        onChange={(name) => {
          setSearchName(name);
          if (isDefinedAndNotEmpty(name)) {
            sendAnalytics("Wiki", "Change search term");
          } else {
            sendAnalytics("Wiki", "Clear search term");
          }
        }}
      />

      <WithLabel label={langui.group_by}>
        <Select
          className="w-full"
          options={[langui.category ?? "Category"]}
          value={groupingMethod}
          onChange={(value) => {
            setGroupingMethod(value);
            sendAnalytics("Wiki", `Change grouping method (${["none", "category"][value + 1]})`);
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
              sendAnalytics("Wiki", `Always ${keepInfoVisible ? "hide" : "show"} info`);
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
          sendAnalytics("Wiki", "Reset all filters");
        }}
      />

      <HorizontalLine />

      <p className="mb-4 font-headers text-xl font-bold">{langui.special_pages}</p>

      <NavOption title={langui.chronology} url="/wiki/chronology" border />
    </SubPanel>
  );

  const groupingFunction = useCallback(
    (
      item: SelectiveNonNullable<
        NonNullable<GetWikiPageQuery["wikiPages"]>["data"][number],
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
        default: {
          return [""];
        }
      }
    },
    [groupingMethod, langui]
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <SmartList
        items={filterHasAttributes(pages, ["id", "attributes"] as const)}
        getItemId={(item) => item.id}
        renderItem={({ item }) => (
          <TranslatedPreviewCard
            href={`/wiki/${item.attributes.slug}`}
            translations={filterHasAttributes(item.attributes.translations, [
              "language.data.attributes.code",
            ] as const).map((translation) => ({
              title: translation.title,
              subtitle:
                translation.aliases && translation.aliases.length > 0
                  ? translation.aliases.map((alias) => alias?.alias).join("・")
                  : undefined,
              description: translation.summary,
              language: translation.language.data.attributes.code,
            }))}
            fallback={{ title: prettySlug(item.attributes.slug) }}
            thumbnail={item.attributes.thumbnail?.data?.attributes}
            thumbnailAspectRatio={"4/3"}
            thumbnailRounded
            thumbnailForceAspectRatio
            keepInfoVisible={keepInfoVisible}
            topChips={filterHasAttributes(item.attributes.tags?.data, ["attributes"] as const).map(
              (tag) => tag.attributes.titles?.[0]?.title ?? prettySlug(tag.attributes.slug)
            )}
            bottomChips={filterHasAttributes(item.attributes.categories?.data, [
              "attributes",
            ] as const).map((category) => category.attributes.short)}
          />
        )}
        className={cIf(
          isContentPanelAtLeast4xl,
          "grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-6 gap-y-8",
          "grid-cols-2 gap-x-3 gap-y-5"
        )}
        searchingTerm={searchName}
        searchingBy={(item) =>
          filterDefined(item.attributes.translations)
            .map(
              (translation) =>
                `${translation.title} ${filterDefined(translation.aliases)
                  .map((alias) => alias.alias)
                  .join(" ")}`
            )
            .join(" ")
        }
        groupingFunction={groupingFunction}
        paginationItemPerPage={25}
      />
    </ContentPanel>
  );

  if (isTerminalMode) {
    return (
      <Terminal
        parentPath="/"
        childrenPaths={filterHasAttributes(pages, ["attributes"] as const).map(
          (page) => page.attributes.slug
        )}
      />
    );
  }

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      {...otherProps}
    />
  );
};
export default Wiki;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const pages = await sdk.getWikiPagesPreviews({
    language_code: context.locale ?? "en",
  });
  if (!pages.wikiPages?.data) return { notFound: true };

  const props: Props = {
    pages: sortPages(pages.wikiPages.data),
    openGraph: getOpenGraph(langui, langui.wiki ?? "Wiki"),
  };
  return {
    props: props,
  };
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const sortPages = (pages: Props["pages"]): Props["pages"] =>
  pages.sort((a, b) => {
    const slugA = a.attributes?.slug ?? "";
    const slugB = b.attributes?.slug ?? "";
    return slugA.localeCompare(slugB);
  });
