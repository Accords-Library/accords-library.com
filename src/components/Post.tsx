import { useAppLayout } from "contexts/AppLayoutContext";
import { GetPostQuery } from "graphql/generated";
import { useRouter } from "next/router";
import { AppStaticProps } from "queries/getAppStaticProps";
import {
  getPreferredLanguage,
  getStatusDescription,
  prettySlug,
} from "queries/helpers";
import { useEffect, useMemo, useState } from "react";
import AppLayout from "./AppLayout";
import Chip from "./Chip";
import HorizontalLine from "./HorizontalLine";
import LanguageSwitcher from "./LanguageSwitcher";
import Markdawn from "./Markdown/Markdawn";
import TOC from "./Markdown/TOC";
import ReturnButton, { ReturnButtonType } from "./PanelComponents/ReturnButton";
import ContentPanel from "./Panels/ContentPanel";
import SubPanel from "./Panels/SubPanel";
import RecorderChip from "./RecorderChip";
import ThumbnailHeader from "./ThumbnailHeader";
import ToolTip from "./ToolTip";

interface Props {
  post: Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["attributes"];
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

export default function Post(props: Props): JSX.Element {
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

  const appLayout = useAppLayout();
  const router = useRouter();

  const [selectedTranslation, setSelectedTranslation] = useState<
    | Exclude<
        Exclude<Props["post"], null | undefined>["translations"],
        null | undefined
      >[number]
  >();
  const translationLocales: Map<string, number> = new Map();

  const [selectedTranslationIndex, setSelectedTranslationIndex] = useState<
    number | undefined
  >();

  if (post?.translations) {
    post.translations.map((translation, index) => {
      if (translation?.language?.data?.attributes?.code) {
        translationLocales.set(
          translation.language.data.attributes.code,
          index
        );
      }
    });
  }

  useMemo(() => {
    setSelectedTranslationIndex(
      getPreferredLanguage(
        appLayout.preferredLanguages ?? [router.locale],
        translationLocales
      )
    );
  }, [appLayout.preferredLanguages]);

  useEffect(() => {
    if (selectedTranslationIndex !== undefined)
      setSelectedTranslation(post?.translations?.[selectedTranslationIndex]);
  }, [selectedTranslationIndex]);

  const thumbnail =
    selectedTranslation?.thumbnail?.data?.attributes ??
    post?.thumbnail?.data?.attributes;

  const body = selectedTranslation?.body ?? "";
  const title = selectedTranslation?.title ?? prettySlug(post?.slug);
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

            {post?.authors && post.authors.data.length > 0 && (
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
            categories={post?.categories}
            languageSwitcher={
              <LanguageSwitcher
                languages={languages}
                locales={translationLocales}
                localesIndex={selectedTranslationIndex}
                setLocalesIndex={setSelectedTranslationIndex}
              />
            }
          />

          <HorizontalLine />
        </>
      ) : (
        <>
          {displayLanguageSwitcher && (
            <div className="grid place-content-end place-items-start">
              <LanguageSwitcher
                languages={languages}
                locales={translationLocales}
                localesIndex={selectedTranslationIndex}
                setLocalesIndex={setSelectedTranslationIndex}
              />
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
