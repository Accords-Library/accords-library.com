import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { GetPostsPreviewQuery } from "graphql/operations-types";
import { getPostsPreview } from "graphql/operations";
import ContentPanel, { ContentPanelWidthSizes } from "components/Panels/ContentPanel";
import PostsPreview from "components/News/PostsPreview";

interface NewsProps extends AppStaticProps {
  posts: GetPostsPreviewQuery["posts"]["data"];
}

export default function News(props: NewsProps): JSX.Element {
  const { langui, posts } = props;
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

export const getStaticProps: GetStaticProps = async (context) => {
  const props: NewsProps = {
    ...(await getAppStaticProps(context)),
    posts: await (
      await getPostsPreview({ language_code: context.locale || "en" })
    ).posts.data,
  };
  return {
    props: props,
  };
};
