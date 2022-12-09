import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCounter } from "usehooks-ts";
import { isDefined } from "helpers/asserts";

const NUM_RETRIES = 10;

export const useScrollIntoView = (): void => {
  const router = useRouter();
  const { count, increment } = useCounter(0);
  const [hasReachedElem, setHasReachedElem] = useState(false);
  useEffect(() => {
    if (count < NUM_RETRIES)
      if (!hasReachedElem) {
        const indexHash = router.asPath.indexOf("#");
        if (indexHash > 0) {
          const hash = router.asPath.slice(indexHash + 1);
          if (hash !== "") {
            const element = document.getElementById(hash);
            if (isDefined(element)) {
              console.log(`[useScrollIntoView] ${hash} found`);
              element.scrollIntoView();
              setHasReachedElem(true);
            } else {
              console.log(`[useScrollIntoView] ${hash} not found`);
              setTimeout(() => {
                increment();
              }, 200);
            }
          }
        }
      }
  }, [router.asPath, hasReachedElem, setHasReachedElem, increment, count]);

  useEffect(() => setHasReachedElem(false), [router.asPath]);
};
