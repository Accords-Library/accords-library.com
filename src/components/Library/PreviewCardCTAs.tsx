import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { ToolTip } from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { LibraryItemUserStatus } from "helpers/types";

interface Props {
  id: string | null | undefined;
  displayCTAs: boolean;
  expand?: boolean;
}

export function PreviewCardCTAs(props: Props): JSX.Element {
  const { id, displayCTAs, expand = false } = props;
  const appLayout = useAppLayout();

  return (
    <>
      {displayCTAs && id && (
        <div
          className={`flex flex-row place-content-center place-items-center ${
            expand ? "gap-4" : "gap-2"
          }`}
        >
          {/* TODO: Add to langui */}
          <ToolTip content="I want it!">
            <Button
              icon={Icon.Favorite}
              text={expand ? "I want it!" : undefined}
              active={
                appLayout.libraryItemUserStatus?.[id] ===
                LibraryItemUserStatus.Want
              }
              onClick={(event) => {
                event.preventDefault();
                appLayout.setLibraryItemUserStatus((current) => {
                  const newLibraryItemUserStatus = current
                    ? { ...current }
                    : {};
                  newLibraryItemUserStatus[id] =
                    newLibraryItemUserStatus[id] === LibraryItemUserStatus.Want
                      ? LibraryItemUserStatus.None
                      : LibraryItemUserStatus.Want;
                  return newLibraryItemUserStatus;
                });
              }}
            />
          </ToolTip>
          <ToolTip content="I have it!">
            <Button
              icon={Icon.BackHand}
              text={expand ? "I have it!" : undefined}
              active={
                appLayout.libraryItemUserStatus?.[id] ===
                LibraryItemUserStatus.Have
              }
              onClick={(event) => {
                event.preventDefault();
                appLayout.setLibraryItemUserStatus((current) => {
                  const newLibraryItemUserStatus = current
                    ? { ...current }
                    : {};
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
      )}
    </>
  );
}
