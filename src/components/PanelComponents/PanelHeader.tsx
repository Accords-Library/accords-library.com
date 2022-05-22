import { HorizontalLine } from "components/HorizontalLine";
import { Ico, Icon } from "components/Ico";
import { Immutable } from "helpers/types";

interface Props {
  icon?: Icon;
  title: string | null | undefined;
  description?: string | null | undefined;
}

export function PanelHeader(props: Immutable<Props>): JSX.Element {
  return (
    <>
      <div className="grid w-full place-items-center">
        {props.icon && <Ico icon={props.icon} className="mb-3 !text-4xl" />}
        <h2 className="text-2xl">{props.title}</h2>
        {props.description ? <p>{props.description}</p> : ""}
      </div>
      <HorizontalLine />
    </>
  );
}
