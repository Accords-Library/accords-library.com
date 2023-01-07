import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { NavOption } from "components/PanelComponents/NavOption";
import { ToolTip } from "components/ToolTip";
import { cIf, cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/asserts";
import { Link } from "components/Inputs/Link";
import { sendAnalytics } from "helpers/analytics";
import { ColoredSvg } from "components/ColoredSvg";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomPair, useAtomSetter } from "helpers/atoms";
import { Markdawn } from "components/Markdown/Markdawn";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export const MainPanel = (): JSX.Element => {
  const is3ColumnsLayout = useAtomGetter(atoms.containerQueries.is3ColumnsLayout);
  const langui = useAtomGetter(atoms.localData.langui);
  const [isMainPanelReduced, setMainPanelReduced] = useAtomPair(atoms.layout.mainPanelReduced);
  const setSettingsOpened = useAtomSetter(atoms.layout.settingsOpened);
  const setSearchOpened = useAtomSetter(atoms.layout.searchOpened);

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
            icon={isMainPanelReduced ? "chevron_right" : "chevron_left"}
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
              placement={isMainPanelReduced ? "right" : "top"}>
              <Button
                onClick={() => {
                  setSettingsOpened(true);
                  sendAnalytics("Settings", "Open settings");
                }}
                icon="discover_tune"
              />
            </ToolTip>
            <ToolTip
              content={<h3 className="text-2xl">{langui.open_search}</h3>}
              placement={isMainPanelReduced ? "right" : "top"}>
              <Button
                onClick={() => {
                  setSearchOpened(true);
                  sendAnalytics("Search", "Open search");
                }}
                icon="search"
              />
            </ToolTip>
          </div>
        </div>
      </div>

      <HorizontalLine />

      <NavOption
        url="/library"
        icon="auto_stories"
        title={langui.library}
        subtitle={langui.library_short_description}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/contents"
        icon="workspaces"
        title={langui.contents}
        subtitle={langui.contents_short_description}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/wiki"
        icon="travel_explore"
        title={langui.wiki}
        subtitle={langui.wiki_short_description}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/chronicles"
        icon="schedule"
        title={langui.chronicles}
        subtitle={langui.chronicles_short_description}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <HorizontalLine />

      <NavOption
        url="/news"
        icon="newspaper"
        title={langui.news}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      {/*
      <NavOption
        url="/merch"
        icon="store"
        title={langui.merch}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />
      */}

      <NavOption
        url="https://gallery.accords-library.com/posts/"
        icon="perm_media"
        title={langui.gallery}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/archives"
        icon="save"
        title={langui.archives}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      <NavOption
        url="/about-us"
        icon="info"
        title={langui.about_us}
        reduced={isMainPanelReduced && is3ColumnsLayout}
      />

      {(!isMainPanelReduced || !is3ColumnsLayout) && <HorizontalLine />}

      <div className={cJoin("text-center", cIf(isMainPanelReduced && is3ColumnsLayout, "hidden"))}>
        {isDefinedAndNotEmpty(langui.licensing_notice) && (
          <p>
            <Markdawn text={langui.licensing_notice} />
          </p>
        )}
        <div className="mt-4 mb-8 grid place-content-center">
          <Link
            onClick={() => sendAnalytics("MainPanel", "Visit license")}
            aria-label="Read more about the license we use for this website"
            className="group grid grid-flow-col place-content-center gap-1 transition-filter"
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            alwaysNewTab>
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
          </Link>
        </div>
        {isDefinedAndNotEmpty(langui.copyright_notice) && (
          <p>
            <Markdawn text={langui.copyright_notice} />
          </p>
        )}
        <div className="mt-12 mb-4 grid h-4 grid-flow-col place-content-center gap-8">
          <Link
            aria-label="Browse our GitHub repository, which include this website source code"
            onClick={() => sendAnalytics("MainPanel", "Visit GitHub")}
            href="https://github.com/Accords-Library"
            alwaysNewTab>
            <ColoredSvg
              className="h-10 w-10 bg-black hover:bg-dark"
              src="/icons/github-brands.svg"
            />
          </Link>
          <Link
            aria-label="Follow us on Twitter"
            onClick={() => sendAnalytics("MainPanel", "Visit Twitter")}
            href="https://twitter.com/AccordsLibrary"
            alwaysNewTab>
            <ColoredSvg
              className="h-10 w-10 bg-black hover:bg-dark"
              src="/icons/twitter-brands.svg"
            />
          </Link>
          <Link
            aria-label="Join our Discord server!"
            onClick={() => sendAnalytics("MainPanel", "Visit Discord")}
            href="/discord"
            alwaysNewTab>
            <ColoredSvg
              className="h-10 w-10 bg-black hover:bg-dark"
              src="/icons/discord-brands.svg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
