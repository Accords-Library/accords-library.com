import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import Markdown from "markdown-to-jsx";
import { useCallback } from "react";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty, isUndefined } from "helpers/asserts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { useFormat } from "hooks/useFormat";
import { GetReinEmblemQuery, ReinCostumeFragment } from "graphql/generated";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { Img } from "components/Img";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { prettySlug } from "helpers/formatters";
import { getFormat } from "helpers/i18n";
import { getOpenGraph } from "helpers/openGraph";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  emblem: NonNullable<
    NonNullable<NonNullable<GetReinEmblemQuery["reinEmblems"]>["data"][number]>["attributes"]
  >;
}

const ReinEmblem = ({ emblem, ...otherProps }: Props): JSX.Element => {
  const { format } = useFormat();

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <div>
        <TranslatedEmblemCostume
          translations={filterHasAttributes(emblem.translations, [
            "language.data.attributes.code",
          ] as const).map((translation) => ({
            language: translation.language.data.attributes.code,
            title: translation.name,
            description: translation.description,
          }))}
          fallback={{ title: prettySlug(emblem.slug) }}
          slug={emblem.slug}
          costumes={filterHasAttributes(emblem.costumes?.data, ["attributes"] as const).map(
            (costume) => costume.attributes
          )}
        />
      </div>
    </ContentPanel>
  );

  return <AppLayout contentPanel={contentPanel} {...otherProps} />;
};
export default ReinEmblem;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format } = getFormat(context.locale);

  const slug =
    context.params && isDefined(context.params.slug) ? context.params.slug.toString() : "";
  const emblem = (await sdk.getReinEmblem({ slug })).reinEmblems?.data?.[0]?.attributes;

  if (isUndefined(emblem)) {
    return { notFound: true };
  }

  const props: Props = {
    emblem,
    openGraph: getOpenGraph(format, format("costume", { count: Infinity })),
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getReinEmblemsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(contents.reinEmblems?.data, ["attributes"] as const).map((emblem) => {
    context.locales?.map((local) =>
      paths.push({
        params: { slug: emblem.attributes.slug },
        locale: local,
      })
    );
  });
  return {
    paths,
    fallback: "blocking",
  };
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface EmblemCostumeProps {
  slug: string;
  title: string;
  description?: string;
  costumes: ReinCostumeFragment[];
}

const EmblemCostume = ({ slug, title, description, costumes }: EmblemCostumeProps): JSX.Element => (
  <div>
    <h2 id={slug} className="text-2xl">
      {title}
    </h2>
    {isDefinedAndNotEmpty(description) && <Markdown>{description}</Markdown>}
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] items-start gap-x-6 gap-y-8">
      {costumes.map((costume) => (
        <div key={costume.slug}>
          {costume.sprite?.data?.attributes && <Img src={costume.sprite.data.attributes} />}
          <h3 className="text-xl">{costume.translations?.[0]?.name}</h3>
          <Markdown>{costume.translations?.[0]?.description ?? ""}</Markdown>
        </div>
      ))}
    </div>
  </div>
);

export const TranslatedEmblemCostume = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<EmblemCostumeProps, "description" | "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });
  return (
    <EmblemCostume
      title={selectedTranslation?.title ?? fallback.title}
      description={selectedTranslation?.description ?? fallback.description}
      {...otherProps}
    />
  );
};
