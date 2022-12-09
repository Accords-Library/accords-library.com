import Markdown from "markdown-to-jsx";
import React, { Fragment, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { HorizontalLine } from "components/HorizontalLine";
import { Img } from "components/Img";
import { InsetBox } from "components/Containers/InsetBox";
import { cIf, cJoin } from "helpers/className";
import { slugify } from "helpers/formatters";
import { getAssetURL, ImageQuality } from "helpers/img";
import { isDefined, isDefinedAndNotEmpty, isUndefined } from "helpers/asserts";
import { AnchorShare } from "components/AnchorShare";
import { useIntersectionList } from "hooks/useIntersectionList";
import { Ico, Icon } from "components/Ico";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { Link } from "components/Inputs/Link";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface MarkdawnProps {
  className?: string;
  text: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Markdawn = ({ className, text: rawText }: MarkdawnProps): JSX.Element => {
  const playerName = useAtomGetter(atoms.settings.playerName);
  const isContentPanelAtLeastLg = useAtomGetter(atoms.containerQueries.isContentPanelAtLeastLg);
  const { showLightBox } = useAtomGetter(atoms.lightBox);

  /* eslint-disable no-irregular-whitespace */
  const text = `${preprocessMarkDawn(rawText, playerName)}
  ​`;
  /* eslint-enable no-irregular-whitespace */

  if (isUndefined(text) || text === "") {
    return <></>;
  }

  return (
    <Markdown
      className={cJoin("formatted", className)}
      options={{
        slugify: slugify,
        overrides: {
          a: {
            component: (compProps: { href: string; children: React.ReactNode }) => {
              if (compProps.href.startsWith("/") || compProps.href.startsWith("#")) {
                return (
                  <Link href={compProps.href} linkStyled>
                    {compProps.children}
                  </Link>
                );
              }
              return (
                <Link href={compProps.href} alwaysNewTab linkStyled>
                  {compProps.children}
                </Link>
              );
            },
          },

          Header: {
            component: (compProps: {
              id: string;
              style: React.CSSProperties;
              children: string;
              level: string;
            }) => (
              <Header
                title={compProps.children}
                level={parseInt(compProps.level, 10)}
                slug={compProps.id}
              />
            ),
          },

          SceneBreak: {
            component: (compProps: { id: string }) => (
              <Header title={"* * *"} level={6} slug={compProps.id} />
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
                <Link href={`${compProps.page ?? ""}#${slug}`} linkStyled>
                  {compProps.children}
                </Link>
              );
            },
          },

          Transcript: {
            component: (compProps) => (
              <div
                className={cJoin(
                  "grid gap-x-6 gap-y-2",
                  cIf(isContentPanelAtLeastLg, "grid-cols-[auto_1fr]", "grid-cols-1")
                )}>
                {compProps.children}
              </div>
            ),
          },

          Line: {
            component: (compProps) => (
              <>
                <strong
                  className={cJoin("!my-0 text-dark/60", cIf(!isContentPanelAtLeastLg, "!-mb-4"))}>
                  <Markdawn text={compProps.name} />
                </strong>
                <p className="whitespace-pre-line">{compProps.children}</p>
              </>
            ),
          },

          InsetBox: {
            component: (compProps) => <InsetBox className="my-12">{compProps.children}</InsetBox>,
          },

          li: {
            component: (compProps: { children: React.ReactNode }) => (
              <li
                className={
                  isDefined(compProps.children) &&
                  ReactDOMServer.renderToStaticMarkup(<>{compProps.children}</>).length > 100
                    ? "my-4"
                    : ""
                }>
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
            component: (compProps: { children: React.ReactNode; cite?: string }) => (
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
                  showLightBox([
                    compProps.src.startsWith("/uploads/")
                      ? getAssetURL(compProps.src, ImageQuality.Large)
                      : compProps.src,
                  ]);
                }}>
                <Img
                  src={
                    compProps.src.startsWith("/uploads/")
                      ? getAssetURL(compProps.src, ImageQuality.Small)
                      : compProps.src
                  }
                  quality={ImageQuality.Medium}
                  className="drop-shadow-lg shadow-shade"
                />
              </div>
            ),
          },
        },
      }}>
      {text}
    </Markdown>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface TableOfContentsProps {
  text: string;
  title?: string;
  horizontalLine?: boolean;
}

export const TableOfContents = ({
  text,
  title,
  horizontalLine = false,
}: TableOfContentsProps): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const toc = getTocFromMarkdawn(preprocessMarkDawn(text), title);

  return (
    <>
      {toc.children.length > 0 && (
        <>
          {horizontalLine && <HorizontalLine />}
          <h3 className="text-xl">{langui.table_of_contents}</h3>
          <div className="max-w-[14.5rem] text-left">
            <p
              className="relative my-2 overflow-x-hidden text-ellipsis whitespace-nowrap
                text-left">
              <Link href={`#${toc.slug}`} linkStyled>
                {<abbr title={toc.title}>{toc.title}</abbr>}
              </Link>
            </p>
            <TocLevel tocchildren={toc.children} parentNumbering="" />
          </div>
        </>
      )}
    </>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface HeaderProps {
  level: number;
  title: string;
  slug: string;
}

const Header = ({ level, title, slug }: HeaderProps): JSX.Element => {
  const isHoverable = useDeviceSupportsHover();
  const innerComponent = (
    <>
      <div className="ml-10 flex place-items-center gap-4">
        {title === "* * *" ? (
          <div className="mt-8 mb-12 space-x-3 text-dark">
            <Ico icon={Icon.Emergency} />
            <Ico icon={Icon.Emergency} />
            <Ico icon={Icon.Emergency} />
          </div>
        ) : (
          <div className="font-headers">{title}</div>
        )}
        <AnchorShare
          className={cIf(isHoverable, "opacity-0 transition-opacity group-hover:opacity-100")}
          id={slug}
        />
      </div>
    </>
  );

  switch (level) {
    case 1:
      return (
        <h1 id={slug} className="group">
          {innerComponent}
        </h1>
      );
    case 2:
      return (
        <h2 id={slug} className="group">
          {innerComponent}
        </h2>
      );
    case 3:
      return (
        <h3 id={slug} className="group">
          {innerComponent}
        </h3>
      );
    case 4:
      return (
        <h4 id={slug} className="group">
          {innerComponent}
        </h4>
      );
    case 5:
      return (
        <h5 id={slug} className="group">
          {innerComponent}
        </h5>
      );
    default:
      return (
        <h6 id={slug} className="group">
          {innerComponent}
        </h6>
      );
  }
};

interface TocInterface {
  title: string;
  slug: string;
  children: TocInterface[];
}

interface LevelProps {
  tocchildren: TocInterface[];
  parentNumbering: string;
  allowIntersection?: boolean;
}

const TocLevel = ({
  tocchildren,
  parentNumbering,
  allowIntersection = true,
}: LevelProps): JSX.Element => {
  const ids = useMemo(() => tocchildren.map((child) => child.slug), [tocchildren]);
  const currentIntersection = useIntersectionList(ids);

  return (
    <ol className="pl-4 text-left">
      {tocchildren.map((child, childIndex) => (
        <Fragment key={child.slug}>
          <li
            className={cJoin(
              "my-2 w-full overflow-x-hidden text-ellipsis whitespace-nowrap",
              cIf(allowIntersection && currentIntersection === childIndex, "text-dark")
            )}>
            <span className="text-dark">{`${parentNumbering}${childIndex + 1}.`}</span>{" "}
            <Link href={`#${child.slug}`} linkStyled>
              {<abbr title={child.title}>{child.title}</abbr>}
            </Link>
          </li>
          <TocLevel
            tocchildren={child.children}
            parentNumbering={`${parentNumbering}${childIndex + 1}.`}
            allowIntersection={allowIntersection && currentIntersection === childIndex}
          />
        </Fragment>
      ))}
    </ol>
  );
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const preprocessMarkDawn = (text: string, playerName = ""): string => {
  if (!text) return "";

  const processedPlayerName = playerName.replaceAll("_", "\\_").replaceAll("*", "\\*");

  let preprocessed = text
    .replaceAll("--", "—")
    .replaceAll(
      "@player",
      isDefinedAndNotEmpty(processedPlayerName) ? processedPlayerName : "(player)"
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

      if (/^[#]+ /u.test(line)) {
        return markdawnHeadersParser(line.indexOf(" "), line, visitedSlugs);
      }

      return line;
    })
    .join("\n");

  return preprocessed;
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const markdawnHeadersParser = (
  headerLevel: number,
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
  return `<Header level="${headerLevel}" id="${newSlug}">${lineText}</Header>`;
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

  const getTitle = (line: string): string => line.slice(line.indexOf(`">`) + 2, line.indexOf("</"));

  const getSlug = (line: string): string =>
    line.slice(line.indexOf(`id="`) + 4, line.indexOf(`">`));

  text.split("\n").map((line) => {
    if (line.startsWith('<Header level="2"')) {
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
    } else if (h2 >= 0 && line.startsWith('<Header level="3"')) {
      toc.children[h2]?.children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h3++;
      h4 = -1;
      h5 = -1;
      scenebreak = 0;
    } else if (h3 >= 0 && line.startsWith('<Header level="4"')) {
      toc.children[h2]?.children[h3]?.children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h4++;
      h5 = -1;
      scenebreak = 0;
    } else if (h4 >= 0 && line.startsWith('<Header level="5"')) {
      toc.children[h2]?.children[h3]?.children[h4]?.children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h5++;
      scenebreak = 0;
    } else if (h5 >= 0 && line.startsWith('<Header level="6"')) {
      toc.children[h2]?.children[h3]?.children[h4]?.children[h5]?.children.push({
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
        toc.children[h2]?.children[h3]?.children[h4]?.children[h5]?.children.push(child);
      } else if (h4 >= 0) {
        toc.children[h2]?.children[h3]?.children[h4]?.children.push(child);
      } else if (h3 >= 0) {
        toc.children[h2]?.children[h3]?.children.push(child);
      } else if (h2 >= 0) {
        toc.children[h2]?.children.push(child);
      } else {
        toc.children.push(child);
      }
    }
  });

  return toc;
};
