import { Ico, Icon } from "components/Ico";
import { Immutable } from "helpers/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  state: string | undefined;
  setState:
    | Dispatch<SetStateAction<string | undefined>>
    | Dispatch<SetStateAction<string>>;
  className?: string;
  name?: string;
  placeholder?: string;
}

export function TextInput(props: Immutable<Props>): JSX.Element {
  const { state, setState, className, name, placeholder } = props;

  return (
    <div className={`relative ${className}`}>
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
      <div className="absolute right-4 top-0 bottom-0 grid place-items-center">
        {state && (
          <Ico
            className="cursor-pointer !text-xs"
            icon={Icon.Close}
            onClick={() => {
              setState("");
            }}
          />
        )}
      </div>
    </div>
  );
}