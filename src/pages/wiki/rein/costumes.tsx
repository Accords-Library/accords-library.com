import { GetStaticProps } from "next";
import { useCallback } from "react";
import Markdown from "markdown-to-jsx";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { getFormat } from "helpers/i18n";
import { getOpenGraph } from "helpers/openGraph";
import { ReinCostume, ReinEmblemCostume } from "types/types";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes, isDefinedAndNotEmpty, isUndefined } from "helpers/asserts";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { prettySlug } from "helpers/formatters";
import { ElementsSeparator } from "helpers/component";
import { SubPanel } from "components/Containers/SubPanel";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { useFormat } from "hooks/useFormat";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { TranslatedNavOption } from "components/PanelComponents/NavOption";
import { Img } from "components/Img";
import { TranslatedPreviewCard } from "components/PreviewCard";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  emblems: ReinEmblemCostume[];
}

const ReincarnationCostumes = ({ emblems, ...otherProps }: Props): JSX.Element => {
  const { format } = useFormat();

  const subPanel = (
    <SubPanel>
      <ElementsSeparator>
        {[
          <>
            <ReturnButton
              href="/wiki"
              title={format("wiki")}
              displayOnlyOn="3ColumnsLayout"
              className="mb-10"
            />

            <PanelHeader
              icon="accessibility_new"
              title={format("costume", { count: Infinity })}
              description={format("costume_description")}
            />
          </>,

          <>
            {emblems.map((emblem) => (
              <TranslatedNavOption
                key={emblem.id}
                translations={filterHasAttributes(emblem.attributes.translations, [
                  "language.data.attributes.code",
                ] as const).map((translation) => ({
                  language: translation.language.data.attributes.code,
                  title: translation.name,
                }))}
                fallback={{ title: prettySlug(emblem.attributes.slug) }}
                url={`#${emblem.attributes.slug}`}
              />
            ))}
          </>,
        ]}
      </ElementsSeparator>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <div className="grid gap-12">
        <ElementsSeparator>
          {emblems.map((emblem) => (
            <TranslatedEmblemCostume
              key={emblem.id}
              translations={filterHasAttributes(emblem.attributes.translations, [
                "language.data.attributes.code",
              ] as const).map((translation) => ({
                language: translation.language.data.attributes.code,
                title: translation.name,
                description: translation.description,
              }))}
              fallback={{ title: prettySlug(emblem.attributes.slug) }}
              slug={emblem.attributes.slug}
              costumes={emblem.attributes.costumes}
            />
          ))}
        </ElementsSeparator>
      </div>
    </ContentPanel>
  );

  return <AppLayout subPanel={subPanel} contentPanel={contentPanel} {...otherProps} />;
};
export default ReincarnationCostumes;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format } = getFormat(context.locale);

  const emblems = (await sdk.getReinEmblems()).reinEmblems?.data;
  const costumes = (await sdk.getReinCostumes()).reinCostumes?.data;

  if (isUndefined(emblems) || isUndefined(costumes)) {
    return { notFound: true };
  }

  const processedEmblems: ReinEmblemCostume[] = [];

  filterHasAttributes(emblems, ["id", "attributes"] as const).forEach(({ id, attributes }) => {
    const costumesOfCurrentEmblem = costumes.filter(
      (costume) => costume.attributes?.emblem?.data?.id === id
    );
    const emblemCostume: ReinEmblemCostume = {
      id,
      attributes: { ...attributes, costumes: costumesOfCurrentEmblem },
    };
    processedEmblems.push(emblemCostume);
  });

  const costumesWithoutEmblem = costumes.filter((costume) =>
    isUndefined(costume.attributes?.emblem?.data)
  );

  processedEmblems.push({
    id: "others",
    attributes: { slug: "others", costumes: costumesWithoutEmblem },
  });

  const props: Props = {
    emblems: processedEmblems,
    openGraph: getOpenGraph(format, format("costume", { count: Infinity })),
  };
  return {
    props: props,
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
  costumes: ReinCostume[];
}

const EmblemCostume = ({ slug, title, description, costumes }: EmblemCostumeProps): JSX.Element => (
  <div>
    <h2 id={slug} className="text-2xl">
      {title}
    </h2>
    {isDefinedAndNotEmpty(description) && <Markdown>{description}</Markdown>}
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] items-end gap-x-6 gap-y-8">
      {costumes.map((costume) => (
        <TranslatedPreviewCard
          key={costume.id}
          translations={filterHasAttributes(costume.attributes?.translations, [
            "language.data.attributes.code",
          ] as const).map((translation) => ({
            language: translation.language.data.attributes.code,
            title: translation.name,
          }))}
          thumbnail={costume.attributes?.sprite?.data?.attributes}
          keepInfoVisible
          thumbnailAspectRatio="1/1"
          thumbnailForceAspectRatio
          thumbnailFitMethod="contain"
          fallback={{ title: prettySlug(costume.attributes?.slug) }}
          href="#"
        />
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
