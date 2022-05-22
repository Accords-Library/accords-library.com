import { Icon } from "components/Ico";
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
  const { page, setPage, maxPage } = props;

  return (
    <div className={`flex flex-row place-content-center ${props.className}`}>
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
