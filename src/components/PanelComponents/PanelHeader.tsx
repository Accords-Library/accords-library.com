import { HorizontalLine } from "components/HorizontalLine";
import { Immutable } from "helpers/types";

interface Props {
  icon?: string;
  title: string | null | undefined;
  description?: string | null | undefined;
}

export function PanelHeader(props: Immutable<Props>): JSX.Element {
  return (
    <>
      <div className="grid w-full place-items-center">
        {props.icon && (
          <span className="material-icons mb-3 !text-4xl">{props.icon}</span>
        )}
        <h2 className="text-2xl">{props.title}</h2>
        {props.description ? <p>{props.description}</p> : ""}
      </div>
      <HorizontalLine />
    </>
  );
}
