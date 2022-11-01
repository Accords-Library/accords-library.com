import { Fragment, useCallback, useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "./AppLayout";
import { Chip } from "./Chip";
import { HorizontalLine } from "./HorizontalLine";
import { Markdawn, TableOfContents } from "./Markdown/Markdawn";
import { ReturnButton } from "./PanelComponents/ReturnButton";
import { ContentPanel } from "./Containers/ContentPanel";
import { SubPanel } from "./Containers/SubPanel";
import { RecorderChip } from "./RecorderChip";
import { ThumbnailHeader } from "./ThumbnailHeader";
import { ToolTip } from "./ToolTip";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { PostWithTranslations } from "types/types";
import { filterHasAttributes, getStatusDescription } from "helpers/others";
import { prettySlug } from "helpers/formatters";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  post: PostWithTranslations;
  returnHref?: string;
  returnTitle?: string | null | undefined;
  displayCredits?: boolean;
  displayToc?: boolean;
  displayThumbnailHeader?: boolean;
  displayTitle?: boolean;
  displayLanguageSwitcher?: boolean;
  prependBody?: JSX.Element;
  appendBody?: JSX.Element;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PostPage = ({
  post,
  returnHref,
  returnTitle,
  displayCredits,
  displayToc,
  displayThumbnailHeader,
  displayLanguageSwitcher,
  appendBody,
  prependBody,
  displayTitle = true,
  ...otherProps
}: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: post.translations,
    languageExtractor: useCallback(
      (item: NonNullable<PostWithTranslations["translations"][number]>) =>
        item.language?.data?.attributes?.code,
      []
    ),
  });

  const { thumbnail, body, title, excerpt } = useMemo(
    () => ({
      thumbnail:
        selectedTranslation?.thumbnail?.data?.attributes ?? post.thumbnail?.data?.attributes,
      body: selectedTranslation?.body ?? "",
      title: selectedTranslation?.title ?? prettySlug(post.slug),
      excerpt: selectedTranslation?.excerpt ?? "",
    }),
    [post.slug, post.thumbnail, selectedTranslation]
  );

  const subPanel = useMemo(
    () =>
      returnHref || returnTitle || displayCredits || displayToc ? (
        <SubPanel>
          {returnHref && returnTitle && (
            <ReturnButton href={returnHref} title={returnTitle} displayOnlyOn={"3ColumnsLayout"} />
          )}

          {displayCredits && (
            <>
              <HorizontalLine />

              {selectedTranslation && (
                <div className="grid grid-flow-col place-content-center place-items-center gap-2">
                  <p className="font-headers font-bold">{langui.status}:</p>

                  <ToolTip
                    content={getStatusDescription(selectedTranslation.status, langui)}
                    maxWidth={"20rem"}>
                    <Chip text={selectedTranslation.status} />
                  </ToolTip>
                </div>
              )}

              {post.authors && post.authors.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">{"Authors"}:</p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(post.authors.data, ["id", "attributes"] as const).map(
                      (author) => (
                        <Fragment key={author.id}>
                          <RecorderChip recorder={author.attributes} />
                        </Fragment>
                      )
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {displayToc && <TableOfContents text={body} title={title} horizontalLine />}
        </SubPanel>
      ) : undefined,
    [
      body,
      displayCredits,
      displayToc,
      langui,
      post.authors,
      returnHref,
      returnTitle,
      selectedTranslation,
      title,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel>
        {returnHref && returnTitle && (
          <ReturnButton
            href={returnHref}
            title={returnTitle}
            displayOnlyOn={"1ColumnLayout"}
            className="mb-10"
          />
        )}

        {displayThumbnailHeader ? (
          <>
            <ThumbnailHeader
              thumbnail={thumbnail}
              title={title}
              description={excerpt}
              categories={post.categories}
              languageSwitcher={
                languageSwitcherProps.locales.size > 1 ? (
                  <LanguageSwitcher {...languageSwitcherProps} />
                ) : undefined
              }
            />
          </>
        ) : (
          <>
            {displayLanguageSwitcher && (
              <div className="grid place-content-end place-items-start">
                <LanguageSwitcher {...languageSwitcherProps} />
              </div>
            )}
            {displayTitle && (
              <h1 className="my-16 flex justify-center gap-3 text-center text-4xl">{title}</h1>
            )}
          </>
        )}

        {prependBody}
        {body && (
          <>
            {displayThumbnailHeader && <HorizontalLine />}
            <Markdawn text={body} />
          </>
        )}

        {appendBody}
      </ContentPanel>
    ),
    [
      LanguageSwitcher,
      appendBody,
      body,
      displayLanguageSwitcher,
      displayThumbnailHeader,
      displayTitle,
      excerpt,
      languageSwitcherProps,
      post.categories,
      prependBody,
      returnHref,
      returnTitle,
      thumbnail,
      title,
    ]
  );

  return <AppLayout {...otherProps} contentPanel={contentPanel} subPanel={subPanel} />;
};
