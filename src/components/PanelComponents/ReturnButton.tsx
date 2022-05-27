import { HorizontalLine } from "components/HorizontalLine";
import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";

interface Props {
  href: string;
  title: string | null | undefined;
  langui: AppStaticProps["langui"];
  displayOn: ReturnButtonType;
  horizontalLine?: boolean;
  className?: string;
}

export enum ReturnButtonType {
  Mobile = "mobile",
  Desktop = "desktop",
  Both = "both",
}

export function ReturnButton(props: Immutable<Props>): JSX.Element {
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
        text={`${props.langui.return_to} ${props.title}`}
        icon={Icon.NavigateBefore}
      />
      {props.horizontalLine && <HorizontalLine />}
    </div>
  );
}
