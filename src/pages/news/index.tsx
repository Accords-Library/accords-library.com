import { AppLayout } from "components/AppLayout";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { GetPostsPreviewQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyDate, prettySlug } from "helpers/formatters";

import { GetStaticProps } from "next";
import { Fragment, useMemo, useState } from "react";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { filterHasAttributes } from "helpers/others";

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

const News = ({ langui, posts, ...otherProps }: Props): JSX.Element => {
  const hoverable = useMediaHoverable();
  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    DEFAULT_FILTERS_STATE.keepInfoVisible
  );

  const filteredItems = useMemo(
    () => filterItems(posts, searchName),
    [posts, searchName]
  );

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
          state={searchName}
          setState={setSearchName}
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
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
    [hoverable, keepInfoVisible, langui, searchName]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <div
          className="grid grid-cols-1 items-end gap-8
        desktop:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))]"
        >
          {filterHasAttributes(filteredItems).map((post) => (
            <Fragment key={post.id}>
              <PreviewCard
                href={`/news/${post.attributes.slug}`}
                title={
                  post.attributes.translations?.[0]?.title ??
                  prettySlug(post.attributes.slug)
                }
                description={post.attributes.translations?.[0]?.excerpt}
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
            </Fragment>
          ))}
        </div>
      </ContentPanel>
    ),
    [filteredItems, keepInfoVisible]
  );

  return (
    <AppLayout
      navTitle={langui.news}
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
  const posts = await sdk.getPostsPreview({
    language_code: context.locale ?? "en",
  });
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

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const filterItems = (posts: Props["posts"], searchName: string) =>
  posts.filter((post) => {
    if (searchName.length > 1) {
      if (
        post.attributes?.translations?.[0]?.title
          .toLowerCase()
          .includes(searchName.toLowerCase()) === true
      ) {
        return true;
      }
      return false;
    }
    return true;
  });
