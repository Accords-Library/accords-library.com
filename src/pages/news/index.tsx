import { GetStaticProps } from "next";
import { useMemo, useState } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { GetPostsPreviewQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettySlug } from "helpers/formatters";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { filterHasAttributes } from "helpers/others";
import { SmartList } from "components/SmartList";
import { useBoolean } from "hooks/useBoolean";
import { TranslatedPreviewCard } from "components/Translated";
import { getOpenGraph } from "helpers/openGraph";
import { compareDate } from "helpers/date";

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

interface Props extends AppStaticProps, AppLayoutRequired {
  posts: NonNullable<GetPostsPreviewQuery["posts"]>["data"];
}

const News = ({ langui, posts, ...otherProps }: Props): JSX.Element => {
  const hoverable = useMediaHoverable();
  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
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
          icon={Icon.Feed}
          title={langui.news}
          description={langui.news_description}
        />

        <TextInput
          className="mb-6 w-full"
          placeholder={langui.search_title ?? "Search..."}
          value={searchName}
          onChange={setSearchName}
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch onClick={toggleKeepInfoVisible} value={keepInfoVisible} />
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
          langui={langui}
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
          className="grid-cols-1 desktop:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))]"
          searchingTerm={searchName}
          searchingBy={(post) =>
            `${prettySlug(post.attributes.slug)} ${post.attributes.translations
              ?.map((translation) => translation?.title)
              .join(" ")}`
          }
        />
      </ContentPanel>
    ),
    [keepInfoVisible, langui, posts, searchName]
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      langui={langui}
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
  const posts = await sdk.getPostsPreview();
  if (!posts.posts) return { notFound: true };
  const appStaticProps = await getAppStaticProps(context);
  const props: Props = {
    ...appStaticProps,
    posts: sortPosts(posts.posts.data),
    openGraph: getOpenGraph(
      appStaticProps.langui,
      appStaticProps.langui.news ?? "News"
    ),
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
