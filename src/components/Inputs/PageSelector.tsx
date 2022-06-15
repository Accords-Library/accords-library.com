import { Icon } from "components/Ico";
import { cJoin } from "helpers/className";
import { Immutable } from "helpers/types";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";

interface Props {
  className?: string;
  maxPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function PageSelector(props: Immutable<Props>): JSX.Element {
  const { page, setPage, maxPage, className } = props;

  return (
    <div className={cJoin("flex flex-row place-content-center", className)}>
      <Button
        onClick={() => {
          if (page > 0) setPage(page - 1);
        }}
        className="rounded-r-none"
        icon={Icon.NavigateBefore}
      />
      <Button
        className="rounded-none border-x-0"
        text={(page + 1).toString()}
      />
      <Button
        onClick={() => {
          if (page < maxPage) setPage(page + 1);
        }}
        className="rounded-l-none"
        icon={Icon.NavigateNext}
      />
    </div>
  );
}
