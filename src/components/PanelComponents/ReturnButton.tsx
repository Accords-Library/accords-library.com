import Button from "components/Button";
import Link from "next/link";

type ReturnButtonProps = {
  url: string;
  title: string;
};

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  return (
    <Link href={props.url} passHref>
      <Button>❮&emsp;Return to {props.title}</Button>
    </Link>
  );
}
