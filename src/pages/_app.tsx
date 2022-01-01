import type { AppProps } from "next/app";
import MainPanel from "components/Panels/MainPanel";
import "styles/index.css";
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/vollkorn/700.css";

export type CustomAppProps = {
  useSubPanel: boolean;
  useContentPanel: boolean;
};

export function applyCustomAppProps(
  page: Function,
  customAppProps: CustomAppProps
) {
  page.customAppProps = customAppProps;
}

export default function AccordsLibraryApp(appProps: AppProps) {
  // Apply a different style depending on the given CustomAppProps
  let mainClasses = "grid min-h-screen grid-flow-col";
  if (
    appProps.Component.customAppProps.useSubPanel &&
    appProps.Component.customAppProps.useContentPanel
  ) {
    mainClasses += " grid-cols-appUseSubContent";
  } else if (appProps.Component.customAppProps.useSubPanel) {
    mainClasses += " grid-cols-appUseSub";
  } else if (appProps.Component.customAppProps.useContentPanel) {
    mainClasses += " grid-cols-appUseContent";
  } else {
    mainClasses += " grid-cols-appDefault";
  }

  return (
    <div className={mainClasses}>
      <MainPanel />
      <appProps.Component {...appProps.pageProps} />
    </div>
  );
}
