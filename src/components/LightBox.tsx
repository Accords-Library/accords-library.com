import { Immutable } from "helpers/types";
import { Dispatch, SetStateAction } from "react";
import Hotkeys from "react-hot-keys";
import { useSwipeable } from "react-swipeable";
import { Img } from "./Img";
import { Button } from "./Inputs/Button";
import { Popup } from "./Popup";

interface Props {
  setState:
    | Dispatch<SetStateAction<boolean | undefined>>
    | Dispatch<SetStateAction<boolean>>;
  state: boolean;
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

export function LightBox(props: Immutable<Props>): JSX.Element {
  const { state, setState, images, index, setIndex } = props;

  function handlePrevious() {
    if (index > 0) setIndex(index - 1);
  }

  function handleNext() {
    if (index < images.length - 1) setIndex(index + 1);
  }

  const sensibilitySwipe = 0.5;

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
      handleNext();
    },
    onSwipedRight: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
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
          }}
        >
          <Popup setState={setState} state={state} padding={false} fillViewport>
            <div
              {...handlers}
              className={`grid grid-cols-[4em,1fr,4em] mobile:grid-cols-2
              [grid-template-areas:"left_image_right"]
              mobile:[grid-template-areas:"image_image""left_right"]
              place-items-center first-letter:gap-4 w-full h-full overflow-hidden`}
            >
              <div className="[grid-area:left]">
                {index > 0 && (
                  <Button onClick={handlePrevious}>
                    <span className="material-icons">chevron_left</span>
                  </Button>
                )}
              </div>

              <Img
                className="max-h-full [grid-area:image]"
                image={images[index]}
              />

              <div className="[grid-area:right]">
                {index < images.length - 1 && (
                  <Button onClick={handleNext}>
                    <span className="material-icons">chevron_right</span>
                  </Button>
                )}
              </div>
            </div>
          </Popup>
        </Hotkeys>
      )}
    </>
  );
}
