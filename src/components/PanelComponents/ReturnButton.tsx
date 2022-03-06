import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";

type ReturnButtonProps = {
  href: string;
  title: string;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
  displayOn: ReturnButtonType;
  horizontalLine?: boolean;
  className?: string;
};

export enum ReturnButtonType {
  Mobile,
  Desktop,
  Both,
}

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  const appLayout = useAppLayout();

  return (
    <div
      className={`${
        props.displayOn === ReturnButtonType.Mobile
          ? "desktop:hidden"
          : props.displayOn === ReturnButtonType.Desktop
          ? "mobile:hidden"
          : ""
      } ${props.className}`}
    >
      <Button
        onClick={() => appLayout.setSubPanelOpen(false)}
        href={props.href}
      >
        ❮&emsp;{props.langui.return_to} {props.title}
      </Button>
      {props.horizontalLine && <HorizontalLine />}
    </div>
  );
}
