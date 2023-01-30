import { useCallback } from "react";
import { Chip } from "components/Chip";
import { ToolTip } from "components/ToolTip";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { Button } from "components/Inputs/Button";
import { cIf, cJoin } from "helpers/className";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { ContentStatus, useFormat } from "hooks/useFormat";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  source?: {
    name?: string;
    url?: string;
  };
  translations: {
    language: string | undefined;
    definition: string | null | undefined;
    status: ContentStatus | undefined;
  }[];
  index: number;
  categories: string[];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const DefinitionCard = ({ source, translations = [], index, categories }: Props): JSX.Element => {
  const isContentPanelAtLeastMd = useAtomGetter(atoms.containerQueries.isContentPanelAtLeastMd);
  const { format, formatStatusDescription } = useFormat();
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: Props["translations"][number]) => item.language, []),
  });

  return (
    <>
      <div className="flex flex-wrap place-items-center gap-2">
        <p className="font-headers text-lg font-bold">{format("definition_x", { x: index })}</p>

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
              content={formatStatusDescription(selectedTranslation.status)}
              maxWidth={"20rem"}>
              <Chip text={selectedTranslation.status} />
            </ToolTip>
          </>
        )}

        {categories.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-row gap-1">
              {categories.map((category, categoryIndex) => (
                <Chip key={categoryIndex} text={category} />
              ))}
            </div>
          </>
        )}
      </div>

      <p>{selectedTranslation?.definition}</p>

      {source?.url && source.name && (
        <div
          className={cJoin(
            "mt-3 flex place-items-center gap-2",
            cIf(!isContentPanelAtLeastMd, "flex-col text-center")
          )}>
          <p>{format("source")}: </p>
          <Button href={source.url} size="small" text={source.name} />
        </div>
      )}
    </>
  );
};
export default DefinitionCard;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

const Separator = () => <div className="mx-1 h-5 w-[1px] bg-dark" />;
