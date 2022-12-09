import React, { useCallback, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { atom } from "jotai";
import { UploadImageFragment } from "graphql/generated";
import { LightBox } from "components/LightBox";
import { filterDefined } from "helpers/asserts";
import { atomPairing, useAtomSetter } from "helpers/atoms";

const lightBoxAtom = atomPairing(
  atom<{
    showLightBox: (
      images: (UploadImageFragment | string | null | undefined)[],
      index?: number
    ) => void;
  }>({ showLightBox: () => null })
);

export const lightBox = lightBoxAtom[0];

export const LightBoxProvider = (): JSX.Element => {
  const [isLightBoxVisible, setLightBoxVisibility] = useState(false);
  const [lightBoxImages, setLightBoxImages] = useState<(UploadImageFragment | string)[]>([]);
  const [lightBoxIndex, setLightBoxIndex] = useState(0);

  const setShowLightBox = useAtomSetter(lightBoxAtom);

  useEffectOnce(() =>
    setShowLightBox({
      showLightBox: (images, index = 0) => {
        const filteredImages = filterDefined(images);
        setLightBoxIndex(index);
        setLightBoxImages(filteredImages);
        setLightBoxVisibility(true);
      },
    })
  );

  const closeLightBox = useCallback(() => {
    setLightBoxVisibility(false);
    setTimeout(() => setLightBoxImages([]), 100);
  }, []);

  return (
    <LightBox
      isVisible={isLightBoxVisible}
      onCloseRequest={closeLightBox}
      image={lightBoxImages[lightBoxIndex]}
      isNextImageAvailable={lightBoxIndex < lightBoxImages.length - 1}
      isPreviousImageAvailable={lightBoxIndex > 0}
      onPressNext={() => setLightBoxIndex((current) => current + 1)}
      onPressPrevious={() => setLightBoxIndex((current) => current - 1)}
    />
  );
};
