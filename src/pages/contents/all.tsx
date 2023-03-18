import { GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
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
import {
  filterDefined,
  filterHasAttributes,
  isDefined,
  isDefinedAndNotEmpty,
} from "helpers/asserts";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { sendAnalytics } from "helpers/analytics";
import { containsHighlight, CustomSearchResponse, meiliSearch } from "helpers/search";
import { MeiliContent, MeiliIndices } from "shared/meilisearch-graphql-typings/meiliTypes";
import { useTypedRouter } from "hooks/useTypedRouter";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { prettySlug } from "helpers/formatters";
import { Paginator } from "components/Containers/Paginator";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  sortingMethod: 0,
  keepInfoVisible: true,
  query: "",
  page: 1,
};

const queryParamSchema = z.object({
  query: z.coerce.string().optional(),
  page: z.coerce.number().positive().optional(),
  sort: z.coerce.number().min(0).max(5).optional(),
});

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Contents = (props: Props): JSX.Element => {
  const hoverable = useDeviceSupportsHover();
  const { format } = useFormat();
  const router = useTypedRouter(queryParamSchema);
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);

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

  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);
  const [contents, setContents] = useState<CustomSearchResponse<MeiliContent>>();
  const [query, setQuery] = useState(router.query.query ?? DEFAULT_FILTERS_STATE.query);

  useEffect(() => {
    const fetchPosts = async () => {
      const currentSortingMethod = sortingMethods[sortingMethod];
      const searchResult = await meiliSearch(MeiliIndices.CONTENT, query, {
        attributesToRetrieve: ["translations", "id", "slug", "categories", "type", "thumbnail"],
        attributesToHighlight: ["translations"],
        attributesToCrop: ["translations.displayable_description"],
        hitsPerPage: 25,
        page,
        sort: isDefined(currentSortingMethod) ? [currentSortingMethod.meiliAttribute] : undefined,
      });
      searchResult.hits = searchResult.hits.map((item) => {
        if (Object.keys(item._matchesPosition).some((match) => match.startsWith("translations"))) {
          item._formatted.translations = filterDefined(item._formatted.translations).filter(
            (translation) => containsHighlight(JSON.stringify(translation))
          );
        }
        return item;
      });
      setContents(searchResult);
    };
    fetchPosts();
  }, [query, page, sortingMethod, sortingMethods]);

  useEffect(() => {
    if (router.isReady)
      router.updateQuery({
        page,
        query,
        sort: sortingMethod,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, sortingMethod, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      if (isDefined(router.query.page)) setPage(router.query.page);
      if (isDefined(router.query.query)) setQuery(router.query.query);
      if (isDefined(router.query.sort)) setSortingMethod(router.query.sort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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

      <TextInput
        className="mb-6 w-full"
        placeholder={format("search_title")}
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
          setPage(1);
          setQuery(DEFAULT_FILTERS_STATE.query);
          setSortingMethod(DEFAULT_FILTERS_STATE.sortingMethod);
          setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          sendAnalytics("Contents/All", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
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
              ]).map(({ displayable_description, language, ...otherAttributes }) => ({
                ...otherAttributes,
                description: containsHighlight(displayable_description)
                  ? displayable_description
                  : undefined,
                language: language.data.attributes.code,
              }))}
              fallback={{ title: prettySlug(item.slug) }}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio="3/2"
              thumbnailForceAspectRatio
              topChips={
                item.type?.data?.attributes
                  ? [
                      item.type.data.attributes.titles?.[0]
                        ? item.type.data.attributes.titles[0]?.title
                        : prettySlug(item.type.data.attributes.slug),
                    ]
                  : undefined
              }
              bottomChips={item.categories?.data.map(
                (category) => category.attributes?.short ?? ""
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
