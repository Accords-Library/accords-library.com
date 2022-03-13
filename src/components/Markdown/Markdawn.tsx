import HorizontalLine from "components/HorizontalLine";
import InsetBox from "components/InsetBox";
import { useAppLayout } from "contexts/AppLayoutContext";
import Markdown from "markdown-to-jsx";
import { slugify } from "queries/helpers";
import React from "react";

type ScenBreakProps = {
  className?: string;
  text: string;
};

export default function Markdawn(props: ScenBreakProps): JSX.Element {
  const appLayout = useAppLayout();
  const text = preprocessMarkDawn(props.text);

  if (text) {
    return (
      <Markdown
        className={`formatted ${props.className}`}
        options={{
          slugify: slugify,
          overrides: {
            h2: {
              component: (props: {
                id: string;
                style: React.CSSProperties;
                children: React.ReactNode;
              }) => {
                return (
                  <h2
                    id={props.id}
                    className="flex flex-row place-items-center place-content-center gap-3 hover:[--anchor-opacity:100] [--anchor-opacity:0]"
                    style={props.style}
                  >
                    {props.children}
                    <abbr title="Copy anchor link">
                      <span
                        className="material-icons opacity-[var(--anchor-opacity)] transition-all hover:text-dark cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            process.env.NEXT_PUBLIC_URL_SELF +
                              window.location.pathname +
                              "#" +
                              props.id
                          );
                        }}
                      >
                        link
                      </span>
                    </abbr>
                  </h2>
                );
              },
            },
            Sep: {
              component: () => {
                return <div className="my-24"></div>;
              },
            },
            SceneBreak: {
              component: (props: { id: string }) => {
                return (
                  <div
                    id={props.id}
                    className={"h-0 text-center text-3xl text-dark mt-16 mb-20"}
                  >
                    * * *
                  </div>
                );
              },
            },
            player: {
              component: () => {
                return (
                  <span className="text-dark opacity-70">
                    {appLayout.playerName ? appLayout.playerName : "<player>"}
                  </span>
                );
              },
            },
            Transcript: {
              component: (props) => {
                return (
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                    {props.children}
                  </div>
                );
              },
            },
            Line: {
              component: (props) => {
                return (
                  <>
                    <strong className="text-dark opacity-60">
                      {props.name}
                    </strong>
                    <p className="whitespace-pre-line">{props.children}</p>
                  </>
                );
              },
            },
            InsetBox: {
              component: (props) => {
                return <InsetBox>{props.children}</InsetBox>;
              },
            },
            li: {
              component: (props: { children: React.ReactNode }) => {
                return (
                  <li
                    className={
                      props.children && props.children?.toString().length > 100
                        ? "my-4"
                        : ""
                    }
                  >
                    {props.children}
                  </li>
                );
              },
            },
            Highlight: {
              component: (props: { children: React.ReactNode }) => {
                return <mark>{props.children}</mark>;
              },
            },
            footer: {
              component: (props: { children: React.ReactNode }) => {
                return (
                  <>
                    <HorizontalLine />
                    <div>{props.children}</div>
                  </>
                );
              },
            },
          },
        }}
      >
        {text}
      </Markdown>
    );
  }
  return <></>;
}

export function preprocessMarkDawn(text: string): string {
  let scenebreakIndex = 0;
  const result = text.split("\n").map((line) => {
    if (line === "* * *" || line === "---") {
      scenebreakIndex++;
      return `<SceneBreak id="scene-break-${scenebreakIndex}">`;
    }
    return line;
  });
  return result.join("\n");
}
