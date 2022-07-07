import "@fontsource/material-icons";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/share-tech-mono/400.css";
import "@fontsource/opendyslexic/700.css";
import "@fontsource/vollkorn/700.css";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/zen-maru-gothic/900.css";
import type { AppProps } from "next/app";
import { AppContextProvider } from "contexts/AppLayoutContext";
import "tailwind.css";

const AccordsLibraryApp = (props: AppProps): JSX.Element => (
  <AppContextProvider>
    <props.Component {...props.pageProps} />
  </AppContextProvider>
);
export default AccordsLibraryApp;
