import { Chip } from "components/Chip";
import { ToolTip } from "components/ToolTip";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { getStatusDescription } from "helpers/others";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { useCallback } from "react";

interface Props {
  source?: string;
  translations: {
    language: string | undefined;
    definition: string | null | undefined;
    status: string | undefined;
  }[];
  languages: AppStaticProps["languages"];
  langui: AppStaticProps["langui"];
  index: number;
}

export default function DefinitionCard(props: Props): JSX.Element {
  const { source, translations = [], languages, langui, index } = props;

  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: translations,
      languages: languages,
      languageExtractor: useCallback(
        (item: Props["translations"][number]) => item.language,
        []
      ),
    });

  return (
    <>
      <div className="flex place-items-center gap-2">
        {/* TODO: Langui */}
        <p className="font-headers text-lg">{`Definition ${index}`}</p>
        {selectedTranslation?.status && (
          <ToolTip
            content={getStatusDescription(selectedTranslation.status, langui)}
            maxWidth={"20rem"}
          >
            <Chip>{selectedTranslation.status}</Chip>
          </ToolTip>
        )}
        {translations.length > 1 && (
          <LanguageSwitcher {...languageSwitcherProps} />
        )}
      </div>

      <p className="italic">{`${langui.source}: ${source}`}</p>
      <p>{selectedTranslation?.definition}</p>
    </>
  );
}
