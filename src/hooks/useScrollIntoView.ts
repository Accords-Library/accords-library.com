import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCounter } from "usehooks-ts";
import { isDefined } from "helpers/asserts";
import { getLogger } from "helpers/logger";

const NUM_RETRIES = 10;
const DELAY_BETWEEN_RETRY = 200;
const logger = getLogger("↕️ [Scroll Into View]");

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
              logger.log(`#${hash} found`);
              element.scrollIntoView();
              setHasReachedElem(true);
            } else {
              logger.warn(`#${hash} not found, retrying in ${DELAY_BETWEEN_RETRY} ms`);
              setTimeout(() => {
                increment();
              }, DELAY_BETWEEN_RETRY);
            }
          }
        }
      }
  }, [router.asPath, hasReachedElem, setHasReachedElem, increment, count]);

  useEffect(() => setHasReachedElem(false), [router.asPath]);
};
