import { Ico } from "./Ico";
import { ToolTip } from "./ToolTip";
import { cJoin } from "helpers/className";
import { useFormat } from "hooks/useFormat";

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
  const { format } = useFormat();
  return (
    <ToolTip content={format("copy_anchor_link")} trigger="mouseenter" className="text-sm">
      <ToolTip content={format("anchor_link_copied")} trigger="click" className="text-sm">
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
