import { DependencyList, useEffect } from "react";

export enum AnchorIds {
  Body = "bodyqs65d4a98d56az48z64d",
  ContentPanel = "contentPanel495922447721572",
  SubPanel = "subPanelz9e8rs2d3f18zer98ze",
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
