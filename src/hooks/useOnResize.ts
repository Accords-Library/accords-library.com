import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";
import { isDefined } from "helpers/asserts";
import { getLogger } from "helpers/logger";

const logger = getLogger("📏 [Resize Observer]");

export const useOnResize = (
  id: string,
  onResize: (width: number, height: number) => void
): void => {
  const isClient = useIsClient();

  useEffect(() => {
    logger.log(`Creating observer for ${id}`);
    const elem = isClient ? document.querySelector(`#${id}`) : null;
    const ro = new ResizeObserver((resizeObserverEntry) => {
      const entry = resizeObserverEntry[0];
      if (isDefined(entry)) {
        onResize(entry.contentRect.width, entry.contentRect.height);
      }
    });
    if (isDefined(elem)) {
      ro.observe(elem);
    }
    return () => ro.disconnect();
  }, [id, isClient, onResize]);
};
