import Markdown from "markdown-to-jsx";
import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { NavOption } from "components/PanelComponents/NavOption";
import { ToolTip } from "components/ToolTip";
import { Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/others";
import { Link } from "components/Inputs/Link";
import { sendAnalytics } from "helpers/analytics";
import { ColoredSvg } from "components/ColoredSvg";
import { useContainerQueries } from "contexts/ContainerQueriesContext";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomPair, useAtomSetter } from "helpers/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export const MainPanel = (): JSX.Element => {
  const { is3ColumnsLayout } = useContainerQueries();
  const langui = useAtomGetter(atoms.localData.langui);
  const [isMainPanelReduced, setMainPanelReduced] = useAtomPair(atoms.layout.mainPanelReduced);
  const setSettingsOpened = useAtomSetter(atoms.layout.settingsOpened);

  return (
    <div
      className={cJoin(
        "grid content-start justify-center gap-y-2 p-8 text-center",
        cIf(isMainPanelReduced && is3ColumnsLayout, "px-4")
      )}>
      {/* Reduce/expand main menu */}
      {is3ColumnsLayout && (
        <div
          className={cJoin(
            "fixed top-1/2",
            cIf(isMainPanelReduced, "left-[4.65rem]", "left-[18.65rem]")
          )}>
          <Button
            onClick={() => {
              if (isMainPanelReduced) {
                sendAnalytics("MainPanel", "Expand");
              } else {
                sendAnalytics("MainPanel", "Reduce");
              }
              setMainPanelReduced((current) => !current);
            }}
            className="z-50 bg-light !px-2"
            icon={isMainPanelReduced ? Icon.ChevronRight : Icon.ChevronLeft}
          />
        </div>
      )}
      <div>
        <div className="grid place-items-center">
          <Link href="/" className="flex w-full cursor-pointer justify-center">
            <ColoredSvg
              src="/icons/accords.svg"
              className={cJoin(
                "mb-4 aspect-square bg-black hover:bg-dark",
                cIf(isMainPanelReduced && is3ColumnsLayout, "w-12", "w-1/2")
              )}
            />
          </Link>

          {(!isMainPanelReduced || !is3ColumnsLayout) && (
            <h2 className="mb-4 text-3xl">Accord&rsquo;s Library</h2>
          )}

          <div
            className={cJoin(
              "flex flex-wrap gap-2",
              cIf(isMainPanelReduced && is3ColumnsLayout, "flex-col gap-3", "flex-row")
            )}>
            <ToolTip
              content={<h3 className="text-2xl">{langui.open_settings}</h3>}
              placement="right"
              className="text-left"
              disabled={!isMainPanelReduced}>
              <Button
                onClick={() => {
                  setSettingsOpened(true);
                  sendAnalytics("Settings", "Open settings");
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
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/contents"
        icon={Icon.Workspaces}
        title={langui.contents}
        subtitle={langui.contents_short_description}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/wiki"
        icon={Icon.TravelExplore}
        title={langui.wiki}
        subtitle={langui.wiki_short_description}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/chronicles"
        icon={Icon.WatchLater}
        title={langui.chronicles}
        subtitle={langui.chronicles_short_description}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <HorizontalLine />

      <NavOption
        url="/news"
        icon={Icon.Feed}
        title={langui.news}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      {/*
      <NavOption
        url="/merch"
        icon={Icon.Store}
        title={langui.merch}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />
      */}

      <NavOption
        url="https://gallery.accords-library.com/posts/"
        icon={Icon.Collections}
        title={langui.gallery}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/archives"
        icon={Icon.Inventory2}
        title={langui.archives}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/about-us"
        icon={Icon.Info}
        title={langui.about_us}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      {(!isMainPanelReduced || !is3ColumnsLayout) && <HorizontalLine />}

      <div className={cJoin("text-center", cIf(isMainPanelReduced && is3ColumnsLayout, "hidden"))}>
        {isDefinedAndNotEmpty(langui.licensing_notice) && (
          <p>
            <Markdown>{langui.licensing_notice}</Markdown>
          </p>
        )}
        <div className="mt-4 mb-8 grid place-content-center">
          <a
            onClick={() => sendAnalytics("MainPanel", "Visit license")}
            aria-label="Read more about the license we use for this website"
            className="group grid grid-flow-col place-content-center gap-1 transition-filter"
            href="https://creativecommons.org/licenses/by-sa/4.0/">
            <ColoredSvg
              className="h-6 w-6 bg-black group-hover:bg-dark"
              src="/icons/creative-commons-brands.svg"
            />
            <ColoredSvg
              className="h-6 w-6 bg-black group-hover:bg-dark"
              src="/icons/creative-commons-by-brands.svg"
            />
            <ColoredSvg
              className="h-6 w-6 bg-black group-hover:bg-dark"
              src="/icons/creative-commons-sa-brands.svg"
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
            onClick={() => sendAnalytics("MainPanel", "Visit GitHub")}
            href="https://github.com/Accords-Library"
            target="_blank"
            rel="noopener noreferrer">
            <ColoredSvg
              className="h-10 w-10 bg-black hover:bg-dark"
              src="/icons/github-brands.svg"
            />
          </a>
          <a
            aria-label="Follow us on Twitter"
            onClick={() => sendAnalytics("MainPanel", "Visit Twitter")}
            href="https://twitter.com/AccordsLibrary"
            target="_blank"
            rel="noopener noreferrer">
            <ColoredSvg
              className="h-10 w-10 bg-black hover:bg-dark"
              src="/icons/twitter-brands.svg"
            />
          </a>
          <a
            aria-label="Join our Discord server!"
            onClick={() => sendAnalytics("MainPanel", "Visit Discord")}
            href="/discord"
            target="_blank"
            rel="noopener noreferrer">
            <ColoredSvg
              className="h-10 w-10 bg-black hover:bg-dark"
              src="/icons/discord-brands.svg"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
