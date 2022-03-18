import { StrapiImage } from "graphql/operations-types";
import { Dispatch, SetStateAction } from "react";
import Img, { ImageQuality } from "./Img";
import Popup from "./Popup";

export type LightBoxProps = {
  setState:
    | Dispatch<SetStateAction<boolean>>
    | Dispatch<SetStateAction<boolean | undefined>>;
  state: boolean;
  image?: StrapiImage;
};

export default function LightBox(props: LightBoxProps): JSX.Element {
  return (
    <Popup
      setState={props.setState}
      state={props.state}
      fillViewport
      hideBackground
    >
      <Img
        className="rounded-lg"
        image={props.image}
        layout="fill"
        objectFit="contain"
        quality={ImageQuality.Large}
      />
    </Popup>
  );
}
