import { HorizontalLine } from "components/HorizontalLine";
import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cJoin } from "helpers/className";

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

export function ReturnButton(props: Props): JSX.Element {
  const { href, title, langui, displayOn, horizontalLine, className } = props;
  const appLayout = useAppLayout();

  return (
    <div
      className={cJoin(
        displayOn === ReturnButtonType.Mobile
          ? "desktop:hidden"
          : displayOn === ReturnButtonType.Desktop
          ? "mobile:hidden"
          : "",
        className
      )}
    >
      <Button
        onClick={() => appLayout.setSubPanelOpen(false)}
        href={href}
        text={`${langui.return_to} ${title}`}
        icon={Icon.NavigateBefore}
      />
      {horizontalLine === true && <HorizontalLine />}
    </div>
  );
}
