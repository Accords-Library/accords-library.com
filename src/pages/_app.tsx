import "@fontsource/material-icons";
import "@fontsource/material-icons-outlined";
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

import { LocalDataProvider } from "contexts/LocalDataProvider";
import { LightBoxProvider } from "contexts/LightBoxProvider";
import { AppLayoutProvider } from "contexts/AppLayoutProvider";
import { SettingsProvider } from "contexts/SettingsProvider";
import { ContainerQueriesContextProvider } from "contexts/ContainerQueriesProvider";

const AccordsLibraryApp = (props: AppProps): JSX.Element => (
  <LocalDataProvider>
    <SettingsProvider>
      <AppLayoutProvider>
        <ContainerQueriesContextProvider>
          <LightBoxProvider>
            <Script
              async
              defer
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
              src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/umami.js`}
            />
            <props.Component {...props.pageProps} />
          </LightBoxProvider>
        </ContainerQueriesContextProvider>
      </AppLayoutProvider>
    </SettingsProvider>
  </LocalDataProvider>
);
export default AccordsLibraryApp;
