import { useCallback, useMemo } from "react";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
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
import { prettySlug } from "helpers/formatters";
import { useLightBox } from "hooks/useLightBox";
import { getAssetURL, ImageQuality } from "helpers/img";
import { getOpenGraph } from "helpers/openGraph";
import {
  getDefaultPreferredLanguages,
  staticSmartLanguage,
} from "helpers/locales";
import { getDescription } from "helpers/description";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {
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

  const [openLightBox, LightBox] = useLightBox();

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
        <LightBox />

        <ReturnButton
          href={`/wiki`}
          title={langui.wiki}
          langui={langui}
          displayOn={ReturnButtonType.Mobile}
          className="mb-10"
        />

        <div className="flex flex-wrap place-content-center gap-3">
          <h1 className="text-center text-3xl">{selectedTranslation?.title}</h1>
          {selectedTranslation?.aliases &&
            selectedTranslation.aliases.length > 0 && (
              <p className="mr-3 text-center text-2xl">
                {`(${selectedTranslation.aliases
                  .map((alias) => alias?.alias)
                  .join("・")})`}
              </p>
            )}
          <LanguageSwitcher {...languageSwitcherProps} />
        </div>

        <HorizontalLine />

        {selectedTranslation && (
          <div className="text-justify">
            <div
              className="mb-8 overflow-hidden rounded-lg bg-mid text-center desktop:float-right
              desktop:ml-8 desktop:w-[25rem]"
            >
              {page.thumbnail?.data?.attributes && (
                <Img
                  image={page.thumbnail.data.attributes}
                  quality={ImageQuality.Medium}
                  className="w-full cursor-pointer"
                  onClick={() => {
                    if (page.thumbnail?.data?.attributes?.url) {
                      openLightBox([
                        getAssetURL(
                          page.thumbnail.data.attributes.url,
                          ImageQuality.Large
                        ),
                      ]);
                    }
                  }}
                />
              )}
              <div className="my-4 grid gap-4 p-4">
                {page.categories?.data && page.categories.data.length > 0 && (
                  <>
                    <p className="font-headers text-xl font-bold">
                      {langui.categories}
                    </p>

                    <div className="flex flex-row flex-wrap place-content-center gap-2">
                      {filterHasAttributes(page.categories.data, [
                        "attributes",
                      ] as const).map((category) => (
                        <Chip
                          key={category.id}
                          text={category.attributes.name}
                        />
                      ))}
                    </div>
                  </>
                )}

                {page.tags?.data && page.tags.data.length > 0 && (
                  <>
                    <p className="font-headers text-xl font-bold">
                      {langui.tags}
                    </p>
                    <div className="flex flex-row flex-wrap place-content-center gap-2">
                      {filterHasAttributes(page.tags.data, [
                        "attributes",
                      ] as const).map((tag) => (
                        <Chip
                          key={tag.id}
                          text={
                            tag.attributes.titles?.[0]?.title ??
                            prettySlug(tag.attributes.slug)
                          }
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {isDefinedAndNotEmpty(selectedTranslation.summary) && (
              <div className="mb-12">
                <p className="font-headers text-lg font-bold">
                  {langui.summary}
                </p>
                <p>{selectedTranslation.summary}</p>
              </div>
            )}

            {filterHasAttributes(page.definitions, [
              "translations",
            ] as const).map((definition, index) => (
              <div key={index} className="mb-12">
                <DefinitionCard
                  source={{
                    name: definition.source?.data?.attributes?.name,
                    url: definition.source?.data?.attributes?.content?.data
                      ?.attributes?.slug
                      ? `/contents/${definition.source.data.attributes.content.data.attributes.slug}`
                      : `/library/${definition.source?.data?.attributes?.ranged_content?.data?.attributes?.library_item?.data?.attributes?.slug}`,
                  }}
                  translations={definition.translations.map((translation) => ({
                    language: translation?.language?.data?.attributes?.code,
                    definition: translation?.definition,
                    status: translation?.status,
                  }))}
                  index={index + 1}
                  languages={languages}
                  langui={langui}
                  categories={filterHasAttributes(definition.categories?.data, [
                    "attributes",
                  ] as const).map((category) => category.attributes.short)}
                />
              </div>
            ))}
          </div>
        )}
      </ContentPanel>
    ),
    [
      LanguageSwitcher,
      LightBox,
      languageSwitcherProps,
      languages,
      langui,
      openLightBox,
      page,
      selectedTranslation,
    ]
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      languages={languages}
      langui={langui}
      {...otherProps}
    />
  );
};
export default WikiPage;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

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
  const appStaticProps = await getAppStaticProps(context);

  const { title, description } = (() => {
    const chipsGroups = {
      [appStaticProps.langui.tags ?? "Tags"]: filterHasAttributes(
        page.wikiPages.data[0].attributes.tags?.data,
        ["attributes"] as const
      ).map(
        (tag) =>
          tag.attributes.titles?.[0]?.title ?? prettySlug(tag.attributes.slug)
      ),
      [appStaticProps.langui.categories ?? "Categories"]: filterHasAttributes(
        page.wikiPages.data[0].attributes.categories?.data,
        ["attributes"] as const
      ).map((category) => category.attributes.short),
    };

    if (context.locale && context.locales) {
      const selectedTranslation = staticSmartLanguage({
        items: page.wikiPages.data[0].attributes.translations,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(
          context.locale,
          context.locales
        ),
      });
      if (selectedTranslation) {
        return {
          title: selectedTranslation.title,
          description: getDescription(selectedTranslation.summary, chipsGroups),
        };
      }
    }

    return {
      title: prettySlug(page.wikiPages.data[0].attributes.slug),
      description: getDescription(undefined, chipsGroups),
    };
  })();

  const thumbnail =
    page.wikiPages.data[0].attributes.thumbnail?.data?.attributes;

  const props: Props = {
    ...appStaticProps,
    page: page.wikiPages.data[0].attributes as WikiPageWithTranslations,
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
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getWikiPagesSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(contents.wikiPages?.data, ["attributes"] as const).map(
    (wikiPage) => {
      context.locales?.map((local) =>
        paths.push({
          params: { slug: wikiPage.attributes.slug },
          locale: local,
        })
      );
    }
  );
  return {
    paths,
    fallback: "blocking",
  };
};
