import HorizontalLine from "components/HorizontalLine";
import Img, { getAssetURL, ImageQuality } from "components/Img";
import InsetBox from "components/InsetBox";
import LightBox from "components/LightBox";
import ToolTip from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import Markdown from "markdown-to-jsx";
import { NextRouter } from "next/router";
import { slugify } from "queries/helpers";
import React, { useState } from "react";

type MarkdawnProps = {
  className?: string;
  text: string;
  router: NextRouter;
};

export default function Markdawn(props: MarkdawnProps): JSX.Element {
  const appLayout = useAppLayout();
  const text = preprocessMarkDawn(props.text);

  const { router } = props;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([""]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (text) {
    return (
      <>
        <LightBox
          state={lightboxOpen}
          setState={setLightboxOpen}
          images={lightboxImages}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
        />
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
                    <h1 id={props.id} style={props.style}>
                      {props.children}
                      <HeaderToolTip id={props.id} />
                    </h1>
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
                    <h2 id={props.id} style={props.style}>
                      {props.children}
                      <HeaderToolTip id={props.id} />
                    </h2>
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
                    <h3 id={props.id} style={props.style}>
                      {props.children}
                      <HeaderToolTip id={props.id} />
                    </h3>
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
                    <h4 id={props.id} style={props.style}>
                      {props.children}
                      <HeaderToolTip id={props.id} />
                    </h4>
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
                    <h5 id={props.id} style={props.style}>
                      {props.children}
                      <HeaderToolTip id={props.id} />
                    </h5>
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
                    <h6 id={props.id} style={props.style}>
                      {props.children}
                      <HeaderToolTip id={props.id} />
                    </h6>
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
                      className={
                        "h-0 text-center text-3xl text-dark mt-16 mb-20"
                      }
                    >
                      * * *
                    </div>
                  );
                },
              },
              IntraLink: {
                component: (props: {
                  children: React.ReactNode;
                  target?: string;
                  page?: string;
                }) => {
                  const slug = props.target
                    ? slugify(props.target)
                    : slugify(props.children?.toString());
                  return (
                    <a
                      onClick={() =>
                        router.replace(
                          `${props.page ? props.page : ""}#${slug}`
                        )
                      }
                    >
                      {props.children}
                    </a>
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
                  return (
                    <InsetBox className="my-12">{props.children}</InsetBox>
                  );
                },
              },
              li: {
                component: (props: { children: React.ReactNode }) => {
                  return (
                    <li
                      className={
                        props.children &&
                        props.children?.toString().length > 100
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
              blockquote: {
                component: (props: {
                  children: React.ReactNode;
                  cite?: string;
                }) => {
                  return (
                    <blockquote>
                      {props.cite ? (
                        <>
                          &ldquo;{props.children}&rdquo;
                          <cite>— {props.cite}</cite>
                        </>
                      ) : (
                        props.children
                      )}
                    </blockquote>
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
                    <div
                      className="my-8 cursor-pointer"
                      onClick={() => {
                        setLightboxOpen(true);
                        setLightboxImages([
                          props.src.startsWith("/uploads/")
                            ? getAssetURL(props.src, ImageQuality.Large)
                            : props.src,
                        ]);
                        setLightboxIndex(0);
                      }}
                    >
                      {props.src.startsWith("/uploads/") ? (
                        <div className="relative w-full aspect-video">
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
                        <div className="grid place-content-center">
                          <img {...props} className="max-h-[50vh] " />
                        </div>
                      )}
                    </div>
                  );
                },
              },
            },
          }}
        >
          {text}
        </Markdown>
      </>
    );
  }
  return <></>;
}

function HeaderToolTip(props: { id: string }) {
  return (
    <ToolTip
      content={"Copy anchor link"}
      trigger="mouseenter"
      className="text-sm"
    >
      <ToolTip content={"Copied! 👍"} trigger="click" className="text-sm">
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
  if (!text) return "";

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
function getAssetUrl(): React.SetStateAction<string[]> {
  throw new Error("Function not implemented.");
}
