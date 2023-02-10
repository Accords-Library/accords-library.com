import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useEffectOnce } from "usehooks-ts";
import { UploadImageFragment } from "graphql/generated";
import { LightBox } from "components/LightBox";
import { filterDefined } from "helpers/asserts";
import { useAtomSetter } from "helpers/atoms";
import { internalAtoms } from "contexts/atoms";

export const LightBoxProvider = (): JSX.Element => {
  const router = useRouter();
  const [isLightBoxVisible, setLightBoxVisibility] = useState(false);
  const [lightBoxImages, setLightBoxImages] = useState<(UploadImageFragment | string)[]>([]);
  const [lightBoxIndex, setLightBoxIndex] = useState(0);

  const setShowLightBox = useAtomSetter(internalAtoms.lightBox);

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

  useEffect(() => router.events.on("routeChangeStart", closeLightBox));

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
