export const sendAnalytics = (category: string, event: string): void => {
  try {
    umami(`[${category}] ${event}`);
  } catch (error) {
    if (error instanceof ReferenceError) return;
    console.log(error);
  }
};
