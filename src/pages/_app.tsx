import type { AppProps } from "next/app";
import "tailwind.css";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/vollkorn/700.css";
import "@fontsource/material-icons";

import { AppContextProvider } from "contexts/AppLayoutContext";

export default function AccordsLibraryApp(appProps: AppProps) {
  return (
    <AppContextProvider>
      <appProps.Component {...appProps.pageProps} />
    </AppContextProvider>
  );
}
