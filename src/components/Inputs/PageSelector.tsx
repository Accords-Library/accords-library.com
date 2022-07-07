import { Dispatch, SetStateAction } from "react";
import { ButtonGroup } from "./ButtonGroup";
import { Icon } from "components/Ico";
import { cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  maxPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PageSelector = ({
  page,
  setPage,
  maxPage,
  className,
}: Props): JSX.Element => (
  <ButtonGroup
    className={cJoin("flex flex-row place-content-center", className)}
    buttonsProps={[
      {
        onClick: () => setPage((current) => (page > 0 ? current - 1 : current)),
        icon: Icon.NavigateBefore,
      },
      {
        text: (page + 1).toString(),
      },
      {
        onClick: () =>
          setPage((current) => (page < maxPage ? page + 1 : current)),
        icon: Icon.NavigateNext,
      },
    ]}
  />
);
