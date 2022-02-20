import Link from "next/link";
import NavOption from "components/PanelComponents/NavOption";
import SVG from "components/SVG";
import { useRouter } from "next/router";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import Markdown from "markdown-to-jsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setLanguagePanelOpen, setMainPanelOpen } from "redux/AppLayoutSlice";
import { useMediaDesktop } from "hooks/useMediaQuery";

type MainPanelProps = {
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function MainPanel(props: MainPanelProps): JSX.Element {
  const langui = props.langui;
  const router = useRouter();
  const isDesktop = useMediaDesktop();

  const mainPanelReduced = useSelector(
    (state: RootState) => state.appLayout.mainPanelReduced
  );

  const dispatch = useDispatch();

  return (
    <div
      id="mainPanel"
      className="flex flex-col justify-center content-start p-8 gap-y-2 justify-items-center text-center"
    >
      {mainPanelReduced && isDesktop ? (
        <div className="grid place-items-center gap-4">
          <Link href="/" passHref>
            <div className="w-8 cursor-pointer transition-[filter] hover:colorize-dark">
              <SVG
                src={"/icons/accords.svg"}
                alt={"Logo of Accord's Library"}
              />
            </div>
          </Link>
          {router.locale ? (
            <div onClick={() => dispatch(setLanguagePanelOpen(true))}>
              <Button className="text-xs">{router.locale.toUpperCase()}</Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <div className="grid place-items-center">
            <Link href="/" passHref>
              <div className="w-1/2 cursor-pointer transition-[filter] hover:colorize-dark">
                <SVG
                  src={"/icons/accords.svg"}
                  alt={"Logo of Accord's Library"}
                />
              </div>
            </Link>
            <div
              className="relative mt-5"
              onClick={() => dispatch(setLanguagePanelOpen(true))}
            >
              {router.locale ? (
                <Button className="absolute right-0 top-[-1.3em] text-xs !py-0.5 !px-2.5">
                  {router.locale.toUpperCase()}
                </Button>
              ) : (
                ""
              )}
              <h2 className="text-3xl">Accord&rsquo;s Library</h2>
            </div>
          </div>
        </div>
      )}

      <HorizontalLine />

      <NavOption
        url="/library"
        icon="library_books"
        title={langui.main_library}
        subtitle={langui.main_library_description}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      <NavOption
        url="/wiki"
        icon="travel_explore"
        title={langui.main_wiki}
        subtitle={langui.main_wiki_description}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      <NavOption
        url="/chronicles"
        icon="watch_later"
        title={langui.main_chronicles}
        subtitle={langui.main_chronicles_description}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      <HorizontalLine />

      <NavOption
        url="/news"
        icon="feed"
        title={langui.main_news}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      <NavOption
        url="/merch"
        icon="store"
        title={langui.main_merch}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      <NavOption
        url="/gallery"
        icon="collections"
        title={langui.main_gallery}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      <NavOption
        url="/archives"
        icon="inventory"
        title={langui.main_archives}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      <NavOption
        url="/about-us"
        icon="info"
        title={langui.main_about_us}
        tooltipId="MainPanelTooltip"
        reduced={mainPanelReduced && isDesktop}
        onClick={() => dispatch(setMainPanelOpen(false))}
      />

      {mainPanelReduced && isDesktop ? "" : <HorizontalLine />}

      <div
        className={`text-center ${
          mainPanelReduced && isDesktop ? "hidden" : ""
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
          className="transition-[filter] hover:colorize-dark"
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
            className="transition-[filter] hover:colorize-dark"
            href="https://github.com/Accords-Library"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVG className="w-10" src={"/icons/github-brands.svg"} alt={""} />
          </a>
          <a
            className="transition-[filter] hover:colorize-dark"
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
