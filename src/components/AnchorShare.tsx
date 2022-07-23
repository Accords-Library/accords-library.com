import { useRouter } from "next/router";
import { Ico, Icon } from "./Ico";
import { ToolTip } from "./ToolTip";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  id: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AnchorShare = ({ id }: Props): JSX.Element => (
  <ToolTip
    content={"Copy anchor link"}
    trigger="mouseenter"
    className="text-sm"
  >
    {/* TODO: Langui Copied! */}
    <ToolTip content={"Copied! 👍"} trigger="click" className="text-sm">
      <Ico
        icon={Icon.Link}
        className="transition-color cursor-pointer hover:text-dark"
        onClick={() => {
          navigator.clipboard.writeText(
            `${
              process.env.NEXT_PUBLIC_URL_SELF + window.location.pathname
            }#${id}`
          );
        }}
      />
    </ToolTip>
  </ToolTip>
);
