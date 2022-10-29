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
import { AppContextProvider } from "contexts/AppLayoutContext";

import "styles/debug.css";
import "styles/formatted.css";
import "styles/others.css";
import "styles/rc-slider.css";
import "styles/tippy.css";

import { TerminalContextProvider } from "contexts/TerminalContext";
import { UserSettingsProvider as UserSettingsContextProvider } from "contexts/UserSettingsContext";
import { LocalDataContextProvider } from "contexts/LocalDataContext";
import { ContainerQueriesContextProvider } from "contexts/ContainerQueriesContext";
import { LightBoxContextProvider } from "contexts/LightBoxContext";

const AccordsLibraryApp = (props: AppProps): JSX.Element => (
  <LocalDataContextProvider>
    <AppContextProvider>
      <UserSettingsContextProvider>
        <ContainerQueriesContextProvider>
          <TerminalContextProvider>
            <LightBoxContextProvider>
              <Script
                async
                defer
                data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
                src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/umami.js`}
              />
              <props.Component {...props.pageProps} />
            </LightBoxContextProvider>
          </TerminalContextProvider>
        </ContainerQueriesContextProvider>
      </UserSettingsContextProvider>
    </AppContextProvider>
  </LocalDataContextProvider>
);
export default AccordsLibraryApp;
