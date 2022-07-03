import { AppLayout } from "components/AppLayout";
import { Chip } from "components/Chip";
import { HorizontalLine } from "components/HorizontalLine";
import { Img } from "components/Img";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import DefinitionCard from "components/Wiki/DefinitionCard";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import {
  filterHasAttributes,
  isDefined,
  isDefinedAndNotEmpty,
} from "helpers/others";
import { WikiPageWithTranslations } from "helpers/types";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useCallback, useMemo } from "react";

interface Props extends AppStaticProps {
  page: WikiPageWithTranslations;
}

const WikiPage = ({
  page,
  langui,
  languages,
  ...otherProps
}: Props): JSX.Element => {
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: page.translations,
      languages: languages,
      languageExtractor: useCallback(
        (item: NonNullable<Props["page"]["translations"][number]>) =>
          item.language?.data?.attributes?.code,
        []
      ),
    });

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href={`/wiki`}
          title={langui.wiki}
          langui={langui}
          displayOn={ReturnButtonType.Desktop}
          horizontalLine
        />
      </SubPanel>
    ),
    [langui]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Large}>
        <ReturnButton
          href={`/wiki`}
          title={langui.wiki}
          langui={langui}
          displayOn={ReturnButtonType.Mobile}
          className="mb-10"
        />

        <div className="flex place-content-center gap-4">
          <h1 className="text-center text-3xl">{selectedTranslation?.title}</h1>
          <LanguageSwitcher {...languageSwitcherProps} />
        </div>

        <HorizontalLine />

        {selectedTranslation && (
          <div className="text-justify">
            <div
              className="float-right ml-8 mb-8 w-[25rem] overflow-hidden rounded-lg bg-mid
            text-center"
            >
              {page.thumbnail?.data?.attributes && (
                <Img image={page.thumbnail.data.attributes} />
              )}
              <div className="my-4 grid gap-4 p-4">
                <p className="font-headers text-xl">{langui.categories}</p>
                <div className="flex flex-row flex-wrap place-content-center gap-2">
                  {page.categories?.data.map((category) => (
                    <Chip key={category.id}>{category.attributes?.name}</Chip>
                  ))}
                </div>
              </div>
            </div>
            {isDefinedAndNotEmpty(selectedTranslation.summary) && (
              <div className="mb-6">
                <p className="font-headers text-lg">{langui.summary}</p>
                <p>{selectedTranslation.summary}</p>
              </div>
            )}

            {filterHasAttributes(page.definitions, ["translations"]).map(
              (definition, index) => (
                <DefinitionCard
                  key={index}
                  source={definition.source?.data?.attributes?.name}
                  translations={filterHasAttributes(
                    definition.translations
                  ).map((translation) => ({
                    language: translation.language.data?.attributes?.code,
                    definition: translation.definition,
                    status: translation.status,
                  }))}
                  index={index + 1}
                  languages={languages}
                  langui={langui}
                />
              )
            )}
          </div>
        )}
      </ContentPanel>
    ),
    [
      LanguageSwitcher,
      languageSwitcherProps,
      languages,
      langui,
      page.categories?.data,
      page.definitions,
      page.thumbnail?.data?.attributes,
      selectedTranslation,
    ]
  );

  return (
    <AppLayout
      navTitle={langui.news}
      subPanel={subPanel}
      contentPanel={contentPanel}
      languages={languages}
      langui={langui}
      {...otherProps}
    />
  );
};
export default WikiPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const slug =
    context.params && isDefined(context.params.slug)
      ? context.params.slug.toString()
      : "";
  const page = await sdk.getWikiPage({
    language_code: context.locale ?? "en",
    slug: slug,
  });
  if (!page.wikiPages?.data[0].attributes?.translations)
    return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    page: page.wikiPages.data[0].attributes as WikiPageWithTranslations,
  };
  return {
    props: props,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getWikiPagesSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(contents.wikiPages?.data).map((wikiPage) => {
    context.locales?.map((local) =>
      paths.push({
        params: { slug: wikiPage.attributes.slug },
        locale: local,
      })
    );
  });
  return {
    paths,
    fallback: "blocking",
  };
};
