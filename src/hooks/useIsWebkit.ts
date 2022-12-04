import { useMemo } from "react";
import UAParser from "ua-parser-js";
import { useIsClient } from "usehooks-ts";

export const useIsWebkit = (): boolean => {
  const isClient = useIsClient();
  return useMemo<boolean>(() => {
    if (isClient) {
      const parser = new UAParser();
      return parser.getBrowser().name === "Safari" || parser.getOS().name === "iOS";
    }
    return false;
  }, [isClient]);
};
