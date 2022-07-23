import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "./getAppStaticProps";
import { getReadySdk } from "./sdk";
import { PostWithTranslations } from "helpers/types";
import { OpenGraph, getOpenGraph } from "helpers/openGraph";
import { prettyDate, prettySlug } from "helpers/formatters";
import {
  getDefaultPreferredLanguages,
  staticSmartLanguage,
} from "helpers/locales";
import { filterHasAttributes, isDefined } from "helpers/others";
import { getDescription } from "helpers/description";

export interface PostStaticProps extends AppStaticProps {
  post: PostWithTranslations;
  openGraph: OpenGraph;
}

export const getPostStaticProps =
  (slug: string): GetStaticProps =>
  async (context) => {
    const sdk = getReadySdk();
    const post = await sdk.getPost({
      slug: slug,
      language_code: context.locale ?? "en",
    });
    if (
      post.posts?.data &&
      post.posts.data.length > 0 &&
      post.posts.data[0].attributes?.translations &&
      isDefined(context.locale) &&
      isDefined(context.locales)
    ) {
      const appStaticProps = await getAppStaticProps(context);
      const selectedTranslation = staticSmartLanguage({
        items: post.posts.data[0].attributes.translations,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(
          context.locale,
          context.locales
        ),
      });

      const title = selectedTranslation?.title ?? prettySlug(slug);

      const description = getDescription(selectedTranslation?.excerpt, {
        [appStaticProps.langui.release_date ?? "Release date"]: [
          prettyDate(post.posts.data[0].attributes.date, context.locale),
        ],
        [appStaticProps.langui.categories ?? "Categories"]: filterHasAttributes(
          post.posts.data[0].attributes.categories?.data,
          ["attributes"] as const
        ).map((category) => category.attributes.short),
      });

      const thumbnail =
        selectedTranslation?.thumbnail?.data?.attributes ??
        post.posts.data[0].attributes.thumbnail?.data?.attributes;

      const props: PostStaticProps = {
        ...appStaticProps,
        post: post.posts.data[0].attributes as PostWithTranslations,
        openGraph: getOpenGraph(
          appStaticProps.langui,
          title,
          description,
          thumbnail
        ),
      };
      return {
        props: props,
      };
    }
    return { notFound: true };
  };
