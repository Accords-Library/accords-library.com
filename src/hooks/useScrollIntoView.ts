import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCounter } from "usehooks-ts";
import { isDefined } from "helpers/others";

export const useScrollIntoView = (): void => {
  const router = useRouter();
  const { count, increment } = useCounter(0);
  const [hasReachedElem, setHasReachedElem] = useState(false);
  useEffect(() => {
    if (!hasReachedElem) {
      const indexHash = router.asPath.indexOf("#");
      if (indexHash > 0) {
        const hash = router.asPath.slice(indexHash + 1);
        const element = document.getElementById(hash);
        console.log(element);
        if (isDefined(element)) {
          console.log(`[useScrollIntoView] ${hash} found`);
          element.scrollIntoView();
          setHasReachedElem(true);
        } else {
          console.log(`[useScrollIntoView] ${hash} not found`);
          setTimeout(() => {
            increment();
          }, 100);
        }
      }
    }
  }, [increment, router.asPath, count, hasReachedElem, setHasReachedElem]);

  useEffect(() => setHasReachedElem(false), [router.asPath]);
};
