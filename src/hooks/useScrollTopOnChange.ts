import { DependencyList, useEffect } from "react";
import { getLogger } from "helpers/logger";
import { Ids } from "types/ids";

const logger = getLogger("⬆️ [Scroll Top On Change]");

// Scroll to top of element "id" when "deps" update.
export const useScrollTopOnChange = (id: Ids, deps: DependencyList, enabled = true): void => {
  useEffect(() => {
    if (enabled) {
      logger.log("Change detected. Scrolling to top");
      document.querySelector(`#${CSS.escape(id)}`)?.scrollTo({ top: 0, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ...deps, enabled]);
};
