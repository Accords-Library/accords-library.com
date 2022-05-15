import { LightBox } from "components/LightBox";
import { useState } from "react";

export function useLightBox(): [
  (images: string[], index?: number) => void,
  () => JSX.Element
] {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([""]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return [
    (images: string[], index = 0) => {
      setLightboxOpen(true);
      setLightboxImages(images);
      setLightboxIndex(index);
    },
    () => (
      <LightBox
        state={lightboxOpen}
        setState={setLightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
      />
    ),
  ];
}
