import Button from "components/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";

type ReturnButtonProps = {
  href: string;
  title: string;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  const appLayout = useAppLayout();

  return (
    <Button onClick={() => appLayout.setSubPanelOpen(false)} href={props.href}>
      ❮&emsp;{props.langui.global_return_label} {props.title}
    </Button>
  );
}
