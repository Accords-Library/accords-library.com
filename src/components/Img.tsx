import { UploadImageFragment } from "graphql/generated";
import { getAssetURL, getImgSizesByQuality, ImageQuality } from "helpers/img";
import { Immutable } from "helpers/types";
import { ImageProps } from "next/image";

interface Props {
  className?: string;
  image?: UploadImageFragment | string;
  quality?: ImageQuality;
  alt?: ImageProps["alt"];
}

export default function Img(props: Immutable<Props>): JSX.Element {
  if (typeof props.image === "string") {
    return (
      <img
        className={props.className}
        src={props.image}
        alt={props.alt ?? ""}
        loading="lazy"
      />
    );
  } else if (props.image?.width && props.image.height) {
    const imgSize = getImgSizesByQuality(
      props.image.width,
      props.image.height,
      props.quality ?? ImageQuality.Small
    );
    return (
      <img
        className={props.className}
        src={getAssetURL(
          props.image.url,
          props.quality ? props.quality : ImageQuality.Small
        )}
        alt={props.alt ?? props.image.alternativeText ?? ""}
        width={imgSize.width}
        height={imgSize.height}
        loading="lazy"
      />
    );
  }
  return <></>;
}
