import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

type Props = {
  className?: string;
  maxPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function PageSelector(props: Props): JSX.Element {
  const { page, setPage, maxPage } = props;

  return (
    <div className={`flex place-content-center flex-row ${props.className}`}>
      <Button className="rounded-r-none">
        <span
          onClick={() => {
            if (page > 0) setPage(page - 1);
          }}
          className="material-icons"
        >
          navigate_before
        </span>
      </Button>
      <Button className="rounded-none border-x-0">{page + 1}</Button>
      <Button className="rounded-l-none">
        <span
          onClick={() => {
            if (page < maxPage) setPage(page + 1);
          }}
          className="material-icons"
        >
          navigate_next
        </span>
      </Button>
    </div>
  );
}
