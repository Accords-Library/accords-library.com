import Chip from "components/Chip";
import {
  GetContentTextQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";

type RecorderChipProps = {
  className?: string;
  recorder: GetContentTextQuery["contents"]["data"][number]["attributes"]["text_set"][number]["transcribers"]["data"][number];
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function RecorderChip(props: RecorderChipProps): JSX.Element {
  const recorder = props.recorder;
  const langui = props.langui;
  return (
    <Chip key={recorder.id}>
      {recorder.attributes.anonymize
        ? `Recorder#${recorder.attributes.anonymous_code}`
        : recorder.attributes.username}
    </Chip>
  );
}
