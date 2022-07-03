import { DependencyList, useEffect } from "react";

export enum AnchorIds {
  ContentPanel = "contentPanel495922447721572",
}

// Scroll to top of element "id" when "deps" update.
export const useScrollTopOnChange = (id: AnchorIds, deps: DependencyList) => {
  useEffect(() => {
    document.querySelector(`#${id}`)?.scrollTo({ top: 0, behavior: "smooth" });
  }, deps);
};
