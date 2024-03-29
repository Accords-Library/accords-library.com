import { GetStaticProps } from "next";
import { getReadySdk } from "./sdk";
import { PostWithTranslations } from "types/types";
import { getOpenGraph } from "helpers/openGraph";
import { prettySlug } from "helpers/formatters";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { filterHasAttributes } from "helpers/asserts";
import { getDescription } from "helpers/description";
import { AppLayoutRequired } from "components/AppLayout";
import { getFormat } from "helpers/i18n";

export interface PostStaticProps extends AppLayoutRequired {
  post: PostWithTranslations;
}

export const getPostStaticProps =
  (slug: string): GetStaticProps =>
  async (context) => {
    const sdk = getReadySdk();
    const { format, formatCategory, formatDate } = getFormat(context.locale);
    const post = await sdk.getPost({
      slug: slug,
    });

    if (!post.posts?.data[0]?.attributes?.translations || !context.locale || !context.locales) {
      return { notFound: true };
    }

    const selectedTranslation = staticSmartLanguage({
      items: post.posts.data[0].attributes.translations,
      languageExtractor: (item) => item.language?.data?.attributes?.code,
      preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
    });

    const title = selectedTranslation?.title ?? prettySlug(slug);

    const description = getDescription(selectedTranslation?.excerpt ?? selectedTranslation?.body, {
      [format("release_date")]: [formatDate(post.posts.data[0].attributes.date)],
      [format("category", { count: Infinity })]: filterHasAttributes(
        post.posts.data[0].attributes.categories?.data,
        ["attributes"]
      ).map((category) => formatCategory(category.attributes.slug)),
    });

    const thumbnail =
      selectedTranslation?.thumbnail?.data?.attributes ??
      post.posts.data[0].attributes.thumbnail?.data?.attributes;

    const props: PostStaticProps = {
      post: post.posts.data[0].attributes as PostWithTranslations,
      openGraph: getOpenGraph(format, title, description, thumbnail),
    };
    return {
      props: props,
    };
  };
