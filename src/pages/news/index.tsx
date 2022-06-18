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
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { Fragment, useMemo, useState } from "react";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { useMediaHoverable } from "hooks/useMediaQuery";

interface Props extends AppStaticProps {
  posts: NonNullable<GetPostsPreviewQuery["posts"]>["data"];
}

const defaultFiltersState = {
  searchName: "",
  keepInfoVisible: true,
};

export default function News(props: Immutable<Props>): JSX.Element {
  const { langui } = props;
  const posts = sortPosts(props.posts);
  const hoverable = useMediaHoverable();

  const [searchName, setSearchName] = useState(defaultFiltersState.searchName);

  const [keepInfoVisible, setKeepInfoVisible] = useState(
    defaultFiltersState.keepInfoVisible
  );

  const filteredItems = useMemo(
    () => filterItems(posts, searchName),
    [posts, searchName]
  );

  const subPanel = (
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
          setSearchName(defaultFiltersState.searchName);
          setKeepInfoVisible(defaultFiltersState.keepInfoVisible);
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <div
        className="grid grid-cols-1 items-end gap-8
        desktop:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))]"
      >
        {filteredItems.map((post) => (
          <Fragment key={post.id}>
            {post.attributes && (
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
            )}
          </Fragment>
        ))}
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={langui.news}
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const posts = await sdk.getPostsPreview({
    language_code: context.locale ?? "en",
  });
  if (!posts.posts) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    posts: posts.posts.data,
  };
  return {
    props: props,
  };
}

function sortPosts(
  posts: Immutable<Props["posts"]>
): Immutable<Props["posts"]> {
  const sortedPosts = [...posts] as Props["posts"];
  sortedPosts
    .sort((a, b) => {
      const dateA = a.attributes?.date ? prettyDate(a.attributes.date) : "9999";
      const dateB = b.attributes?.date ? prettyDate(b.attributes.date) : "9999";
      return dateA.localeCompare(dateB);
    })
    .reverse();
  return sortedPosts as Immutable<Props["posts"]>;
}

function filterItems(posts: Immutable<Props["posts"]>, searchName: string) {
  return [...posts].filter((post) => {
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
}
