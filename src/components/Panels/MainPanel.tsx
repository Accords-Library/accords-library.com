import Markdown from "markdown-to-jsx";
import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { NavOption } from "components/PanelComponents/NavOption";
import { ToolTip } from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/others";
import { Link } from "components/Inputs/Link";
import { useIs3ColumnsLayout } from "hooks/useContainerQuery";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export const MainPanel = (): JSX.Element => {
  const is3ColumnsLayout = useIs3ColumnsLayout();
  const {
    mainPanelReduced = false,
    toggleMainPanelReduced,
    setConfigPanelOpen,
    langui,
  } = useAppLayout();

  return (
    <div
      className={cJoin(
        "grid content-start justify-center gap-y-2 p-8 text-center",
        cIf(mainPanelReduced && is3ColumnsLayout, "px-4")
      )}>
      {/* Reduce/expand main menu */}
      {is3ColumnsLayout && (
        <div
          className={cJoin(
            "fixed top-1/2",
            cIf(mainPanelReduced, "left-[4.65rem]", "left-[18.65rem]")
          )}>
          <Button
            onClick={() => {
              if (mainPanelReduced) {
                umami("[MainPanel] Expand");
              } else {
                umami("[MainPanel] Reduce");
              }
              toggleMainPanelReduced();
            }}
            className="bg-light !px-2"
            icon={mainPanelReduced ? Icon.ChevronRight : Icon.ChevronLeft}
          />
        </div>
      )}

      <div>
        <div className="grid place-items-center">
          <Link href="/" className="flex w-full justify-center">
            <div
              className={cJoin(
                `mb-4 aspect-square cursor-pointer bg-black transition-colors
                [mask:url('/icons/accords.svg')] ![mask-size:contain] ![mask-repeat:no-repeat]
                ![mask-position:center] hover:bg-dark`,
                cIf(mainPanelReduced && is3ColumnsLayout, "w-12", "w-1/2")
              )}></div>
          </Link>

          {(!mainPanelReduced || !is3ColumnsLayout) && (
            <h2 className="mb-4 text-3xl">Accord&rsquo;s Library</h2>
          )}

          <div
            className={cJoin(
              "flex flex-wrap gap-2",
              cIf(mainPanelReduced && is3ColumnsLayout, "flex-col gap-3", "flex-row")
            )}>
            <ToolTip
              content={<h3 className="text-2xl">{langui.open_settings}</h3>}
              placement="right"
              className="text-left"
              disabled={!mainPanelReduced}>
              <Button
                onClick={() => {
                  setConfigPanelOpen(true);
                  umami("[Settings] Open settings");
                }}
                icon={Icon.Settings}
              />
            </ToolTip>
          </div>
        </div>
      </div>

      <HorizontalLine />

      <NavOption
        url="/library"
        icon={Icon.LibraryBooks}
        title={langui.library}
        subtitle={langui.library_short_description}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/contents"
        icon={Icon.Workspaces}
        title={langui.contents}
        subtitle={langui.contents_short_description}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/wiki"
        icon={Icon.TravelExplore}
        title={langui.wiki}
        subtitle={langui.wiki_short_description}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/chronicles"
        icon={Icon.WatchLater}
        title={langui.chronicles}
        subtitle={langui.chronicles_short_description}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      <HorizontalLine />

      <NavOption
        url="/news"
        icon={Icon.Feed}
        title={langui.news}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      {/*
      <NavOption
        url="/merch"
        icon={Icon.Store}
        title={langui.merch}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />
      */}

      <NavOption
        url="https://gallery.accords-library.com/posts/"
        icon={Icon.Collections}
        title={langui.gallery}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/archives"
        icon={Icon.Inventory}
        title={langui.archives}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/about-us"
        icon={Icon.Info}
        title={langui.about_us}
        reduced={mainPanelReduced && is3ColumnsLayout}
      />

      {mainPanelReduced && is3ColumnsLayout ? "" : <HorizontalLine />}

      <div className={cJoin("text-center", cIf(mainPanelReduced && is3ColumnsLayout, "hidden"))}>
        {isDefinedAndNotEmpty(langui.licensing_notice) && (
          <p>
            <Markdown>{langui.licensing_notice}</Markdown>
          </p>
        )}
        <div className="mt-4 mb-8 grid place-content-center">
          <a
            onClick={() => umami("[MainPanel] Visit license")}
            aria-label="Read more about the license we use for this website"
            className="group grid grid-flow-col place-content-center gap-1 transition-[filter]"
            href="https://creativecommons.org/licenses/by-sa/4.0/">
            <div
              className="aspect-square w-6 bg-black transition-colors
              [mask:url('/icons/creative-commons-brands.svg')] ![mask-size:contain]
              ![mask-repeat:no-repeat] ![mask-position:center] group-hover:bg-dark"
            />
            <div
              className="aspect-square w-6 bg-black transition-colors
              [mask:url('/icons/creative-commons-by-brands.svg')] ![mask-size:contain]
              ![mask-repeat:no-repeat] ![mask-position:center] group-hover:bg-dark"
            />
            <div
              className="aspect-square w-6 bg-black transition-colors
              [mask:url('/icons/creative-commons-sa-brands.svg')] ![mask-size:contain]
              ![mask-repeat:no-repeat] ![mask-position:center] group-hover:bg-dark"
            />
          </a>
        </div>
        {isDefinedAndNotEmpty(langui.copyright_notice) && (
          <p>
            <Markdown>{langui.copyright_notice}</Markdown>
          </p>
        )}
        <div className="mt-12 mb-4 grid h-4 grid-flow-col place-content-center gap-8">
          <a
            aria-label="Browse our GitHub repository, which include this website source code"
            onClick={() => umami("[MainPanel] Visit GitHub")}
            className="aspect-square w-10
              bg-black transition-colors [mask:url('/icons/github-brands.svg')]
              ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] hover:bg-dark"
            href="https://github.com/Accords-Library"
            target="_blank"
            rel="noopener noreferrer"></a>
          <a
            aria-label="Follow us on Twitter"
            onClick={() => umami("[MainPanel] Visit Twitter")}
            className="aspect-square w-10
              bg-black transition-colors [mask:url('/icons/twitter-brands.svg')]
              ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] hover:bg-dark"
            href="https://twitter.com/AccordsLibrary"
            target="_blank"
            rel="noopener noreferrer"></a>
          <a
            aria-label="Join our Discord server!"
            onClick={() => umami("[MainPanel] Visit Discord")}
            className="aspect-square w-10
              bg-black transition-colors [mask:url('/icons/discord-brands.svg')]
              ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] hover:bg-dark"
            href="/discord"
            target="_blank"
            rel="noopener noreferrer"></a>
        </div>
      </div>
    </div>
  );
};
