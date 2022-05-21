import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { NavOption } from "components/PanelComponents/NavOption";
import { ToolTip } from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";
import { useMediaDesktop } from "hooks/useMediaQuery";
import Markdown from "markdown-to-jsx";
import Link from "next/link";

interface Props {
  langui: AppStaticProps["langui"];
}

export function MainPanel(props: Immutable<Props>): JSX.Element {
  const { langui } = props;
  const isDesktop = useMediaDesktop();
  const appLayout = useAppLayout();

  return (
    <div
      className={`flex flex-col content-start justify-center
      justify-items-center gap-y-2 p-8 text-center ${
        appLayout.mainPanelReduced && isDesktop && "px-4"
      }`}
    >
      {/* Reduce/expand main menu */}
      <div
        className={`fixed top-1/2 mobile:hidden ${
          appLayout.mainPanelReduced ? "left-[4.65rem]" : "left-[18.65rem]"
        }`}
        onClick={() =>
          appLayout.setMainPanelReduced(!appLayout.mainPanelReduced)
        }
      >
        <Button className="material-icons bg-light !px-2">
          {appLayout.mainPanelReduced ? "chevron_right" : "chevron_left"}
        </Button>
      </div>

      <div>
        <div className="grid place-items-center">
          <Link href="/" passHref>
            <div
              className={`${
                appLayout.mainPanelReduced && isDesktop ? "w-12" : "w-1/2"
              } mb-4 aspect-square cursor-pointer bg-black
              transition-colors [mask:url('/icons/accords.svg')]
              ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] hover:bg-dark`}
            ></div>
          </Link>

          {appLayout.mainPanelReduced && isDesktop ? (
            ""
          ) : (
            <h2 className="text-3xl">Accord&rsquo;s Library</h2>
          )}

          <div
            className={`flex ${
              appLayout.mainPanelReduced && isDesktop
                ? "flex-col gap-3"
                : "flex-row"
            } flex-wrap gap-2`}
          >
            <ToolTip
              content={<h3 className="text-2xl">{langui.open_settings}</h3>}
              placement="right"
              className="text-left"
              disabled={!appLayout.mainPanelReduced}
            >
              <Button
                onClick={() => {
                  appLayout.setConfigPanelOpen(true);
                }}
              >
                <span className={"material-icons"}>settings</span>
              </Button>
            </ToolTip>

            {/* <ToolTip
              content={<h3 className="text-2xl">{langui.open_search}</h3>}
              placement="right"
              className="text-left"
              disabled={!appLayout.mainPanelReduced}
            >
              <Button
                className={
                  appLayout.mainPanelReduced && isDesktop
                    ? ""
                    : "!py-0.5 !px-2.5"
                }
              >
                <span
                  className={`material-icons ${
                    !(appLayout.mainPanelReduced && isDesktop) && "!text-sm"
                  } `}
                >
                  search
                </span>
              </Button>
            </ToolTip> */}
          </div>
        </div>
      </div>

      <HorizontalLine />

      <NavOption
        url="/library"
        icon="library_books"
        title={langui.library}
        subtitle={langui.library_short_description}
        reduced={appLayout.mainPanelReduced && isDesktop}
      />

      <NavOption
        url="/contents"
        icon="workspaces"
        title={langui.contents}
        subtitle={langui.contents_short_description}
        reduced={appLayout.mainPanelReduced && isDesktop}
      />

      <NavOption
        url="/wiki"
        icon="travel_explore"
        title={langui.wiki}
        subtitle={langui.wiki_short_description}
        reduced={appLayout.mainPanelReduced && isDesktop}
      />

      {/*

      <NavOption
        url="/chronicles"
        icon="watch_later"
        title={langui.chronicles}
        subtitle={langui.chronicles_short_description}
        
        reduced={appLayout.mainPanelReduced && isDesktop}
        
      />
      
      */}

      <HorizontalLine />

      <NavOption
        url="/news"
        icon="feed"
        title={langui.news}
        reduced={appLayout.mainPanelReduced && isDesktop}
      />
      {/*
      <NavOption
        url="/merch"
        icon="store"
        title={langui.merch}
        
        reduced={appLayout.mainPanelReduced && isDesktop}
        
      />
      
      */}

      <NavOption
        url="https://gallery.accords-library.com/"
        icon="collections"
        title={langui.gallery}
        reduced={appLayout.mainPanelReduced && isDesktop}
      />

      <NavOption
        url="/archives"
        icon="inventory"
        title={langui.archives}
        reduced={appLayout.mainPanelReduced && isDesktop}
      />

      <NavOption
        url="/about-us"
        icon="info"
        title={langui.about_us}
        reduced={appLayout.mainPanelReduced && isDesktop}
      />

      {appLayout.mainPanelReduced && isDesktop ? "" : <HorizontalLine />}

      <div
        className={`text-center ${
          appLayout.mainPanelReduced && isDesktop ? "hidden" : ""
        }`}
      >
        <p>
          {langui.licensing_notice && (
            <Markdown>{langui.licensing_notice}</Markdown>
          )}
        </p>
        <a
          aria-label="Read more about the license we use for this website"
          className="colorize-black hover:colorize-dark transition-[filter]"
          href="https://creativecommons.org/licenses/by-sa/4.0/"
        >
          <div
            className="mt-4 mb-8 grid grid-flow-col place-content-center gap-1
            hover:[--theme-color-black:var(--theme-color-dark)]"
          >
            <div
              className="aspect-square w-6 bg-black [mask:url('/icons/creative-commons-brands.svg')]
               ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center]"
            />
            <div
              className="aspect-square w-6 bg-black 
              [mask:url('/icons/creative-commons-by-brands.svg')] ![mask-size:contain]
              ![mask-repeat:no-repeat] ![mask-position:center]"
            />
            <div
              className="aspect-square w-6 bg-black
               [mask:url('/icons/creative-commons-sa-brands.svg')] ![mask-size:contain]
               ![mask-repeat:no-repeat] ![mask-position:center]"
            />
          </div>
        </a>
        <p>
          {langui.copyright_notice && (
            <Markdown>{langui.copyright_notice}</Markdown>
          )}
        </p>
        <div className="mt-12 mb-4 grid h-4 grid-flow-col place-content-center gap-8">
          <a
            aria-label="Browse our GitHub repository, which include this website source code"
            className="aspect-square w-10
            bg-black transition-colors [mask:url('/icons/github-brands.svg')]
            ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] hover:bg-dark"
            href="https://github.com/Accords-Library"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            aria-label="Join our Discord server!"
            className="aspect-square w-10
            bg-black transition-colors [mask:url('/icons/discord-brands.svg')]
            ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center] hover:bg-dark"
            href="/discord"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </div>
  );
}
