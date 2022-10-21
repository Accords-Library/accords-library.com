import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { NextRouter, useRouter } from "next/router";
import { PostPage } from "components/PostPage";
import { getPostStaticProps, PostStaticProps } from "graphql/getPostStaticProps";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { useIsTerminalMode } from "hooks/useIsTerminalMode";
import { Terminal } from "components/Cli/Terminal";
import { PostWithTranslations } from "types/types";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { prettyTerminalBoxedTitle } from "helpers/terminal";
import { prettyMarkdown } from "helpers/description";
import { useLocalData } from "contexts/LocalDataContext";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends PostStaticProps {}

const LibrarySlug = (props: Props): JSX.Element => {
  const { langui } = useLocalData();
  const isTerminalMode = useIsTerminalMode();
  const router = useRouter();

  if (isTerminalMode) {
    return (
      <Terminal
        parentPath={"/news"}
        childrenPaths={[]}
        content={terminalPostPage(props.post, router)}
      />
    );
  }

  return (
    <PostPage
      returnHref="/news"
      returnTitle={langui.news}
      displayCredits
      displayThumbnailHeader
      displayToc
      {...props}
    />
  );
};
export default LibrarySlug;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const slug =
    context.params && isDefined(context.params.slug) ? context.params.slug.toString() : "";
  return await getPostStaticProps(slug)(context);
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const posts = await sdk.getPostsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];

  filterHasAttributes(posts.posts?.data, ["attributes"] as const).map((item) => {
    context.locales?.map((local) =>
      paths.push({ params: { slug: item.attributes.slug }, locale: local })
    );
  });
  return {
    paths,
    fallback: "blocking",
  };
};

const terminalPostPage = (post: PostWithTranslations, router: NextRouter): string => {
  let result = "";
  if (router.locales && router.locale) {
    const selectedTranslation = staticSmartLanguage({
      items: filterHasAttributes(post.translations, ["language.data.attributes.code"] as const),
      languageExtractor: (item) => item.language.data.attributes.code,
      preferredLanguages: getDefaultPreferredLanguages(router.locale, router.locales),
    });

    if (selectedTranslation) {
      result += prettyTerminalBoxedTitle(selectedTranslation.title);
      if (isDefinedAndNotEmpty(selectedTranslation.excerpt)) {
        result += "\n\n";
        result += prettyMarkdown(selectedTranslation.excerpt);
      }
      if (isDefinedAndNotEmpty(selectedTranslation.body)) {
        result += "\n\n";
        result += prettyMarkdown(selectedTranslation.body);
      }
    }
  }

  result += "\n\n";

  return result;
};
