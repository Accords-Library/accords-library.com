import { Dispatch, SetStateAction, useState } from "react";

export type SelectProps = {
  setState: Dispatch<SetStateAction<number>>;
  state: number;
  options: string[];
  selected?: number;
  allowEmpty?: boolean;
  className?: string;
  onChange?: Function;
};

export default function Select(props: SelectProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  return (
    <div
      className={`relative transition-[filter] ${
        opened && "drop-shadow-shade-lg z-10"
      } ${props.className}`}
    >
      <div
        className={`outline outline-mid outline-2 outline-offset-[-2px] hover:outline-[transparent] bg-light rounded-[1em] p-1 grid grid-flow-col grid-cols-[1fr_auto_auto] place-items-center cursor-pointer hover:bg-mid transition-all ${
          opened && "outline-[transparent] rounded-b-none"
        }`}
      >
        <p onClick={() => setOpened(!opened)} className="w-full">
          {props.state === -1 ? "—" : props.options[props.state]}
        </p>
        {props.state >= 0 && props.allowEmpty && (
          <span
            onClick={() => props.setState(-1)}
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
        {props.options.map((option, index) => (
          <>
            {index !== props.state && (
              <div
                className="bg-light hover:bg-mid transition-colors cursor-pointer p-1 last-of-type:rounded-b-[1em]"
                key={option}
                id={option}
                onClick={() => {
                  setOpened(false);
                  props.setState(index);
                }}
              >
                {option}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
