import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getOpenGraph } from "helpers/openGraph";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes } from "helpers/others";
import { GetContentsFolderQuery } from "graphql/generated";
import {
  getDefaultPreferredLanguages,
  staticSmartLanguage,
} from "helpers/locales";
import { prettySlug } from "helpers/formatters";
import { SmartList } from "components/SmartList";
import {
  TranslatedButton,
  TranslatedPreviewCard,
  TranslatedPreviewFolder,
} from "components/Translated";
import { Ico, Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { Link } from "components/Inputs/Link";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {
  folder: NonNullable<
    NonNullable<
      GetContentsFolderQuery["contentsFolders"]
    >["data"][number]["attributes"]
  >;
}

const ContentsFolder = ({
  langui,
  openGraph,
  folder,
  ...otherProps
}: Props): JSX.Element => {
  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.Workspaces}
          title={langui.contents}
          description={langui.contents_description}
        />

        <Button
          href="/contents/all"
          text={"Switch to grid view"}
          icon={Icon.Apps}
        />
      </SubPanel>
    ),
    [langui.contents, langui.contents_description]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <div className="mb-10 grid grid-flow-col place-items-center justify-start gap-x-2">
          {folder.parent_folder?.data?.attributes && (
            <>
              {folder.parent_folder.data.attributes.slug === "root" ? (
                <Button href="/contents" icon={Icon.Home} />
              ) : (
                <TranslatedButton
                  href={`/contents/folder/${folder.parent_folder.data.attributes.slug}`}
                  translations={filterHasAttributes(
                    folder.parent_folder.data.attributes.titles,
                    ["language.data.attributes.code"] as const
                  ).map((title) => ({
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
          items={filterHasAttributes(folder.subfolders?.data, [
            "id",
            "attributes",
          ] as const)}
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
          className="grid-cols-2 items-stretch
          desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]"
          renderWhenEmpty={() => <></>}
          langui={langui}
          groupingFunction={() => [langui.folders ?? "Folders"]}
        />

        <SmartList
          items={filterHasAttributes(folder.contents?.data, [
            "id",
            "attributes",
          ] as const)}
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
          className="grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]"
          renderWhenEmpty={() => <></>}
          langui={langui}
          groupingFunction={() => [langui.contents ?? "Contents"]}
        />

        {folder.contents?.data.length === 0 &&
          folder.subfolders?.data.length === 0 && (
            <NoContentNorFolderMessage langui={langui} />
          )}
      </ContentPanel>
    ),
    [
      folder.contents,
      folder.parent_folder?.data?.attributes,
      folder.slug,
      folder.subfolders,
      folder.titles,
      langui,
    ]
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      openGraph={openGraph}
      langui={langui}
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
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const contentsFolder = await sdk.getContentsFolder({
    slug: slug,
    language_code: context.locale ?? "en",
  });
  if (!contentsFolder.contentsFolders?.data[0]?.attributes) {
    return { notFound: true };
  }

  const folder = contentsFolder.contentsFolders.data[0].attributes;
  const appStaticProps = await getAppStaticProps(context);

  const title = (() => {
    if (slug === "root") {
      return appStaticProps.langui.contents ?? "Contents";
    }
    if (context.locale && context.locales) {
      const selectedTranslation = staticSmartLanguage({
        items: folder.titles,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(
          context.locale,
          context.locales
        ),
      });
      if (selectedTranslation) {
        return selectedTranslation.title;
      }
    }
    return prettySlug(folder.slug);
  })();

  const props: Props = {
    ...appStaticProps,
    openGraph: getOpenGraph(appStaticProps.langui, title),
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
  filterHasAttributes(contents.contentsFolders?.data, [
    "attributes",
  ] as const).map((item) => {
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

interface PreviewFolderProps {
  href: string;
  title: string | null | undefined;
}

export const PreviewFolder = ({
  href,
  title,
}: PreviewFolderProps): JSX.Element => (
  <Link
    href={href}
    className="flex w-full cursor-pointer flex-row place-content-center place-items-center gap-4
    rounded-md bg-light p-6 px-8 transition-transform drop-shadow-shade-xl hover:scale-[1.02]
    mobile:px-6 mobile:py-6"
  >
    {title && (
      <p className="text-center font-headers text-lg font-bold leading-none">
        {title}
      </p>
    )}
  </Link>
);

interface NoContentNorFolderMessageProps {
  langui: AppStaticProps["langui"];
}

const NoContentNorFolderMessage = ({
  langui,
}: NoContentNorFolderMessageProps) => (
  <div className="grid place-content-center">
    <div
      className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
      border-dark p-8 text-dark opacity-40"
    >
      <p className="max-w-xs text-2xl">{langui.empty_folder_message}</p>
    </div>
  </div>
);