import type { AppProps } from "next/app";
import "tailwind.css";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/vollkorn/700.css";
import "@fontsource/material-icons";

export default function AccordsLibraryApp(appProps: AppProps) {
  return <appProps.Component {...appProps.pageProps} />;
}
