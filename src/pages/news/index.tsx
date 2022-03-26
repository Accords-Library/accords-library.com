import AppLayout from "components/AppLayout";
import PostsPreview from "components/News/PostsPreview";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { getPostsPreview } from "graphql/operations";
import { GetPostsPreviewQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

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
