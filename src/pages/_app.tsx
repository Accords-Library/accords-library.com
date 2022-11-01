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

import { ContainerQueriesContextProvider } from "contexts/ContainerQueriesContext";
import { LocalDataProvider } from "contexts/LocalDataProvider";
import { UserSettingsProvider } from "contexts/UserSettingsProvider";
import { LightBoxProvider } from "contexts/LightBoxProvider";
import { AppLayoutProvider } from "contexts/AppLayoutProvider";

const AccordsLibraryApp = (props: AppProps): JSX.Element => (
  <LocalDataProvider>
    <UserSettingsProvider>
      <AppLayoutProvider>
        <UserSettingsProvider>
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
        </UserSettingsProvider>
      </AppLayoutProvider>
    </UserSettingsProvider>
  </LocalDataProvider>
);
export default AccordsLibraryApp;
