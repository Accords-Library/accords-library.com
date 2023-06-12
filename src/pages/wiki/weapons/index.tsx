import { GetStaticProps } from "next";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { getFormat } from "helpers/i18n";
import { getOpenGraph } from "helpers/openGraph";
import { SubPanel } from "components/Containers/SubPanel";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { TextInput } from "components/Inputs/TextInput";
import { useTypedRouter } from "hooks/useTypedRouter";
import { useFormat } from "hooks/useFormat";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { sendAnalytics } from "helpers/analytics";
import { Button } from "components/Inputs/Button";
import { HorizontalLine } from "components/HorizontalLine";
import {
  containsHighlight,
  CustomSearchResponse,
  filterHitsWithHighlight,
  meiliSearch,
} from "helpers/search";
import { MeiliIndices, MeiliWeapon } from "shared/meilisearch-graphql-typings/meiliTypes";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { Paginator } from "components/Containers/Paginator";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { prettySlug } from "helpers/formatters";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { WithLabel } from "components/Inputs/WithLabel";
import { Switch } from "components/Inputs/Switch";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { Select } from "components/Inputs/Select";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  query: "",
  keepInfoVisible: true,
  page: 1,
  lang: 0,
};

const queryParamSchema = z.object({
  query: z.coerce.string().optional(),
  page: z.coerce.number().positive().optional(),
  lang: z.coerce.number().min(0).optional(),
});

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Weapons = (props: Props): JSX.Element => {
  const { format, formatCategory, formatWeaponType, formatLanguage } = useFormat();
  const hoverable = useDeviceSupportsHover();
  const router = useTypedRouter(queryParamSchema);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const languageOptions = useMemo(() => {
    const memo =
      router.locales?.map((language) => ({
        meiliAttribute: language,
        displayedName: formatLanguage(language),
      })) ?? [];

    memo.unshift({ meiliAttribute: "", displayedName: format("all") });
    return memo;
  }, [router.locales, formatLanguage, format]);

  const [query, setQuery] = useState(router.query.query ?? DEFAULT_FILTERS_STATE.query);
  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);
  const [languageOption, setLanguageOption] = useState(
    router.query.lang ?? DEFAULT_FILTERS_STATE.lang
  );

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [weapons, setWeapons] = useState<CustomSearchResponse<MeiliWeapon>>();

  useEffect(() => {
    const fetchPosts = async () => {
      const currentLanguageOption = languageOptions[languageOption]?.meiliAttribute;

      const filter: string[] = [];
      if (languageOption !== 0) {
        filter.push(`filterable_languages = ${currentLanguageOption}`);
      }

      const searchResult = await meiliSearch(MeiliIndices.WEAPON, query, {
        hitsPerPage: 25,
        page,
        attributesToRetrieve: ["*"],
        attributesToHighlight: ["translations.description", "translations.names"],
        attributesToCrop: ["translations.description"],
        sort: ["slug:asc"],
        filter,
      });
      setWeapons(
        languageOption === 0
          ? filterHitsWithHighlight<MeiliWeapon>(searchResult, "translations")
          : searchResult
      );
    };
    fetchPosts();
  }, [query, page, languageOptions, languageOption]);

  useEffect(() => {
    if (router.isReady)
      router.updateQuery({
        page,
        query,
        lang: languageOption,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, languageOption, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      if (isDefined(router.query.page)) setPage(router.query.page);
      if (isDefined(router.query.query)) setQuery(router.query.query);
      if (isDefined(router.query.lang)) setLanguageOption(router.query.lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const searchInput = (
    <TextInput
      placeholder={format("search_placeholder")}
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
  );

  const subPanel = (
    <SubPanel>
      {!is1ColumnLayout && <ReturnButton href="/wiki" title={format("wiki")} className="mb-10" />}

      <PanelHeader
        icon="shield"
        title={format("weapon", { count: Infinity })}
        description={format("weapons_description")}
      />

      <HorizontalLine />

      {!is1ColumnLayout && <div className="mb-6">{searchInput}</div>}

      <WithLabel label={format("language", { count: Infinity })}>
        <Select
          className="w-full"
          options={languageOptions.map((item) => item.displayedName)}
          value={languageOption}
          onChange={(newLanguageOption) => {
            setPage(1);
            setLanguageOption(newLanguageOption);
            sendAnalytics(
              "Weapons",
              `Change language filter (${
                languageOptions.map((item) => item.meiliAttribute)[newLanguageOption]
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
          setPage(DEFAULT_FILTERS_STATE.page);
          setQuery(DEFAULT_FILTERS_STATE.query);
          setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          setLanguageOption(DEFAULT_FILTERS_STATE.lang);
          sendAnalytics("Weapons", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      {is1ColumnLayout && (
        <>
          <ReturnButton href="/wiki" title={format("wiki")} className="mb-6" />
          <div className="mx-auto mb-12 max-w-lg">{searchInput}</div>
        </>
      )}

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
              ])
                .map(({ description, language, names: [primaryName, ...aliases] }) => ({
                  language: language.data.attributes.code,
                  title: primaryName,
                  subtitle: aliases.join("・"),
                  description: containsHighlight(description) ? description : undefined,
                }))
                .filter(
                  ({ language }) =>
                    languageOption === 0 ||
                    language === languageOptions[languageOption]?.meiliAttribute
                )}
              fallback={{ title: prettySlug(item.slug) }}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio="1/1"
              thumbnailForceAspectRatio
              thumbnailFitMethod="contain"
              keepInfoVisible={keepInfoVisible}
              topChips={
                item.type?.data?.attributes?.slug
                  ? [formatWeaponType(item.type.data.attributes.slug)]
                  : undefined
              }
              bottomChips={filterHasAttributes(item.categories, ["attributes"]).map((category) =>
                formatCategory(category.attributes.slug)
              )}
            />
          ))}
        </div>
      </Paginator>
    </ContentPanel>
  );

  return <AppLayout contentPanel={contentPanel} subPanel={subPanel} {...props} />;
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
