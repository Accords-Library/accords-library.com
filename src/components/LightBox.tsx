import { Dispatch, SetStateAction, useCallback, useState } from "react";
import Hotkeys from "react-hot-keys";
import { useSwipeable } from "react-swipeable";
import { Img } from "./Img";
import { Button } from "./Inputs/Button";
import { Popup } from "./Popup";
import { Icon } from "components/Ico";
import { clamp } from "helpers/numbers";
import { cIf, cJoin } from "helpers/className";
import { useElementSize } from "hooks/useElementSize";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const SENSIBILITY_SWIPE = 0.5;
const TRANSLATION_PADDING = 100;
const SCALE_MAX = 5;
const SCALE_ON_DOUBLE_CLICK = 2;
const IMGWIDTH = 876;
const IMGHEIGHT = 1247;

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  setState:
    | Dispatch<SetStateAction<boolean | undefined>>
    | Dispatch<SetStateAction<boolean>>;
  state: boolean;
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const LightBox = ({
  state,
  setState,
  images,
  index,
  setIndex,
}: Props): JSX.Element => {
  const handlePrevious = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index, setIndex]);

  const handleNext = useCallback(() => {
    if (index < images.length - 1) setIndex(index + 1);
  }, [images.length, index, setIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
      handleNext();
    },
    onSwipedRight: (SwipeEventData) => {
      if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
      handlePrevious();
    },
  });

  const [scale, setScale] = useState(1);
  const [translation, setTranslation] = useState({ x: 0, y: 0 });
  const [isTranslating, setIsTranslating] = useState(false);
  const [imgContainerRef, { width: containerWidth, height: containerHeight }] =
    useElementSize();
  const [imgRef, { width: imgWidth, height: imgHeight }] = useElementSize();

  const changeTranslation = useCallback(
    (movementX: number, movementY: number) => {
      const diffX =
        Math.abs(containerWidth - IMGWIDTH * scale) - TRANSLATION_PADDING;
      const diffY =
        Math.abs(containerHeight - IMGHEIGHT * scale) + TRANSLATION_PADDING;
      setTranslation((current) => ({
        x: clamp(current.x + movementX, -diffX / 2, diffX / 2),
        y: clamp(current.y + movementY, -diffY / 2, diffY / 2),
      }));
    },
    [containerHeight, containerWidth, scale]
  );

  const changeScale = useCallback(
    (deltaY: number) =>
      setScale((current) =>
        clamp(current * (deltaY > 0 ? 0.9 : 1.1), 1, SCALE_MAX)
      ),
    []
  );

  return (
    <>
      {state && (
        <Hotkeys
          keyName="left,right"
          allowRepeat
          onKeyDown={(keyName) => {
            if (keyName === "left") {
              handlePrevious();
            } else {
              handleNext();
            }
          }}
        >
          <Popup
            onClose={() => setState(false)}
            state={state}
            padding={false}
            fillViewport
          >
            <div
              {...handlers}
              className={`grid h-full w-full grid-cols-[4em,1fr,4em] place-items-center 
              overflow-hidden [grid-template-areas:"left_image_right"] first-letter:gap-4 
              mobile:grid-cols-2 mobile:[grid-template-areas:"image_image""left_right"]`}
              ref={imgContainerRef}
              onDragStart={(event) => event.preventDefault()}
              onPointerDown={() => setIsTranslating(true)}
              onPointerUp={() => setIsTranslating(false)}
              onPointerMove={(event) => {
                if (isTranslating) {
                  event.preventDefault();
                  changeTranslation(event.movementX, event.movementY);
                }
              }}
              onWheel={(event) => {
                changeScale(event.deltaY);
                changeTranslation(0, 0);
              }}
              onDoubleClick={() => {
                if (scale === 1) {
                  setScale(SCALE_ON_DOUBLE_CLICK);
                } else {
                  setScale(1);
                  setTranslation({ x: 0, y: 0 });
                }
              }}
            >
              <div className="[grid-area:left]">
                {index > 0 && (
                  <Button onClick={handlePrevious} icon={Icon.ChevronLeft} />
                )}
              </div>

              <Img
                ref={imgRef}
                className={cJoin(
                  "max-h-full min-h-fit origin-center [grid-area:image]",
                  cIf(!isTranslating, "transition-transform")
                )}
                style={{
                  transform: `scale(${scale}) translate(${
                    translation.x / scale
                  }px, ${translation.y / scale}px)`,
                }}
                src={images[index]}
              />

              <div className="[grid-area:right]">
                {index < images.length - 1 && (
                  <Button onClick={handleNext} icon={Icon.ChevronRight} />
                )}
              </div>

              <div className="absolute left-2 top-2 z-10 bg-light p-4">
                <p>
                  Scale:{" "}
                  {scale.toLocaleString(undefined, {
                    maximumSignificantDigits: 3,
                  })}
                </p>
                <p>
                  Translation: {translation.x} {translation.y}
                </p>
                <p>
                  Container: {containerWidth}px {containerHeight}px
                </p>
                <p>
                  Image: {imgWidth}px {imgHeight}px
                </p>
              </div>
            </div>
          </Popup>
        </Hotkeys>
      )}
    </>
  );
};
