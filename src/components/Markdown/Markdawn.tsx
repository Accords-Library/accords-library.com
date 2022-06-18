import { HorizontalLine } from "components/HorizontalLine";
import { Ico, Icon } from "components/Ico";
import { Img } from "components/Img";
import { InsetBox } from "components/InsetBox";
import { ToolTip } from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { cJoin } from "helpers/className";
import { slugify } from "helpers/formatters";
import { getAssetURL, ImageQuality } from "helpers/img";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { Immutable } from "helpers/types";
import { useLightBox } from "hooks/useLightBox";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import ReactDOMServer from "react-dom/server";

interface Props {
  className?: string;
  text: string;
}

export function Markdawn(props: Immutable<Props>): JSX.Element {
  const { className, text: rawText } = props;
  const appLayout = useAppLayout();
  const router = useRouter();
  const [openLightBox, LightBox] = useLightBox();

  // eslint-disable-next-line no-irregular-whitespace
  const text = useMemo(() => `${preprocessMarkDawn(rawText)}​`, [rawText]);

  if (text) {
    return (
      <>
        <LightBox />
        <Markdown
          className={cJoin("formatted", className)}
          options={{
            slugify: slugify,
            overrides: {
              a: {
                component: (compProps: {
                  href: string;
                  children: React.ReactNode;
                }) => {
                  if (
                    compProps.href.startsWith("/") ||
                    compProps.href.startsWith("#")
                  ) {
                    return (
                      <a onClick={async () => router.push(compProps.href)}>
                        {compProps.children}
                      </a>
                    );
                  }
                  return (
                    <a href={compProps.href} target="_blank" rel="noreferrer">
                      {compProps.children}
                    </a>
                  );
                },
              },

              h1: {
                component: (compProps: {
                  id: string;
                  style: React.CSSProperties;
                  children: React.ReactNode;
                }) => (
                  <h1 id={compProps.id} style={compProps.style}>
                    {compProps.children}
                    <HeaderToolTip id={compProps.id} />
                  </h1>
                ),
              },

              h2: {
                component: (compProps: {
                  id: string;
                  style: React.CSSProperties;
                  children: React.ReactNode;
                }) => (
                  <h2 id={compProps.id} style={compProps.style}>
                    {compProps.children}
                    <HeaderToolTip id={compProps.id} />
                  </h2>
                ),
              },

              h3: {
                component: (compProps: {
                  id: string;
                  style: React.CSSProperties;
                  children: React.ReactNode;
                }) => (
                  <h3 id={compProps.id} style={compProps.style}>
                    {compProps.children}
                    <HeaderToolTip id={compProps.id} />
                  </h3>
                ),
              },

              h4: {
                component: (compProps: {
                  id: string;
                  style: React.CSSProperties;
                  children: React.ReactNode;
                }) => (
                  <h4 id={compProps.id} style={compProps.style}>
                    {compProps.children}
                    <HeaderToolTip id={compProps.id} />
                  </h4>
                ),
              },

              h5: {
                component: (compProps: {
                  id: string;
                  style: React.CSSProperties;
                  children: React.ReactNode;
                }) => (
                  <h5 id={compProps.id} style={compProps.style}>
                    {compProps.children}
                    <HeaderToolTip id={compProps.id} />
                  </h5>
                ),
              },

              h6: {
                component: (compProps: {
                  id: string;
                  style: React.CSSProperties;
                  children: React.ReactNode;
                }) => (
                  <h6 id={compProps.id} style={compProps.style}>
                    {compProps.children}
                    <HeaderToolTip id={compProps.id} />
                  </h6>
                ),
              },

              SceneBreak: {
                component: (compProps: { id: string }) => (
                  <div
                    id={compProps.id}
                    className={"mt-16 mb-20 h-0 text-center text-3xl text-dark"}
                  >
                    * * *
                  </div>
                ),
              },

              IntraLink: {
                component: (compProps: {
                  children: React.ReactNode;
                  target?: string;
                  page?: string;
                }) => {
                  const slug = isDefinedAndNotEmpty(compProps.target)
                    ? slugify(compProps.target)
                    : slugify(compProps.children?.toString());
                  return (
                    <a
                      onClick={async () =>
                        router.replace(`${compProps.page ?? ""}#${slug}`)
                      }
                    >
                      {compProps.children}
                    </a>
                  );
                },
              },

              player: {
                component: () => (
                  <span className="text-dark opacity-70">
                    {appLayout.playerName ?? "<player>"}
                  </span>
                ),
              },

              Transcript: {
                component: (compProps) => (
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 mobile:grid-cols-1">
                    {compProps.children}
                  </div>
                ),
              },

              Line: {
                component: (compProps) => (
                  <>
                    <strong className="text-dark opacity-60 mobile:!-mb-4">
                      {compProps.name}
                    </strong>
                    <p className="whitespace-pre-line">{compProps.children}</p>
                  </>
                ),
              },

              InsetBox: {
                component: (compProps) => (
                  <InsetBox className="my-12">{compProps.children}</InsetBox>
                ),
              },

              li: {
                component: (compProps: { children: React.ReactNode }) => (
                  <li
                    className={
                      isDefined(compProps.children) &&
                      ReactDOMServer.renderToStaticMarkup(
                        <>{compProps.children}</>
                      ).length > 100
                        ? "my-4"
                        : ""
                    }
                  >
                    {compProps.children}
                  </li>
                ),
              },

              Highlight: {
                component: (compProps: { children: React.ReactNode }) => (
                  <mark>{compProps.children}</mark>
                ),
              },

              footer: {
                component: (compProps: { children: React.ReactNode }) => (
                  <>
                    <HorizontalLine />
                    <div className="grid gap-8">{compProps.children}</div>
                  </>
                ),
              },

              blockquote: {
                component: (compProps: {
                  children: React.ReactNode;
                  cite?: string;
                }) => (
                  <blockquote>
                    {isDefinedAndNotEmpty(compProps.cite) ? (
                      <>
                        &ldquo;{compProps.children}&rdquo;
                        <cite>— {compProps.cite}</cite>
                      </>
                    ) : (
                      compProps.children
                    )}
                  </blockquote>
                ),
              },

              img: {
                component: (compProps: {
                  alt: string;
                  src: string;
                  width?: number;
                  height?: number;
                  caption?: string;
                  name?: string;
                }) => (
                  <div
                    className="my-8 grid cursor-pointer place-content-center"
                    onClick={() => {
                      openLightBox([
                        compProps.src.startsWith("/uploads/")
                          ? getAssetURL(compProps.src, ImageQuality.Large)
                          : compProps.src,
                      ]);
                    }}
                  >
                    <Img
                      image={
                        compProps.src.startsWith("/uploads/")
                          ? getAssetURL(compProps.src, ImageQuality.Small)
                          : compProps.src
                      }
                      quality={ImageQuality.Medium}
                    ></Img>
                  </div>
                ),
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
        <Ico
          icon={Icon.Link}
          className="transition-color cursor-pointer hover:text-dark"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_URL_SELF + window.location.pathname}#${
                props.id
              }`
            );
          }}
        />
      </ToolTip>
    </ToolTip>
  );
}

function typographicRules(text: string): string {
  let newText = text;
  newText = newText.replace(/--/gu, "—");
  /*
   * newText = newText.replace(/\.\.\./gu, "…");
   * newText = newText.replace(/(?:^|[\s{[(<'"\u2018\u201C])(")/gu, " “");
   * newText = newText.replace(/"/gu, "”");
   * newText = newText.replace(/(?:^|[\s{[(<'"\u2018\u201C])(')/gu, " ‘");
   * newText = newText.replace(/'/gu, "’");
   */
  return newText;
}

export function preprocessMarkDawn(text: string): string {
  if (!text) return "";

  let preprocessed = typographicRules(text);

  let scenebreakIndex = 0;
  const visitedSlugs: string[] = [];

  preprocessed = preprocessed
    .split("\n")
    .map((line) => {
      if (line === "* * *" || line === "---") {
        scenebreakIndex += 1;
        return `<SceneBreak id="scene-break-${scenebreakIndex}">`;
      }

      if (line.startsWith("# ")) {
        return markdawnHeadersParser(HeaderLevels.H1, line, visitedSlugs);
      }

      if (line.startsWith("## ")) {
        return markdawnHeadersParser(HeaderLevels.H2, line, visitedSlugs);
      }

      if (line.startsWith("### ")) {
        return markdawnHeadersParser(HeaderLevels.H3, line, visitedSlugs);
      }

      if (line.startsWith("#### ")) {
        return markdawnHeadersParser(HeaderLevels.H4, line, visitedSlugs);
      }

      if (line.startsWith("##### ")) {
        return markdawnHeadersParser(HeaderLevels.H5, line, visitedSlugs);
      }

      if (line.startsWith("###### ")) {
        return markdawnHeadersParser(HeaderLevels.H6, line, visitedSlugs);
      }

      return line;
    })
    .join("\n");

  return preprocessed;
}

enum HeaderLevels {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

function markdawnHeadersParser(
  headerLevel: HeaderLevels,
  line: string,
  visitedSlugs: string[]
): string {
  const lineText = line.slice(headerLevel + 1);
  const slug = slugify(lineText);
  let newSlug = slug;
  let index = 2;
  while (visitedSlugs.includes(newSlug)) {
    newSlug = `${slug}-${index}`;
    index += 1;
  }
  visitedSlugs.push(newSlug);
  return `<h${headerLevel} id="${newSlug}">${lineText}</h${headerLevel}>`;
}
