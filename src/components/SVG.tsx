import Image from "next/image";

export type SVGProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function SVG(props: SVGProps): JSX.Element {
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
