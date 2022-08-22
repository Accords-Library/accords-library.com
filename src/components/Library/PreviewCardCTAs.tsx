import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { ToolTip } from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { LibraryItemUserStatus } from "helpers/types";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  id: string;
  expand?: boolean;
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PreviewCardCTAs = ({
  id,
  expand = false,
  langui,
}: Props): JSX.Element => {
  const { libraryItemUserStatus, setLibraryItemUserStatus } = useAppLayout();
  return (
    <>
      <div
        className={`flex flex-row flex-wrap place-content-center place-items-center ${
          expand ? "gap-4" : "gap-2"
        }`}
      >
        <ToolTip content={langui.want_it} disabled={expand}>
          <Button
            icon={Icon.Favorite}
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
            icon={Icon.BackHand}
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
    </>
  );
};
