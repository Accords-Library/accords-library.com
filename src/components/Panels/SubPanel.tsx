type SubPanelProps = {
  children: React.ReactNode;
};

export default function SubPanel(props: SubPanelProps): JSX.Element {
  return (
    <div className="flex flex-col p-8 gap-y-2 justify-items-center text-center mobile:h-full">
      {props.children}
    </div>
  );
}
