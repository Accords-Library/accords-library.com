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
import { LightBoxProvider } from "contexts/LightBoxProvider";
import { SettingsPopup } from "components/Panels/SettingsPopup";
import { useSettings } from "contexts/settings";
import { useContainerQueries } from "contexts/containerQueries";
import { SearchPopup } from "components/Panels/SearchPopup";
import { useScrollIntoView } from "hooks/useScrollIntoView";
import { useUserAgent } from "contexts/userAgent";
import { DebugPopup } from "components/Panels/DebugPopup";

const AccordsLibraryApp = (props: AppProps): JSX.Element => {
  useLocalData();
  useSettings();
  useContainerQueries();
  useScrollIntoView();
  useUserAgent();

  return (
    <>
      <SearchPopup />
      <SettingsPopup />
      <LightBoxProvider />
      <DebugPopup />
      <Script
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
        strategy="lazyOnload"
        async
      />
      <props.Component {...props.pageProps} />
    </>
  );
};
export default AccordsLibraryApp;
