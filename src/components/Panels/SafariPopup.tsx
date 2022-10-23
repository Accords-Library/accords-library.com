import { useMemo } from "react";
import UAParser from "ua-parser-js";
import { useIsClient, useSessionStorage } from "usehooks-ts";
import { Button } from "components/Inputs/Button";
import { Popup } from "components/Popup";
import { sendAnalytics } from "helpers/analytics";

export const SafariPopup = (): JSX.Element => {
  const [hasDisgardedSafariWarning, setHasDisgardedSafariWarning] = useSessionStorage(
    "hasDisgardedSafariWarning",
    false
  );

  const isClient = useIsClient();
  const isSafari = useMemo<boolean>(() => {
    if (isClient) {
      const parser = new UAParser();
      return parser.getBrowser().name === "Safari" || parser.getOS().name === "iOS";
    }
    return false;
  }, [isClient]);

  return (
    <Popup isVisible={isSafari && !hasDisgardedSafariWarning}>
      <h1 className="text-2xl">Hi, you are using Safari!</h1>
      <p className="max-w-lg text-center">
        In most cases this wouldn&rsquo;t be a problem but our website is—for some obscure
        reason—performing terribly on Safari (WebKit). Because of that, we have decided to display
        this message instead of letting you have a slow and painful experience. We are looking into
        the problem, and are hoping to fix this soon.
      </p>
      <p>In the meanwhile, if you are using an iPhone/iPad, please try using another device.</p>
      <p>If you are on macOS, please use another browser such as Firefox or Chrome.</p>

      <Button
        text="Let me in regardless"
        className="mt-8"
        onClick={() => {
          setHasDisgardedSafariWarning(true);
          sendAnalytics("Safari", "Disgard warning");
        }}
      />
    </Popup>
  );
};
