import { Chip } from "components/Chip";
import { Markdawn } from "components/Markdown/Markdawn";
import { RecorderChip } from "components/RecorderChip";
import { ToolTip } from "components/ToolTip";
import { atoms } from "contexts/atoms";
import { RecorderChipFragment } from "graphql/generated";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { useAtomGetter } from "helpers/atoms";
import { prettyLanguage } from "helpers/formatters";
import { ContentStatus, useFormat } from "hooks/useFormat";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  languageCode?: string;
  sourceLanguageCode?: string;
  status?: ContentStatus | null;
  transcribers?: { attributes?: RecorderChipFragment | null }[];
  translators?: { attributes?: RecorderChipFragment | null }[];
  proofreaders?: { attributes?: RecorderChipFragment | null }[];
  dubbers?: { attributes?: RecorderChipFragment | null }[];
  subbers?: { attributes?: RecorderChipFragment | null }[];
  authors?: { attributes?: RecorderChipFragment | null }[];
  notes?: string | null;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Credits = ({
  languageCode,
  sourceLanguageCode,
  status,
  transcribers = [],
  translators = [],
  dubbers = [],
  proofreaders = [],
  subbers = [],
  authors = [],
  notes,
}: Props): JSX.Element => {
  const { format, formatStatusDescription, formatStatusLabel } = useFormat();
  const languages = useAtomGetter(atoms.localData.languages);

  return (
    <div className="grid place-items-center gap-5">
      {isDefined(languageCode) && isDefined(sourceLanguageCode) && (
        <>
          {languageCode === sourceLanguageCode ? (
            <h2 className="text-xl">{format("transcript_notice")}</h2>
          ) : (
            <>
              <h2 className="text-xl">{format("translation_notice")}</h2>
              <div className="flex flex-wrap place-content-center place-items-center gap-2">
                <p className="font-headers font-bold">{format("source_language")}:</p>
                <Chip text={prettyLanguage(sourceLanguageCode, languages)} />
              </div>
            </>
          )}
        </>
      )}

      {status && (
        <div className="flex flex-wrap place-content-center place-items-center gap-2">
          <p className="font-headers font-bold">{format("status")}:</p>
          <ToolTip content={formatStatusDescription(status)} maxWidth={"20rem"}>
            <Chip text={formatStatusLabel(status)} />
          </ToolTip>
        </div>
      )}

      {transcribers.length > 0 && (
        <RecorderChips
          title={format("transcriber", { count: transcribers.length })}
          recorders={transcribers}
        />
      )}

      {translators.length > 0 && (
        <RecorderChips
          title={format("translator", { count: translators.length })}
          recorders={translators}
        />
      )}

      {proofreaders.length > 0 && (
        <RecorderChips
          title={format("proofreader", { count: proofreaders.length })}
          recorders={proofreaders}
        />
      )}

      {dubbers.length > 0 && (
        <RecorderChips title={format("dubber", { count: dubbers.length })} recorders={dubbers} />
      )}

      {subbers.length > 0 && (
        <RecorderChips title={format("subber", { count: subbers.length })} recorders={subbers} />
      )}

      {authors.length > 0 && (
        <RecorderChips title={format("author", { count: authors.length })} recorders={authors} />
      )}

      {isDefinedAndNotEmpty(notes) && (
        <div>
          <p className="font-headers font-bold">{format("notes")}:</p>
          <div className="grid place-content-center place-items-center gap-2">
            <Markdawn text={notes} />
          </div>
        </div>
      )}
    </div>
  );
};

interface RecorderChipsProps {
  title: string;
  recorders: { attributes?: RecorderChipFragment | null }[];
}

const RecorderChips = ({ title, recorders }: RecorderChipsProps) => (
  <div className="flex flex-wrap place-content-center place-items-center gap-1">
    <p className="pr-1 font-headers font-bold">{title}:</p>
    {filterHasAttributes(recorders, ["attributes"]).map((recorder) => (
      <RecorderChip key={recorder.attributes.anonymous_code} recorder={recorder.attributes} />
    ))}
  </div>
);
