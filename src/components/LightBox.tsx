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
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

interface Props {
  onCloseRequest: () => void;
  isVisible: boolean;
  image?: UploadImageFragment | string;
  isNextImageAvailable: boolean;
  isPreviousImageAvailable: boolean;
  onPressNext: () => void;
  onPressPrevious: () => void;
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

  useHotkeys("left", () => onPressPrevious(), { enabled: isVisible && isPreviousImageAvailable }, [
    onPressPrevious,
  ]);

  useHotkeys("f", () => requestFullscreen(), { enabled: isVisible && !isFullscreen }, [
    requestFullscreen,
  ]);

  useHotkeys("right", () => onPressNext(), { enabled: isVisible && isNextImageAvailable }, [
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
          "absolute inset-0 grid transition-transform",
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
                    className={`h-[calc(100vh-4rem)] w-full object-contain drop-shadow-2xl
                    shadow-shade`}
                    src={src}
                    quality={ImageQuality.Large}
                  />
                )}
              </TransformComponent>
              <ControlButtons
                isNextImageAvailable={isNextImageAvailable}
                isPreviousImageAvailable={isPreviousImageAvailable}
                isFullscreen={isFullscreen}
                onCloseRequest={() => {
                  resetTransform();
                  exitFullscreen();
                  onCloseRequest();
                }}
                onPressPrevious={() => {
                  resetTransform();
                  onPressPrevious();
                }}
                onPressNext={() => {
                  resetTransform();
                  onPressNext();
                }}
                toggleFullscreen={toggleFullscreen}
              />
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

interface ControlButtonsProps {
  isPreviousImageAvailable: boolean;
  isNextImageAvailable: boolean;
  isFullscreen: boolean;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onCloseRequest: () => void;
  toggleFullscreen: () => void;
}

const ControlButtons = ({
  isFullscreen,
  isPreviousImageAvailable,
  isNextImageAvailable,
  onPressPrevious,
  onPressNext,
  onCloseRequest,
  toggleFullscreen,
}: ControlButtonsProps): JSX.Element => {
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const PreviousButton = () => (
    <Button
      icon={Icon.NavigateBefore}
      onClick={onPressPrevious}
      disabled={!isPreviousImageAvailable}
    />
  );
  const NextButton = () => (
    <Button icon={Icon.NavigateNext} onClick={onPressNext} disabled={!isNextImageAvailable} />
  );

  const FullscreenButton = () => (
    <Button
      icon={isFullscreen ? Icon.FullscreenExit : Icon.Fullscreen}
      onClick={toggleFullscreen}
    />
  );

  const CloseButton = () => <Button onClick={onCloseRequest} icon={Icon.Close} />;

  return is1ColumnLayout ? (
    <>
      <div className="absolute bottom-2 left-0 right-0 grid place-content-center">
        <div className="grid grid-flow-col gap-4 rounded-4xl p-4 backdrop-blur-lg">
          <PreviousButton />
          <FullscreenButton />
          <NextButton />
        </div>
      </div>
      <div className="absolute top-2 right-2 grid gap-4 rounded-4xl p-4 backdrop-blur-lg">
        <CloseButton />
      </div>
    </>
  ) : (
    <>
      {isPreviousImageAvailable && (
        <div
          className={`absolute top-1/2 left-8 grid gap-4 rounded-4xl p-4
          backdrop-blur-lg`}>
          <PreviousButton />
        </div>
      )}
      {isNextImageAvailable && (
        <div
          className={`absolute top-1/2 right-8 grid gap-4 rounded-4xl p-4
          backdrop-blur-lg`}>
          <NextButton />
        </div>
      )}
      <div
        className={`absolute top-4 right-8 grid gap-4 rounded-4xl p-4
        backdrop-blur-lg`}>
        <CloseButton />
        <FullscreenButton />
      </div>
    </>
  );
};
