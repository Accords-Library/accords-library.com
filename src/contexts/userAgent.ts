import { atom } from "jotai";
import { useIsClient } from "usehooks-ts";
import { useEffect } from "react";
import { UAParser } from "ua-parser-js";
import { atomPairing, useAtomSetter } from "helpers/atoms";
import { getLogger } from "helpers/logger";

const logger = getLogger("📱 [User Agent]");

const osAtom = atomPairing(atom<string | undefined>(undefined));
const browserAtom = atomPairing(atom<string | undefined>(undefined));
const engineAtom = atomPairing(atom<string | undefined>(undefined));
const deviceTypeAtom = atomPairing(atom<string | undefined>(undefined));

export const userAgent = {
  os: osAtom[0],
  browser: browserAtom[0],
  engine: engineAtom[0],
  deviceType: deviceTypeAtom[0],
};

export const useUserAgent = (): void => {
  const setOs = useAtomSetter(osAtom);
  const setBrowser = useAtomSetter(browserAtom);
  const setEngine = useAtomSetter(engineAtom);
  const setDeviceType = useAtomSetter(deviceTypeAtom);

  const isClient = useIsClient();

  useEffect(() => {
    const parser = new UAParser();

    const os = parser.getOS().name;
    const browser = parser.getBrowser().name;
    const engine = parser.getEngine().name;
    const deviceType = parser.getDevice().type;

    setOs(os);
    setBrowser(browser);
    setEngine(engine);
    setDeviceType(deviceType);

    logger.log({ os, browser, engine, deviceType });
  }, [isClient, setBrowser, setDeviceType, setEngine, setOs]);
};
