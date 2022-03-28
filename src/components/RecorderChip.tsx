import Chip from "components/Chip";
import {
  GetContentTextQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import Button from "./Button";
import Img, { ImageQuality } from "./Img";
import ToolTip from "./ToolTip";

type RecorderChipProps = {
  className?: string;
  recorder: GetContentTextQuery["contents"]["data"][number]["attributes"]["text_set"][number]["transcribers"]["data"][number];
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function RecorderChip(props: RecorderChipProps): JSX.Element {
  const { recorder, langui } = props;

  return (
    <ToolTip
      content={
        <div className="text-left p-2 py-5 grid gap-8">
          <div className="grid grid-flow-col gap-6 place-items-center place-content-start">
            {recorder.attributes.avatar.data && (
              <Img
                className="w-20 rounded-full border-4 border-mid"
                image={recorder.attributes.avatar.data.attributes}
                quality={ImageQuality.Small}
                rawImg
              />
            )}
            <div className="grid gap-2">
              <h3 className=" text-2xl">{recorder.attributes.username}</h3>
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
            </div>
          </div>

          {recorder.attributes.bio.length > 0 && (
            <p>{recorder.attributes.bio[0].bio}</p>
          )}

          <Button className="cursor-not-allowed">View profile</Button>
        </div>
      }
      placement="top"
    >
      <Chip key={recorder.id}>
        {recorder.attributes.anonymize
          ? `Recorder#${recorder.attributes.anonymous_code}`
          : recorder.attributes.username}
      </Chip>
    </ToolTip>
  );
}
