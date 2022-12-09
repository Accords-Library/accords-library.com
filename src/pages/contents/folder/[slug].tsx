import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import naturalCompare from "string-natural-compare";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { getOpenGraph } from "helpers/openGraph";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes } from "helpers/asserts";
import { GetContentsFolderQuery } from "graphql/generated";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { prettySlug } from "helpers/formatters";
import { SmartList } from "components/SmartList";
import { Ico, Icon } from "components/Ico";
import { Button, TranslatedButton } from "components/Inputs/Button";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { cJoin, cIf } from "helpers/className";
import { getLangui } from "graphql/fetchLocalData";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { TranslatedPreviewFolder } from "components/Contents/PreviewFolder";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  folder: NonNullable<
    NonNullable<GetContentsFolderQuery["contentsFolders"]>["data"][number]["attributes"]
  >;
}

const ContentsFolder = ({ openGraph, folder, ...otherProps }: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const isContentPanelAtLeast4xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast4xl);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon={Icon.Workspaces}
        title={langui.contents}
        description={langui.contents_description}
      />

      <HorizontalLine />

      <Button href="/contents/all" text={langui.switch_to_grid_view} icon={Icon.Apps} />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <div className="mb-10 grid grid-flow-col place-items-center justify-start gap-x-2">
        {folder.parent_folder?.data?.attributes && (
          <>
            {folder.parent_folder.data.attributes.slug === "root" ? (
              <Button href="/contents" icon={Icon.Home} />
            ) : (
              <TranslatedButton
                href={`/contents/folder/${folder.parent_folder.data.attributes.slug}`}
                translations={filterHasAttributes(folder.parent_folder.data.attributes.titles, [
                  "language.data.attributes.code",
                ] as const).map((title) => ({
                  language: title.language.data.attributes.code,
                  text: title.title,
                }))}
                fallback={{
                  text: prettySlug(folder.parent_folder.data.attributes.slug),
                }}
              />
            )}
            <Ico icon={Icon.ChevronRight} />
          </>
        )}

        {folder.slug === "root" ? (
          <Button href="/contents" icon={Icon.Home} active />
        ) : (
          <TranslatedButton
            translations={filterHasAttributes(folder.titles, [
              "language.data.attributes.code",
            ] as const).map((title) => ({
              language: title.language.data.attributes.code,
              text: title.title,
            }))}
            fallback={{
              text: prettySlug(folder.slug),
            }}
            active
          />
        )}
      </div>

      <SmartList
        items={filterHasAttributes(folder.subfolders?.data, ["id", "attributes"] as const)}
        getItemId={(item) => item.id}
        renderItem={({ item }) => (
          <TranslatedPreviewFolder
            href={`/contents/folder/${item.attributes.slug}`}
            translations={filterHasAttributes(item.attributes.titles, [
              "language.data.attributes.code",
            ] as const).map((title) => ({
              title: title.title,
              language: title.language.data.attributes.code,
            }))}
            fallback={{ title: prettySlug(item.attributes.slug) }}
          />
        )}
        className={cJoin(
          "items-end",
          cIf(
            isContentPanelAtLeast4xl,
            "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
            "grid-cols-2 gap-4"
          )
        )}
        renderWhenEmpty={() => <></>}
        groupingFunction={() => [langui.folders ?? "Folders"]}
      />

      <SmartList
        items={filterHasAttributes(folder.contents?.data, ["id", "attributes"] as const)}
        getItemId={(item) => item.id}
        renderItem={({ item }) => (
          <TranslatedPreviewCard
            href={`/contents/${item.attributes.slug}`}
            translations={filterHasAttributes(item.attributes.translations, [
              "language.data.attributes.code",
            ] as const).map((translation) => ({
              pre_title: translation.pre_title,
              title: translation.title,
              subtitle: translation.subtitle,
              language: translation.language.data.attributes.code,
            }))}
            fallback={{ title: prettySlug(item.attributes.slug) }}
            thumbnail={item.attributes.thumbnail?.data?.attributes}
            thumbnailAspectRatio="3/2"
            thumbnailForceAspectRatio
            topChips={
              item.attributes.type?.data?.attributes
                ? [
                    item.attributes.type.data.attributes.titles?.[0]
                      ? item.attributes.type.data.attributes.titles[0]?.title
                      : prettySlug(item.attributes.type.data.attributes.slug),
                  ]
                : undefined
            }
            bottomChips={item.attributes.categories?.data.map(
              (category) => category.attributes?.short ?? ""
            )}
            keepInfoVisible
          />
        )}
        className={cIf(
          isContentPanelAtLeast4xl,
          "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
          "grid-cols-2 gap-x-3 gap-y-5"
        )}
        renderWhenEmpty={() => <></>}
        groupingFunction={() => [langui.contents ?? "Contents"]}
      />

      {folder.contents?.data.length === 0 && folder.subfolders?.data.length === 0 && (
        <NoContentNorFolderMessage />
      )}
    </ContentPanel>
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      openGraph={openGraph}
      {...otherProps}
    />
  );
};
export default ContentsFolder;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const contentsFolder = await sdk.getContentsFolder({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!contentsFolder.contentsFolders?.data[0]?.attributes) {
    return { notFound: true };
  }

  const folder = contentsFolder.contentsFolders.data[0].attributes;

  folder.subfolders?.data.sort((a, b) =>
    a.attributes && b.attributes ? naturalCompare(a.attributes.slug, b.attributes.slug) : 0
  );

  folder.contents?.data.sort((a, b) =>
    a.attributes && b.attributes ? naturalCompare(a.attributes.slug, b.attributes.slug) : 0
  );

  const title = (() => {
    if (slug === "root") {
      return langui.contents ?? "Contents";
    }
    if (context.locale && context.locales) {
      const selectedTranslation = staticSmartLanguage({
        items: folder.titles,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
      });
      if (selectedTranslation) {
        return selectedTranslation.title;
      }
    }
    return prettySlug(folder.slug);
  })();

  const props: Props = {
    openGraph: getOpenGraph(langui, title),
    folder,
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getContentsFoldersSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(contents.contentsFolders?.data, ["attributes"] as const).map((item) => {
    context.locales?.map((local) => {
      paths.push({
        params: { slug: item.attributes.slug },
        locale: local,
      });
    });
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

const NoContentNorFolderMessage = () => {
  const langui = useAtomGetter(atoms.localData.langui);
  return (
    <div className="grid place-content-center">
      <div
        className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
      border-dark p-8 text-dark opacity-40">
        <p className="max-w-xs text-2xl">{langui.empty_folder_message}</p>
      </div>
    </div>
  );
};
