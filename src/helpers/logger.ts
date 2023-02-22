// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLogger = (prefix: string) => ({
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
});
