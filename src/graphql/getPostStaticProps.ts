import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "./getAppStaticProps";
import { getReadySdk } from "./sdk";
import { PostWithTranslations } from "helpers/types";

export interface PostStaticProps extends AppStaticProps {
  post: PostWithTranslations;
}

export const getPostStaticProps =
  (slug: string): GetStaticProps =>
  async (context) => {
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
