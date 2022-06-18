import { cJoin } from "helpers/className";

interface Props {
  children: React.ReactNode;
  width?: ContentPanelWidthSizes;
}

export enum ContentPanelWidthSizes {
  Default = "default",
  Large = "large",
  Full = "full",
}

export function ContentPanel(props: Props): JSX.Element {
  const { width = ContentPanelWidthSizes.Default, children } = props;

  return (
    <div className={`grid h-full px-4 desktop:px-10`}>
      <main
        className={cJoin(
          "justify-self-center pt-10 pb-20 desktop:pt-20 desktop:pb-32",
          width === ContentPanelWidthSizes.Default
            ? "max-w-2xl"
            : width === ContentPanelWidthSizes.Large
            ? "max-w-4xl"
            : "w-full"
        )}
      >
        {children}
      </main>
    </div>
  );
}
