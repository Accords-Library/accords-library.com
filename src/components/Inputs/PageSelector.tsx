import { Icon } from "components/Ico";
import { cJoin } from "helpers/className";

import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";

interface Props {
  className?: string;
  maxPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function PageSelector(props: Props): JSX.Element {
  const { page, setPage, maxPage, className } = props;

  return (
    <div className={cJoin("flex flex-row place-content-center", className)}>
      <Button
        onClick={() => setPage((current) => (page > 0 ? current - 1 : current))}
        className="rounded-r-none"
        icon={Icon.NavigateBefore}
      />
      <Button
        className="rounded-none border-x-0"
        text={(page + 1).toString()}
      />
      <Button
        onClick={() =>
          setPage((current) => (page < maxPage ? page + 1 : current))
        }
        className="rounded-l-none"
        icon={Icon.NavigateNext}
      />
    </div>
  );
}
