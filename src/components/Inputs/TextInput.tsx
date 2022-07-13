import { Ico, Icon } from "components/Ico";
import { cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/others";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  name?: string;
  placeholder?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TextInput = ({
  value,
  onChange,
  className,
  name,
  placeholder,
}: Props): JSX.Element => (
  <div className={cJoin("relative", className)}>
    <input
      className="w-full"
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
    {isDefinedAndNotEmpty(value) && (
      <div className="absolute right-4 top-0 bottom-0 grid place-items-center">
        <Ico
          className="cursor-pointer !text-xs"
          icon={Icon.Close}
          onClick={() => {
            onChange("");
          }}
        />
      </div>
    )}
  </div>
);
