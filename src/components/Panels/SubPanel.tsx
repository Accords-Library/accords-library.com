type SubPanelProps = {
  children: React.ReactNode;
};

export default function SubPanel(props: SubPanelProps): JSX.Element {
  return (
    <div className="grid webkit-scrollbar:w-0 [scrollbar-width:none] overflow-y-scroll border-r-[1px] border-black max-h-screen h-screen justify-center content-start p-8 gap-y-2 justify-items-center text-center">
      {props.children}
    </div>
  );
}
