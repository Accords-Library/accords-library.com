import React, { useCallback, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { UploadImageFragment } from "graphql/generated";
import { LightBox } from "components/LightBox";
import { filterDefined } from "helpers/others";
import { useAtomSetter } from "helpers/atoms";
import { lightBox } from "contexts/atoms";

export const LightBoxProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isLightBoxVisible, setLightBoxVisibility] = useState(false);
  const [lightBoxImages, setLightBoxImages] = useState<(UploadImageFragment | string)[]>([]);
  const [lightBoxIndex, setLightBoxIndex] = useState(0);

  const setShowLightBox = useAtomSetter(lightBox);

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
    <>
      <LightBox
        isVisible={isLightBoxVisible}
        onCloseRequest={closeLightBox}
        image={lightBoxImages[lightBoxIndex]}
        isNextImageAvailable={lightBoxIndex < lightBoxImages.length - 1}
        isPreviousImageAvailable={lightBoxIndex > 0}
        onPressNext={() => setLightBoxIndex((current) => current + 1)}
        onPressPrevious={() => setLightBoxIndex((current) => current - 1)}
      />
      {children}
    </>
  );
};
