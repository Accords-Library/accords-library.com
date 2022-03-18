import AppLayout from "components/AppLayout";
import Chip from "components/Chip";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import HorizontalLine from "components/HorizontalLine";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import RecorderChip from "components/RecorderChip";
import ToolTip from "components/ToolTip";
import { getPost, getPostsSlugs } from "graphql/operations";
import { GetPostQuery, StrapiImage } from "graphql/operations-types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettySlug, getStatusDescription } from "queries/helpers";

interface PostProps extends AppStaticProps {
  post: GetPostQuery["posts"]["data"][number]["attributes"];
  postId: GetPostQuery["posts"]["data"][number]["id"];
}

export default function LibrarySlug(props: PostProps): JSX.Element {
  const { post, postId, langui } = props;
  const router = useRouter();

  const thumbnail: StrapiImage | undefined =
    post.translations.length > 0 && post.translations[0].thumbnail.data
      ? post.translations[0].thumbnail.data.attributes
      : post.thumbnail.data
      ? post.thumbnail.data.attributes
      : undefined;

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/news"
        title={langui.news}
        langui={langui}
        displayOn={ReturnButtonType.Desktop}
        horizontalLine
      />

      {post.translations.length > 0 && (
        <div className="grid grid-flow-col place-items-center place-content-center gap-2">
          <p className="font-headers">{langui.status}:</p>

          <ToolTip
            content={getStatusDescription(post.translations[0].status, langui)}
            maxWidth={"20rem"}
          >
            <Chip>{post.translations[0].status}</Chip>
          </ToolTip>
        </div>
      )}

      {post.authors.data.length > 0 && (
        <div>
          <p className="font-headers">{"Authors"}:</p>
          <div className="grid place-items-center place-content-center gap-2">
            {post.authors.data.map((author) => (
              <RecorderChip key={author.id} langui={langui} recorder={author} />
            ))}
          </div>
        </div>
      )}

      <HorizontalLine />

      {post.translations.length > 0 && post.translations[0].body && (
        <TOC
          text={post.translations[0].body}
          router={router}
          title={post.translations[0].title}
        />
      )}
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/news"
        title={langui.news}
        langui={langui}
        displayOn={ReturnButtonType.Mobile}
        className="mb-10"
      />

      <ThumbnailHeader
        thumbnail={thumbnail}
        title={
          post.translations.length > 0
            ? post.translations[0].title
            : prettySlug(post.slug)
        }
        description={
          post.translations.length > 0
            ? post.translations[0].excerpt
            : undefined
        }
        langui={langui}
        categories={post.categories}
      />

      <HorizontalLine />

      {post.translations.length > 0 && post.translations[0].body && (
        <Markdawn text={post.translations[0].body} />
      )}
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={langui.news}
      title={
        post.translations.length > 0
          ? post.translations[0].title
          : prettySlug(post.slug)
      }
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={thumbnail}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post = (
    await getPost({
      slug: context.params?.slug?.toString() || "",
      language_code: context.locale || "en",
    })
  ).posts.data[0];
  const props: PostProps = {
    ...(await getAppStaticProps(context)),
    post: post.attributes,
    postId: post.id,
  };
  return {
    props: props,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  type Path = {
    params: {
      slug: string;
    };
    locale: string;
  };

  const data = await getPostsSlugs({});
  const paths: Path[] = [];
  data.posts.data.map((item) => {
    context.locales?.map((local) => {
      paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: false,
  };
};
