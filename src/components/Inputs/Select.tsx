import { Fragment, useCallback, useRef } from "react";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { Ico } from "components/Ico";
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
  disabled?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Select = ({
  className,
  value,
  options,
  allowEmpty,
  disabled = false,
  onChange,
}: Props): JSX.Element => {
  const { value: isOpened, setFalse: setClosed, toggle: toggleOpened } = useBoolean(false);

  const tryToggling = useCallback(() => {
    if (disabled) return;
    const optionCount = options.length + (value === -1 ? 1 : 0);
    if (optionCount > 1) toggleOpened();
  }, [disabled, options.length, value, toggleOpened]);

  const onSelectionChanged = useCallback(
    (newIndex: number) => {
      setClosed();
      onChange(newIndex);
    },
    [onChange, setClosed]
  );

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, setClosed);

  return (
    <div
      ref={ref}
      className={cJoin(
        "relative text-center transition-filter",
        cIf(isOpened, "z-20 drop-shadow-lg shadow-shade"),
        className
      )}>
      <div
        className={cJoin(
          `grid cursor-pointer select-none grid-flow-col grid-cols-[1fr_auto_auto]
           place-items-center rounded-3xl p-1 outline outline-1 -outline-offset-1`,
          cIf(isOpened, "rounded-b-none bg-highlight outline-transparent"),
          cIf(
            disabled,
            "cursor-not-allowed text-dark opacity-50 outline-dark/60 grayscale",
            "outline-mid transition-all hover:bg-mid hover:outline-transparent"
          )
        )}>
        <p onClick={tryToggling} className="w-full px-4 py-1">
          {value === -1 ? "—" : options[value]}
        </p>
        {value >= 0 && allowEmpty && (
          <Ico
            icon="close"
            className="!text-xs"
            onClick={() => !disabled && onSelectionChanged(-1)}
          />
        )}
        <Ico onClick={tryToggling} icon={isOpened ? "arrow_drop_up" : "arrow_drop_down"} />
      </div>
      <div className={cJoin("left-0 right-0 rounded-b-[1em]", cIf(isOpened, "absolute", "hidden"))}>
        {options.map((option, index) => (
          <Fragment key={index}>
            {index !== value && (
              <div
                className={cJoin(
                  "cursor-pointer p-1 transition-colors last-of-type:rounded-b-[1em] hover:bg-mid",
                  cIf(isOpened, "bg-highlight", "bg-light")
                )}
                id={option}
                onClick={() => onSelectionChanged(index)}>
                {option}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
