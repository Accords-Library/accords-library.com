import { slugify } from "helpers/formatters";
import { Immutable } from "helpers/types";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import { preprocessMarkDawn } from "./Markdawn";

interface Props {
  text: string;
  title?: string;
}

export function TOC(props: Immutable<Props>): JSX.Element {
  const { text, title } = props;
  const router = useRouter();
  const toc = useMemo(
    () => getTocFromMarkdawn(preprocessMarkDawn(text), title),
    [text, title]
  );

  return (
    <>
      {/* TODO: add to LANGUI */}
      <h3 className="text-xl">Table of content</h3>
      <div className="max-w-[14.5rem] text-left">
        <p className="relative my-2 overflow-x-hidden text-ellipsis whitespace-nowrap text-left">
          <a onClick={async () => router.replace(`#${toc.slug}`)}>
            {<abbr title={toc.title}>{toc.title}</abbr>}
          </a>
        </p>
        <TOCLevel tocchildren={toc.children} parentNumbering="" />
      </div>
    </>
  );
}

interface LevelProps {
  tocchildren: TOCInterface[];
  parentNumbering: string;
}

function TOCLevel(props: LevelProps): JSX.Element {
  const router = useRouter();
  const { tocchildren, parentNumbering } = props;
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
          <TOCLevel
            tocchildren={child.children}
            parentNumbering={`${parentNumbering}${childIndex + 1}.`}
          />
        </Fragment>
      ))}
    </ol>
  );
}

interface TOCInterface {
  title: string;
  slug: string;
  children: TOCInterface[];
}

export function getTocFromMarkdawn(text: string, title?: string): TOCInterface {
  const toc: TOCInterface = {
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

  function getTitle(line: string): string {
    return line.slice(line.indexOf(`">`) + 2, line.indexOf("</"));
  }

  function getSlug(line: string): string {
    return line.slice(line.indexOf(`id="`) + 4, line.indexOf(`">`));
  }

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
      h2 += 1;
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
      h3 += 1;
      h4 = -1;
      h5 = -1;
      scenebreak = 0;
    } else if (h3 >= 0 && line.startsWith("<h4 id=")) {
      toc.children[h2].children[h3].children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h4 += 1;
      h5 = -1;
      scenebreak = 0;
    } else if (h4 >= 0 && line.startsWith("<h5 id=")) {
      toc.children[h2].children[h3].children[h4].children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
      h5 += 1;
      scenebreak = 0;
    } else if (h5 >= 0 && line.startsWith("<h6 id=")) {
      toc.children[h2].children[h3].children[h4].children[h5].children.push({
        title: getTitle(line),
        slug: getSlug(line),
        children: [],
      });
    } else if (line.startsWith(`<SceneBreak`)) {
      scenebreak += 1;
      scenebreakIndex += 1;

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
}
