export type TrackingFunction = (eventName: string, data?: Record<string, number | string>) => void;
type Umami = { track: TrackingFunction };

declare global {
  const umami: Umami;
}
