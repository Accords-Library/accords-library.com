import type { AppProps } from "next/app";
import MainPanel from "components/Panels/MainPanel";
import "tailwind.css";
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
  return (
    <div
      className={
        appProps.Component.customAppProps.useSubPanel &&
        appProps.Component.customAppProps.useContentPanel
          ? "grid grid-cols-[20rem_20rem_1fr]"
          : appProps.Component.customAppProps.useSubPanel
          ? "grid grid-cols-[20rem_20rem]"
          : appProps.Component.customAppProps.useContentPanel
          ? "grid grid-cols-[20rem_1fr]"
          : "grid grid-cols-[20rem]"
      }
    >
      <MainPanel />
      <appProps.Component {...appProps.pageProps} />
    </div>
  );
}
