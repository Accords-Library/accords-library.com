import { getLogger } from "helpers/logger";

const logger = getLogger("📊 [Analytics]");

export const sendAnalytics = (category: string, event: string): void => {
  const eventName = `[${category}] ${event}`;
  logger.log(eventName);
  try {
    umami(eventName);
  } catch (error) {
    if (error instanceof ReferenceError) return;
    logger.error(error);
  }
};
