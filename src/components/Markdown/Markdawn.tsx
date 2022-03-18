import HorizontalLine from "components/HorizontalLine";
import Img, { ImageQuality } from "components/Img";
import InsetBox from "components/InsetBox";
import ToolTip from "components/ToolTip";
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
            h1: {
              component: (props: {
                id: string;
                style: React.CSSProperties;
                children: React.ReactNode;
              }) => {
                return (
                  <div className="flex flex-row place-items-center place-content-center gap-3">
                    <h1 id={props.id} style={props.style}>
                      {props.children}
                    </h1>
                    <HeaderToolTip id={props.id} />
                  </div>
                );
              },
            },
            h2: {
              component: (props: {
                id: string;
                style: React.CSSProperties;
                children: React.ReactNode;
              }) => {
                return (
                  <div className="flex flex-row place-items-center place-content-center gap-3">
                    <h2 id={props.id} style={props.style}>
                      {props.children}
                    </h2>
                    <HeaderToolTip id={props.id} />
                  </div>
                );
              },
            },
            h3: {
              component: (props: {
                id: string;
                style: React.CSSProperties;
                children: React.ReactNode;
              }) => {
                return (
                  <div className="flex flex-row place-items-center place-content-center gap-3">
                    <h3 id={props.id} style={props.style}>
                      {props.children}
                    </h3>
                    <HeaderToolTip id={props.id} />
                  </div>
                );
              },
            },
            h4: {
              component: (props: {
                id: string;
                style: React.CSSProperties;
                children: React.ReactNode;
              }) => {
                return (
                  <div className="flex flex-row place-items-center place-content-center gap-3">
                    <h4 id={props.id} style={props.style}>
                      {props.children}
                    </h4>
                    <HeaderToolTip id={props.id} />
                  </div>
                );
              },
            },
            h5: {
              component: (props: {
                id: string;
                style: React.CSSProperties;
                children: React.ReactNode;
              }) => {
                return (
                  <div className="flex flex-row place-items-center place-content-center gap-3">
                    <h5 id={props.id} style={props.style}>
                      {props.children}
                    </h5>
                    <HeaderToolTip id={props.id} />
                  </div>
                );
              },
            },
            h6: {
              component: (props: {
                id: string;
                style: React.CSSProperties;
                children: React.ReactNode;
              }) => {
                return (
                  <div className="flex flex-row place-items-center place-content-center gap-3">
                    <h6 id={props.id} style={props.style}>
                      {props.children}
                    </h6>
                    <HeaderToolTip id={props.id} />
                  </div>
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
                  <div className="grid grid-cols-[auto_1fr] mobile:grid-cols-1 gap-x-6 gap-y-2">
                    {props.children}
                  </div>
                );
              },
            },
            Line: {
              component: (props) => {
                return (
                  <>
                    <strong className="text-dark opacity-60 mobile:!-mb-4">
                      {props.name}
                    </strong>
                    <p className="whitespace-pre-line">{props.children}</p>
                  </>
                );
              },
            },
            InsetBox: {
              component: (props) => {
                return <InsetBox className="my-12">{props.children}</InsetBox>;
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
            img: {
              component: (props: {
                alt: string;
                src: string;
                width?: number;
                height?: number;
                caption?: string;
                name?: string;
              }) => {
                return (
                  <>
                    {props.src.startsWith("/uploads/") ? (
                      <div className="relative w-full aspect-video my-8">
                        <Img
                          image={{
                            __typename: "UploadFile",
                            alternativeText: props.alt,
                            url: props.src,
                            width: props.width || 1500,
                            height: props.height || 1000,
                            caption: props.caption || "",
                            name: props.name || "",
                          }}
                          layout="fill"
                          objectFit="contain"
                          quality={ImageQuality.Medium}
                        ></Img>
                      </div>
                    ) : (
                      <div className="grid place-content-center my-8">
                        <img {...props} className="max-h-[50vh] " />
                      </div>
                    )}
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

function HeaderToolTip(props: { id: string }) {
  return (
    <ToolTip content={"Copy anchor link"} trigger="mouseenter">
      <ToolTip content={"Copied! 👍"} trigger="click">
        <span
          className="material-icons transition-color hover:text-dark cursor-pointer"
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
      </ToolTip>
    </ToolTip>
  );
}

export function preprocessMarkDawn(text: string): string {
  let scenebreakIndex = 0;
  const visitedSlugs: string[] = [];

  const result = text.split("\n").map((line) => {
    if (line === "* * *" || line === "---") {
      scenebreakIndex++;
      return `<SceneBreak id="scene-break-${scenebreakIndex}">`;
    }

    if (line.startsWith("# ")) {
      return markdawnHeadersParser(headerLevels.h1, line, visitedSlugs);
    }

    if (line.startsWith("## ")) {
      return markdawnHeadersParser(headerLevels.h2, line, visitedSlugs);
    }

    if (line.startsWith("### ")) {
      return markdawnHeadersParser(headerLevels.h3, line, visitedSlugs);
    }

    if (line.startsWith("#### ")) {
      return markdawnHeadersParser(headerLevels.h4, line, visitedSlugs);
    }

    if (line.startsWith("##### ")) {
      return markdawnHeadersParser(headerLevels.h5, line, visitedSlugs);
    }

    if (line.startsWith("###### ")) {
      return markdawnHeadersParser(headerLevels.h6, line, visitedSlugs);
    }

    return line;
  });
  return result.join("\n");
}

enum headerLevels {
  h1 = 1,
  h2 = 2,
  h3 = 3,
  h4 = 4,
  h5 = 5,
  h6 = 6,
}

function markdawnHeadersParser(
  headerLevel: headerLevels,
  line: string,
  visitedSlugs: string[]
): string {
  const lineText = line.slice(headerLevel + 1);
  let slug = slugify(lineText);
  let newSlug = slug;
  let index = 2;
  while (visitedSlugs.includes(newSlug)) {
    newSlug = `${slug}-${index}`;
    index++;
  }
  visitedSlugs.push(newSlug);
  return `<${headerLevels[headerLevel]} id="${newSlug}">${lineText}</${headerLevels[headerLevel]}>`;
}
