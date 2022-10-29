import { Ico, Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
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
  disabled?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TextInput = ({
  value,
  onChange,
  className,
  name,
  placeholder,
  disabled = false,
}: Props): JSX.Element => (
  <div className={cJoin("relative", className)}>
    <input
      className="w-full"
      type="text"
      name={name}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
    {isDefinedAndNotEmpty(value) && (
      <div className="absolute right-4 top-0 bottom-0 grid place-items-center">
        <Ico
          className={cJoin("!text-xs", cIf(disabled, "opacity-30 grayscale", "cursor-pointer"))}
          icon={Icon.Close}
          onClick={() => !disabled && onChange("")}
        />
      </div>
    )}
  </div>
);
