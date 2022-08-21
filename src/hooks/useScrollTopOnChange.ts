import { DependencyList, useCallback, useEffect, useMemo } from "react";
import { useIsClient } from "usehooks-ts";

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

export const useOnScroll = (
  id: AnchorIds,
  onScroll: (scroll: number) => void
): void => {
  const isClient = useIsClient();
  const elem = useMemo(
    () => (isClient ? document.querySelector(`#${id}`) : null),
    [id, isClient]
  );
  const listener = useCallback(() => {
    if (elem?.scrollTop) {
      onScroll(elem.scrollTop);
    }
  }, [elem?.scrollTop, onScroll]);
  useEffect(() => {
    elem?.addEventListener("scroll", listener);
    return () => elem?.removeEventListener("scrool", listener);
  }, [elem, listener]);
};
