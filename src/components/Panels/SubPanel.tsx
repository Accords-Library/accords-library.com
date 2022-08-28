import { cIf, cJoin } from "helpers/className";
import { useIsSubPanelAtLeast } from "hooks/useContainerQuery";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  children: React.ReactNode;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const SubPanel = ({ children }: Props): JSX.Element => {
  const isSubPanelAtLeastSm = useIsSubPanelAtLeast("2xs");
  return (
    <div
      className={cJoin(
        "grid gap-y-2 text-center",
        cIf(isSubPanelAtLeastSm, "px-10 pt-10 pb-20", "p-4")
      )}>
      {children}
    </div>
  );
};
