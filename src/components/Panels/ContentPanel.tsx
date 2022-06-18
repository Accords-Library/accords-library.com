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
    <div className={`grid px-4 pt-10 pb-20 desktop:py-20 desktop:px-10`}>
      <main
        className={cJoin(
          "place-self-center",
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
