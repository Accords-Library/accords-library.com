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
    <div className={`flex place-content-center flex-row ${props.className}`}>
      <Button
        onClick={() => {
          if (page > 0) setPage(page - 1);
        }}
        className="rounded-r-none"
      >
        <span className="material-icons">navigate_before</span>
      </Button>
      <Button className="rounded-none border-x-0">{page + 1}</Button>
      <Button
        onClick={() => {
          if (page < maxPage) setPage(page + 1);
        }}
        className="rounded-l-none"
      >
        <span className="material-icons">navigate_next</span>
      </Button>
    </div>
  );
}
