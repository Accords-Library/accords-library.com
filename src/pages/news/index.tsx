import AppLayout from "components/AppLayout";
import PostsPreview from "components/News/PostsPreview";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { GetPostsPreviewQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettyDate } from "queries/helpers";

interface Props extends AppStaticProps {
  posts: Exclude<GetPostsPreviewQuery["posts"], null | undefined>["data"];
}

export default function News(props: Props): JSX.Element {
  const { langui, posts } = props;

  posts
    .sort((a, b) => {
      const dateA = a.attributes?.date ? prettyDate(a.attributes.date) : "9999";
      const dateB = b.attributes?.date ? prettyDate(b.attributes.date) : "9999";
      return dateA.localeCompare(dateB);
    })
    .reverse();

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="feed"
        title={langui.news}
        description={langui.news_description}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <div className="grid gap-8 items-end grid-cols-1 desktop:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))]">
        {posts.map((post) => (
          <PostsPreview key={post.id} post={post.attributes} />
        ))}
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={langui.news}
      subPanel={subPanel}
      contentPanel={contentPanel}
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
