import { GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { prettySlug } from "helpers/formatters";
import { getOpenGraph } from "helpers/openGraph";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { sendAnalytics } from "helpers/analytics";
import { useTypedRouter } from "hooks/useTypedRouter";
import { MeiliIndices, MeiliWikiPage } from "shared/meilisearch-graphql-typings/meiliTypes";
import { containsHighlight, CustomSearchResponse, meiliSearch } from "helpers/search";
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
  query: "",
  keepInfoVisible: true,
  page: 1,
};

const queryParamSchema = z.object({
  query: z.coerce.string().optional(),
  page: z.coerce.number().positive().optional(),
});

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Wiki = (props: Props): JSX.Element => {
  const hoverable = useDeviceSupportsHover();
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const closeSubPanel = useCallback(() => setSubPanelOpened(false), [setSubPanelOpened]);
  const { format } = useFormat();
  const router = useTypedRouter(queryParamSchema);
  const [query, setQuery] = useState(router.query.query ?? DEFAULT_FILTERS_STATE.query);

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);
  const [wikiPages, setWikiPages] = useState<CustomSearchResponse<MeiliWikiPage>>();

  useEffect(() => {
    const fetchWikiPages = async () => {
      const searchResult = await meiliSearch(MeiliIndices.WIKI_PAGE, query, {
        hitsPerPage: 25,
        page,
        attributesToHighlight: [
          "translations.title",
          "translations.aliases",
          "translations.summary",
          "translations.displayable_description",
        ],
        attributesToCrop: ["translations.displayable_description"],
      });
      setWikiPages(searchResult);
    };
    fetchWikiPages();
  }, [query, page]);

  useEffect(() => {
    if (router.isReady)
      router.updateQuery({
        page,
        query,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      if (isDefined(router.query.page)) setPage(router.query.page);
      if (isDefined(router.query.query)) setQuery(router.query.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="travel_explore"
        title={format("wiki")}
        description={format("wiki_description")}
      />

      <HorizontalLine />

      <TextInput
        className="mb-6 w-full"
        placeholder={format("search_placeholder")}
        value={query}
        onChange={(name) => {
          setPage(1);
          setQuery(name);
          if (isDefinedAndNotEmpty(name)) {
            sendAnalytics("Wiki", "Change search term");
          } else {
            sendAnalytics("Wiki", "Clear search term");
          }
        }}
      />

      {hoverable && (
        <WithLabel label={format("always_show_info")}>
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
        text={format("reset_all_filters")}
        icon="settings_backup_restore"
        onClick={() => {
          setPage(1);
          setQuery(DEFAULT_FILTERS_STATE.query);
          setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          sendAnalytics("Wiki", "Reset all filters");
        }}
      />

      <HorizontalLine />

      <p className="mb-4 font-headers text-xl font-bold">{format("special_pages")}</p>

      <NavOption
        title={format("chronology")}
        url="/wiki/chronology"
        onClick={closeSubPanel}
        border
      />
      <NavOption
        title={format("weapon", { count: Infinity })}
        url="/wiki/weapons"
        onClick={closeSubPanel}
        border
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <Paginator page={page} onPageChange={setPage} totalNumberOfPages={wikiPages?.totalPages}>
        <div
          className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] items-start
              gap-x-6 gap-y-8">
          {wikiPages?.hits.map((item) => (
            <TranslatedPreviewCard
              key={item.id}
              href={`/wiki/${item.slug}`}
              translations={filterHasAttributes(item._formatted.translations, [
                "language.data.attributes.code",
              ]).map(
                ({ aliases, summary, displayable_description, language, ...otherAttributes }) => ({
                  ...otherAttributes,
                  subtitle:
                    aliases && aliases.length > 0
                      ? aliases.map((alias) => alias?.alias).join("・")
                      : undefined,
                  description: containsHighlight(displayable_description)
                    ? displayable_description
                    : summary,
                  language: language.data.attributes.code,
                })
              )}
              fallback={{ title: prettySlug(item.slug) }}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio={"4/3"}
              thumbnailRounded
              thumbnailForceAspectRatio
              keepInfoVisible
              topChips={filterHasAttributes(item.tags?.data, ["attributes"]).map(
                (tag) => tag.attributes.titles?.[0]?.title ?? prettySlug(tag.attributes.slug)
              )}
              bottomChips={filterHasAttributes(item.categories?.data, ["attributes"]).map(
                (category) => category.attributes.short
              )}
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
export default Wiki;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(format, format("wiki")),
  };
  return {
    props: props,
  };
};
