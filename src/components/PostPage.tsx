import { useCallback } from "react";
import { AppLayout, AppLayoutRequired } from "./AppLayout";
import { getTocFromMarkdawn, Markdawn, TableOfContents } from "./Markdown/Markdawn";
import { ReturnButton } from "./PanelComponents/ReturnButton";
import { ContentPanel } from "./Containers/ContentPanel";
import { SubPanel } from "./Containers/SubPanel";
import { ThumbnailHeader } from "./ThumbnailHeader";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { PostWithTranslations } from "types/types";
import { filterHasAttributes, isDefined } from "helpers/asserts";
import { prettySlug } from "helpers/formatters";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";
import { ElementsSeparator } from "helpers/component";
import { HorizontalLine } from "components/HorizontalLine";
import { Credits } from "components/Credits";
import { useFormat } from "hooks/useFormat";

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
  const { formatCategory } = useFormat();
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: post.translations,
    languageExtractor: useCallback(
      (item: NonNullable<PostWithTranslations["translations"][number]>) =>
        item.language?.data?.attributes?.code,
      []
    ),
  });

  const thumbnail =
    selectedTranslation?.thumbnail?.data?.attributes ?? post.thumbnail?.data?.attributes;
  const body = selectedTranslation?.body ?? "";
  const title = selectedTranslation?.title ?? prettySlug(post.slug);
  const excerpt = selectedTranslation?.excerpt ?? "";

  const toc = getTocFromMarkdawn(body, title);

  const subPanelElems = [
    returnHref && returnTitle && !is1ColumnLayout && (
      <ReturnButton href={returnHref} title={returnTitle} />
    ),

    displayCredits && <Credits status={selectedTranslation?.status} authors={post.authors?.data} />,

    displayToc && isDefined(toc) && (
      <TableOfContents toc={toc} onContentClicked={() => setSubPanelOpened(false)} />
    ),
  ];

  const subPanel =
    subPanelElems.filter(Boolean).length > 0 ? (
      <SubPanel>
        <ElementsSeparator>{subPanelElems}</ElementsSeparator>
      </SubPanel>
    ) : undefined;

  const contentPanel = (
    <ContentPanel>
      {is1ColumnLayout && returnHref && returnTitle && (
        <ReturnButton href={returnHref} title={returnTitle} className="mb-10" />
      )}

      {displayThumbnailHeader ? (
        <>
          <ThumbnailHeader
            thumbnail={thumbnail}
            title={title}
            description={excerpt}
            categories={filterHasAttributes(post.categories?.data, ["attributes"]).map((category) =>
              formatCategory(category.attributes.slug)
            )}
            releaseDate={post.date}
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
            <h1 className="my-16 flex justify-center gap-3 text-center text-4xl">{title}</h1>
          )}
        </>
      )}

      {prependBody}
      {body && <Markdawn text={body} />}

      {appendBody}
    </ContentPanel>
  );

  return <AppLayout {...otherProps} contentPanel={contentPanel} subPanel={subPanel} />;
};
