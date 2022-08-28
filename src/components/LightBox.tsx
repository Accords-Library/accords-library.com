import { Dispatch, SetStateAction, useCallback } from "react";
import Hotkeys from "react-hot-keys";
import { useSwipeable } from "react-swipeable";
import { Img } from "./Img";
import { Button } from "./Inputs/Button";
import { Popup } from "./Popup";
import { Icon } from "components/Ico";
import { useIs3ColumnsLayout } from "hooks/useContainerQuery";
import { cIf, cJoin } from "helpers/className";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const SENSIBILITY_SWIPE = 0.5;

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  setState: Dispatch<SetStateAction<boolean | undefined>> | Dispatch<SetStateAction<boolean>>;
  state: boolean;
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const LightBox = ({ state, setState, images, index, setIndex }: Props): JSX.Element => {
  const handlePrevious = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index, setIndex]);
  const is3ColumnsLayout = useIs3ColumnsLayout();

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
          }}>
          <Popup onClose={() => setState(false)} state={state} padding={false} fillViewport>
            <div
              {...handlers}
              className={cJoin(
                `grid h-full w-full place-items-center overflow-hidden first-letter:gap-4`,
                cIf(
                  is3ColumnsLayout,
                  `grid-cols-[4em,1fr,4em] [grid-template-areas:"left_image_right"]`,
                  `grid-cols-2 [grid-template-areas:"image_image""left_right"]`
                )
              )}>
              <div className="ml-4 [grid-area:left]">
                {index > 0 && <Button onClick={handlePrevious} icon={Icon.ChevronLeft} />}
              </div>

              <Img className="max-h-full min-h-fit [grid-area:image]" src={images[index]} />

              <div className="mr-4 [grid-area:right]">
                {index < images.length - 1 && (
                  <Button onClick={handleNext} icon={Icon.ChevronRight} />
                )}
              </div>
            </div>
          </Popup>
        </Hotkeys>
      )}
    </>
  );
};
