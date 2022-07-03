import { Ico, Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { isDefined } from "helpers/others";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  message: string;
  icon?: Icon;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ContentPlaceholder = ({ message, icon }: Props): JSX.Element => (
  <div className="grid h-full place-content-center">
    <div
      className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
        border-dark p-8 text-dark opacity-40"
    >
      {isDefined(icon) && <Ico icon={icon} className="!text-[300%]" />}
      <p
        className={cJoin("w-64 text-2xl", cIf(!isDefined(icon), "text-center"))}
      >
        {message}
      </p>
    </div>
  </div>
);
