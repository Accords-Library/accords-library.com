import { GetStaticProps } from "next";
import { useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { GetPostsPreviewQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { prettySlug } from "helpers/formatters";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { filterHasAttributes, isDefinedAndNotEmpty } from "helpers/others";
import { SmartList } from "components/SmartList";
import { getOpenGraph } from "helpers/openGraph";
import { compareDate } from "helpers/date";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { cIf } from "helpers/className";
import { useIsContentPanelAtLeast } from "hooks/useContainerQuery";
import { useAppLayout } from "contexts/AppLayoutContext";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  searchName: "",
  keepInfoVisible: true,
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  posts: NonNullable<GetPostsPreviewQuery["posts"]>["data"];
}

const News = ({ posts, ...otherProps }: Props): JSX.Element => {
  const isContentPanelAtLeast4xl = useIsContentPanelAtLeast("4xl");
  const { langui } = useAppLayout();
  const hoverable = useDeviceSupportsHover();
  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );
  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.Feed}
          title={langui.news}
          description={langui.news_description}
        />

        <HorizontalLine />

        <TextInput
          className="mb-6 w-full"
          placeholder={langui.search_title ?? "Search..."}
          value={searchName}
          onChange={(name) => {
            setSearchName(name);
            if (isDefinedAndNotEmpty(name)) {
              umami("[News] Change search term");
            } else {
              umami("[News] Clear search term");
            }
          }}
        />

        {hoverable && (
          <WithLabel label={langui.always_show_info}>
            <Switch
              value={keepInfoVisible}
              onClick={() => {
                toggleKeepInfoVisible();
                umami(
                  `[News] Always ${keepInfoVisible ? "hide" : "show"} info`
                );
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
            setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
            umami("[News] Reset all filters");
          }}
        />
      </SubPanel>
    ),
    [
      hoverable,
      keepInfoVisible,
      langui,
      searchName,
      setKeepInfoVisible,
      toggleKeepInfoVisible,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <SmartList
          items={filterHasAttributes(posts, ["attributes", "id"] as const)}
          getItemId={(post) => post.id}
          renderItem={({ item: post }) => (
            <TranslatedPreviewCard
              href={`/news/${post.attributes.slug}`}
              translations={filterHasAttributes(post.attributes.translations, [
                "language.data.attributes.code",
              ] as const).map((translation) => ({
                language: translation.language.data.attributes.code,
                title: translation.title,
                description: translation.excerpt,
              }))}
              fallback={{ title: prettySlug(post.attributes.slug) }}
              thumbnail={post.attributes.thumbnail?.data?.attributes}
              thumbnailAspectRatio="3/2"
              thumbnailForceAspectRatio
              bottomChips={post.attributes.categories?.data.map(
                (category) => category.attributes?.short ?? ""
              )}
              keepInfoVisible={keepInfoVisible}
              metadata={{
                releaseDate: post.attributes.date,
                releaseDateFormat: "long",
                position: "Top",
              }}
            />
          )}
          className={cIf(
            isContentPanelAtLeast4xl,
            "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
            "grid-cols-2 gap-x-4 gap-y-6"
          )}
          searchingTerm={searchName}
          searchingBy={(post) =>
            `${prettySlug(post.attributes.slug)} ${post.attributes.translations
              ?.map((translation) => translation?.title)
              .join(" ")}`
          }
          paginationItemPerPage={25}
        />
      </ContentPanel>
    ),
    [keepInfoVisible, posts, searchName, isContentPanelAtLeast4xl]
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
export default News;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const posts = await sdk.getPostsPreview();
  if (!posts.posts) return { notFound: true };

  const props: Props = {
    posts: sortPosts(posts.posts.data),
    openGraph: getOpenGraph(langui, langui.news ?? "News"),
  };
  return {
    props: props,
  };
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const sortPosts = (posts: Props["posts"]): Props["posts"] =>
  posts
    .sort((a, b) => compareDate(a.attributes?.date, b.attributes?.date))
    .reverse();
