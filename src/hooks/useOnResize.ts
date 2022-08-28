import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";
import { isDefined } from "helpers/others";

export const useOnResize = (
  id: string,
  onResize: (width: number, height: number) => void
): void => {
  const isClient = useIsClient();

  useEffect(() => {
    console.log("[useOnResize]", id);
    const elem = isClient ? document.querySelector(`#${id}`) : null;
    const ro = new ResizeObserver((resizeObserverEntry) =>
      onResize(
        resizeObserverEntry[0].contentRect.width,
        resizeObserverEntry[0].contentRect.height
      )
    );
    if (isDefined(elem)) {
      ro.observe(elem);
    }
    return () => ro.disconnect();
  }, [id, isClient, onResize]);
};
