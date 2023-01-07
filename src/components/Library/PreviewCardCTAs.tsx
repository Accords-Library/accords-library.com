import { Button } from "components/Inputs/Button";
import { ToolTip } from "components/ToolTip";
import { LibraryItemUserStatus } from "types/types";
import { cIf, cJoin } from "helpers/className";
import { useLibraryItemUserStatus } from "hooks/useLibraryItemUserStatus";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  id: string;
  expand?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PreviewCardCTAs = ({ id, expand = false }: Props): JSX.Element => {
  const { libraryItemUserStatus, setLibraryItemUserStatus } = useLibraryItemUserStatus();
  const langui = useAtomGetter(atoms.localData.langui);

  return (
    <div
      className={cJoin(
        "flex flex-row flex-wrap place-content-center place-items-center",
        cIf(expand, "gap-4", "gap-2")
      )}>
      <ToolTip content={langui.want_it} disabled={expand}>
        <Button
          icon="favorite"
          text={expand ? langui.want_it : undefined}
          active={libraryItemUserStatus[id] === LibraryItemUserStatus.Want}
          onClick={(event) => {
            event.preventDefault();
            setLibraryItemUserStatus((current) => {
              const newLibraryItemUserStatus = { ...current };
              newLibraryItemUserStatus[id] =
                newLibraryItemUserStatus[id] === LibraryItemUserStatus.Want
                  ? LibraryItemUserStatus.None
                  : LibraryItemUserStatus.Want;
              return newLibraryItemUserStatus;
            });
          }}
        />
      </ToolTip>
      <ToolTip content={langui.have_it} disabled={expand}>
        <Button
          icon="back_hand"
          text={expand ? langui.have_it : undefined}
          active={libraryItemUserStatus[id] === LibraryItemUserStatus.Have}
          onClick={(event) => {
            event.preventDefault();
            setLibraryItemUserStatus((current) => {
              const newLibraryItemUserStatus = { ...current };
              newLibraryItemUserStatus[id] =
                newLibraryItemUserStatus[id] === LibraryItemUserStatus.Have
                  ? LibraryItemUserStatus.None
                  : LibraryItemUserStatus.Have;
              return newLibraryItemUserStatus;
            });
          }}
        />
      </ToolTip>
    </div>
  );
};
