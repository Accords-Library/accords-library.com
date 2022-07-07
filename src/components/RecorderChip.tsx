import { Fragment } from "react";
import { Img } from "./Img";
import { Markdawn } from "./Markdown/Markdawn";
import { ToolTip } from "./ToolTip";
import { Chip } from "components/Chip";
import { RecorderChipFragment } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { ImageQuality } from "helpers/img";
import { filterHasAttributes } from "helpers/others";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  recorder: RecorderChipFragment;
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const RecorderChip = ({ recorder, langui }: Props): JSX.Element => (
  <ToolTip
    content={
      <div className="grid gap-8 p-2 py-5 text-left">
        <div className="grid grid-flow-col place-content-start place-items-center gap-6">
          {recorder.avatar?.data?.attributes && (
            <Img
              className="w-20 rounded-full border-4 border-mid"
              image={recorder.avatar.data.attributes}
              quality={ImageQuality.Small}
            />
          )}
          <div className="grid gap-2">
            <h3 className=" text-2xl">{recorder.username}</h3>
            {recorder.languages?.data && recorder.languages.data.length > 0 && (
              <div className="flex flex-row flex-wrap gap-1">
                <p>{langui.languages}:</p>
                {filterHasAttributes(recorder.languages.data).map(
                  (language) => (
                    <Fragment key={language.attributes.code}>
                      <Chip>{language.attributes.code.toUpperCase()}</Chip>
                    </Fragment>
                  )
                )}
              </div>
            )}
            {recorder.pronouns && (
              <div className="flex flex-row flex-wrap gap-1">
                <p>{langui.pronouns}:</p>
                <Chip>{recorder.pronouns}</Chip>
              </div>
            )}
          </div>
        </div>
        {recorder.bio?.[0] && <Markdawn text={recorder.bio[0].bio ?? ""} />}
      </div>
    }
    placement="top"
  >
    <Chip key={recorder.anonymous_code}>
      {recorder.anonymize
        ? `Recorder#${recorder.anonymous_code}`
        : recorder.username}
    </Chip>
  </ToolTip>
);
