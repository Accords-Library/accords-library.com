type ContentPanelProps = {
  children: React.ReactNode;
  autoformat?: boolean;
};

export default function ContentPanel(props: ContentPanelProps): JSX.Element {
  if (props.autoformat) {
    return (
      <div className="w-full grid overflow-y-scroll max-h-screen py-20 px-10">
        <main className="prose place-self-center text-justify">
          {props.children}
        </main>
      </div>
    );
  } else {
    return (
      <div className="w-full grid overflow-y-scroll max-h-screen py-20 px-10">
        <main className="place-self-center text-justify">{props.children}</main>
      </div>
    );
  }
}
