import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { ToolTip } from "components/ToolTip";
import { LibraryItemUserStatus } from "types/types";
import { cIf, cJoin } from "helpers/className";
import { useLocalData } from "contexts/LocalDataContext";
import { useLibraryItemUserStatus } from "hooks/useLibraryItemUserStatus";

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
  const { langui } = useLocalData();

  return (
    <div
      className={cJoin(
        "flex flex-row flex-wrap place-content-center place-items-center",
        cIf(expand, "gap-4", "gap-2")
      )}>
      <ToolTip content={langui.want_it} disabled={expand}>
        <Button
          icon={Icon.Favorite}
          text={expand ? langui.want_it : undefined}
          active={libraryItemUserStatus[id] === LibraryItemUserStatus.Want}
          onMouseUp={(event) => event.stopPropagation()}
          onClick={() => {
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
          icon={Icon.BackHand}
          text={expand ? langui.have_it : undefined}
          active={libraryItemUserStatus[id] === LibraryItemUserStatus.Have}
          onMouseUp={(event) => event.stopPropagation()}
          onClick={() => {
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
