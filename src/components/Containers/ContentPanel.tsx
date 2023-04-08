import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { cIf, cJoin } from "helpers/className";

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

const contentPanelWidthSizesToClassName: Record<ContentPanelWidthSizes, string> = {
  default: "max-w-2xl",
  large: "max-w-4xl",
  full: "w-full",
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ContentPanel = ({
  width = ContentPanelWidthSizes.Default,
  children,
  className,
}: Props): JSX.Element => {
  const isContentPanelAtLeast3xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast3xl);
  return (
    <div className="grid h-full">
      <main
        className={cJoin(
          "relative justify-self-center",
          cIf(isContentPanelAtLeast3xl, "px-10 pb-32 pt-20", "px-4 pb-20 pt-10"),
          contentPanelWidthSizesToClassName[width],
          className
        )}>
        {children}
      </main>
    </div>
  );
};
