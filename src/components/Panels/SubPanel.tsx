type SubPanelProps = {
  children: React.ReactNode;
};

export default function SubPanel(props: SubPanelProps): JSX.Element {
  return (
    <div className="grid justify-center content-start p-8 gap-y-2 justify-items-center text-center">
      {props.children}
    </div>
  );
}
