import { Fragment, useCallback, useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "./AppLayout";
import { Chip } from "./Chip";
import { HorizontalLine } from "./HorizontalLine";
import { Markdawn, TableOfContents } from "./Markdown/Markdawn";
import { ReturnButton, ReturnButtonType } from "./PanelComponents/ReturnButton";
import { ContentPanel } from "./Panels/ContentPanel";
import { SubPanel } from "./Panels/SubPanel";
import { RecorderChip } from "./RecorderChip";
import { ThumbnailHeader } from "./ThumbnailHeader";
import { ToolTip } from "./ToolTip";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { PostWithTranslations } from "helpers/types";
import { filterHasAttributes, getStatusDescription } from "helpers/others";
import { prettySlug } from "helpers/formatters";
import { AppStaticProps } from "graphql/getAppStaticProps";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  post: PostWithTranslations;
  langui: AppStaticProps["langui"];
  languages: AppStaticProps["languages"];
  currencies: AppStaticProps["currencies"];
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
  langui,
  languages,
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
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: post.translations,
      languages: languages,
      languageExtractor: useCallback(
        (item: NonNullable<PostWithTranslations["translations"][number]>) =>
          item.language?.data?.attributes?.code,
        []
      ),
    });

  const { thumbnail, body, title, excerpt } = useMemo(
    () => ({
      thumbnail:
        selectedTranslation?.thumbnail?.data?.attributes ??
        post.thumbnail?.data?.attributes,
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
            <ReturnButton
              href={returnHref}
              title={returnTitle}
              langui={langui}
              displayOn={ReturnButtonType.Desktop}
              horizontalLine
            />
          )}

          {displayCredits && (
            <>
              {selectedTranslation && (
                <div className="grid grid-flow-col place-content-center place-items-center gap-2">
                  <p className="font-headers font-bold">{langui.status}:</p>

                  <ToolTip
                    content={getStatusDescription(
                      selectedTranslation.status,
                      langui
                    )}
                    maxWidth={"20rem"}
                  >
                    <Chip text={selectedTranslation.status} />
                  </ToolTip>
                </div>
              )}

              {post.authors && post.authors.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">{"Authors"}:</p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(post.authors.data, [
                      "id",
                      "attributes",
                    ] as const).map((author) => (
                      <Fragment key={author.id}>
                        <RecorderChip
                          langui={langui}
                          recorder={author.attributes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

              <HorizontalLine />
            </>
          )}

          {displayToc && (
            <TableOfContents text={body} title={title} langui={langui} />
          )}
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
            langui={langui}
            displayOn={ReturnButtonType.Mobile}
            horizontalLine
          />
        )}

        {displayThumbnailHeader ? (
          <>
            <ThumbnailHeader
              thumbnail={thumbnail}
              title={title}
              description={excerpt}
              langui={langui}
              categories={post.categories}
              languageSwitcher={
                languageSwitcherProps.locales.size > 1 ? (
                  <LanguageSwitcher {...languageSwitcherProps} />
                ) : undefined
              }
            />

            <HorizontalLine />
          </>
        ) : (
          <>
            {displayLanguageSwitcher && (
              <div className="grid place-content-end place-items-start">
                <LanguageSwitcher {...languageSwitcherProps} />
              </div>
            )}
            {displayTitle && (
              <h1 className="my-16 flex justify-center gap-3 text-center text-4xl">
                {title}
              </h1>
            )}
          </>
        )}

        {prependBody}
        <Markdawn text={body} langui={langui} />
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
      langui,
      post.categories,
      prependBody,
      returnHref,
      returnTitle,
      thumbnail,
      title,
    ]
  );

  return (
    <AppLayout
      {...otherProps}
      contentPanel={contentPanel}
      subPanel={subPanel}
      languages={languages}
      langui={langui}
    />
  );
};
