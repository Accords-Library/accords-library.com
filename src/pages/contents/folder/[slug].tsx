import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { getOpenGraph } from "helpers/openGraph";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes } from "helpers/asserts";
import { ParentFolderPreviewFragment, UploadImageFragment } from "graphql/generated";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { prettySlug } from "helpers/formatters";
import { Button } from "components/Inputs/Button";
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
import { FolderPath } from "components/Contents/FolderPath";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  subfolders: {
    slug: string;
    href: string;
    translations: { language: string; title: string }[];
    fallback: { title: string };
  }[];
  contents: {
    slug: string;
    href: string;
    translations: { language: string; pre_title?: string; title: string; subtitle?: string }[];
    fallback: { title: string };
    thumbnail?: UploadImageFragment;
    topChips?: string[];
    bottomChips?: string[];
  }[];
  path: ParentFolderPreviewFragment[];
}

const ContentsFolder = ({
  openGraph,
  path,
  contents,
  subfolders,
  ...otherProps
}: Props): JSX.Element => {
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
      <FolderPath path={path} />

      {subfolders.length > 0 && (
        <div className="mb-8">
          <div className="mb-2 flex place-items-center gap-2">
            <h2 className="text-2xl">{format("folders")}</h2>
            <Chip text={format("x_results", { x: subfolders.length })} />
          </div>
          <div
            className={cJoin(
              "grid items-start pb-12",
              cIf(
                isContentPanelAtLeast4xl,
                "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
                "grid-cols-2 gap-4"
              )
            )}>
            {subfolders.map((subfolder) => (
              <TranslatedPreviewFolder key={subfolder.slug} {...subfolder} />
            ))}
          </div>
        </div>
      )}

      {contents.length > 0 && (
        <div className="mb-8">
          <div className="mb-2 flex place-items-center gap-2">
            <h2 className="text-2xl">{format("contents")}</h2>
            <Chip text={format("x_results", { x: contents.length })} />
          </div>
          <div
            className={cJoin(
              "grid items-start pb-12",
              cIf(
                isContentPanelAtLeast4xl,
                "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
                "grid-cols-2 gap-4"
              )
            )}>
            {contents.map((item) => (
              <TranslatedPreviewCard
                key={item.slug}
                {...item}
                thumbnailAspectRatio="3/2"
                thumbnailForceAspectRatio
                keepInfoVisible
              />
            ))}
          </div>
        </div>
      )}

      {contents.length === 0 && subfolders.length === 0 && <NoContentNorFolderMessage />}
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
  const { format, formatContentType, formatCategory } = getFormat(context.locale);
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const contentsFolder = await sdk.getContentsFolder({ slug: slug });
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

  const subfolders: Props["subfolders"] = filterHasAttributes(folder.subfolders?.data, [
    "attributes",
  ]).map(({ attributes }) => ({
    slug: attributes.slug,
    href: `/contents/folder/${attributes.slug}`,
    translations: filterHasAttributes(attributes.titles, ["language.data.attributes.code"]).map(
      (translation) => ({
        title: translation.title,
        language: translation.language.data.attributes.code,
      })
    ),
    fallback: { title: prettySlug(attributes.slug) },
  }));

  const contents: Props["contents"] = filterHasAttributes(folder.contents?.data, [
    "attributes",
  ]).map(({ attributes }) => ({
    slug: attributes.slug,
    href: `/contents/${attributes.slug}`,
    translations: filterHasAttributes(attributes.translations, [
      "language.data.attributes.code",
    ]).map((translation) => ({
      pre_title: translation.pre_title ?? undefined,
      title: translation.title,
      subtitle: translation.subtitle ?? undefined,
      language: translation.language.data.attributes.code,
    })),
    fallback: { title: prettySlug(attributes.slug) },
    thumbnail: attributes.thumbnail?.data?.attributes ?? undefined,
    topChips: attributes.type?.data?.attributes
      ? [formatContentType(attributes.type.data.attributes.slug)]
      : undefined,
    bottomChips: filterHasAttributes(attributes.categories?.data, ["attributes"]).map((category) =>
      formatCategory(category.attributes.slug)
    ),
  }));

  const props: Props = {
    openGraph: getOpenGraph(format, title),
    subfolders,
    contents,
    path: getRecursiveParentFolderPreview(folder),
  };
  return {
    props: JSON.parse(JSON.stringify(props)),
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
        className="mt-12 grid grid-flow-col place-items-center gap-9 rounded-2xl border-2
      border-dotted border-dark p-8 text-dark opacity-40">
        <p className="max-w-xs text-2xl">{format("empty_folder_message")}</p>
      </div>
    </div>
  );
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

type ParentFolderWithParentFolder = ParentFolderPreviewFragment & {
  parent_folder?: {
    data?: {
      attributes?: ParentFolderPreviewFragment | ParentFolderWithParentFolder | null;
    } | null;
  } | null;
};

const getRecursiveParentFolderPreview = (
  parentFolder: ParentFolderWithParentFolder
): ParentFolderPreviewFragment[] => [
  ...(parentFolder.parent_folder?.data?.attributes
    ? getRecursiveParentFolderPreview(parentFolder.parent_folder.data.attributes)
    : []),
  { slug: parentFolder.slug, titles: parentFolder.titles },
];
