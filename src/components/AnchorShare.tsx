import { Ico } from "./Ico";
import { ToolTip } from "./ToolTip";
import { cJoin } from "helpers/className";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  id: string;
  className?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AnchorShare = ({ id, className }: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  return (
    <ToolTip content={langui.copy_anchor_link} trigger="mouseenter" className="text-sm">
      <ToolTip content={langui.anchor_link_copied} trigger="click" className="text-sm">
        <Ico
          icon="link"
          className={cJoin("cursor-pointer transition-colors hover:text-dark", className)}
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_URL_SELF + window.location.pathname}#${id}`
            );
          }}
        />
      </ToolTip>
    </ToolTip>
  );
};
