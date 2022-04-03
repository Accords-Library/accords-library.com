import AppLayout from "components/AppLayout";
import Chip from "components/Chip";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import HorizontalLine from "components/HorizontalLine";
import LanguageSwitcher from "components/LanguageSwitcher";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import RecorderChip from "components/RecorderChip";
import ToolTip from "components/ToolTip";
import { GetPostQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import {
  getLocalesFromLanguages,
  getStatusDescription,
  prettySlug,
} from "queries/helpers";

interface Props extends AppStaticProps {
  post: Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["attributes"];
  postId: Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["id"];
}

export default function LibrarySlug(props: Props): JSX.Element {
  const { post, langui } = props;
  const locales = getLocalesFromLanguages(post?.translations_languages);
  const router = useRouter();

  const thumbnail = post?.translations?.[0]?.thumbnail?.data
    ? post.translations[0].thumbnail.data.attributes
    : post?.thumbnail?.data
    ? post.thumbnail.data.attributes
    : undefined;

  const body = post?.translations?.[0]?.body ?? "";
  const title = post?.translations?.[0]?.title ?? prettySlug(post?.slug);
  const except = post?.translations?.[0]?.excerpt ?? "";

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/news"
        title={langui.news}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        horizontalLine
      />

      {post?.translations?.[0] && (
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

      {post?.authors && post.authors.data.length > 0 && (
        <div>
          <p className="font-headers">{"Authors"}:</p>
          <div className="grid place-items-center place-content-center gap-2">
            {post.authors.data.map((author) => (
              <>
                {author.attributes && (
                  <RecorderChip
                    key={author.id}
                    langui={langui}
                    recorder={author.attributes}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      )}

      <HorizontalLine />

      <TOC text={body} title={title} />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/news"
        title={langui.news}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />

      <ThumbnailHeader
        thumbnail={thumbnail}
        title={title}
        description={except}
        langui={langui}
        categories={post?.categories}
      />

      <HorizontalLine />

      {locales.includes(router.locale ?? "en") ? (
        <Markdawn text={body} />
      ) : (
        <LanguageSwitcher
          locales={locales}
          languages={props.languages}
          langui={props.langui}
        />
      )}
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={title}
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={thumbnail ?? undefined}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const post = await sdk.getPost({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!post.posts?.data[0]) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    post: post.posts.data[0].attributes,
    postId: post.posts.data[0].id,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const posts = await sdk.getPostsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  if (posts.posts)
    posts.posts.data.map((item) => {
      context.locales?.map((local) => {
        if (item.attributes)
          paths.push({ params: { slug: item.attributes.slug }, locale: local });
      });
    });
  return {
    paths,
    fallback: "blocking",
  };
}
