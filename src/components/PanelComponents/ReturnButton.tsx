import Button from "components/Button";

type ReturnButtonProps = {
  href: string;
  title: string;
};

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  return <Button href={props.href}>❮&emsp;Return to {props.title}</Button>;
}
