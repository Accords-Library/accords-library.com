import { useCallback, useEffect, useMemo, useState } from "react";
import { throttle } from "throttle-debounce";
import { useIsClient } from "usehooks-ts";
import { useOnScroll } from "./useOnScroll";
import { isDefined } from "helpers/others";
import { Ids } from "types/ids";

export const useIntersectionList = (ids: string[]): number => {
  const [currentIntersection, setCurrentIntersection] = useState(-1);

  const isClient = useIsClient();

  const contentPanel = useMemo(
    () => (isClient ? document.getElementById(Ids.ContentPanel) : null),
    [isClient]
  );

  const refreshCurrentIntersection = useCallback(
    (scroll: number) => {
      console.log("useIntersectionList");

      if (!isDefined(contentPanel)) {
        setCurrentIntersection(-1);
        return;
      }

      for (let idIndex = 0; idIndex < ids.length; idIndex++) {
        const elem = document.getElementById(ids[ids.length - 1 - idIndex]);
        const halfScreenOffset = window.screen.height / 2;

        if (isDefined(elem) && scroll > elem.offsetTop - halfScreenOffset) {
          setCurrentIntersection(ids.length - 1 - idIndex);
          return;
        }
      }
      setCurrentIntersection(-1);
    },
    [ids, contentPanel]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledRefreshCurrentIntersection = useCallback(
    throttle(100, refreshCurrentIntersection),
    [refreshCurrentIntersection]
  );

  useOnScroll(Ids.ContentPanel, throttledRefreshCurrentIntersection);

  useEffect(() => refreshCurrentIntersection(0), [refreshCurrentIntersection]);

  return currentIntersection;
};
