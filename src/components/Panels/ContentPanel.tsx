import { Immutable } from "helpers/types";

interface Props {
  children: React.ReactNode;
  autoformat?: boolean;
  width?: ContentPanelWidthSizes;
}

export enum ContentPanelWidthSizes {
  default = "default",
  large = "large",
}

export function ContentPanel(props: Immutable<Props>): JSX.Element {
  const width = props.width ? props.width : ContentPanelWidthSizes.default;
  const widthCSS =
    width === ContentPanelWidthSizes.default ? "max-w-2xl" : "w-full";

  return (
    <div className={`grid px-4 pt-10 pb-20 desktop:py-20 desktop:px-10`}>
      <main
        className={`${
          props.autoformat && "formatted"
        } ${widthCSS} place-self-center`}
      >
        {props.children}
      </main>
    </div>
  );
}
