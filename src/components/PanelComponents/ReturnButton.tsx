import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "queries/getAppStaticProps";

type ReturnButtonProps = {
  href: string;
  title: string | null | undefined;
  langui: AppStaticProps["langui"];
  displayOn: ReturnButtonType;
  horizontalLine?: boolean;
  className?: string;
};

export enum ReturnButtonType {
  mobile = "mobile",
  desktop = "desktop",
  both = "both",
}

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  const appLayout = useAppLayout();

  return (
    <div
      className={`${
        props.displayOn === ReturnButtonType.mobile
          ? "desktop:hidden"
          : props.displayOn === ReturnButtonType.desktop
          ? "mobile:hidden"
          : ""
      } ${props.className}`}
    >
      <Button
        onClick={() => appLayout.setSubPanelOpen(false)}
        href={props.href}
        className="grid grid-flow-col gap-2"
      >
        <span className="material-icons">navigate_before</span>
        {props.langui.return_to} {props.title}
      </Button>
      {props.horizontalLine && <HorizontalLine />}
    </div>
  );
}
