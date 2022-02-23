import Link from "next/link";
import NavOption from "components/PanelComponents/NavOption";
import SVG from "components/SVG";
import { useRouter } from "next/router";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import Markdown from "markdown-to-jsx";
import { useMediaDesktop } from "hooks/useMediaQuery";
import { useAppLayout } from "contexts/AppLayoutContext";

type MainPanelProps = {
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function MainPanel(props: MainPanelProps): JSX.Element {
  const langui = props.langui;
  const router = useRouter();
  const isDesktop = useMediaDesktop();
  const appLayout = useAppLayout();

  return (
    <div
      className={`flex flex-col justify-center content-start gap-y-2 justify-items-center text-center p-8 ${
        appLayout.mainPanelReduced && "px-4"
      }`}
    >
      <div>
        <div className="grid place-items-center">
          <Link href="/" passHref>
            <div
              onClick={() => appLayout.setMainPanelOpen(false)}
              className={`${
                appLayout.mainPanelReduced && isDesktop ? "w-12" : "w-1/2"
              } cursor-pointer transition-[filter] colorize-black dark:colorize-dark-black hover:colorize-dark dark:hover:colorize-dark-dark`}
            >
              <SVG
                src={"/icons/accords.svg"}
                alt={"Logo of Accord's Library"}
              />
            </div>
          </Link>

          {appLayout.mainPanelReduced && isDesktop ? (
            ""
          ) : (
            <h2 className="text-3xl">Accord&rsquo;s Library</h2>
          )}

          <div
            className={`flex ${
              appLayout.mainPanelReduced && isDesktop ? "flex-col" : "flex-row"
            } flex-wrap gap-2`}
          >
            <Button
              onClick={() => {
                appLayout.setDarkMode(!appLayout.darkMode);
                appLayout.setSelectedThemeMode(true);
              }}
              className={
                appLayout.mainPanelReduced && isDesktop ? "" : "!py-0.5 !px-2.5"
              }
            >
              <span className="material-icons !text-sm">
                {appLayout.darkMode ? "dark_mode" : "light_mode"}
              </span>
            </Button>

            {router.locale && (
              <Button
                onClick={() => appLayout.setLanguagePanelOpen(true)}
                className={
                  appLayout.mainPanelReduced && isDesktop
                    ? ""
                    : "!py-0.5 !px-2.5 !text-sm"
                }
              >
                {router.locale.toUpperCase()}
              </Button>
            )}
          </div>
        </div>
      </div>

      <HorizontalLine />

      <NavOption
        url="/library"
        icon="library_books"
        title={langui.main_library}
        subtitle={langui.main_library_description}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/contents"
        icon="workspaces"
        title="Contents"
        subtitle="Explore all content and filter by type or category"
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/wiki"
        icon="travel_explore"
        title={langui.main_wiki}
        subtitle={langui.main_wiki_description}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/chronicles"
        icon="watch_later"
        title={langui.main_chronicles}
        subtitle={langui.main_chronicles_description}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <HorizontalLine />

      <NavOption
        url="/news"
        icon="feed"
        title={langui.main_news}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/merch"
        icon="store"
        title={langui.main_merch}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/gallery"
        icon="collections"
        title={langui.main_gallery}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/archives"
        icon="inventory"
        title={langui.main_archives}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      <NavOption
        url="/about-us"
        icon="info"
        title={langui.main_about_us}
        tooltipId="MainPanelTooltip"
        reduced={appLayout.mainPanelReduced && isDesktop}
        onClick={() => appLayout.setMainPanelOpen(false)}
      />

      {appLayout.mainPanelReduced && isDesktop ? "" : <HorizontalLine />}

      <div
        className={`text-center ${
          appLayout.mainPanelReduced && isDesktop ? "hidden" : ""
        }`}
      >
        <p>
          {langui.main_licensing ? (
            <Markdown>{langui.main_licensing}</Markdown>
          ) : (
            ""
          )}
        </p>
        <a
          className="transition-[filter] colorize-black dark:colorize-dark-black hover:colorize-dark dark:hover:colorize-dark-dark"
          href="https://creativecommons.org/licenses/by-sa/4.0/"
        >
          <div className="mt-4 mb-8 grid grid-flow-col place-content-center gap-1">
            <SVG
              className="w-6"
              src={"/icons/creative-commons-brands.svg"}
              alt={""}
            />
            <SVG
              className="w-6"
              src={"/icons/creative-commons-by-brands.svg"}
              alt={""}
            />
            <SVG
              className="w-6"
              src={"/icons/creative-commons-sa-brands.svg"}
              alt={""}
            />
          </div>
        </a>
        <p>
          {langui.main_copyright ? (
            <Markdown>{langui.main_copyright}</Markdown>
          ) : (
            ""
          )}
        </p>
        <div className="mt-12 mb-4 grid h-4 grid-flow-col place-content-center gap-8">
          <a
            className="transition-[filter] colorize-black dark:colorize-dark-black hover:colorize-dark dark:hover:colorize-dark-dark"
            href="https://github.com/Accords-Library"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVG className="w-10" src={"/icons/github-brands.svg"} alt={""} />
          </a>
          <a
            className="transition-[filter] colorize-black dark:colorize-dark-black hover:colorize-dark dark:hover:colorize-dark-dark"
            href="/discord"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVG className="w-10" src={"/icons/discord-brands.svg"} alt={""} />
          </a>
        </div>
      </div>
    </div>
  );
}
