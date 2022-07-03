import { Ico, Icon } from "components/Ico";
import { cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/others";
import { Dispatch, SetStateAction } from "react";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  state: string | undefined;
  setState:
    | Dispatch<SetStateAction<string | undefined>>
    | Dispatch<SetStateAction<string>>;
  className?: string;
  name?: string;
  placeholder?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TextInput = ({
  state,
  setState,
  className,
  name,
  placeholder,
}: Props): JSX.Element => (
  <div className={cJoin("relative", className)}>
    <input
      className="w-full"
      type="text"
      name={name}
      value={state}
      placeholder={placeholder}
      onChange={(event) => {
        setState(event.target.value);
      }}
    />
    {isDefinedAndNotEmpty(state) && (
      <div className="absolute right-4 top-0 bottom-0 grid place-items-center">
        <Ico
          className="cursor-pointer !text-xs"
          icon={Icon.Close}
          onClick={() => {
            setState("");
          }}
        />
      </div>
    )}
  </div>
);
