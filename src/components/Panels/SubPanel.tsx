type SubPanelProps = {
  children: React.ReactNode;
};

export default function SubPanel(props: SubPanelProps): JSX.Element {
  return (
    <div className="grid p-8 gap-y-2 justify-items-center text-center">
      {props.children}
    </div>
  );
}
