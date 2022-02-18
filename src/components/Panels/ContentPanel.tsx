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
  const widthCSS =
    width === ContentPanelWidthSizes.default ? "max-w-[45rem]" : "w-full";
  const prose = props.autoformat ? "prose text-justify" : "";

  return (
    <div className={`grid pt-10 pb-20 px-6 desktop:py-20 desktop:px-10`}>
      <main className={`${prose} ${widthCSS} place-self-center`}>
        {props.children}
      </main>
    </div>
  );
}
