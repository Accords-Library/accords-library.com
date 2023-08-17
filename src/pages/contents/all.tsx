import { GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import Collapsible from "react-collapsible";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Select } from "components/Inputs/Select";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { Button } from "components/Inputs/Button";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { sendAnalytics } from "helpers/analytics";
import {
  containsHighlight,
  CustomSearchResponse,
  filterHitsWithHighlight,
  meiliFacet,
  MeiliFacetResult,
  meiliSearch,
} from "helpers/search";
import { MeiliContent, MeiliIndices } from "shared/meilisearch-graphql-typings/meiliTypes";
import { useTypedRouter } from "hooks/useTypedRouter";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { prettySlug } from "helpers/formatters";
import { Paginator } from "components/Containers/Paginator";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";
import { Ico } from "components/Ico";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  sortingMethod: 0,
  keepInfoVisible: true,
  query: "",
  page: 1,
  lang: 0,
};

const queryParamSchema = z.object({
  query: z.coerce.string().optional(),
  page: z.coerce.number().positive().optional(),
  sort: z.coerce.number().min(0).max(5).optional(),
  lang: z.coerce.number().min(0).optional(),
});

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Contents = (props: Props): JSX.Element => {
  const hoverable = useDeviceSupportsHover();
  const { format, formatCategory, formatContentType, formatLanguage } = useFormat();
  const router = useTypedRouter(queryParamSchema);
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const sortingMethods = useMemo(
    () => [
      { meiliAttribute: "slug:asc", displayedName: format("name") },
      { meiliAttribute: "sortable_updated_date:asc", displayedName: format("oldest") },
      { meiliAttribute: "sortable_updated_date:desc", displayedName: format("newest") },
    ],
    [format]
  );

  const [sortingMethod, setSortingMethod] = useState<number>(
    router.query.sort ?? DEFAULT_FILTERS_STATE.sortingMethod
  );

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [contents, setContents] = useState<CustomSearchResponse<MeiliContent>>();
  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);
  const [query, setQuery] = useState(router.query.query ?? DEFAULT_FILTERS_STATE.query);
  const [languageOption, setLanguageOption] = useState(
    router.query.lang ?? DEFAULT_FILTERS_STATE.lang
  );

  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const currentSortingMethod = sortingMethods[sortingMethod]?.meiliAttribute;

      const filter: string[] = [];
      if (selectedLocales.length !== 0) {
        filter.push(`filterable_languages IN [${selectedLocales.join()}]`);
      }

      const searchResult = await meiliSearch(MeiliIndices.CONTENT, query, {
        attributesToRetrieve: ["translations", "id", "slug", "categories", "type", "thumbnail"],
        attributesToHighlight: ["translations"],
        attributesToCrop: ["translations.displayable_description"],
        filter,
        hitsPerPage: 25,
        page,
        sort: isDefined(currentSortingMethod) ? [currentSortingMethod] : undefined,
      });

      setContents(filterHitsWithHighlight<MeiliContent>(searchResult, "translations"));
    };
    fetchPosts();
  }, [query, page, sortingMethod, sortingMethods, selectedLocales]);

  useEffect(() => {
    if (router.isReady)
      router.updateQuery({
        page,
        query,
        sort: sortingMethod,
        lang: languageOption,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, languageOption, sortingMethod, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      if (isDefined(router.query.page)) setPage(router.query.page);
      if (isDefined(router.query.query)) setQuery(router.query.query);
      if (isDefined(router.query.sort)) setSortingMethod(router.query.sort);
      if (isDefined(router.query.lang)) setLanguageOption(router.query.lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const [countForLanguages, setCountForLanguages] = useState<MeiliFacetResult>([]);
  const [countForCategories, setCountForCategories] = useState<MeiliFacetResult>([]);

  useEffect(() => {
    meiliFacet(MeiliIndices.CONTENT, "filterable_languages").then(setCountForLanguages);
    meiliFacet(MeiliIndices.CONTENT, "filterable_categories").then(setCountForCategories);
  }, []);

  const searchInput = (
    <TextInput
      placeholder={format("search_placeholder")}
      value={query}
      onChange={(name) => {
        setPage(1);
        setQuery(name);
        if (isDefinedAndNotEmpty(name)) {
          sendAnalytics("Contents/All", "Change search term");
        } else {
          sendAnalytics("Contents/All", "Clear search term");
        }
      }}
    />
  );

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="workspaces"
        title={format("contents")}
        description={format("contents_description")}
      />

      <HorizontalLine />

      <Button
        href="/contents"
        text={format("switch_to_folder_view")}
        icon="folder"
        onClick={() => setSubPanelOpened(false)}
      />

      <HorizontalLine />

      {!is1ColumnLayout && <div className="mb-6">{searchInput}</div>}

      <CollapsibleFilters
        title={format("language", { count: countForLanguages.length })}
        facetResult={countForLanguages}
        format={formatLanguage}
        onValueChanged={setSelectedLocales}
        selectedValues={selectedLocales}
      />

      <CollapsibleFilters
        title={format("category", { count: countForCategories.length })}
        facetResult={countForCategories}
        format={formatCategory}
        onValueChanged={setSelectedLocales}
        selectedValues={selectedLocales}
      />

      <WithLabel label={format("order_by")}>
        <Select
          className="w-full"
          options={sortingMethods.map((item) => item.displayedName)}
          value={sortingMethod}
          onChange={(newSort) => {
            setPage(1);
            setSortingMethod(newSort);
            sendAnalytics(
              "Contents/All",
              `Change sorting method (${
                sortingMethods.map((item) => item.meiliAttribute)[newSort]
              })`
            );
          }}
        />
      </WithLabel>

      {hoverable && (
        <WithLabel label={format("always_show_info")}>
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
        text={format("reset_all_filters")}
        icon="settings_backup_restore"
        onClick={() => {
          setPage(DEFAULT_FILTERS_STATE.page);
          setQuery(DEFAULT_FILTERS_STATE.query);
          setSortingMethod(DEFAULT_FILTERS_STATE.sortingMethod);
          setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          setLanguageOption(DEFAULT_FILTERS_STATE.lang);
          sendAnalytics("Contents/All", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      {is1ColumnLayout && <div className="mx-auto mb-12 max-w-lg">{searchInput}</div>}
      <Paginator page={page} onPageChange={setPage} totalNumberOfPages={contents?.totalPages}>
        <div
          className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] items-start
              gap-x-6 gap-y-8">
          {contents?.hits.map((item) => (
            <TranslatedPreviewCard
              key={item.id}
              href={`/contents/${item.slug}`}
              translations={filterHasAttributes(item._formatted.translations, [
                "language.data.attributes.code",
              ])
                .map(({ displayable_description, language, ...otherAttributes }) => ({
                  ...otherAttributes,
                  description: containsHighlight(displayable_description)
                    ? displayable_description
                    : undefined,
                  language: language.data.attributes.code,
                }))
                .filter(
                  ({ language }) =>
                    selectedLocales.length === 0 ||
                    query !== "" ||
                    selectedLocales.includes(language)
                )}
              fallback={{ title: prettySlug(item.slug) }}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio="3/2"
              thumbnailForceAspectRatio
              topChips={
                item.type?.data?.attributes
                  ? [formatContentType(item.type.data.attributes.slug)]
                  : undefined
              }
              bottomChips={filterHasAttributes(item.categories?.data, ["attributes"]).map(
                (category) => formatCategory(category.attributes.slug)
              )}
              keepInfoVisible={keepInfoVisible}
            />
          ))}
        </div>
      </Paginator>
    </ContentPanel>
  );

  return (
    <AppLayout subPanel={subPanel} contentPanel={contentPanel} subPanelIcon="search" {...props} />
  );
};
export default Contents;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);

  const props: Props = {
    openGraph: getOpenGraph(format, format("contents")),
  };
  return {
    props: props,
  };
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface CollapsibleFiltersProps {
  title: string;
  facetResult: MeiliFacetResult;
  selectedValues: string[];
  onValueChanged: (setStateFn: (current: string[]) => string[]) => void;
  format: (name: string) => string;
}

const CollapsibleFilters = ({
  title,
  facetResult,
  selectedValues,
  onValueChanged,
  format,
}: CollapsibleFiltersProps): JSX.Element => {
  const [isOpened, setOpened] = useState(false);

  if (facetResult.length === 0) return <></>;
  return (
    <Collapsible
      open={isOpened}
      onTriggerClosing={() => setOpened(false)}
      onOpening={() => setOpened(true)}
      trigger={
        <div className="flex gap-2">
          <p className="leading-5">{title}</p>
          <Ico icon={isOpened ? "expand_less" : "expand_more"} />
        </div>
      }
      easing="ease-in-out"
      transitionTime={400}
      contentInnerClassName="flex flex-wrap gap-1 py-3"
      overflowWhenOpen="visible">
      {facetResult
        .filter(({ count }) => count > 0)
        .map(({ name, count }) => (
          <Button
            key={name}
            text={`${format(name)} (${count})`}
            size="small"
            onClick={() =>
              onValueChanged((current) => {
                if (current.includes(name)) {
                  return current.filter((currentLocale) => currentLocale !== name);
                }
                return [...current, name];
              })
            }
            active={selectedValues.includes(name)}
          />
        ))}
    </Collapsible>
  );
};
