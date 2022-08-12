import { ButtonGroup } from "./ButtonGroup";
import { Icon } from "components/Ico";
import { cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  page: number;
  pagesCount: number;
  onChange: (value: number) => void;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PageSelector = ({
  page,
  className,
  pagesCount,
  onChange,
}: Props): JSX.Element => (
  <ButtonGroup
    className={cJoin("flex flex-row place-content-center", className)}
    buttonsProps={[
      {
        onClick: () => onChange(0),
        disabled: page === 0,
        icon: Icon.FirstPage,
      },
      {
        onClick: () => page > 0 && onChange(page - 1),
        disabled: page === 0,
        icon: Icon.NavigateBefore,
      },
      { text: `${page + 1} / ${pagesCount}` },
      {
        onClick: () => page < pagesCount - 1 && onChange(page + 1),
        disabled: page === pagesCount - 1,
        icon: Icon.NavigateNext,
      },
      {
        onClick: () => onChange(pagesCount - 1),
        disabled: page === pagesCount - 1,
        icon: Icon.LastPage,
      },
    ]}
  />
);
