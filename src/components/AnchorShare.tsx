import { Ico, Icon } from "./Ico";
import { ToolTip } from "./ToolTip";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  id: string;
  langui: AppStaticProps["langui"];
  className?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AnchorShare = ({ id, langui, className }: Props): JSX.Element => (
  <ToolTip
    content={langui.copy_anchor_link}
    trigger="mouseenter"
    className="text-sm"
  >
    <ToolTip
      content={langui.anchor_link_copied}
      trigger="click"
      className="text-sm"
    >
      <Ico
        icon={Icon.Link}
        className={cJoin(
          "transition-color cursor-pointer hover:text-dark",
          className
        )}
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
