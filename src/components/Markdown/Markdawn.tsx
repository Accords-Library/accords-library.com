import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import React, { Fragment, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { HorizontalLine } from "components/HorizontalLine";
import { Img } from "components/Img";
import { InsetBox } from "components/InsetBox";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cJoin } from "helpers/className";
import { slugify } from "helpers/formatters";
import { getAssetURL, ImageQuality } from "helpers/img";
import { isDefined, isDefinedAndNotEmpty, isUndefined } from "helpers/others";
import { useLightBox } from "hooks/useLightBox";
import { AnchorShare } from "components/AnchorShare";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface MarkdawnProps {
  className?: string;
  text: string;
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Markdawn = ({
  className,
  text: rawText,
  langui,
}: MarkdawnProps): JSX.Element => {
  const { playerName } = useAppLayout();
  const router = useRouter();
  const [openLightBox, LightBox] = useLightBox();

  /* eslint-disable no-irregular-whitespace */
  const text = useMemo(
    () => `${preprocessMarkDawn(rawText, playerName)}
  ​`,
    [playerName, rawText]
  );
  /* eslint-enable no-irregular-whitespace */

  if (isUndefined(text) || text === "") {
    return <></>;
  }

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
                  <AnchorShare id={compProps.id} langui={langui} />
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
                  <AnchorShare id={compProps.id} langui={langui} />
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
                  <AnchorShare id={compProps.id} langui={langui} />
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
                  <AnchorShare id={compProps.id} langui={langui} />
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
                  <AnchorShare id={compProps.id} langui={langui} />
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
                  <AnchorShare id={compProps.id} langui={langui} />
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
                  <strong className="!my-0 text-dark/60 mobile:!-mb-4">
                    <Markdawn text={compProps.name} langui={langui} />
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
                  className="mt-8 mb-12 grid cursor-pointer place-content-center"
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
                    className="drop-shadow-shade-lg"
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
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface TableOfContentsProps {
  text: string;
  title?: string;
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TableOfContents = ({
  text,
  title,
  langui,
}: TableOfContentsProps): JSX.Element => {
  const router = useRouter();
  const toc = useMemo(
    () => getTocFromMarkdawn(preprocessMarkDawn(text), title),
    [text, title]
  );

  return (
    <>
      <h3 className="text-xl">{langui.table_of_contents}</h3>
      <div className="max-w-[14.5rem] text-left">
        <p className="relative my-2 overflow-x-hidden text-ellipsis whitespace-nowrap text-left">
          <a onClick={async () => router.replace(`#${toc.slug}`)}>
            {<abbr title={toc.title}>{toc.title}</abbr>}
          </a>
        </p>
        <TocLevel tocchildren={toc.children} parentNumbering="" />
      </div>
    </>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface TocInterface {
  title: string;
  slug: string;
  children: TocInterface[];
}

interface LevelProps {
  tocchildren: TocInterface[];
  parentNumbering: string;
}

const TocLevel = ({
  tocchildren,
  parentNumbering,
}: LevelProps): JSX.Element => {
  const router = useRouter();

  return (
    <ol className="pl-4 text-left">
      {tocchildren.map((child, childIndex) => (
        <Fragment key={child.slug}>
          <li className="my-2 w-full overflow-x-hidden text-ellipsis whitespace-nowrap">
            <span className="text-dark">{`${parentNumbering}${
              childIndex + 1
            }.`}</span>{" "}
            <a onClick={async () => router.replace(`#${child.slug}`)}>
              {<abbr title={child.title}>{child.title}</abbr>}
            </a>
          </li>
          <TocLevel
            tocchildren={child.children}
            parentNumbering={`${parentNumbering}${childIndex + 1}.`}
          />
        </Fragment>
      ))}
    </ol>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

enum HeaderLevels {
  H1 = 1,
  H2 = 2,
  H3 = 3,
  H4 = 4,
  H5 = 5,
  H6 = 6,
}

const preprocessMarkDawn = (text: string, playerName = ""): string => {
  if (!text) return "";

  const processedPlayerName = playerName
    .replaceAll("_", "\\_")
    .replaceAll("*", "\\*");

  let preprocessed = text
    .replaceAll("--", "—")
    .replaceAll(
      "@player",
      isDefinedAndNotEmpty(processedPlayerName)
        ? processedPlayerName
        : "(player)"
    );

  let scenebreakIndex = 0;
  const visitedSlugs: string[] = [];

  preprocessed = preprocessed
    .split("\n")
    .map((line) => {
      if (line === "* * *" || line === "---") {
        scenebreakIndex++;
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
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const markdawnHeadersParser = (
  headerLevel: HeaderLevels,
  line: string,
  visitedSlugs: string[]
): string => {
  const lineText = line.slice(headerLevel + 1);
  const slug = slugify(lineText);
  let newSlug = slug;
  let index = 2;
  while (visitedSlugs.includes(newSlug)) {
    newSlug = `${slug}-${index}`;
    index++;
  }
  visitedSlugs.push(newSlug);
  return `<h${headerLevel} id="${newSlug}">${lineText}</h${headerLevel}>`;
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const getTocFromMarkdawn = (text: string, title?: string): TocInterface => {
  const toc: TocInterface = {
    title: title ?? "Return to top",
    slug: slugify(title),
    children: [],
  };
  let h2 = -1;
  let h3 = -1;
  let h4 = -1;
  let h5 = -1;
  let scenebreak = 0;
  let scenebreakIndex = 0;

  const getTitle = (line: string): string =>
    line.slice(line.indexOf(`">`) + 2, line.indexOf("</"));

  const getSlug = (line: string): string =>
    line.slice(line.indexOf(`id="`) + 4, line.indexOf(`">`));

  text.split("\n").map((line) => {
    if (line.startsWith("<h1 id=")) {
      toc.title = getTitle(line);
      toc.slug = getSlug(line);
    } else if (line.startsWith("<h2 id=")) {
      toc.children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h2++;
      h3 = -1;
      h4 = -1;
      h5 = -1;
      scenebreak = 0;
    } else if (h2 >= 0 && line.startsWith("<h3 id=")) {
      toc.children[h2].children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h3++;
      h4 = -1;
      h5 = -1;
      scenebreak = 0;
    } else if (h3 >= 0 && line.startsWith("<h4 id=")) {
      toc.children[h2].children[h3].children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h4++;
      h5 = -1;
      scenebreak = 0;
    } else if (h4 >= 0 && line.startsWith("<h5 id=")) {
      toc.children[h2].children[h3].children[h4].children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h5++;
      scenebreak = 0;
    } else if (h5 >= 0 && line.startsWith("<h6 id=")) {
      toc.children[h2].children[h3].children[h4].children[h5].children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
    } else if (line.startsWith(`<SceneBreak`)) {
      scenebreak++;
      scenebreakIndex++;

      const child = {
        title: `Scene break ${scenebreak}`,
        slug: slugify(`scene-break-${scenebreakIndex}`),
        children: [],
      };

      if (h5 >= 0) {
        toc.children[h2].children[h3].children[h4].children[h5].children.push(
          child
        );
      } else if (h4 >= 0) {
        toc.children[h2].children[h3].children[h4].children.push(child);
      } else if (h3 >= 0) {
        toc.children[h2].children[h3].children.push(child);
      } else if (h2 >= 0) {
        toc.children[h2].children.push(child);
      } else {
        toc.children.push(child);
      }
    }
  });

  return toc;
};
