import { cIf, cJoin } from "helpers/className";
import { useIsContentPanelAtLeast } from "hooks/useContainerQuery";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

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

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ContentPanel = ({
  width = ContentPanelWidthSizes.Default,
  children,
  className,
}: Props): JSX.Element => {
  const isContentPanelAtLeast3xl = useIsContentPanelAtLeast("3xl");
  return (
    <div className="grid h-full">
      <main
        className={cJoin(
          "justify-self-center px-4 pt-10 pb-20 relative",
          cIf(isContentPanelAtLeast3xl, "px-10 pt-20 pb-32"),
          width === ContentPanelWidthSizes.Default
            ? "max-w-2xl"
            : width === ContentPanelWidthSizes.Large
            ? "max-w-4xl"
            : "w-full",
          className
        )}>
        {children}
      </main>
    </div>
  );
};
