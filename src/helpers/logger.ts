type LoggerMode = "both" | "client" | "server";

const isServer = typeof window === "undefined";

type Logger = {
  error: (message?: unknown, ...optionalParams: unknown[]) => void;
  warn: (message?: unknown, ...optionalParams: unknown[]) => void;
  log: (message?: unknown, ...optionalParams: unknown[]) => void;
  info: (message?: unknown, ...optionalParams: unknown[]) => void;
  debug: (message?: unknown, ...optionalParams: unknown[]) => void;
};

export const getLogger = (prefix: string, mode: LoggerMode = "client"): Logger => {
  if ((mode === "client" && isServer) || (mode === "server" && !isServer)) {
    return {
      error: () => undefined,
      warn: () => undefined,
      log: () => undefined,
      info: () => undefined,
      debug: () => undefined,
    };
  }

  return {
    error: (message, ...optionalParams) => console.error(prefix, message, ...optionalParams),
    warn: (message, ...optionalParams) => console.warn(prefix, message, ...optionalParams),
    log: (message, ...optionalParams) => console.log(prefix, message, ...optionalParams),
    info: (message, ...optionalParams) => console.info(prefix, message, ...optionalParams),
    debug: (message, ...optionalParams) => console.debug(prefix, message, ...optionalParams),
  };
};
