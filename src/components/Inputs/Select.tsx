import { Immutable } from "helpers/types";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

interface Props {
  setState: Dispatch<SetStateAction<number>>;
  state: number;
  options: string[];
  selected?: number;
  allowEmpty?: boolean;
  className?: string;
}

export function Select(props: Immutable<Props>): JSX.Element {
  const { className, state, options, allowEmpty, setState } = props;
  const [opened, setOpened] = useState(false);

  return (
    <div
      className={`relative text-center transition-[filter] ${
        opened && "drop-shadow-shade-lg z-10"
      } ${className}`}
    >
      <div
        className={`outline outline-mid outline-2 outline-offset-[-2px] hover:outline-[transparent]
        bg-light rounded-[1em] p-1 grid grid-flow-col grid-cols-[1fr_auto_auto] place-items-center
        cursor-pointer hover:bg-mid transition-all ${
          opened && "outline-[transparent] rounded-b-none bg-highlight"
        }`}
      >
        <p onClick={() => setOpened(!opened)} className="w-full">
          {state === -1 ? "—" : options[state]}
        </p>
        {state >= 0 && allowEmpty && (
          <span
            onClick={() => setState(-1)}
            className="material-icons !text-xs"
          >
            close
          </span>
        )}
        <span onClick={() => setOpened(!opened)} className="material-icons">
          {opened ? "arrow_drop_up" : "arrow_drop_down"}
        </span>
      </div>
      <div
        className={`left-0 right-0 rounded-b-[1em] ${
          opened ? "absolute" : "hidden"
        }`}
      >
        {options.map((option, index) => (
          <Fragment key={index}>
            {index !== state && (
              <div
                className={` ${
                  opened ? "bg-highlight" : "bg-light"
                } hover:bg-mid transition-colors
                cursor-pointer p-1 last-of-type:rounded-b-[1em]`}
                id={option}
                onClick={() => {
                  setOpened(false);
                  setState(index);
                }}
              >
                {option}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
