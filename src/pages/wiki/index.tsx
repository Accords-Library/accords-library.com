import { GetStaticProps } from "next";
import { useCallback, useMemo, useState } from "react";
import { AppLayout } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Icon } from "components/Ico";
import { getReadySdk } from "graphql/sdk";
import { GetWikiPageQuery, GetWikiPagesPreviewsQuery } from "graphql/generated";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { filterDefined, filterHasAttributes } from "helpers/others";
import { ContentPlaceholder } from "components/PanelComponents/ContentPlaceholder";
import { SmartList } from "components/SmartList";
import { Select } from "components/Inputs/Select";
import { SelectiveNonNullable } from "helpers/types/SelectiveNonNullable";
import { prettySlug } from "helpers/formatters";
import { useBoolean } from "hooks/useBoolean";
import { TranslatedPreviewCard } from "components/Translated";

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

interface Props extends AppStaticProps {
  pages: NonNullable<GetWikiPagesPreviewsQuery["wikiPages"]>["data"];
}

const Wiki = ({
  langui,
  languages,
  pages,
  ...otherProps
}: Props): JSX.Element => {
  const hoverable = useMediaHoverable();

  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );

  const [groupingMethod, setGroupingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.groupingMethod
  );

  const {
    state: keepInfoVisible,
    toggleState: toggleKeepInfoVisible,
    setState: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.TravelExplore}
          title={langui.wiki}
          description={langui.wiki_description}
        />

        <TextInput
          className="mb-6 w-full"
          placeholder={langui.search_title ?? undefined}
          value={searchName}
          onChange={setSearchName}
        />

        <WithLabel
          label={langui.group_by}
          input={
            <Select
              className="w-full"
              options={[langui.category ?? ""]}
              value={groupingMethod}
              onChange={setGroupingMethod}
              allowEmpty
            />
          }
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch value={keepInfoVisible} onClick={toggleKeepInfoVisible} />
            }
          />
        )}

        <Button
          className="mt-8"
          text={langui.reset_all_filters}
          icon={Icon.Replay}
          onClick={() => {
            setSearchName(DEFAULT_FILTERS_STATE.searchName);
            setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          }}
        />
        <HorizontalLine />

        <p className="mb-4 font-headers text-xl font-bold">
          {langui.special_pages}
        </p>

        <NavOption title={langui.chronology} url="/wiki/chronology" border />
      </SubPanel>
    ),
    [
      groupingMethod,
      hoverable,
      keepInfoVisible,
      langui,
      searchName,
      setKeepInfoVisible,
      toggleKeepInfoVisible,
    ]
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
          const categories = filterHasAttributes(
            item.attributes.categories?.data,
            ["attributes"] as const
          );
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

  const contentPanel = useMemo(
    () => (
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
                    ? translation.aliases
                        .map((alias) => alias?.alias)
                        .join("・")
                    : undefined,
                description: translation.summary,
                language: translation.language.data.attributes.code,
              }))}
              fallback={{ title: prettySlug(item.attributes.slug) }}
              thumbnail={item.attributes.thumbnail?.data?.attributes}
              thumbnailAspectRatio={"4/3"}
              thumbnailRounded
              thumbnailForceAspectRatio
              languages={languages}
              keepInfoVisible={keepInfoVisible}
              topChips={filterHasAttributes(item.attributes.tags?.data, [
                "attributes",
              ] as const).map(
                (tag) =>
                  tag.attributes.titles?.[0]?.title ??
                  prettySlug(tag.attributes.slug)
              )}
              bottomChips={filterHasAttributes(
                item.attributes.categories?.data,
                ["attributes"] as const
              ).map((category) => category.attributes.short)}
            />
          )}
          renderWhenEmpty={() => (
            <ContentPlaceholder
              message={langui.no_results_message ?? "No results"}
              icon={Icon.ChevronLeft}
            />
          )}
          langui={langui}
          className="grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))]"
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
        />
      </ContentPanel>
    ),
    [groupingFunction, keepInfoVisible, languages, langui, pages, searchName]
  );

  return (
    <AppLayout
      navTitle={langui.wiki}
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      languages={languages}
      langui={langui}
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
  const pages = await sdk.getWikiPagesPreviews({
    language_code: context.locale ?? "en",
  });
  if (!pages.wikiPages?.data) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    pages: sortPages(pages.wikiPages.data),
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
