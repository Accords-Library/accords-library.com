import { useCallback, useEffect, useMemo, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { isDefined } from "helpers/others";

export const useFullscreen = (
  id: string
): {
  isFullscreen: boolean;
  requestFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
} => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isClient = useIsClient();

  const elem = useMemo(() => (isClient ? document.querySelector(`#${id}`) : null), [id, isClient]);

  const requestFullscreen = useCallback(() => elem?.requestFullscreen(), [elem]);
  const exitFullscreen = useCallback(
    async () => isFullscreen && document.exitFullscreen(),
    [isFullscreen]
  );

  const toggleFullscreen = useCallback(
    () => (isFullscreen ? exitFullscreen() : requestFullscreen()),
    [exitFullscreen, isFullscreen, requestFullscreen]
  );

  useEffect(() => {
    const onFullscreenChanged = () => {
      setIsFullscreen(isDefined(document.fullscreenElement));
    };
    addEventListener("fullscreenchange", onFullscreenChanged);
    return () => removeEventListener("fullscreenchange", onFullscreenChanged);
  }, []);

  return { isFullscreen, requestFullscreen, exitFullscreen, toggleFullscreen };
};
