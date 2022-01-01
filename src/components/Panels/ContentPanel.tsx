type ContentPanelProps = {
  children: React.ReactNode;
};

export default function ContentPanel(props: ContentPanelProps): JSX.Element {
  return (
    <div className="w-full grid overflow-y-scroll max-h-screen py-20 px-10">
      <main className="prose lg:prose-lg place-self-center text-justify">
        {props.children}
      </main>
    </div>
  );
}
