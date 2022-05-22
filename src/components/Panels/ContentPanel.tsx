import { Immutable } from "helpers/types";

interface Props {
  children: React.ReactNode;
  autoformat?: boolean;
  width?: ContentPanelWidthSizes;
}

export enum ContentPanelWidthSizes {
  Default = "default",
  Large = "large",
}

export function ContentPanel(props: Immutable<Props>): JSX.Element {
  const width = props.width ? props.width : ContentPanelWidthSizes.Default;
  const widthCSS =
    width === ContentPanelWidthSizes.Default ? "max-w-2xl" : "w-full";

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
