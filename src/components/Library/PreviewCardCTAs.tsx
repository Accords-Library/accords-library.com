import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { ToolTip } from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { LibraryItemUserStatus } from "helpers/types";

interface Props {
  id: string | null | undefined;
  displayCTAs: boolean;
  expand?: boolean;
  langui: AppStaticProps["langui"];
}

export function PreviewCardCTAs(props: Props): JSX.Element {
  const { id, displayCTAs, expand = false, langui } = props;
  const appLayout = useAppLayout();

  return (
    <>
      {displayCTAs && id && (
        <div
          className={`flex flex-row place-content-center place-items-center ${
            expand ? "gap-4" : "gap-2"
          }`}
        >
          <ToolTip content={langui.want_it} disabled={expand}>
            <Button
              icon={Icon.Favorite}
              text={expand ? langui.want_it : undefined}
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
          <ToolTip content={langui.have_it} disabled={expand}>
            <Button
              icon={Icon.BackHand}
              text={expand ? langui.have_it : undefined}
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
