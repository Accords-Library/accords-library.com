import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { UploadImageFragment } from "graphql/generated";
import { RequiredNonNullable } from "types/types";
import { LightBox } from "components/LightBox";
import { filterDefined } from "helpers/others";

type LightBoxImagesNullable = (UploadImageFragment | string | null | undefined)[];
type LightBoxImages = (UploadImageFragment | string)[];

interface LightBoxState {
  showLightBox: (images: LightBoxImagesNullable, index?: number) => void;
}

const initialState: RequiredNonNullable<LightBoxState> = {
  showLightBox: () => null,
};

const LightBoxContext = createContext<LightBoxState>(initialState);

export const useLightBox = (): LightBoxState => useContext(LightBoxContext);

interface Props {
  children: ReactNode;
}

export const LightBoxContextProvider = ({ children }: Props): JSX.Element => {
  const [isLightBoxVisible, setLightBoxVisibility] = useState(false);
  const [lightBoxImages, setLightBoxImages] = useState<LightBoxImages>([]);
  const [lightBoxIndex, setLightBoxIndex] = useState(0);

  const showLightBox = useCallback((images: LightBoxImagesNullable, index = 0) => {
    const filteredImages = filterDefined(images);
    setLightBoxIndex(index);
    setLightBoxImages(filteredImages);
    setLightBoxVisibility(true);
  }, []);

  const closeLightBox = useCallback(() => {
    setLightBoxVisibility(false);
    setTimeout(() => setLightBoxImages([]), 100);
  }, []);

  return (
    <LightBoxContext.Provider value={{ showLightBox }}>
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
    </LightBoxContext.Provider>
  );
};
