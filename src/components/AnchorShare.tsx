import { Ico, Icon } from "./Ico";
import { ToolTip } from "./ToolTip";
import { AppStaticProps } from "graphql/getAppStaticProps";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  id: string;
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AnchorShare = ({ id, langui }: Props): JSX.Element => (
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
