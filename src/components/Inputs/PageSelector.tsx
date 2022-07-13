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
  onChange: (value: number) => void;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PageSelector = ({
  page,
  className,
  onChange,
}: Props): JSX.Element => (
  <ButtonGroup
    className={cJoin("flex flex-row place-content-center", className)}
    buttonsProps={[
      { onClick: () => onChange(page - 1), icon: Icon.NavigateBefore },
      { text: (page + 1).toString() },
      { onClick: () => onChange(page + 1), icon: Icon.NavigateNext },
    ]}
  />
);
