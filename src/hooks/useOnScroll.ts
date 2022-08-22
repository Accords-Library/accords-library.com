import { useMemo, useCallback, useEffect } from "react";
import { useIsClient } from "usehooks-ts";
import { AnchorIds } from "./useScrollTopOnChange";

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
    return () => elem?.removeEventListener("scroll", listener);
  }, [elem, listener]);
};
