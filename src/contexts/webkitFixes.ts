import { useLayoutEffect } from "react";
import { isDefined } from "helpers/others";
import { useIsWebkit } from "hooks/useIsWebkit";

export const useWebkitFixes = (): void => {
  const isWebkit = useIsWebkit();

  useLayoutEffect(() => {
    const next = document.getElementById("__next");
    if (isDefined(next)) {
      if (isWebkit) {
        next.classList.add("webkit-fixes");
      } else {
        next.classList.remove("webkit-fixes");
      }
    }
  }, [isWebkit]);
};
