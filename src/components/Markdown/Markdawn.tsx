import Markdown from "markdown-to-jsx";
import SceneBreak from "./SceneBreak";

type ScenBreakProps = {
  className?: string;
  text: string;
};

export default function Markdawn(props: ScenBreakProps): JSX.Element {
  return (
    <Markdown
      className={`prose prose-p:text-justify text-black ${props.className}`}
      options={{
        overrides: {
          hr: {
            component: SceneBreak,
          },
        },
      }}
    >
      {props.text}
    </Markdown>
  );
}
