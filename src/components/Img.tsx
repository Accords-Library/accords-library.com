import { UploadImageFragment } from "graphql/generated";
import { getAssetURL, getImgSizesByQuality, ImageQuality } from "helpers/img";
import { Immutable } from "helpers/types";
import Image, { ImageProps } from "next/image";

interface Props {
  className?: string;
  image?: UploadImageFragment | string;
  quality?: ImageQuality;
  alt?: ImageProps["alt"];
  layout?: ImageProps["layout"];
  objectFit?: ImageProps["objectFit"];
  priority?: ImageProps["priority"];
}

export default function Img(props: Immutable<Props>): JSX.Element {
  if (typeof props.image === "string") {
    return (
      <img
        className={props.className}
        src={props.image}
        alt={props.alt ?? ""}
      />
    );
  } else if (props.image?.width && props.image.height) {
    const imgSize = getImgSizesByQuality(
      props.image.width,
      props.image.height,
      props.quality ?? ImageQuality.Small
    );
    return (
      <Image
        className={props.className}
        src={getAssetURL(
          props.image.url,
          props.quality ? props.quality : ImageQuality.Small
        )}
        alt={props.alt ?? props.image.alternativeText ?? ""}
        width={props.layout === "fill" ? undefined : imgSize.width}
        height={props.layout === "fill" ? undefined : imgSize.height}
        layout={props.layout}
        objectFit={props.objectFit}
        priority={props.priority}
        unoptimized
      />
    );
  }
  return <></>;
}
