import { NextRouter } from "next/router";
import { slugify } from "queries/helpers";
import { preprocessMarkDawn } from "./Markdawn";

type TOCProps = {
  text: string;
  title?: string;
  router: NextRouter;
};

export default function TOC(props: TOCProps): JSX.Element {
  const { router, text, title } = props;
  const toc = getTocFromMarkdawn(preprocessMarkDawn(text), title);

  return (
    <div>
      <h3 className="text-xl">Table of content</h3>
      <ol className="text-left max-w-[14.5rem]">
        <li className="my-2 overflow-x-hidden relative text-ellipsis whitespace-nowrap">
          <a className="" onClick={() => router.replace(`#${toc.slug}`)}>
            {<abbr title={toc.title}>{toc.title}</abbr>}
          </a>
        </li>
        {toc.children.map((h2, h2Index) => (
          <>
            <li
              key={h2.slug}
              className="my-2 overflow-x-hidden w-full text-ellipsis whitespace-nowrap"
            >
              <span className="text-dark">{`${h2Index + 1}. `}</span>
              <a onClick={() => router.replace(`#${h2.slug}`)}>
                {<abbr title={h2.title}>{h2.title}</abbr>}
              </a>
            </li>
            <ol className="pl-4 text-left">
              {h2.children.map((h3, h3Index) => (
                <li
                  key={h3.slug}
                  className="my-2 overflow-x-hidden w-full text-ellipsis whitespace-nowrap"
                >
                  <span className="text-dark">{`${h2Index + 1}.${
                    h3Index + 1
                  }. `}</span>
                  <a onClick={() => router.replace(`#${h3.slug}`)}>
                    {<abbr title={h3.title}>{h3.title}</abbr>}
                  </a>
                </li>
              ))}
            </ol>
          </>
        ))}
      </ol>
    </div>
  );
}

export type TOC = {
  title: string;
  slug: string;
  children: TOC[];
};

export function getTocFromMarkdawn(text: string, title?: string): TOC {
  if (!title) title = "Return to top";
  let toc: TOC = { title: title, slug: slugify(title) || "", children: [] };
  let h2 = -1;
  let h3 = -1;
  let h4 = -1;
  let h5 = -1;
  let scenebreak = 0;
  let scenebreakIndex = 0;
  text.split("\n").map((line) => {
    if (line.startsWith("# ")) {
      toc.slug = slugify(line);
    } else if (line.startsWith("## ")) {
      toc.children.push({
        title: line.slice("## ".length),
        slug: slugify(line),
        children: [],
      });
      h2++;
      h3 = -1;
      h4 = -1;
      h5 = -1;
      scenebreak = 0;
    } else if (line.startsWith("### ")) {
      toc.children[h2].children.push({
        title: line.slice("### ".length),
        slug: slugify(line),
        children: [],
      });
      h3++;
      h4 = -1;
      h5 = -1;
      scenebreak = 0;
    } else if (line.startsWith("#### ")) {
      toc.children[h2].children[h3].children.push({
        title: line.slice("#### ".length),
        slug: slugify(line),
        children: [],
      });
      h4++;
      h5 = -1;
      scenebreak = 0;
    } else if (line.startsWith("##### ")) {
      toc.children[h2].children[h3].children[h4].children.push({
        title: line.slice("##### ".length),
        slug: slugify(line),
        children: [],
      });
      h5++;
      scenebreak = 0;
    } else if (line.startsWith("###### ")) {
      toc.children[h2].children[h3].children[h4].children[h5].children.push({
        title: line.slice("###### ".length),
        slug: slugify(line),
        children: [],
      });
    } else if (line.startsWith(`<SceneBreak`)) {
      scenebreak++;
      scenebreakIndex++;
      if (h5 >= 0) {
        toc.children[h2].children[h3].children[h4].children[h5].children.push({
          title: `Scene break ${scenebreak}`,
          slug: slugify(`scene-break-${scenebreakIndex}`),
          children: [],
        });
      } else if (h4 >= 0) {
        toc.children[h2].children[h3].children[h4].children.push({
          title: `Scene break ${scenebreak}`,
          slug: slugify(`scene-break-${scenebreakIndex}`),
          children: [],
        });
      } else if (h3 >= 0) {
        toc.children[h2].children[h3].children.push({
          title: `Scene break ${scenebreak}`,
          slug: slugify(`scene-break-${scenebreakIndex}`),
          children: [],
        });
      } else if (h2 >= 0) {
        toc.children[h2].children.push({
          title: `Scene break ${scenebreak}`,
          slug: slugify(`scene-break-${scenebreakIndex}`),
          children: [],
        });
      } else {
        toc.children.push({
          title: `Scene break ${scenebreak}`,
          slug: slugify(`scene-break-${scenebreakIndex}`),
          children: [],
        });
      }
    }
  });
  return toc;
}
