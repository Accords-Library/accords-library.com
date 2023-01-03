export const sendAnalytics = (category: string, event: string): void => {
  const eventName = `[${category}] ${event}`;
  console.log(`Event: ${eventName}`);
  try {
    umami(eventName);
  } catch (error) {
    if (error instanceof ReferenceError) return;
    console.log(error);
  }
};
