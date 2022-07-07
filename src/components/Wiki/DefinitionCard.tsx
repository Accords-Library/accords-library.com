import { useCallback } from "react";
import { Chip } from "components/Chip";
import { ToolTip } from "components/ToolTip";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { getStatusDescription } from "helpers/others";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

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
  categories: string[];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const DefinitionCard = ({
  source,
  translations = [],
  languages,
  langui,
  index,
  categories,
}: Props): JSX.Element => {
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
      <div className="flex flex-wrap place-items-center gap-2">
        <p className="font-headers text-lg font-bold">{`${langui.definition} ${index}`}</p>

        {translations.length > 1 && (
          <>
            <Separator />
            <LanguageSwitcher {...languageSwitcherProps} size={"small"} />
          </>
        )}

        {selectedTranslation?.status && (
          <>
            <Separator />
            <ToolTip
              content={getStatusDescription(selectedTranslation.status, langui)}
              maxWidth={"20rem"}
            >
              <Chip>{selectedTranslation.status}</Chip>
            </ToolTip>
          </>
        )}

        {categories.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-row gap-1">
              {categories.map((category, categoryIndex) => (
                <Chip key={categoryIndex}>{category}</Chip>
              ))}
            </div>
          </>
        )}
      </div>

      <p className="italic">{`${langui.source}: ${source}`}</p>

      <p>{selectedTranslation?.definition}</p>
    </>
  );
};
export default DefinitionCard;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

const Separator = () => <div className="mx-1 h-5 w-[1px] bg-dark" />;
