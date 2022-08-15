import { Fragment, useCallback, useRef } from "react";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { Ico, Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  value: number;
  options: string[];
  selected?: number;
  allowEmpty?: boolean;
  className?: string;
  onChange: (value: number) => void;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Select = ({
  className,
  value,
  options,
  allowEmpty,
  onChange,
}: Props): JSX.Element => {
  const {
    value: isOpened,
    setFalse: setClosed,
    toggle: toggleOpened,
  } = useBoolean(false);

  const tryToggling = useCallback(() => {
    const optionCount = options.length + (value === -1 ? 1 : 0);
    if (optionCount > 1) toggleOpened();
  }, [options.length, value, toggleOpened]);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, setClosed);

  return (
    <div
      ref={ref}
      className={cJoin(
        "relative text-center transition-[filter]",
        cIf(isOpened, "z-10 drop-shadow-shade-lg"),
        className
      )}
    >
      <div
        className={cJoin(
          `grid cursor-pointer grid-flow-col grid-cols-[1fr_auto_auto] place-items-center
          rounded-[1em] bg-light p-1 outline outline-2 outline-offset-[-2px] outline-mid
          transition-all hover:bg-mid hover:outline-[transparent]`,
          cIf(isOpened, "rounded-b-none bg-highlight outline-[transparent]")
        )}
      >
        <p onClick={tryToggling} className="w-full">
          {value === -1 ? "—" : options[value]}
        </p>
        {value >= 0 && allowEmpty && (
          <Ico
            icon={Icon.Close}
            className="!text-xs"
            onClick={() => {
              setClosed();
              onChange(-1);
            }}
          />
        )}
        <Ico
          onClick={tryToggling}
          icon={isOpened ? Icon.ArrowDropUp : Icon.ArrowDropDown}
        />
      </div>
      <div
        className={cJoin(
          "left-0 right-0 rounded-b-[1em]",
          cIf(isOpened, "absolute", "hidden")
        )}
      >
        {options.map((option, index) => (
          <Fragment key={index}>
            {index !== value && (
              <div
                className={cJoin(
                  "cursor-pointer p-1 transition-colors last-of-type:rounded-b-[1em] hover:bg-mid",
                  cIf(isOpened, "bg-highlight", "bg-light")
                )}
                id={option}
                onClick={() => {
                  setClosed();
                  onChange(index);
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
};
