import { forwardRef } from "react";
import { Ico } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/asserts";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  name?: string;
  placeholder?: string | null;
  disabled?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, className, name, placeholder, disabled = false }, ref) => (
    <div className={cJoin("relative", className)}>
      <input
        ref={ref}
        className="w-full"
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder ?? undefined}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      {isDefinedAndNotEmpty(value) && (
        <div className="absolute bottom-0 right-4 top-0 grid place-items-center">
          <Ico
            className={cJoin("!text-xs", cIf(disabled, "opacity-30 grayscale", "cursor-pointer"))}
            icon="close"
            onClick={() => !disabled && onChange("")}
          />
        </div>
      )}
    </div>
  )
);
TextInput.displayName = "TextInput";
