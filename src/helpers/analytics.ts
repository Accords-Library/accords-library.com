import { getLogger } from "helpers/logger";
import { TrackingFunction } from "types/global";

const logger = getLogger("📊 [Analytics]");

export const sendAnalytics = (
  category: string,
  event: Parameters<TrackingFunction>[0],
  data?: Parameters<TrackingFunction>[1]
): void => {
  const eventName = `[${category}] ${event}`;
  logger.log(eventName);
  try {
    umami.track(eventName, data);
  } catch (error) {
    if (error instanceof ReferenceError) return;
    logger.error(error);
  }
};
