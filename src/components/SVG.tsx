import { Immutable } from "helpers/types";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function SVG(props: Immutable<Props>): JSX.Element {
  return (
    <div className={props.className}>
      <Image
        src={props.src}
        alt={props.src}
        height={1000}
        width={1000}
        unoptimized
      />
    </div>
  );
}
