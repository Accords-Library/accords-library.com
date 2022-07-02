import { cJoin } from "helpers/className";

interface Props {
  children: React.ReactNode;
  width?: ContentPanelWidthSizes;
  className?: string;
}

export enum ContentPanelWidthSizes {
  Default = "default",
  Large = "large",
  Full = "full",
}

export function ContentPanel(props: Props): JSX.Element {
  const { width = ContentPanelWidthSizes.Default, children, className } = props;

  return (
    <div className="grid h-full">
      <main
        className={cJoin(
          "justify-self-center px-4 pt-10 pb-20 desktop:px-10 desktop:pt-20 desktop:pb-32",
          width === ContentPanelWidthSizes.Default
            ? "max-w-2xl"
            : width === ContentPanelWidthSizes.Large
            ? "max-w-4xl"
            : "w-full",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
