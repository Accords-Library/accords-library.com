import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { cIf, cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  children: React.ReactNode;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const SubPanel = ({ children }: Props): JSX.Element => {
  const isSubPanelAtLeastXs = useAtomGetter(atoms.containerQueries.isSubPanelAtLeastXs);
  return (
    <div
      className={cJoin(
        "grid gap-y-2 text-center",
        cIf(isSubPanelAtLeastXs, "px-10 pt-10 pb-20", "p-4")
      )}>
      {children}
    </div>
  );
};
