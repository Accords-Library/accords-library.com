import { cIf, cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/asserts";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  label: string | null | undefined;
  children: React.ReactNode;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const WithLabel = ({ label, children }: Props): JSX.Element => (
  <div className="flex flex-row place-content-between place-items-center gap-2">
    {isDefinedAndNotEmpty(label) && (
      <p className={cJoin("text-left", cIf(label.length < 10, "flex-shrink-0"))}>{label}:</p>
    )}
    {children}
  </div>
);
