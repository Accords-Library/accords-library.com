type SubPanelProps = {
  children: React.ReactNode;
};

export default function SubPanel(props: SubPanelProps): JSX.Element {
  return (
    <div className="grid webkit-scrollbar:w-0 [scrollbar-width:none] border-r-[1px] overflow-y-scroll border-black w-80 h-full max-h-screen justify-center content-start p-8 gap-y-2 justify-items-center text-center">
      {props.children}
    </div>
  );
}
