import { DependencyList, useEffect } from "react";

export enum AnchorIds {
  ContentPanel = "contentPanel495922447721572",
}

// Scroll to top of element "id" when "deps" update.
export const useScrollTopOnChange = (
  id: AnchorIds,
  deps: DependencyList,
  enabled = true
): void => {
  useEffect(() => {
    if (enabled)
      document
        .querySelector(`#${id}`)
        ?.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ...deps, enabled]);
};
