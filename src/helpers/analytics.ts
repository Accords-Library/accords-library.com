export const sendAnalytics = (category: string, event: string): void => {
  try {
    umami(`[${category}] ${event}`);
  } catch (error) {
    console.log(error);
  }
};
