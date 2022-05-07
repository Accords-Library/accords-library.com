import { Dispatch, SetStateAction, useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Img from "./Img";
import Button from "./Inputs/Button";
import Popup from "./Popup";

interface Props {
  setState:
    | Dispatch<SetStateAction<boolean | undefined>>
    | Dispatch<SetStateAction<boolean>>;
  state: boolean;
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

export default function LightBox(props: Props): JSX.Element {
  const { state, setState, images, index, setIndex } = props;
  const handlePrevious = useCallback(() => {
    setIndex((previousIndex) => (previousIndex > 0 ? previousIndex - 1 : 0));
  }, [setIndex]);

  const handleNext = useCallback(() => {
    setIndex((previousIndex) =>
      previousIndex < images.length - 1 ? previousIndex + 1 : images.length - 1
    );
  }, [images.length, setIndex]);

  useHotkeys("left", handlePrevious);
  useHotkeys("right", handleNext);

  return (
    <>
      {state && (
        <Popup setState={setState} state={state} fillViewport>
          <div
            className="grid grid-cols-[4em,1fr,4em] place-items-center
            gap-4 w-full h-full overflow-hidden"
          >
            <div>
              {index > 0 && (
                <Button onClick={handlePrevious}>
                  <span className="material-icons">chevron_left</span>
                </Button>
              )}
            </div>

            <Img className="max-h-full" image={images[index]} />

            <div>
              {index < images.length - 1 && (
                <Button onClick={handleNext}>
                  <span className="material-icons">chevron_right</span>
                </Button>
              )}
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}
