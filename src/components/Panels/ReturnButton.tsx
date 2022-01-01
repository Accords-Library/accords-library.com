import styles from "styles/Panels/ReturnButton.module.css";
import Link from "next/link";

type ReturnButtonProps = {
  url: string;
  title: string;
};

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  return (
    <Link href={props.url} passHref>
      <button>❮&emsp;Return to {props.title}</button>
    </Link>
  );
}
