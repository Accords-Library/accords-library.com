import { useMemo, useCallback, useEffect } from "react";
import { useIsClient } from "usehooks-ts";
import { isDefined } from "helpers/others";

export const useOnResize = (
  id: string,
  onResize: (width: number, height: number) => void
): void => {
  const isClient = useIsClient();
  const elem = useMemo(
    () => (isClient ? document.querySelector(`#${id}`) : null),
    [id, isClient]
  );

  const listener = useCallback(() => {
    console.log("useOnResize");
    if (elem?.clientWidth && elem.clientHeight) {
      onResize(elem.clientWidth, elem.clientHeight);
    }
  }, [elem?.clientHeight, elem?.clientWidth, onResize]);

  useEffect(() => {
    const ro = new ResizeObserver(listener);
    if (isDefined(elem)) {
      ro.observe(elem);
    }
    return () => ro.disconnect();
  }, [elem, listener]);
};
