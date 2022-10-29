import { useState } from "react";
import { Link } from "components/Inputs/Link";
import { cIf, cJoin } from "helpers/className";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  noBackground?: boolean;
  disabled?: boolean;
}

export const UpPressable = ({
  children,
  href,
  className,
  disabled = false,
  noBackground = false,
}: Props): JSX.Element => {
  const [isFocused, setFocused] = useState(false);
  return (
    <Link
      href={href}
      onFocusChanged={setFocused}
      className={cJoin(
        `overflow-hidden rounded-md drop-shadow-lg transition-all duration-300 shadow-shade`,
        cIf(!noBackground, "bg-highlight"),
        cIf(
          disabled,
          "cursor-not-allowed opacity-50 grayscale",
          cJoin(
            "cursor-pointer hover:scale-102 hover:drop-shadow-xl",
            cIf(isFocused, "hover:scale-105 hover:drop-shadow-2xl hover:duration-100")
          )
        ),
        className
      )}
      disabled={disabled}>
      {children}
    </Link>
  );
};
