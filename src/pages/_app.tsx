import type { AppProps } from "next/app";
import "tailwind.css";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/vollkorn/700.css";
import "@fontsource/material-icons";

import { store } from "redux/store";
import { Provider } from "react-redux";

export default function AccordsLibraryApp(appProps: AppProps) {
  return (
    <Provider store={store}>
      <appProps.Component {...appProps.pageProps} />
    </Provider>
  );
}
