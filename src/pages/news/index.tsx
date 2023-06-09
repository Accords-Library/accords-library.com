import { GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getOpenGraph } from "helpers/openGraph";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { sendAnalytics } from "helpers/analytics";
import { Terminal } from "components/Cli/Terminal";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import {
  containsHighlight,
  CustomSearchResponse,
  filterHitsWithHighlight,
  meiliSearch,
} from "helpers/search";
import { MeiliIndices, MeiliPost } from "shared/meilisearch-graphql-typings/meiliTypes";
import { useTypedRouter } from "hooks/useTypedRouter";
import { prettySlug } from "helpers/formatters";
import { Paginator } from "components/Containers/Paginator";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { Select } from "components/Inputs/Select";

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

const News = ({ ...otherProps }: Props): JSX.Element => {
  const { format, formatCategory, formatLanguage } = useFormat();
  const hoverable = useDeviceSupportsHover();
  const router = useTypedRouter(queryParamSchema);
  const isTerminalMode = useAtomGetter(atoms.layout.terminalMode);

  const [query, setQuery] = useState(router.query.query ?? DEFAULT_FILTERS_STATE.query);

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const languageOptions = useMemo(() => {
    const memo =
      router.locales?.map((language) => ({
        meiliAttribute: language,
        displayedName: formatLanguage(language),
      })) ?? [];

    memo.unshift({ meiliAttribute: "", displayedName: format("all") });
    return memo;
  }, [router.locales, formatLanguage, format]);

  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);
  const [posts, setPosts] = useState<CustomSearchResponse<MeiliPost>>();
  const [languageOption, setLanguageOption] = useState(
    router.query.lang ?? DEFAULT_FILTERS_STATE.lang
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const currentLanguageOption = languageOptions[languageOption]?.meiliAttribute;
      const filter = ["hidden = false"];

      if (languageOption !== 0) {
        filter.push(`filterable_languages = ${currentLanguageOption}`);
      }

      const searchResult = await meiliSearch(MeiliIndices.POST, query, {
        hitsPerPage: 25,
        page,
        attributesToRetrieve: ["translations", "thumbnail", "slug", "date", "categories"],
        attributesToHighlight: ["translations.title", "translations.displayable_description"],
        attributesToCrop: ["translations.displayable_description"],
        sort: ["sortable_date:desc"],
        filter,
      });

      setPosts(
        languageOption === 0
          ? filterHitsWithHighlight<MeiliPost>(searchResult, "translations")
          : searchResult
      );
    };
    fetchPosts();
  }, [query, page, languageOption, languageOptions]);

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

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="newspaper"
        title={format("news")}
        description={format("news_description")}
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
            sendAnalytics("News", "Change search term");
          } else {
            sendAnalytics("News", "Clear search term");
          }
        }}
      />

      <WithLabel label={format("language", { count: Infinity })}>
        <Select
          className="w-full"
          options={languageOptions.map((item) => item.displayedName)}
          value={languageOption}
          onChange={(newLanguageOption) => {
            setPage(1);
            setLanguageOption(newLanguageOption);
            sendAnalytics(
              "News",
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
              sendAnalytics("News", `Always ${keepInfoVisible ? "hide" : "show"} info`);
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
          sendAnalytics("News", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <Paginator page={page} onPageChange={setPage} totalNumberOfPages={posts?.totalPages}>
        <div
          className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] items-start
              gap-x-6 gap-y-8">
          {posts?.hits.map((item) => (
            <TranslatedPreviewCard
              key={item.id}
              href={`/news/${item.slug}`}
              translations={filterHasAttributes(item._formatted.translations, [
                "language.data.attributes.code",
              ])
                .map(({ excerpt, displayable_description, language, ...otherAttributes }) => ({
                  ...otherAttributes,
                  description: containsHighlight(displayable_description)
                    ? displayable_description
                    : excerpt,
                  language: language.data.attributes.code,
                }))
                .filter(
                  ({ language }) =>
                    languageOption === 0 ||
                    language === languageOptions[languageOption]?.meiliAttribute
                )}
              fallback={{ title: prettySlug(item.slug) }}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio="3/2"
              thumbnailForceAspectRatio
              keepInfoVisible={keepInfoVisible}
              bottomChips={filterHasAttributes(item.categories?.data, ["attributes"]).map(
                (category) => formatCategory(category.attributes.slug)
              )}
              metadata={{
                releaseDate: item.date,
                releaseDateFormat: "long",
                position: "Top",
              }}
            />
          ))}
        </div>
      </Paginator>
    </ContentPanel>
  );

  if (isTerminalMode) {
    return <Terminal parentPath="/" childrenPaths={posts?.hits.map((post) => post.slug) ?? []} />;
  }

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon="search"
      {...otherProps}
    />
  );
};
export default News;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(format, format("news")),
  };
  return {
    props: props,
  };
};
