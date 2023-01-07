import "material-symbols/rounded.css";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/share-tech-mono/400.css";
import "@fontsource/opendyslexic/700.css";
import "@fontsource/vollkorn/700.css";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/zen-maru-gothic/900.css";

import type { AppProps } from "next/app";
import Script from "next/script";

import "styles/debug.css";
import "styles/formatted.css";
import "styles/others.css";
import "styles/rc-slider.css";
import "styles/tippy.css";

import { useLocalData } from "contexts/localData";
import { useAppLayout } from "contexts/appLayout";
import { LightBoxProvider } from "contexts/LightBoxProvider";
import { SettingsPopup } from "components/Panels/SettingsPopup";
import { useSettings } from "contexts/settings";
import { useContainerQueries } from "contexts/containerQueries";
import { useWebkitFixes } from "contexts/webkitFixes";
import { SearchPopup } from "components/Panels/SearchPopup";

const AccordsLibraryApp = (props: AppProps): JSX.Element => {
  useLocalData();
  useAppLayout();
  useSettings();
  useContainerQueries();
  useWebkitFixes();

  return (
    <>
      <SearchPopup />
      <SettingsPopup />
      <LightBoxProvider />
      <Script
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/umami.js`}
        strategy="lazyOnload"
      />
      <props.Component {...props.pageProps} />
    </>
  );
};
export default AccordsLibraryApp;
