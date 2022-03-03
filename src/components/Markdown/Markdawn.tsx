import Markdown from "markdown-to-jsx";
import SceneBreak from "./SceneBreak";

type ScenBreakProps = {
  className?: string;
  text: string;
};

export default function Markdawn(props: ScenBreakProps): JSX.Element {
  if (props.text) {
    return (
      <Markdown
        className={`prose prose-p:text-justify text-black ${props.className}`}
        options={{
          overrides: {
            hr: {
              component: SceneBreak,
            },
            player: {
              component: () => {return <span className="text-dark opacity-70">{"<player>"}</span>}
            },
          },
        }}
      >
        {props.text}
      </Markdown>
    );
  }
  return <></>;
}