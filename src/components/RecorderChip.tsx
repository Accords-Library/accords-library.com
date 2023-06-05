import { Fragment } from "react";
import { Img } from "./Img";
import { Markdawn } from "./Markdown/Markdawn";
import { ToolTip } from "./ToolTip";
import { Chip } from "components/Chip";
import { ImageQuality } from "helpers/img";
import { filterHasAttributes, isUndefined } from "helpers/asserts";
import { useFormat } from "hooks/useFormat";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  username: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const RecorderChip = ({ username }: Props): JSX.Element => {
  const { format } = useFormat();
  const recorders = useAtomGetter(atoms.localData.recorders);
  const recorder = recorders.find((elem) => elem.attributes?.username === username)?.attributes;

  const [selectedBioTranslation] = useSmartLanguage({
    items: recorder?.bio ?? [],
    languageExtractor: (bio) => bio.language?.data?.attributes?.code,
  });

  if (isUndefined(recorder)) return <></>;

  return (
    <ToolTip
      content={
        <div className="grid gap-8 p-2 py-5 text-left">
          <div className="grid grid-flow-col place-content-start place-items-center gap-6">
            {recorder.avatar?.data?.attributes && (
              <Img
                className="aspect-square w-20 rounded-full border-4 border-mid object-cover"
                src={recorder.avatar.data.attributes}
                quality={ImageQuality.Small}
              />
            )}
            <div className="grid gap-2">
              <h3 className=" text-2xl">{recorder.username}</h3>
              {recorder.languages?.data && recorder.languages.data.length > 0 && (
                <div className="flex flex-row flex-wrap gap-1">
                  <p>{format("language", { count: recorder.languages.data.length })}:</p>
                  {filterHasAttributes(recorder.languages.data, ["attributes"]).map((language) => (
                    <Fragment key={language.__typename}>
                      <Chip text={language.attributes.code.toUpperCase()} />
                    </Fragment>
                  ))}
                </div>
              )}
              {recorder.pronouns && (
                <div className="flex flex-row flex-wrap gap-1">
                  <p>{format("pronouns")}:</p>
                  <Chip text={recorder.pronouns} />
                </div>
              )}
            </div>
          </div>
          {selectedBioTranslation?.bio && <Markdawn text={selectedBioTranslation.bio} />}
        </div>
      }
      placement="top">
      <Chip
        key={recorder.anonymous_code}
        text={recorder.anonymize ? `Recorder#${recorder.anonymous_code}` : recorder.username}
      />
    </ToolTip>
  );
};
