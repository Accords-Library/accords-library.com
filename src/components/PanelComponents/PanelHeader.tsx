type NavOptionProps = {
  icon?: string;
  title: string;
  description?: string;
};

export default function PanelHeader(props: NavOptionProps): JSX.Element {
  return (
    <div className="w-full grid place-items-center">
      {props.icon ? (
        <span className="material-icons !text-4xl mb-3">{props.icon}</span>
      ) : (
        ""
      )}
      <h2 className="text-2xl">{props.title}</h2>
      {props.description ? <p>{props.description}</p> : ""}
      <hr />
    </div>
  );
}
