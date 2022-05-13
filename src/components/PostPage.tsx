import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettySlug } from "helpers/formatters";
import { getStatusDescription } from "helpers/others";
import { Immutable, PostWithTranslations } from "helpers/types";
import useSmartLanguage from "hooks/useSmartLanguage";
import AppLayout from "./AppLayout";
import Chip from "./Chip";
import HorizontalLine from "./HorizontalLine";
import Markdawn from "./Markdown/Markdawn";
import TOC from "./Markdown/TOC";
import ReturnButton, { ReturnButtonType } from "./PanelComponents/ReturnButton";
import ContentPanel from "./Panels/ContentPanel";
import SubPanel from "./Panels/SubPanel";
import RecorderChip from "./RecorderChip";
import ThumbnailHeader from "./ThumbnailHeader";
import ToolTip from "./ToolTip";

interface Props {
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

export default function PostPage(props: Immutable<Props>): JSX.Element {
  const {
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
  } = props;
  const displayTitle = props.displayTitle ?? true;

  const [selectedTranslation, LanguageSwitcher] = useSmartLanguage({
    items: post.translations,
    languages: languages,
    languageExtractor: (item) => item?.language?.data?.attributes?.code,
  });

  const thumbnail =
    selectedTranslation?.thumbnail?.data?.attributes ??
    post.thumbnail?.data?.attributes;

  const body = selectedTranslation?.body ?? "";
  const title = selectedTranslation?.title ?? prettySlug(post.slug);
  const except = selectedTranslation?.excerpt ?? "";

  const subPanel =
    returnHref || returnTitle || displayCredits || displayToc ? (
      <SubPanel>
        {returnHref && returnTitle && (
          <ReturnButton
            href={returnHref}
            title={returnTitle}
            langui={langui}
            displayOn={ReturnButtonType.desktop}
            horizontalLine
          />
        )}

        {displayCredits && (
          <>
            {selectedTranslation && (
              <div className="grid grid-flow-col place-items-center place-content-center gap-2">
                <p className="font-headers">{langui.status}:</p>

                <ToolTip
                  content={getStatusDescription(
                    selectedTranslation.status,
                    langui
                  )}
                  maxWidth={"20rem"}
                >
                  <Chip>{selectedTranslation.status}</Chip>
                </ToolTip>
              </div>
            )}

            {post.authors && post.authors.data.length > 0 && (
              <div>
                <p className="font-headers">{"Authors"}:</p>
                <div className="grid place-items-center place-content-center gap-2">
                  {post.authors.data.map((author) => (
                    <>
                      {author.attributes && (
                        <RecorderChip
                          key={author.id}
                          langui={langui}
                          recorder={author.attributes}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}

            <HorizontalLine />
          </>
        )}

        {displayToc && <TOC text={body} title={title} />}
      </SubPanel>
    ) : undefined;

  const contentPanel = (
    <ContentPanel>
      {returnHref && returnTitle && (
        <ReturnButton
          href={returnHref}
          title={returnTitle}
          langui={langui}
          displayOn={ReturnButtonType.mobile}
          horizontalLine
        />
      )}

      {displayThumbnailHeader ? (
        <>
          <ThumbnailHeader
            thumbnail={thumbnail}
            title={title}
            description={except}
            langui={langui}
            categories={post.categories}
            languageSwitcher={<LanguageSwitcher />}
          />

          <HorizontalLine />
        </>
      ) : (
        <>
          {displayLanguageSwitcher && (
            <div className="grid place-content-end place-items-start">
              <LanguageSwitcher />
            </div>
          )}
          {displayTitle && (
            <h1 className="text-center flex gap-3 justify-center text-4xl my-16">
              {title}
            </h1>
          )}
        </>
      )}

      {prependBody}
      <Markdawn text={body} />
      {appendBody}
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={title}
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={thumbnail ?? undefined}
      {...props}
    />
  );
}