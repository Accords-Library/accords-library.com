import { ButtonGroup } from "./ButtonGroup";
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
        icon: "first_page",
      },
      {
        onClick: () => page > 1 && onChange(page - 1),
        disabled: page === 1,
        icon: "navigate_before",
      },
      { text: `${page} / ${pagesCount}` },
      {
        onClick: () => page < pagesCount && onChange(page + 1),
        disabled: page === pagesCount,
        icon: "navigate_next",
      },
      {
        onClick: () => onChange(pagesCount),
        disabled: page === pagesCount,
        icon: "last_page",
      },
    ]}
  />
);
