import { GetStaticProps } from "next";
import { getReadySdk } from "./sdk";
import { getLangui } from "./fetchLocalData";
import { PostWithTranslations } from "types/types";
import { getOpenGraph } from "helpers/openGraph";
import { prettyDate, prettySlug } from "helpers/formatters";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { filterHasAttributes, isDefined } from "helpers/asserts";
import { getDescription } from "helpers/description";
import { AppLayoutRequired } from "components/AppLayout";

export interface PostStaticProps extends AppLayoutRequired {
  post: PostWithTranslations;
}

export const getPostStaticProps =
  (slug: string): GetStaticProps =>
  async (context) => {
    const sdk = getReadySdk();
    const langui = getLangui(context.locale);
    const post = await sdk.getPost({
      slug: slug,
      language_code: context.locale ?? "en",
    });
    if (
      post.posts?.data &&
      post.posts.data.length > 0 &&
      post.posts.data[0]?.attributes?.translations &&
      isDefined(context.locale) &&
      isDefined(context.locales)
    ) {
      const selectedTranslation = staticSmartLanguage({
        items: post.posts.data[0].attributes.translations,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
      });

      const title = selectedTranslation?.title ?? prettySlug(slug);

      const description = getDescription(selectedTranslation?.excerpt, {
        [langui.release_date ?? "Release date"]: [
          prettyDate(post.posts.data[0].attributes.date, context.locale),
        ],
        [langui.categories ?? "Categories"]: filterHasAttributes(
          post.posts.data[0].attributes.categories?.data,
          ["attributes"] as const
        ).map((category) => category.attributes.short),
      });

      const thumbnail =
        selectedTranslation?.thumbnail?.data?.attributes ??
        post.posts.data[0].attributes.thumbnail?.data?.attributes;

      const props: PostStaticProps = {
        post: post.posts.data[0].attributes as PostWithTranslations,
        openGraph: getOpenGraph(langui, title, description, thumbnail),
      };
      return {
        props: props,
      };
    }
    return { notFound: true };
  };
