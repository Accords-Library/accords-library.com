import { useEffect, useState } from "react";

export type SelectProps = {
  options: SelectOption[];
  selected?: number;
  allowEmpty?: boolean;
  className?: string;
  onChange?: Function;
};

export type SelectOption = {
  name: string;
  label: string;
};

export default function Select(props: SelectProps): JSX.Element {
  const [selected, setSelected] = useState(
    props.selected ? props.selected : props.allowEmpty ? -1 : 0
  );
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (props.onChange) {
      if (selected >= 0) {
        props.onChange(props.options[selected].name);
      } else {
        props.onChange("");
      }
    }
  }, [props, selected]);

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
          {selected === -1 ? "—" : props.options[selected].label}
        </p>
        {selected >= 0 && props.allowEmpty && (
          <span
            onClick={() => setSelected(-1)}
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
            {index !== selected && (
              <div
                className="bg-light hover:bg-mid transition-colors cursor-pointer p-1 last-of-type:rounded-b-[1em]"
                key={option.name}
                id={option.name}
                onClick={() => {
                  setOpened(false);
                  setSelected(index);
                }}
              >
                {option.label}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
