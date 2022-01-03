import Link from "next/link";
import NavOption from "components/PanelComponents/NavOption";
import SVG from "components/SVG";

export default function MainPanel(): JSX.Element {
  return (
    <div className="grid webkit-scrollbar:w-0 [scrollbar-width:none] overflow-y-scroll border-r-[1px] border-black w-80 max-h-screen h-screen justify-center content-start p-8 gap-y-2 justify-items-center text-center">
      <div className="transition-[filter] hover:colorize-dark">
        <Link href="/" passHref>
          <div className="grid place-items-center cursor-pointer">
            <div className="w-1/2">
              <SVG
                src={"/icons/accords.svg"}
                alt={"Logo of Accord's Library"}
              />
            </div>
            <h2 className="my-5 text-3xl">Accord&apos;s Library</h2>
          </div>
        </Link>
      </div>

      <button>Change language</button>

      <hr />

      <NavOption
        url="/library"
        icon="library_books"
        title="Library"
        subtitle="Browse all physical and digital media"
      />

      <NavOption
        url="/hubs"
        icon="workspaces"
        title="Hubs"
        subtitle="Explore all content of a specific game/series"
      />

      <NavOption
        url="/chronology"
        icon="watch_later"
        title="Chronology"
        subtitle="Follow all events in chronological order"
      />

      <hr />

      <NavOption url="/news" icon="feed" title="News" />
      <NavOption url="/data" icon="travel_explore" title="Data" />
      <NavOption url="/gallery" icon="collections" title="Gallery" />
      <NavOption url="/archive" icon="inventory" title="Archive" />
      <NavOption url="/about-us" icon="info" title="About us" />

      <hr />

      <div className="text-center">
        <p>
          This website&rsquo;s content is made available under{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA</a>{" "}
          unless otherwise noted.
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
          Accord&rsquo;s Library is not affiliated with or endorsed by SQUARE
          ENIX CO. LTD. All game assets and promotional materials belongs to ©
          SQUARE ENIX CO. LTD.
        </p>
        <div className="mt-12 mb-4 grid h-4 grid-flow-col place-content-center gap-8">
          <a
            className="transition-[filter] hover:colorize-dark"
            href="https://github.com/Accords-Library"
          >
            <SVG className="w-10" src={"/icons/github-brands.svg"} alt={""} />
          </a>
          <a
            className="transition-[filter] hover:colorize-dark"
            href="https://accords-library.com/discord"
          >
            <SVG className="w-10" src={"/icons/discord-brands.svg"} alt={""} />
          </a>
        </div>
      </div>
    </div>
  );
}
