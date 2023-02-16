import { GetStaticProps } from "next";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { getFormat } from "helpers/i18n";
import { getOpenGraph } from "helpers/openGraph";
import { SubPanel } from "components/Containers/SubPanel";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { TextInput } from "components/Inputs/TextInput";
import { useTypedRouter } from "hooks/useTypedRouter";
import { useFormat } from "hooks/useFormat";
import {
  filterDefined,
  filterHasAttributes,
  isDefined,
  isDefinedAndNotEmpty,
} from "helpers/asserts";
import { sendAnalytics } from "helpers/analytics";
import { Button } from "components/Inputs/Button";
import { HorizontalLine } from "components/HorizontalLine";
import { containsHighlight, CustomSearchResponse, meiliSearch } from "helpers/search";
import { MeiliIndices, MeiliWeapon } from "shared/meilisearch-graphql-typings/meiliTypes";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { Paginator } from "components/Containers/Paginator";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { prettySlug } from "helpers/formatters";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { WithLabel } from "components/Inputs/WithLabel";
import { Switch } from "components/Inputs/Switch";
import { ReturnButton } from "components/PanelComponents/ReturnButton";

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

const Weapons = (props: Props): JSX.Element => {
  const { format } = useFormat();
  const hoverable = useDeviceSupportsHover();
  const router = useTypedRouter(queryParamSchema);

  const [query, setQuery] = useState(router.query.query ?? DEFAULT_FILTERS_STATE.query);
  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [weapons, setWeapons] = useState<CustomSearchResponse<MeiliWeapon>>();

  useEffect(() => {
    const fetchPosts = async () => {
      const searchResult = await meiliSearch(MeiliIndices.WEAPON, query, {
        hitsPerPage: 25,
        page,
        attributesToRetrieve: ["*"],
        attributesToHighlight: ["translations.description", "translations.names"],
        attributesToCrop: ["translations.description"],
        sort: ["slug:asc"],
      });

      searchResult.hits = searchResult.hits.map((item) => {
        if (Object.keys(item._matchesPosition).some((match) => match.startsWith("translations"))) {
          item._formatted.translations = filterDefined(item._formatted.translations).filter(
            (translation) => JSON.stringify(translation).includes("</mark>")
          );
        }
        return item;
      });

      setWeapons(searchResult);
    };
    fetchPosts();
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
      <ReturnButton
        href="/wiki"
        title={format("wiki")}
        displayOnlyOn="3ColumnsLayout"
        className="mb-10"
      />

      <PanelHeader
        icon="shield"
        title={format("weapon", { count: Infinity })}
        description={format("weapons_description")}
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
            sendAnalytics("Weapons", "Change search term");
          } else {
            sendAnalytics("Weapons", "Clear search term");
          }
        }}
      />

      {hoverable && (
        <WithLabel label={format("always_show_info")}>
          <Switch
            value={keepInfoVisible}
            onClick={() => {
              toggleKeepInfoVisible();
              sendAnalytics("Weapons", `Always ${keepInfoVisible ? "hide" : "show"} info`);
            }}
          />
        </WithLabel>
      )}

      <Button
        className="mt-8"
        text={format("reset_all_filters")}
        icon="settings_backup_restore"
        onClick={() => {
          setQuery(DEFAULT_FILTERS_STATE.query);
          setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          sendAnalytics("Weapons", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <ReturnButton
        href="/wiki"
        title={format("wiki")}
        displayOnlyOn="1ColumnLayout"
        className="mb-10"
      />

      <Paginator page={page} onPageChange={setPage} totalNumberOfPages={weapons?.totalPages}>
        <div
          className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] items-start
          gap-x-6 gap-y-8">
          {weapons?.hits.map((item) => (
            <TranslatedPreviewCard
              key={item.id}
              href={`/wiki/weapons/${item.slug}`}
              translations={filterHasAttributes(item._formatted.translations, [
                "language.data.attributes.code",
              ] as const).map(({ description, language, names: [primaryName, ...aliases] }) => ({
                language: language.data.attributes.code,
                title: primaryName,
                subtitle: aliases.join("・"),
                description: containsHighlight(description) ? description : undefined,
              }))}
              fallback={{ title: prettySlug(item.slug) }}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio="1/1"
              thumbnailForceAspectRatio
              thumbnailFitMethod="contain"
              keepInfoVisible={keepInfoVisible}
              topChips={
                item.type?.data?.attributes?.slug
                  ? [prettySlug(item.type.data.attributes.slug)]
                  : undefined
              }
              bottomChips={filterHasAttributes(item.categories, ["attributes.short"] as const).map(
                (category) => category.attributes.short
              )}
            />
          ))}
        </div>
      </Paginator>
    </ContentPanel>
  );

  return (
    <>
      <AppLayout contentPanel={contentPanel} subPanel={subPanel} {...props} />
    </>
  );
};
export default Weapons;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(format, format("weapon", { count: Infinity })),
  };
  return {
    props: props,
  };
};
