import Chip from "components/Chip";
import {
  GetContentTextQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { useState } from "react";
import Img, { ImageQuality } from "./Img";
import ToolTip from "./ToolTip";

type RecorderChipProps = {
  className?: string;
  recorder: GetContentTextQuery["contents"]["data"][number]["attributes"]["text_set"][number]["transcribers"]["data"][number];
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function RecorderChip(props: RecorderChipProps): JSX.Element {
  const recorder = props.recorder;
  const langui = props.langui;

  const [hovered, setHovered] = useState(false);

  return (
    <Chip
      key={recorder.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {recorder.attributes.anonymize
        ? `Recorder#${recorder.attributes.anonymous_code}`
        : recorder.attributes.username}

      <ToolTip
        hovered={hovered}
        direction="top"
        offset="1.5rem"
        delayShow={150}
      >
        <div className="p-2 py-5 grid gap-2">
          <div className="grid grid-flow-col gap-2 place-items-center place-content-start">
            {recorder.attributes.avatar.data && (
              <Img
                className="w-8 rounded-full"
                image={recorder.attributes.avatar.data.attributes}
                quality={ImageQuality.Small}
                rawImg
              />
            )}
            <h3 className="text-xl">{recorder.attributes.username}</h3>
          </div>
          {recorder.attributes.languages.data.length > 0 && (
            <div className="flex flex-row flex-wrap gap-1">
              <p>{langui.languages}:</p>
              {recorder.attributes.languages.data.map((language) => (
                <Chip key={language.attributes.code}>
                  {language.attributes.code.toUpperCase()}
                </Chip>
              ))}
            </div>
          )}
          {recorder.attributes.pronouns && (
            <div className="flex flex-row flex-wrap gap-1">
              <p>{langui.pronouns}:</p>
              <Chip>{recorder.attributes.pronouns}</Chip>
            </div>
          )}
          <p>
            {recorder.attributes.bio.length > 0 &&
              recorder.attributes.bio[0].bio}
          </p>
        </div>
      </ToolTip>
    </Chip>
  );
}
