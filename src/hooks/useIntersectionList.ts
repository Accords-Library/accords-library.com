import { useCallback, useEffect, useState } from "react";
import { throttle } from "throttle-debounce";
import { useIsClient } from "usehooks-ts";
import { useOnScroll } from "./useOnScroll";
import { isDefined, isUndefined } from "helpers/asserts";
import { Ids } from "types/ids";

export const useIntersectionList = (ids: string[]): number => {
  const [currentIntersection, setCurrentIntersection] = useState(-1);

  const isClient = useIsClient();

  const contentPanel = isClient ? document.getElementById(Ids.ContentPanel) : null;

  const refreshCurrentIntersection = useCallback(
    (scroll: number) => {
      console.log("useIntersectionList");

      if (isUndefined(contentPanel)) {
        setCurrentIntersection(-1);
        return;
      }

      for (const [index, id] of [...ids].reverse().entries()) {
        const elem = document.getElementById(id);
        const halfScreenOffset = window.screen.height / 2;

        if (isDefined(elem) && scroll > elem.offsetTop - halfScreenOffset) {
          const unreversedIndex = ids.length - 1 - index;
          setCurrentIntersection(unreversedIndex);
          return;
        }
      }
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
