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

export const PageSelector = ({ page, className, pagesCount, onChange }: Props): JSX.Element => (
  <ButtonGroup
    className={cJoin("flex flex-row place-content-center", className)}
    buttonsProps={[
      {
        onClick: () => onChange(1),
        disabled: page === 1,
        icon: Icon.FirstPage,
      },
      {
        onClick: () => page > 1 && onChange(page - 1),
        disabled: page === 1,
        icon: Icon.NavigateBefore,
      },
      { text: `${page} / ${pagesCount}` },
      {
        onClick: () => page < pagesCount && onChange(page + 1),
        disabled: page === pagesCount,
        icon: Icon.NavigateNext,
      },
      {
        onClick: () => onChange(pagesCount),
        disabled: page === pagesCount,
        icon: Icon.LastPage,
      },
    ]}
  />
);
