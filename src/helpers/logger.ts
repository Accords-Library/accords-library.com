type LoggerMode = "both" | "client" | "server";

const isServer = typeof window === "undefined";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLogger = (prefix: string, mode: LoggerMode = "client") => {
  if ((mode === "client" && isServer) || (mode === "server" && !isServer)) {
    return {
      error: () => null,
      warn: () => null,
      log: () => null,
      info: () => null,
      debug: () => null,
    };
  }

  return {
    error: (message?: unknown, ...optionalParams: unknown[]) =>
      console.error(prefix, message, ...optionalParams),
    warn: (message?: unknown, ...optionalParams: unknown[]) =>
      console.warn(prefix, message, ...optionalParams),
    log: (message?: unknown, ...optionalParams: unknown[]) =>
      console.log(prefix, message, ...optionalParams),
    info: (message?: unknown, ...optionalParams: unknown[]) =>
      console.info(prefix, message, ...optionalParams),
    debug: (message?: unknown, ...optionalParams: unknown[]) =>
      console.debug(prefix, message, ...optionalParams),
  };
};
