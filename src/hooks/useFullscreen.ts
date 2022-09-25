import { useCallback, useEffect, useMemo, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { isDefined } from "helpers/others";

export const useFullscreen = (
  id: string
): { isFullscreen: boolean; toggleFullscreen: () => void } => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isClient = useIsClient();

  const elem = useMemo(() => (isClient ? document.querySelector(`#${id}`) : null), [id, isClient]);

  const toggleFullscreen = useCallback(() => {
    if (elem) {
      if (isFullscreen) {
        document.exitFullscreen();
      } else {
        elem.requestFullscreen();
      }
    }
  }, [elem, isFullscreen]);

  useEffect(() => {
    const onFullscreenChanged = () => {
      setIsFullscreen(isDefined(document.fullscreenElement));
    };
    addEventListener("fullscreenchange", onFullscreenChanged);
    return () => removeEventListener("fullscreenchange", onFullscreenChanged);
  }, []);

  return { isFullscreen, toggleFullscreen };
};
