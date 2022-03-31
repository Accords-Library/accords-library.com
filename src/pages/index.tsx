import AppLayout from "components/AppLayout";
import LanguageSwitcher from "components/LanguageSwitcher";
import Markdawn from "components/Markdown/Markdawn";
import ContentPanel from "components/Panels/ContentPanel";
import { GetPostQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { getLocalesFromLanguages, prettySlug } from "queries/helpers";

interface Props extends AppStaticProps {
  post: Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["attributes"];
}

export default function Home(props: Props): JSX.Element {
  const { post } = props;
  const locales = getLocalesFromLanguages(post?.translations_languages);
  const router = useRouter();

  const body = post?.translations?.[0]?.body ?? "";
  const title = post?.translations?.[0]?.title ?? prettySlug(post?.slug);

  const contentPanel = (
    <ContentPanel>
      <div className="grid place-items-center place-content-center w-full gap-5 text-center">
        <div className="[mask:url('/icons/accords.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] w-32 aspect-square mobile:w-[50vw] bg-black" />
        <h1 className="text-5xl mb-0">Accord&rsquo;s Library</h1>
        <h2 className="text-xl -mt-5">
          Discover • Analyse • Translate • Archive
        </h2>
      </div>
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

  return <AppLayout navTitle={title} contentPanel={contentPanel} {...props} />;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const slug = "home";
  const post = await sdk.getPost({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!post.posts) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    post: post.posts.data[0].attributes,
  };
  return {
    props: props,
  };
}
