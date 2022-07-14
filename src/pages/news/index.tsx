import { GetStaticProps } from "next";
import { useMemo, useState } from "react";
import { AppLayout } from "components/AppLayout";
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
import { prettyDate, prettySlug } from "helpers/formatters";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { filterHasAttributes } from "helpers/others";
import { SmartList } from "components/SmartList";
import { useBoolean } from "hooks/useBoolean";
import { TranslatedPreviewCard } from "components/Translated";

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

interface Props extends AppStaticProps {
  posts: NonNullable<GetPostsPreviewQuery["posts"]>["data"];
}

const News = ({
  langui,
  posts,
  languages,
  ...otherProps
}: Props): JSX.Element => {
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
          placeholder={langui.search_title ?? undefined}
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
              languages={languages}
              thumbnail={post.attributes.thumbnail?.data?.attributes}
              thumbnailAspectRatio="3/2"
              thumbnailForceAspectRatio
              bottomChips={post.attributes.categories?.data.map(
                (category) => category.attributes?.short ?? ""
              )}
              keepInfoVisible={keepInfoVisible}
              metadata={{
                release_date: post.attributes.date,
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
    [keepInfoVisible, languages, langui, posts, searchName]
  );

  return (
    <AppLayout
      navTitle={langui.news}
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      langui={langui}
      languages={languages}
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
  const props: Props = {
    ...(await getAppStaticProps(context)),
    posts: sortPosts(posts.posts.data),
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
    .sort((a, b) => {
      const dateA = a.attributes?.date ? prettyDate(a.attributes.date) : "9999";
      const dateB = b.attributes?.date ? prettyDate(b.attributes.date) : "9999";
      return dateA.localeCompare(dateB);
    })
    .reverse();
