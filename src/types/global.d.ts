export {};

type Umami = (eventName: string) => void;

declare global {
  const umami: Umami;
}
