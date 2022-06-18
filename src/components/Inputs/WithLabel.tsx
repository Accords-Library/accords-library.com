import { cIf, cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/others";
import { Immutable } from "helpers/types";

interface Props {
  label: string | null | undefined;
  input: JSX.Element;
  disabled?: boolean;
}

export function WithLabel(props: Immutable<Props>): JSX.Element {
  const { label, input, disabled } = props;
  return (
    <div
      className={cJoin(
        "flex flex-row place-content-between place-items-center gap-2",
        cIf(disabled, "text-dark brightness-150 contrast-75 grayscale")
      )}
    >
      {isDefinedAndNotEmpty(label) && (
        <p
          className={cJoin(
            "text-left",
            cIf(label.length < 10, "flex-shrink-0")
          )}
        >
          {label}:
        </p>
      )}
      {input}
    </div>
  );
}
