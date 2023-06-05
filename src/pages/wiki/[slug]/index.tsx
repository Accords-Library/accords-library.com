import { useCallback } from "react";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Chip } from "components/Chip";
import { HorizontalLine } from "components/HorizontalLine";
import { Img } from "components/Img";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import DefinitionCard from "components/Wiki/DefinitionCard";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { WikiPageWithTranslations } from "types/types";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { prettySlug, sJoin } from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { getOpenGraph } from "helpers/openGraph";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { getDescription } from "helpers/description";
import { cIf, cJoin } from "helpers/className";
import { Terminal } from "components/Cli/Terminal";
import { prettyTerminalBoxedTitle, prettyTerminalUnderlinedTitle } from "helpers/terminal";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { getTocFromMarkdawn, Markdawn, TableOfContents } from "components/Markdown/Markdawn";
import { ElementsSeparator } from "helpers/component";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  page: WikiPageWithTranslations;
}

const WikiPage = ({ page, ...otherProps }: Props): JSX.Element => {
  const { format, formatCategory, formatWikiTag } = useFormat();
  const router = useRouter();
  const isTerminalMode = useAtomGetter(atoms.layout.terminalMode);
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const { showLightBox } = useAtomGetter(atoms.lightBox);
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: page.translations,
    languageExtractor: useCallback(
      (item: NonNullable<Props["page"]["translations"][number]>) =>
        item.language?.data?.attributes?.code,
      []
    ),
  });
  const is3ColumnsLayout = useAtomGetter(atoms.containerQueries.is3ColumnsLayout);

  const toc = getTocFromMarkdawn(selectedTranslation?.body?.body, selectedTranslation?.title);

  const subPanel = is3ColumnsLayout ? (
    <SubPanel>
      <ElementsSeparator>
        {[
          <ReturnButton
            key="return"
            href={`/wiki`}
            title={format("wiki")}
            displayOnlyOn={"3ColumnsLayout"}
          />,
          toc && (
            <TableOfContents
              key="toc"
              toc={toc}
              onContentClicked={() => setSubPanelOpened(false)}
            />
          ),
        ]}
      </ElementsSeparator>
    </SubPanel>
  ) : undefined;

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Large}>
      <ReturnButton
        href={`/wiki`}
        title={format("wiki")}
        displayOnlyOn={"1ColumnLayout"}
        className="mb-10"
      />

      <div className="flex flex-wrap place-content-center gap-3">
        <h1 className="text-center text-3xl">{selectedTranslation?.title}</h1>
        {selectedTranslation?.aliases && selectedTranslation.aliases.length > 0 && (
          <p className="mr-3 text-center text-2xl">
            {`(${selectedTranslation.aliases.map((alias) => alias?.alias).join("・")})`}
          </p>
        )}
        <LanguageSwitcher {...languageSwitcherProps} />
      </div>

      {selectedTranslation && (
        <>
          <HorizontalLine />
          <div className="text-justify">
            <div
              className={cJoin(
                "mb-8 overflow-hidden rounded-lg bg-mid text-center",
                cIf(is3ColumnsLayout, "float-right ml-8 w-96")
              )}>
              {page.thumbnail?.data?.attributes && (
                <Img
                  src={page.thumbnail.data.attributes}
                  quality={ImageQuality.Medium}
                  className="w-full cursor-pointer"
                  onClick={() => {
                    if (page.thumbnail?.data?.attributes) {
                      showLightBox([page.thumbnail.data.attributes]);
                    }
                  }}
                />
              )}
              <div className="my-4 grid gap-4 p-4">
                {page.categories?.data && page.categories.data.length > 0 && (
                  <>
                    <p className="font-headers text-xl font-bold">
                      {format("category", { count: page.categories.data.length })}
                    </p>

                    <div className="flex flex-row flex-wrap place-content-center gap-2">
                      {filterHasAttributes(page.categories.data, ["attributes"]).map((category) => (
                        <Chip
                          key={category.attributes.slug}
                          text={formatCategory(category.attributes.slug, "full")}
                        />
                      ))}
                    </div>
                  </>
                )}

                {page.tags?.data && page.tags.data.length > 0 && (
                  <>
                    <p className="font-headers text-xl font-bold">{format("tags")}</p>
                    <div className="flex flex-row flex-wrap place-content-center gap-2">
                      {filterHasAttributes(page.tags.data, ["attributes"]).map((tag) => (
                        <Chip key={tag.attributes.slug} text={formatWikiTag(tag.attributes.slug)} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {isDefinedAndNotEmpty(selectedTranslation.summary) && (
              <div className="mb-12">
                <p className="font-headers text-lg font-bold">{format("summary")}</p>
                <p>{selectedTranslation.summary}</p>
              </div>
            )}

            {filterHasAttributes(page.definitions, ["translations"]).map((definition, index) => (
              <div key={index} className="mb-12">
                <DefinitionCard
                  source={{
                    name: definition.source?.data?.attributes?.name,
                    url: definition.source?.data?.attributes?.content?.data?.attributes?.slug
                      ? sJoin(
                          "/contents/",
                          definition.source.data.attributes.content.data.attributes.slug
                        )
                      : sJoin(
                          "/library/",
                          definition.source?.data?.attributes?.ranged_content?.data?.attributes
                            ?.library_item?.data?.attributes?.slug
                        ),
                  }}
                  translations={definition.translations.map((translation) => ({
                    language: translation?.language?.data?.attributes?.code,
                    definition: translation?.definition,
                    status: translation?.status,
                  }))}
                  index={index + 1}
                  categories={filterHasAttributes(definition.categories?.data, ["attributes"]).map(
                    (category) => formatCategory(category.attributes.slug)
                  )}
                />
              </div>
            ))}

            {isDefined(selectedTranslation.body) && (
              <div>
                <Markdawn text={selectedTranslation.body.body} />
              </div>
            )}
          </div>
        </>
      )}
    </ContentPanel>
  );

  if (isTerminalMode) {
    return (
      <Terminal
        childrenPaths={[]}
        parentPath={"/wiki"}
        content={`${prettyTerminalBoxedTitle(
          `${selectedTranslation?.title}${
            selectedTranslation?.aliases && selectedTranslation.aliases.length > 0
              ? ` (${selectedTranslation.aliases.map((alias) => alias?.alias).join(", ")})`
              : ""
          }`
        )}${
          isDefinedAndNotEmpty(selectedTranslation?.summary)
            ? `${prettyTerminalUnderlinedTitle(format("summary"))}${selectedTranslation?.summary}`
            : ""
        }${
          page.definitions && page.definitions.length > 0
            ? `${filterHasAttributes(page.definitions, ["translations"]).map(
                (definition, index) =>
                  `${prettyTerminalUnderlinedTitle(format("definition_x", { x: index + 1 }))}${
                    staticSmartLanguage({
                      items: filterHasAttributes(definition.translations, [
                        "language.data.attributes.code",
                      ]),
                      languageExtractor: (item) => item.language.data.attributes.code,
                      preferredLanguages: getDefaultPreferredLanguages(
                        router.locale ?? "en",
                        router.locales ?? ["en"]
                      ),
                    })?.definition
                  }`
              )}`
            : ""
        }${
          isDefinedAndNotEmpty(selectedTranslation?.body?.body)
            ? `\n\n${selectedTranslation?.body?.body}`
            : "\n"
        }`}
      />
    );
  }

  return <AppLayout subPanel={subPanel} contentPanel={contentPanel} {...otherProps} />;
};
export default WikiPage;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format, formatCategory, formatWikiTag } = getFormat(context.locale);
  const slug =
    context.params && isDefined(context.params.slug) ? context.params.slug.toString() : "";
  const page = await sdk.getWikiPage({ slug: slug });
  if (!page.wikiPages?.data[0]?.attributes?.translations) return { notFound: true };

  const { title, description } = (() => {
    const chipsGroups = {
      [format("tags")]: filterHasAttributes(page.wikiPages.data[0].attributes.tags?.data, [
        "attributes",
      ]).map((tag) => formatWikiTag(tag.attributes.slug)),
      [format("category", { count: Infinity })]: filterHasAttributes(
        page.wikiPages.data[0].attributes.categories?.data,
        ["attributes"]
      ).map((category) => formatCategory(category.attributes.slug)),
    };

    if (context.locale && context.locales) {
      const selectedTranslation = staticSmartLanguage({
        items: page.wikiPages.data[0].attributes.translations,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
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

  const thumbnail = page.wikiPages.data[0].attributes.thumbnail?.data?.attributes;

  const props: Props = {
    page: page.wikiPages.data[0].attributes as WikiPageWithTranslations,
    openGraph: getOpenGraph(format, title, description, thumbnail),
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
  filterHasAttributes(contents.wikiPages?.data, ["attributes"]).map((wikiPage) => {
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
