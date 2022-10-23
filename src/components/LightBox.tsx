import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Img } from "./Img";
import { Button } from "./Inputs/Button";
import { Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { useFullscreen } from "hooks/useFullscreen";
import { Ids } from "types/ids";
import { UploadImageFragment } from "graphql/generated";
import { ImageQuality } from "helpers/img";
import { isDefined } from "helpers/others";

interface Props {
  onCloseRequest: () => void;
  isVisible: boolean;
  image?: UploadImageFragment | string;
  isNextImageAvailable?: boolean;
  isPreviousImageAvailable?: boolean;
  onPressNext?: () => void;
  onPressPrevious?: () => void;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const LightBox = ({
  onCloseRequest,
  isVisible,
  image: src,
  isPreviousImageAvailable = false,
  onPressPrevious,
  isNextImageAvailable = false,
  onPressNext,
}: Props): JSX.Element => {
  const [currentZoom, setCurrentZoom] = useState(1);
  const { isFullscreen, toggleFullscreen, exitFullscreen, requestFullscreen } = useFullscreen(
    Ids.LightBox
  );

  useHotkeys(
    "left",
    () => onPressPrevious?.(),
    { enabled: isVisible && isPreviousImageAvailable },
    [onPressPrevious]
  );

  useHotkeys("f", () => requestFullscreen(), { enabled: isVisible && !isFullscreen }, [
    requestFullscreen,
  ]);

  useHotkeys("right", () => onPressNext?.(), { enabled: isVisible && isNextImageAvailable }, [
    onPressNext,
  ]);

  useHotkeys("escape", onCloseRequest, { enabled: isVisible }, [onCloseRequest]);

  return (
    <div
      id={Ids.LightBox}
      className={cJoin(
        "fixed inset-0 z-50 grid place-content-center transition-filter duration-500",
        cIf(isVisible, "backdrop-blur", "pointer-events-none touch-none")
      )}>
      <div
        className={cJoin(
          "fixed inset-0 bg-shade transition-all duration-500",
          cIf(isVisible, "bg-opacity-50", "bg-opacity-0")
        )}
      />
      <div
        className={cJoin(
          "absolute inset-8 grid transition-transform",
          cIf(isVisible, "scale-100", "scale-0")
        )}>
        <TransformWrapper
          onZoom={(zoom) => setCurrentZoom(zoom.state.scale)}
          panning={{ disabled: currentZoom <= 1, velocityDisabled: false }}
          doubleClick={{ disabled: true, mode: "reset" }}
          zoomAnimation={{ size: 0.1 }}
          velocityAnimation={{ animationTime: 0, equalToMove: true }}>
          {({ resetTransform }) => (
            <>
              <TransformComponent
                wrapperStyle={{
                  overflow: "visible",
                  placeSelf: "center",
                }}>
                {isDefined(src) && (
                  <Img
                    className={`drop-shadow-shade-2xl-shade h-[calc(100vh-4rem)] w-full
                    object-contain`}
                    src={src}
                    quality={ImageQuality.Large}
                  />
                )}
              </TransformComponent>

              {isPreviousImageAvailable && (
                <div
                  className={`absolute top-1/2 left-0 grid gap-4 rounded-[2rem] p-4
                  backdrop-blur-lg`}>
                  <Button icon={Icon.NavigateBefore} onClick={onPressPrevious} />
                </div>
              )}

              {isNextImageAvailable && (
                <div
                  className={`absolute top-1/2 right-0 grid gap-4 rounded-[2rem] p-4
                    backdrop-blur-lg`}>
                  <Button icon={Icon.NavigateNext} onClick={onPressNext} />{" "}
                </div>
              )}

              <div
                className={`absolute top-0 right-0 grid gap-4 rounded-[2rem] p-4
                backdrop-blur-lg`}>
                <Button
                  onClick={() => {
                    resetTransform();
                    exitFullscreen();
                    onCloseRequest();
                  }}
                  icon={Icon.Close}
                />
                <Button
                  icon={isFullscreen ? Icon.FullscreenExit : Icon.Fullscreen}
                  onClick={toggleFullscreen}
                />
              </div>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};
