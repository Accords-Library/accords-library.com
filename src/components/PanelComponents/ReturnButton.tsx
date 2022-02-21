import Button from "components/Button";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { useDispatch } from "react-redux";
import { setSubPanelOpen } from "redux/appLayoutSlice";

type ReturnButtonProps = {
  href: string;
  title: string;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function ReturnButton(props: ReturnButtonProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(setSubPanelOpen(false))} href={props.href}>
      ❮&emsp;{props.langui.global_return_label} {props.title}
    </Button>
  );
}
