import { PostWithTranslations } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "./getAppStaticProps";
import { getReadySdk } from "./sdk";

export interface PostStaticProps extends AppStaticProps {
  post: PostWithTranslations;
}

export function getPostStaticProps(
  slug: string
): (
  context: GetStaticPropsContext
) => Promise<{ notFound: boolean } | { props: PostStaticProps }> {
  return async (context: GetStaticPropsContext) => {
    const sdk = getReadySdk();
    const post = await sdk.getPost({
      slug: slug,
      language_code: context.locale ?? "en",
    });
    if (post.posts?.data[0]?.attributes?.translations) {
      const props: PostStaticProps = {
        ...(await getAppStaticProps(context)),
        post: post.posts.data[0].attributes as PostWithTranslations,
      };
      return {
        props: props,
      };
    }
    return { notFound: true };
  };
}
