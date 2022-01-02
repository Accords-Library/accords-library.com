type ContentPanelProps = {
  children: React.ReactNode;
  autoformat?: boolean;
  width?: ContentPanelWidthSizes;
};

export enum ContentPanelWidthSizes {
  default,
  large,
}

export default function ContentPanel(props: ContentPanelProps): JSX.Element {
  const width = props.width ? props.width : ContentPanelWidthSizes.default;
  const widthCSS = width === ContentPanelWidthSizes.default ? "w-[45rem]" : "w-full";
  const prose = props.autoformat ? "prose" : "";

  return (
    <div className={`grid overflow-y-scroll max-h-screen py-20 px-10`}>
      <main className={`${prose} ${widthCSS} place-self-center text-justify`}>
        {props.children}
      </main>
    </div>
  );
}
