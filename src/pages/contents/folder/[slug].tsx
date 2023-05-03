import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { getOpenGraph } from "helpers/openGraph";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes } from "helpers/asserts";
import { GetContentsFolderQuery } from "graphql/generated";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { prettySlug } from "helpers/formatters";
import { Ico } from "components/Ico";
import { Button, TranslatedButton } from "components/Inputs/Button";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { cJoin, cIf } from "helpers/className";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { TranslatedPreviewFolder } from "components/Contents/PreviewFolder";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { Chip } from "components/Chip";

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
  const { format } = useFormat();
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const isContentPanelAtLeast4xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast4xl);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="workspaces"
        title={format("contents")}
        description={format("contents_description")}
      />

      <HorizontalLine />

      <Button
        href="/contents/all"
        text={format("switch_to_grid_view")}
        icon="apps"
        onClick={() => setSubPanelOpened(false)}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <div className="mb-10 grid grid-flow-col place-items-center justify-start gap-x-2">
        {folder.parent_folder?.data?.attributes && (
          <>
            {folder.parent_folder.data.attributes.slug === "root" ? (
              <Button href="/contents" icon="home" />
            ) : (
              <TranslatedButton
                href={`/contents/folder/${folder.parent_folder.data.attributes.slug}`}
                translations={filterHasAttributes(folder.parent_folder.data.attributes.titles, [
                  "language.data.attributes.code",
                ]).map((title) => ({
                  language: title.language.data.attributes.code,
                  text: title.title,
                }))}
                fallback={{
                  text: prettySlug(folder.parent_folder.data.attributes.slug),
                }}
              />
            )}
            <Ico icon="chevron_right" />
          </>
        )}

        {folder.slug === "root" ? (
          <Button href="/contents" icon="home" active />
        ) : (
          <TranslatedButton
            translations={filterHasAttributes(folder.titles, ["language.data.attributes.code"]).map(
              (title) => ({
                language: title.language.data.attributes.code,
                text: title.title,
              })
            )}
            fallback={{
              text: prettySlug(folder.slug),
            }}
            active
          />
        )}
      </div>

      {folder.subfolders?.data && folder.subfolders.data.length > 0 && (
        <div className="mb-8">
          <h2 className="flex flex-row place-items-center gap-2 pb-2 text-2xl">
            {format("folders")}
            <Chip text={format("x_results", { x: folder.subfolders.data.length })} />
          </h2>
          <div
            className={cJoin(
              "grid items-start gap-8 pb-12",
              cIf(
                isContentPanelAtLeast4xl,
                "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
                "grid-cols-2 gap-4"
              )
            )}>
            {filterHasAttributes(folder.subfolders.data, ["id", "attributes"]).map((subfolder) => (
              <TranslatedPreviewFolder
                key={subfolder.id}
                href={`/contents/folder/${subfolder.attributes.slug}`}
                translations={filterHasAttributes(subfolder.attributes.titles, [
                  "language.data.attributes.code",
                ]).map((title) => ({
                  title: title.title,
                  language: title.language.data.attributes.code,
                }))}
                fallback={{ title: prettySlug(subfolder.attributes.slug) }}
              />
            ))}
          </div>
        </div>
      )}

      {folder.contents?.data && folder.contents.data.length > 0 && (
        <div className="mb-8">
          <h2 className="flex flex-row place-items-center gap-2 pb-2 text-2xl">
            {format("contents")}
            <Chip text={format("x_results", { x: folder.contents.data.length })} />
          </h2>
          <div
            className={cJoin(
              "grid items-start gap-8 pb-12",
              cIf(
                isContentPanelAtLeast4xl,
                "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
                "grid-cols-2 gap-4"
              )
            )}>
            {filterHasAttributes(folder.contents.data, ["id", "attributes"]).map((item) => (
              <TranslatedPreviewCard
                key={item.id}
                href={`/contents/${item.attributes.slug}`}
                translations={filterHasAttributes(item.attributes.translations, [
                  "language.data.attributes.code",
                ]).map((translation) => ({
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
            ))}
          </div>
        </div>
      )}

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
  const { format } = getFormat(context.locale);
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const contentsFolder = await sdk.getContentsFolder({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!contentsFolder.contentsFolders?.data[0]?.attributes) {
    return { notFound: true };
  }

  const folder = contentsFolder.contentsFolders.data[0].attributes;

  const title = (() => {
    if (slug === "root") {
      return format("contents");
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
    openGraph: getOpenGraph(format, title),
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
  filterHasAttributes(contents.contentsFolders?.data, ["attributes"]).map((item) => {
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
  const { format } = useFormat();
  return (
    <div className="grid place-content-center">
      <div
        className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
      border-dark p-8 text-dark opacity-40">
        <p className="max-w-xs text-2xl">{format("empty_folder_message")}</p>
      </div>
    </div>
  );
};
