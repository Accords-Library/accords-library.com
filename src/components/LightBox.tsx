import { useMediaMobile } from "hooks/useMediaQuery";
import { Dispatch, SetStateAction } from "react";
import Lightbox from "react-image-lightbox";

export type LightBoxProps = {
  setState:
    | Dispatch<SetStateAction<boolean>>
    | Dispatch<SetStateAction<boolean | undefined>>;
  state: boolean;
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
};

export default function LightBox(props: LightBoxProps): JSX.Element {
  const { state, setState, images, index, setIndex } = props;
  const mobile = useMediaMobile();

  return (
    <>
      {state && (
        <Lightbox
          reactModalProps={{
            parentSelector: () => document.getElementById("MyAppLayout"),
          }}
          mainSrc={images[index]}
          prevSrc={index > 0 ? images[index - 1] : undefined}
          nextSrc={index < images.length ? images[index + 1] : undefined}
          onMovePrevRequest={() => setIndex(index - 1)}
          onMoveNextRequest={() => setIndex(index + 1)}
          imageCaption=""
          imageTitle=""
          onCloseRequest={() => setState(false)}
          imagePadding={mobile ? 0 : 70}
        />
      )}
    </>
  );
}
