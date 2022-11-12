"use client";

import "@fontsource/material-icons";
import "@fontsource/material-icons-outlined";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/share-tech-mono/400.css";
import "@fontsource/opendyslexic/700.css";
import "@fontsource/vollkorn/700.css";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/zen-maru-gothic/900.css";

import "styles/debug.css";
import "styles/formatted.css";
import "styles/others.css";
import "styles/rc-slider.css";
import "styles/tippy.css";

import Script from "next/script";
import { useLocalData } from "contexts/localData";
// import { useAppLayout } from "contexts/appLayout";
import { LightBoxProvider } from "contexts/LightBoxProvider";
import { SettingsPopup } from "components/Panels/SettingsPopup";
import { useSettings } from "contexts/settings";
import { useContainerQueries } from "contexts/containerQueries";
import { Ids } from "types/ids";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { cIf, cJoin } from "helpers/className";

const Layout: Layout = ({ children }) => {
  useLocalData();
  // useAppLayout();
  useSettings();
  useContainerQueries();

  const isDyslexic = useAtomGetter(atoms.settings.dyslexic);
  const isDarkMode = useAtomGetter(atoms.settings.darkMode);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        id={Ids.Body}
        className={cJoin(
          "bg-light font-body font-medium text-black",
          cIf(isDyslexic, "set-theme-font-dyslexic", "set-theme-font-standard"),
          cIf(isDarkMode, "set-theme-dark", "set-theme-light")
        )}>
        <SettingsPopup />
        <LightBoxProvider />
        <Script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/umami.js`}
        />
        {children}
      </body>
    </html>
  );
};
export default Layout;
