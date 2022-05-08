import HorizontalLine from "components/HorizontalLine";
import { Immutable } from "helpers/types";

interface Props {
  icon?: string;
  title: string | null | undefined;
  description?: string | null | undefined;
}

export default function PanelHeader(props: Immutable<Props>): JSX.Element {
  return (
    <>
      <div className="w-full grid place-items-center">
        {props.icon && (
          <span className="material-icons !text-4xl mb-3">{props.icon}</span>
        )}
        <h2 className="text-2xl">{props.title}</h2>
        {props.description ? <p>{props.description}</p> : ""}
      </div>
      <HorizontalLine />
    </>
  );
}
