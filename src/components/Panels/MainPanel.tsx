import Link from "next/link";
import NavOption from "components/Panels/NavOption";

export default function MainPanel(): JSX.Element {
  return (
    <div className="grid webkit-scrollbar:w-0 [scrollbar-width:none] overflow-y-scroll border-r-[1px] border-black w-80 h-full max-h-screen justify-center content-start p-8 gap-y-2 justify-items-center text-center">
      <Link href="/" passHref>
        <div className="grid place-items-center cursor-pointer">
          <img
            className="w-1/2 self-start justify-center"
            src="/icons/accords.svg"
            alt=""
          />
          <h2 className="mt-4">Accord&apos;s Library</h2>
        </div>
      </Link>

      <button>Change language</button>

      <hr />

      <NavOption
        url="/library"
        icon="/icons/book-solid.svg"
        title="Library"
        subtitle="Browse all physical and digital media"
      />

      <NavOption
        url="/hubs"
        icon="/icons/hubs.svg"
        title="Hubs"
        subtitle="Explore all content of a specific game/series"
      />

      <NavOption
        url="/chronology"
        icon="/icons/timeline-solid.svg"
        title="Chronology"
        subtitle="Follow all events in chronological order"
      />

      <hr />

      <NavOption
        url="/archive"
        icon="/icons/box-archive-solid.svg"
        title="Archive"
      />

      <NavOption url="/news" icon="/icons/newspaper-solid.svg" title="News" />

      <NavOption
        url="/gallery"
        icon="/icons/images-solid.svg"
        title="Gallery"
      />

      <NavOption
        url="/about-us"
        icon="/icons/circle-info-solid.svg"
        title="About us"
      />

      <hr />

      <div className="text-center">
        <p>
          This website&rsquo;s content is made available under{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA</a>{" "}
          unless otherwise noted.
        </p>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          <div className="mt-4 mb-8 grid h-4 grid-flow-col place-content-center gap-1">
            <img
              className="h-6"
              src="/icons/creative-commons-brands.svg"
              alt=""
            />
            <img
              className="h-6"
              src="/icons/creative-commons-by-brands.svg"
              alt=""
            />
            <img
              className="h-6"
              src="/icons/creative-commons-sa-brands.svg"
              alt=""
            />
          </div>
        </a>
        <p>
          Accord&rsquo;s Library is not affiliated with or endorsed by SQUARE
          ENIX CO. LTD. All game assets and promotional materials belongs to ©
          SQUARE ENIX CO. LTD.
        </p>
        <div className="mt-12 mb-4 grid h-4 grid-flow-col place-content-center gap-8">
          <a href="https://github.com/Accords-Library">
            <img className="h-8" src="/icons/github-brands.svg" alt="" />
          </a>
          <a href="https://accords-library.com/discord">
            <img className="h-8" src="/icons/discord-brands.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
