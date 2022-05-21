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
        opened && "z-10 drop-shadow-shade-lg"
      } ${className}`}
    >
      <div
        className={`grid cursor-pointer grid-flow-col grid-cols-[1fr_auto_auto] place-items-center
        rounded-[1em] bg-light p-1 outline outline-2 outline-offset-[-2px] outline-mid
        transition-all hover:bg-mid hover:outline-[transparent] ${
          opened && "rounded-b-none bg-highlight outline-[transparent]"
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
                } cursor-pointer p-1
                transition-colors last-of-type:rounded-b-[1em] hover:bg-mid`}
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
