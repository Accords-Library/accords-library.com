import { Ico, Icon } from "components/Ico";
import { isDefinedAndNotEmpty } from "helpers/others";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  icon?: Icon;
  title: string | null | undefined;
  description?: string | null | undefined;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PanelHeader = ({
  icon,
  description,
  title,
}: Props): JSX.Element => (
  <>
    <div className="grid w-full place-items-center">
      {icon && <Ico icon={icon} className="mb-3 !text-4xl" />}
      <h2 className="text-2xl">{title}</h2>
      {isDefinedAndNotEmpty(description) && <p>{description}</p>}
    </div>
  </>
);
