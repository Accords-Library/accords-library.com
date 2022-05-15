import { Chip } from "components/Chip";
import { RecorderChipFragment } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { ImageQuality } from "helpers/img";
import { Immutable } from "helpers/types";
import { Img } from "./Img";
import { Markdawn } from "./Markdown/Markdawn";
import { ToolTip } from "./ToolTip";

interface Props {
  className?: string;
  recorder: RecorderChipFragment;
  langui: AppStaticProps["langui"];
}

export function RecorderChip(props: Immutable<Props>): JSX.Element {
  const { recorder, langui } = props;
  return (
    <ToolTip
      content={
        <div className="text-left p-2 py-5 grid gap-8">
          <div className="grid grid-flow-col gap-6 place-items-center place-content-start">
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
                  {recorder.languages.data.map((language) => (
                    <>
                      {language.attributes && (
                        <Chip key={language.attributes.code}>
                          {language.attributes.code.toUpperCase()}
                        </Chip>
                      )}
                    </>
                  ))}
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
}
